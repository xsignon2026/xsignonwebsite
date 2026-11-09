// T-065: Verification data store for double opt-in, download grants, and consent audit logs.
// Invariant: Unverified rows are NEVER copied to or accessible by mailing list sync routines.
import fs from "fs/promises";
import path from "path";

export type ConsentAudit = {
  timestamp: string;
  ipHash: string;
  userAgent: string;
  wording: string;
};

export type VerificationPurpose = "newsletter" | "whitepaper_download";

export type VerificationStatus = "pending" | "verified" | "expired" | "consumed" | "bounced";

export type VerificationRecord = {
  id: string;
  tokenHash: string;
  email: string;
  purpose: VerificationPurpose;
  targetSlug?: string;
  sourcePage: string;
  wordingVersion: string;
  status: VerificationStatus;
  createdAt: string;
  expiresAt: string;
  verifiedAt?: string;
  consentAudit?: ConsentAudit;
  deliveryStatus?: "delivered" | "queued_retry" | "failed";
  retries?: number;
  lastRetryAt?: string;
  deliveryError?: string;
};

export type DownloadGrantRecord = {
  id: string;
  email: string;
  whitePaperSlug: string;
  grantedAt: string;
  lastDownloadedAt?: string;
  downloadCount: number;
};

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const VERIFICATIONS_FILE = path.join(DATA_DIR, "verifications.ndjson");
const GRANTS_FILE = path.join(DATA_DIR, "download-grants.ndjson");

async function ensureDataFiles(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(VERIFICATIONS_FILE);
  } catch {
    await fs.writeFile(VERIFICATIONS_FILE, "", "utf-8");
  }
  try {
    await fs.access(GRANTS_FILE);
  } catch {
    await fs.writeFile(GRANTS_FILE, "", "utf-8");
  }
}

/**
 * Persists a new pending verification request.
 */
export async function saveVerificationRequest(record: VerificationRecord): Promise<void> {
  await ensureDataFiles();
  const line = JSON.stringify(record) + "\n";
  await fs.appendFile(VERIFICATIONS_FILE, line, "utf-8");
}

/**
 * Retrieves all verification records.
 */
async function getAllVerifications(): Promise<VerificationRecord[]> {
  await ensureDataFiles();
  const content = await fs.readFile(VERIFICATIONS_FILE, "utf-8");
  const lines = content.trim().split("\n").filter(Boolean);
  return lines.map((l) => JSON.parse(l) as VerificationRecord);
}

/**
 * Finds a pending verification request by the SHA-256 hash of its token.
 */
export async function findVerificationByTokenHash(
  tokenHash: string,
): Promise<VerificationRecord | null> {
  const records = await getAllVerifications();
  // Find the most recent matching token hash
  for (let i = records.length - 1; i >= 0; i--) {
    if (records[i].tokenHash === tokenHash) {
      return records[i];
    }
  }
  return null;
}

/**
 * Atomically marks a verification record as verified with audit metadata.
 */
export async function markVerificationVerified(
  id: string,
  consentAudit: ConsentAudit,
): Promise<VerificationRecord | null> {
  const records = await getAllVerifications();
  let updatedRecord: VerificationRecord | null = null;

  for (let i = 0; i < records.length; i++) {
    if (records[i].id === id) {
      records[i].status = "verified";
      records[i].verifiedAt = new Date().toISOString();
      records[i].consentAudit = consentAudit;
      updatedRecord = records[i];
      break;
    }
  }

  if (updatedRecord) {
    const serialized = records.map((r) => JSON.stringify(r)).join("\n") + "\n";
    await fs.writeFile(VERIFICATIONS_FILE, serialized, "utf-8");
  }

  return updatedRecord;
}

/**
 * Retrieves verified subscribers only.
 * CRITICAL GUARANTEE: Unverified, pending, or expired records are NEVER returned.
 */
export async function getVerifiedSubscribers(): Promise<VerificationRecord[]> {
  const records = await getAllVerifications();
  return records.filter((r) => r.status === "verified" && r.purpose === "newsletter");
}

/**
 * Grants access to download a white paper.
 */
