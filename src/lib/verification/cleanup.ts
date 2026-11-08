// T-078: Automated data retention and cleanup engine.
// Rules:
// 1. Delete unverified requests (status === "pending") older than 7 days.
// 2. Enforce 90-day retention for download access grants / logs.
import fs from "fs/promises";
import path from "path";
import type { VerificationRecord, DownloadGrantRecord } from "./store";

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const VERIFICATIONS_FILE = path.join(DATA_DIR, "verifications.ndjson");
const GRANTS_FILE = path.join(DATA_DIR, "download-grants.ndjson");

export const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
export const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;

export type CleanupReport = {
  timestamp: string;
  verificationsPruned: number;
  grantsPruned: number;
  remainingVerifications: number;
  remainingGrants: number;
};

export async function runDataCleanup(options?: {
  unverifiedTtlMs?: number;
  grantsTtlMs?: number;
  now?: number;
}): Promise<CleanupReport> {
  const now = options?.now || Date.now();
  const unverifiedTtl = options?.unverifiedTtlMs ?? SEVEN_DAYS_MS;
  const grantsTtl = options?.grantsTtlMs ?? NINETY_DAYS_MS;

  let verificationsPruned = 0;
  let remainingVerifications = 0;

  // 1. Prune unverified verification requests older than 7 days
  try {
    const vContent = await fs.readFile(VERIFICATIONS_FILE, "utf-8");
    const vLines = vContent.trim().split("\n").filter(Boolean);
    const retainedVRecords: VerificationRecord[] = [];

    for (const line of vLines) {
      try {
        const record = JSON.parse(line) as VerificationRecord;
        const createdTime = new Date(record.createdAt).getTime();
        const age = now - createdTime;

        // If unverified/pending and older than 7 days, prune
        if (record.status === "pending" && age > unverifiedTtl) {
          verificationsPruned++;
        } else {
          retainedVRecords.push(record);
        }
      } catch {
        // Skip malformed lines
      }
    }

    remainingVerifications = retainedVRecords.length;
    const vSerialized =
      retainedVRecords.length > 0
        ? retainedVRecords.map((r) => JSON.stringify(r)).join("\n") + "\n"
        : "";
    await fs.writeFile(VERIFICATIONS_FILE, vSerialized, "utf-8");
  } catch {
    // File may not exist yet in fresh environment
  }

  // 2. Enforce 90-day retention on download grant access logs
  let grantsPruned = 0;
  let remainingGrants = 0;

  try {
    const gContent = await fs.readFile(GRANTS_FILE, "utf-8");
    const gLines = gContent.trim().split("\n").filter(Boolean);
    const retainedGRecords: DownloadGrantRecord[] = [];

    for (const line of gLines) {
      try {
        const record = JSON.parse(line) as DownloadGrantRecord;
        const grantTime = new Date(record.grantedAt).getTime();
        const lastAccessTime = record.lastDownloadedAt
          ? new Date(record.lastDownloadedAt).getTime()
          : grantTime;

        const effectiveAge = now - Math.max(grantTime, lastAccessTime);

        if (effectiveAge > grantsTtl) {
          grantsPruned++;
        } else {
          retainedGRecords.push(record);
        }
      } catch {
        // Skip malformed lines
      }
    }

    remainingGrants = retainedGRecords.length;
    const gSerialized =
      retainedGRecords.length > 0
        ? retainedGRecords.map((r) => JSON.stringify(r)).join("\n") + "\n"
        : "";
    await fs.writeFile(GRANTS_FILE, gSerialized, "utf-8");
  } catch {
    // File may not exist yet
  }

  return {
    timestamp: new Date(now).toISOString(),
    verificationsPruned,
    grantsPruned,
    remainingVerifications,
    remainingGrants,
  };
}
