import { NextRequest, NextResponse } from "next/server";
import { validateContactForm, type ContactFormData } from "@/lib/contact/validation";
import { checkRateLimit, checkIdempotency, saveIdempotency } from "@/lib/contact/rate-limit";
import { saveEnquiry, updateEnquiryStatus, type EnquiryRecord } from "@/lib/enquiry/store";
import { sendEnquiryEmails, getAppEnvironment } from "@/lib/mailer";

export const TCPA_CONSENT_TEXT =
  "By checking this box, I agree to receive text messages from XSignOn about my inquiry at the phone number provided. Message and data rates may apply. Reply STOP to opt out.";

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    // 1. Rate Limiting (5 requests per 10 mins)
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many inquiries sent from this address. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    const body = (await request.json()) as Partial<ContactFormData>;

    // 2. Idempotency Check (Duplicate double-clicks)
    const cachedResponse = checkIdempotency(body.idempotencyKey);
    if (cachedResponse) {
      return NextResponse.json(cachedResponse, { status: 200 });
    }

    // 3. Validation & Bot Defense
    const validation = validateContactForm(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.errors,
          message: "Please correct the highlighted fields.",
        },
        { status: 400 }
      );
    }

    // 4. Create Durable Enquiry Record
    const enquiryId = `enq_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const userAgent = request.headers.get("user-agent") || undefined;
    const environment = getAppEnvironment();

    const record: EnquiryRecord = {
      id: enquiryId,
      createdAt: new Date().toISOString(),
      data: {
        name: body.name!.trim(),
        email: body.email!.trim(),
        company: body.company!.trim(),
        phone: body.phone?.trim() || undefined,
        reason: body.reason!.trim(),
        message: body.message!.trim(),
        smsConsent: Boolean(body.sms),
        smsConsentText: TCPA_CONSENT_TEXT,
        ipAddress: ip,
        userAgent,
      },
      status: "pending",
      retries: 0,
      environment,
    };

    // Save locally first to guarantee durability
    await saveEnquiry(record);

    // 5. External Delivery (Email / CRM) with Failure Strategy
    try {
      const emailResult = await sendEnquiryEmails(record);
      if (emailResult.notification.success) {
        await updateEnquiryStatus(enquiryId, "delivered");
      } else {
        await updateEnquiryStatus(enquiryId, "failed_pending_retry", emailResult.notification.error);
      }
    } catch (deliveryError) {
      const err = deliveryError instanceof Error ? deliveryError.message : "Delivery failure";
      await updateEnquiryStatus(enquiryId, "failed_pending_retry", err);
      // Notice: Do NOT rethrow or fail the visitor request. The enquiry is durable.
    }

    const responsePayload = {
      success: true,
      enquiryId,
      redirectUrl: `/contact/thank-you?session=${encodeURIComponent(enquiryId)}`,
    };

    if (body.idempotencyKey) {
      saveIdempotency(body.idempotencyKey, responsePayload);
    }

    return NextResponse.json(responsePayload, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred while processing your inquiry.",
      },
      { status: 500 }
    );
  }
}