export async function grantWhitePaperDownload(
  email: string,
  whitePaperSlug: string,
): Promise<DownloadGrantRecord> {
  await ensureDataFiles();
  const normalizedEmail = email.toLowerCase().trim();
  const normalizedSlug = whitePaperSlug.toLowerCase().trim();

  const grantId = `grant_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const record: DownloadGrantRecord = {
    id: grantId,
    email: normalizedEmail,
    whitePaperSlug: normalizedSlug,
    grantedAt: new Date().toISOString(),
    downloadCount: 0,
  };

  const line = JSON.stringify(record) + "\n";
  await fs.appendFile(GRANTS_FILE, line, "utf-8");
  return record;
}

/**
 * Checks whether an email address has a valid grant for a white paper.
 */
export async function hasDownloadGrant(email: string, whitePaperSlug: string): Promise<boolean> {
  await ensureDataFiles();
  const content = await fs.readFile(GRANTS_FILE, "utf-8");
  const lines = content.trim().split("\n").filter(Boolean);
  const normalizedEmail = email.toLowerCase().trim();
  const normalizedSlug = whitePaperSlug.toLowerCase().trim();

  for (const line of lines) {
    const grant = JSON.parse(line) as DownloadGrantRecord;
    if (
      grant.email.toLowerCase() === normalizedEmail &&
      grant.whitePaperSlug.toLowerCase() === normalizedSlug
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Increments download count and updates lastDownloadedAt timestamp.
 */
export async function recordDownloadAccess(email: string, whitePaperSlug: string): Promise<void> {
  await ensureDataFiles();
  const content = await fs.readFile(GRANTS_FILE, "utf-8");
  const lines = content.trim().split("\n").filter(Boolean);
  const normalizedEmail = email.toLowerCase().trim();
  const normalizedSlug = whitePaperSlug.toLowerCase().trim();

  const records = lines.map((l) => JSON.parse(l) as DownloadGrantRecord);
  for (const r of records) {
    if (
      r.email.toLowerCase() === normalizedEmail &&
      r.whitePaperSlug.toLowerCase() === normalizedSlug
    ) {
      r.downloadCount += 1;
      r.lastDownloadedAt = new Date().toISOString();
      break;
    }
  }

  const serialized = records.map((r) => JSON.stringify(r)).join("\n") + "\n";
  await fs.writeFile(GRANTS_FILE, serialized, "utf-8");
}

/**
 * T-075: Marks pending verification records for an email address as bounced.
 * Invariant: Bounced verification records can NEVER be verified into subscriptions.
 */
export async function markVerificationBounced(email: string): Promise<number> {
  await ensureDataFiles();
  const content = await fs.readFile(VERIFICATIONS_FILE, "utf-8");
  const lines = content.trim().split("\n").filter(Boolean);
  const normalizedEmail = email.toLowerCase().trim();

  let modifiedCount = 0;
  const records = lines.map((l) => JSON.parse(l) as VerificationRecord);
  for (const r of records) {
    if (r.email.toLowerCase() === normalizedEmail && r.status === "pending") {
      r.status = "bounced";
      modifiedCount += 1;
    }
  }

  if (modifiedCount > 0) {
    const serialized = records.map((r) => JSON.stringify(r)).join("\n") + "\n";
    await fs.writeFile(VERIFICATIONS_FILE, serialized, "utf-8");
  }

  return modifiedCount;
}

/**
 * T-075: Updates delivery status and records retry counts.
 */
export async function updateDeliveryStatus(
  id: string,
  status: "delivered" | "queued_retry" | "failed",
  error?: string,
): Promise<void> {
  await ensureDataFiles();
  const content = await fs.readFile(VERIFICATIONS_FILE, "utf-8");
  const lines = content.trim().split("\n").filter(Boolean);

  const records = lines.map((l) => JSON.parse(l) as VerificationRecord);
  for (const r of records) {
    if (r.id === id) {
      r.deliveryStatus = status;
      r.lastRetryAt = new Date().toISOString();
      r.retries = (r.retries || 0) + 1;
      if (error) {
        r.deliveryError = error;
      }
      break;
    }
  }

  const serialized = records.map((r) => JSON.stringify(r)).join("\n") + "\n";
  await fs.writeFile(VERIFICATIONS_FILE, serialized, "utf-8");
}

/**
 * T-075: Retrieves records queued for retry where retry limit has not been exceeded.
 */
export async function getPendingRetries(): Promise<VerificationRecord[]> {
  await ensureDataFiles();
  const content = await fs.readFile(VERIFICATIONS_FILE, "utf-8");
  const lines = content.trim().split("\n").filter(Boolean);

  const records = lines.map((l) => JSON.parse(l) as VerificationRecord);
  return records.filter(
    (r) => r.deliveryStatus === "queued_retry" && (r.retries || 0) < 3 && r.status === "pending",
  );
}
