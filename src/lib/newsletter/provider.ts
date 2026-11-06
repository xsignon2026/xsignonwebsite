// T-070: Newsletter provider integration, subscriber synchronization, and suppression management.
import fs from "fs/promises";
import path from "path";

export type SubscriberContact = {
  id?: string;
  email: string;
  consentDate: string;
  source: string;
  wordingVersion: string;
  status: "active" | "unsubscribed";
  tags: string[];
  updatedAt?: string;
};

export type SuppressionRecord = {
  email: string;
  suppressedAt: string;
  reason?: string;
};

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const SUBSCRIBERS_FILE = path.join(DATA_DIR, "subscribers.ndjson");
const SUPPRESSION_FILE = path.join(DATA_DIR, "suppression.ndjson");

async function ensureNewsletterFiles(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(SUBSCRIBERS_FILE);
  } catch {
    await fs.writeFile(SUBSCRIBERS_FILE, "", "utf-8");
  }
  try {
    await fs.access(SUPPRESSION_FILE);
  } catch {
    await fs.writeFile(SUPPRESSION_FILE, "", "utf-8");
  }
}

/**
 * Checks whether an email address is currently suppressed from marketing communications.
 */
export async function isSuppressed(email: string): Promise<boolean> {
  await ensureNewsletterFiles();
  const content = await fs.readFile(SUPPRESSION_FILE, "utf-8");
  const lines = content.trim().split("\n").filter(Boolean);
  const normalized = email.toLowerCase().trim();

  for (const line of lines) {
    const record = JSON.parse(line) as SuppressionRecord;
    if (record.email.toLowerCase() === normalized) {
      return true;
    }
  }
  return false;
}

/**
 * Adds an email address to the suppression list.
 */
export async function addSuppression(email: string, reason?: string): Promise<void> {
  await ensureNewsletterFiles();
  const normalized = email.toLowerCase().trim();
  const alreadySuppressed = await isSuppressed(normalized);

  if (!alreadySuppressed) {
    const record: SuppressionRecord = {
      email: normalized,
      suppressedAt: new Date().toISOString(),
      reason: reason || "User unsubscribed",
    };
    await fs.appendFile(SUPPRESSION_FILE, JSON.stringify(record) + "\n", "utf-8");
  }
}

/**
 * Adds or updates a verified subscriber. Handles duplicates idempotently.
 */
export async function syncVerifiedSubscriber(
  contact: Omit<SubscriberContact, "status">
): Promise<{ success: boolean; id: string }> {
  await ensureNewsletterFiles();
  const normalizedEmail = contact.email.toLowerCase().trim();

  // If currently suppressed, do not re-add unless un-suppressed
  const suppressed = await isSuppressed(normalizedEmail);
  if (suppressed) {
    return { success: false, id: "suppressed" };
  }

  const content = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
  const lines = content.trim().split("\n").filter(Boolean);
  const subscribers = lines.map((l) => JSON.parse(l) as SubscriberContact);

  const existingIndex = subscribers.findIndex(
    (s) => s.email.toLowerCase() === normalizedEmail
  );

  let subscriberId: string;

  if (existingIndex >= 0) {
    // Idempotent update: update consent metadata without duplicating row
    subscriberId = subscribers[existingIndex].id || `sub_${Date.now()}`;
    subscribers[existingIndex] = {
      ...subscribers[existingIndex],
      id: subscriberId,
      consentDate: contact.consentDate,
      source: contact.source,
      wordingVersion: contact.wordingVersion,
      status: "active",
      updatedAt: new Date().toISOString(),
    };
  } else {
    // New subscriber
    subscriberId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const newRecord: SubscriberContact = {
      id: subscriberId,
      email: normalizedEmail,
      consentDate: contact.consentDate,
      source: contact.source,
      wordingVersion: contact.wordingVersion,
      status: "active",
      tags: contact.tags || ["newsletter"],
    };
    subscribers.push(newRecord);
  }

  const serialized = subscribers.map((s) => JSON.stringify(s)).join("\n") + "\n";
  await fs.writeFile(SUBSCRIBERS_FILE, serialized, "utf-8");

  return { success: true, id: subscriberId };
}

/**
 * Handles unsubscribe request: updates subscriber status and records suppression.
 */
export async function unsubscribeEmail(
  email: string,
  reason?: string
): Promise<{ success: boolean }> {
  await ensureNewsletterFiles();
  const normalized = email.toLowerCase().trim();

  // 1. Record in suppression list
  await addSuppression(normalized, reason);

  // 2. Mark as unsubscribed in subscribers file if present
  const content = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
  const lines = content.trim().split("\n").filter(Boolean);
  const subscribers = lines.map((l) => JSON.parse(l) as SubscriberContact);

  let modified = false;
  for (const s of subscribers) {
    if (s.email.toLowerCase() === normalized) {
      s.status = "unsubscribed";
      s.updatedAt = new Date().toISOString();
      modified = true;
    }
  }

  if (modified) {
    const serialized = subscribers.map((s) => JSON.stringify(s)).join("\n") + "\n";
    await fs.writeFile(SUBSCRIBERS_FILE, serialized, "utf-8");
  }

  return { success: true };
}

/**
 * Returns all active subscribers.
 */
export async function getActiveSubscribers(): Promise<SubscriberContact[]> {
  await ensureNewsletterFiles();
  const content = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
  const lines = content.trim().split("\n").filter(Boolean);
  return lines
    .map((l) => JSON.parse(l) as SubscriberContact)
    .filter((s) => s.status === "active");
}
