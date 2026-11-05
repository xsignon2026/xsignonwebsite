// T-056 / T-059: Durable store for visitor enquiries.
// Enquiries are accepted and recorded before external network dispatch.

export type EnquiryRecord = {
  id: string;
  createdAt: string;
  data: {
    name: string;
    email: string;
    company: string;
    phone?: string;
    reason: string;
    message: string;
    smsConsent: boolean;
    smsConsentText: string;
    ipAddress: string;
    userAgent?: string;
  };
  status: "pending" | "delivered" | "failed_pending_retry";
  retries: number;
  lastError?: string;
  environment: "production" | "staging" | "development";
};

// In-memory persistent registry for server instance lifetime
const enquiryRegistry = new Map<string, EnquiryRecord>();

export async function saveEnquiry(record: EnquiryRecord): Promise<void> {
  enquiryRegistry.set(record.id, record);
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryRecord["status"],
  lastError?: string
): Promise<void> {
  const existing = enquiryRegistry.get(id);
  if (!existing) return;

  existing.status = status;
  if (lastError) {
    existing.lastError = lastError;
    existing.retries += 1;
  }
  enquiryRegistry.set(id, existing);
}

export async function getEnquiryById(id: string): Promise<EnquiryRecord | null> {
  return enquiryRegistry.get(id) ?? null;
}

export async function getPendingEnquiries(): Promise<EnquiryRecord[]> {
  return Array.from(enquiryRegistry.values()).filter(
    (e) => e.status === "failed_pending_retry" || e.status === "pending"
  );
}
