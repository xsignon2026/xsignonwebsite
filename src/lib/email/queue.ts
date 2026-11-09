// T-075: Resilience retry queue for transactional email provider outages.
import {
  getPendingRetries,
  updateDeliveryStatus,
  type VerificationRecord,
} from "@/lib/verification/store";
import { generateVerificationToken } from "@/lib/verification/tokens";
import { sendVerificationEmail } from "@/lib/mailer";

export type RetryResult = {
  totalProcessed: number;
  succeeded: number;
  failed: number;
  exhaustedAlerts: number;
};

/**
 * Dispatches an alert to the platform owner / monitoring recipient when retries are exhausted.
 */
export async function alertOwnerOfFailedDeliveries(
  record: VerificationRecord,
  errorMsg: string,
): Promise<void> {
  const alertRecipient =
    process.env.STAGING_NOTIFICATION_EMAIL ||
    process.env.CONTACT_NOTIFICATION_EMAIL ||
    "ops@xsignon.com";

  if (process.env.NODE_ENV !== "test") {
    console.error(
      `[ALERT OWNER] Transactional email outage: Failed 3 attempts delivering to ${record.email} for record ${record.id}. Reason: ${errorMsg}. Alerting ${alertRecipient}.`,
    );
  }
}

/**
 * Retries all pending verification emails that experienced provider outages.
 */
export async function retryPendingEmails(baseUrl = "https://xsignon.com"): Promise<RetryResult> {
  const pending = await getPendingRetries();

  let succeeded = 0;
  let failed = 0;
  let exhaustedAlerts = 0;

  for (const record of pending) {
    // Generate fresh delivery token for the retry attempt
    const tokenData = generateVerificationToken();

    const result = await sendVerificationEmail({
      email: record.email,
      rawToken: tokenData.rawToken,
      purpose: record.purpose,
      targetSlug: record.targetSlug,
      baseUrl,
    });

    if (result.success) {
      await updateDeliveryStatus(record.id, "delivered");
      succeeded++;
    } else {
      const newRetries = (record.retries || 0) + 1;
      const isExhausted = newRetries >= 3;

      await updateDeliveryStatus(record.id, isExhausted ? "failed" : "queued_retry", result.error);

      failed++;

      if (isExhausted) {
        exhaustedAlerts++;
        await alertOwnerOfFailedDeliveries(record, result.error || "Max retries reached");
      }
    }
  }

  return {
    totalProcessed: pending.length,
    succeeded,
    failed,
    exhaustedAlerts,
  };
}
