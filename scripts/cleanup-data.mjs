#!/usr/bin/env node
// T-078: Standalone CLI data cleanup script for scheduled server jobs.
import fs from "fs/promises";
import path from "path";

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const VERIFICATIONS_FILE = path.join(DATA_DIR, "verifications.ndjson");
const GRANTS_FILE = path.join(DATA_DIR, "download-grants.ndjson");

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;

async function main() {
  const now = Date.now();
  console.log(`[Data Cleanup] Starting run at ${new Date(now).toISOString()}...`);

  let verificationsPruned = 0;
  let remainingVerifications = 0;

  try {
    const vContent = await fs.readFile(VERIFICATIONS_FILE, "utf-8");
    const vLines = vContent.trim().split("\n").filter(Boolean);
    const retainedV = [];

    for (const line of vLines) {
      try {
        const record = JSON.parse(line);
        const age = now - new Date(record.createdAt).getTime();
        if (record.status === "pending" && age > SEVEN_DAYS_MS) {
          verificationsPruned++;
        } else {
          retainedV.push(record);
        }
      } catch {
        // Skip malformed lines
      }
    }

    remainingVerifications = retainedV.length;
    const vSerialized = retainedV.length > 0 ? retainedV.map((r) => JSON.stringify(r)).join("\n") + "\n" : "";
    await fs.writeFile(VERIFICATIONS_FILE, vSerialized, "utf-8");
  } catch (err) {
    console.log(`[Data Cleanup] No verifications file found or error: ${err.message}`);
  }

  let grantsPruned = 0;
  let remainingGrants = 0;

  try {
    const gContent = await fs.readFile(GRANTS_FILE, "utf-8");
    const gLines = gContent.trim().split("\n").filter(Boolean);
    const retainedG = [];

    for (const line of gLines) {
      try {
        const record = JSON.parse(line);
        const grantTime = new Date(record.grantedAt).getTime();
        const lastAccessTime = record.lastDownloadedAt ? new Date(record.lastDownloadedAt).getTime() : grantTime;
        const effectiveAge = now - Math.max(grantTime, lastAccessTime);

        if (effectiveAge > NINETY_DAYS_MS) {
          grantsPruned++;
        } else {
          retainedG.push(record);
        }
      } catch {
        // Skip malformed lines
      }
    }

    remainingGrants = retainedG.length;
    const gSerialized = retainedG.length > 0 ? retainedG.map((r) => JSON.stringify(r)).join("\n") + "\n" : "";
    await fs.writeFile(GRANTS_FILE, gSerialized, "utf-8");
  } catch (err) {
    console.log(`[Data Cleanup] No grants file found or error: ${err.message}`);
  }

  console.log(`[Data Cleanup] Complete:`);
  console.log(` - Pruned unverified records (>7 days): ${verificationsPruned}`);
  console.log(` - Retained verification records: ${remainingVerifications}`);
  console.log(` - Pruned grant/log records (>90 days): ${grantsPruned}`);
  console.log(` - Retained grant/log records: ${remainingGrants}`);
}

main().catch((err) => {
  console.error("[Data Cleanup] Fatal execution failure:", err);
  process.exit(1);
});
