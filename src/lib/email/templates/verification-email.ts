// T-068 / T-076: Verification email templates in Version 2 (Ombre / Violet) palette with RFC 8058 one-click headers.
import type { VerificationPurpose } from "@/lib/verification/store";
import { getOneClickUnsubscribeUrl } from "@/lib/newsletter/tokens";

export type VerificationEmailOptions = {
  email: string;
  rawToken: string;
  purpose: VerificationPurpose;
  targetSlug?: string;
  baseUrl: string;
};

export type RenderedEmail = {
  subject: string;
  html: string;
  text: string;
  verificationUrl: string;
  unsubscribeUrl: string;
  headers: Record<string, string>;
};

export function renderVerificationEmail(options: {
  email: string;
  rawToken: string;
  purpose: VerificationPurpose;
  targetSlug?: string;
  baseUrl?: string;
}): RenderedEmail {
  const host = options.baseUrl
    ? options.baseUrl.replace(/\/+$/, "")
    : process.env.NEXT_PUBLIC_SITE_URL || "https://xsignon.com";

  // Guarantee strictly HTTPS protocol
  const secureBase = host.startsWith("http://")
    ? host.replace("http://", "https://")
    : host.startsWith("https://")
      ? host
      : `https://${host}`;

  const query = new URLSearchParams({
    token: options.rawToken,
    email: options.email,
  });

  const verificationUrl = `${secureBase}/subscribe/verify?${query.toString()}`;
  const unsubscribeUrl = getOneClickUnsubscribeUrl(options.email, secureBase);

  const isDownload = options.purpose === "whitepaper_download";
  const subject = isDownload
    ? "Verify your email to download your XSignOn white paper"
    : "Confirm your subscription to XSignOn updates";

  const actionHeadline = isDownload
    ? "Your requested technical white paper is ready."
    : "Confirm your subscription to XSignOn updates.";

  const actionParagraph = isDownload
    ? "Please verify your email address to unlock your secure, short-lived download link."
    : "You recently requested to receive our latest insights on identity architecture, AI governance, and zero-trust verification.";

  const buttonLabel = isDownload ? "Verify & Download" : "Confirm Subscription";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0; padding:24px 0; background-color:#f4f3fa; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#060129;">
  <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:580px; background-color:#ffffff; border:1px solid #e0dcee; border-radius:14px; overflow:hidden; box-shadow:0 4px 16px rgba(6,1,41,0.06);">
          <!-- Dark Violet Header Banner -->
          <tr>
            <td style="background-color:#060129; padding:28px 32px; border-bottom:1px solid #25205c;">
              <span style="font-size:20px; font-weight:700; color:#ffffff; letter-spacing:-0.02em;">XSignOn</span>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td style="padding:36px 32px 28px;">
              <h1 style="font-size:22px; font-weight:700; line-height:1.3; margin:0 0 16px; color:#060129;">
                ${actionHeadline}
              </h1>
              <p style="font-size:16px; line-height:1.6; color:#54507a; margin:0 0 24px;">
                ${actionParagraph}
              </p>
              <div style="margin:28px 0;">
                <a href="${verificationUrl}" target="_blank" style="display:inline-block; background-color:#060129; color:#ffffff; font-weight:600; font-size:15px; padding:14px 28px; border-radius:999px; text-decoration:none; border:1px solid #25205c;">
                  ${buttonLabel} &rarr;
                </a>
              </div>
              <p style="font-size:13.5px; line-height:1.55; color:#54507a; margin:24px 0 0;">
                This link will expire in 24 hours. If the button does not work, copy and paste this address into your browser:<br>
                <a href="${verificationUrl}" style="color:#d4001f; text-decoration:underline; word-break:break-all;">
                  ${verificationUrl}
                </a>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px; background-color:#faf9fd; border-top:1px solid #e0dcee; font-size:12.5px; line-height:1.5; color:#7a7799;">
              <p style="margin:0 0 8px;">
                If you did not make this request, you can safely ignore this email. You will not be subscribed or contacted.
              </p>
              <p style="margin:0 0 8px;">
                XSignOn Corporation &bull; 3900 S Stonebridge Dr., Suite 1101, McKinney, TX 75070
              </p>
              <p style="margin:0;">
                <a href="${unsubscribeUrl}" style="color:#7a7799; text-decoration:underline;">Unsubscribe</a> from future communications with one click.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `${actionHeadline}

${actionParagraph}

To complete this request, please open the following secure link in your browser:
${verificationUrl}

This link is valid for 24 hours.

If you did not make this request, no action is needed and you will not be subscribed.

To unsubscribe from future emails:
${unsubscribeUrl}

---
XSignOn Corporation
3900 S Stonebridge Dr., Suite 1101, McKinney, TX 75070
`;

  return {
    subject,
    html,
    text,
    verificationUrl,
    unsubscribeUrl,
    headers: {
      "List-Unsubscribe": `<${unsubscribeUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  };
}
