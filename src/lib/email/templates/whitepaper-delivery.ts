// T-071 / T-076: Transactional white paper delivery email template with RFC 8058 one-click headers.
import { getOneClickUnsubscribeUrl } from "@/lib/newsletter/tokens";

export type WhitePaperDeliveryOptions = {
  email: string;
  whitePaperSlug: string;
  whitePaperTitle: string;
  downloadUrl: string;
  baseUrl?: string;
};

export type RenderedDeliveryEmail = {
  subject: string;
  html: string;
  text: string;
  unsubscribeUrl: string;
  headers: Record<string, string>;
};

export function renderWhitePaperDeliveryEmail(
  options: WhitePaperDeliveryOptions
): RenderedDeliveryEmail {
  const host = options.baseUrl
    ? options.baseUrl.replace(/\/+$/, "")
    : process.env.NEXT_PUBLIC_SITE_URL || "https://xsignon.com";

  const secureBase = host.startsWith("http://")
    ? host.replace("http://", "https://")
    : host.startsWith("https://")
      ? host
      : `https://${host}`;

  const unsubscribeUrl = getOneClickUnsubscribeUrl(options.email, secureBase);
  const subject = `Your download: ${options.whitePaperTitle}`;

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
                Your white paper is ready for download.
              </h1>
              <p style="font-size:16px; line-height:1.6; color:#54507a; margin:0 0 20px;">
                Thank you for verifying your work email. You can access <strong>${options.whitePaperTitle}</strong> using the secure link below:
              </p>
              <div style="margin:28px 0;">
                <a href="${options.downloadUrl}" target="_blank" style="display:inline-block; background-color:#060129; color:#ffffff; font-weight:600; font-size:15px; padding:14px 28px; border-radius:999px; text-decoration:none; border:1px solid #25205c;">
                  Download PDF &rarr;
                </a>
              </div>
              <p style="font-size:13.5px; line-height:1.55; color:#54507a; margin:24px 0 0;">
                For your security, this signed download link is valid for 15 minutes. If it expires, you can generate a new one anytime at xsignon.com.<br>
                Direct link: <a href="${options.downloadUrl}" style="color:#d4001f; text-decoration:underline; word-break:break-all;">${options.downloadUrl}</a>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px; background-color:#faf9fd; border-top:1px solid #e0dcee; font-size:12.5px; line-height:1.5; color:#7a7799;">
              <p style="margin:0 0 8px;">
                You are receiving this because you requested a technical resource from XSignOn.
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

  const text = `Your download: ${options.whitePaperTitle}

Thank you for verifying your work email. You can access your white paper using the secure link below:
${options.downloadUrl}

This signed download link is valid for 15 minutes. If it expires, you can generate a new one anytime at xsignon.com.

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
    unsubscribeUrl,
    headers: {
      "List-Unsubscribe": `<${unsubscribeUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  };
}
