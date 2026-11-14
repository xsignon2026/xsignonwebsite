import type { DeliveryListItem } from "./deliver";

// T-056: the owner's page, as plain HTML so it works without any script. Every value is escaped.
// It shows delivery numbers, states and error codes only: no names, emails or messages.

const escapeHtml = (value: unknown) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const when = (value: Date | string | null) =>
  value ? new Date(value).toISOString().replace("T", " ").slice(0, 16) + " UTC" : "";

const KIND_LABEL: Record<string, string> = { notify: "Team email", confirm: "Visitor thank-you" };

export function renderAdminPage(items: DeliveryListItem[], note = ""): string {
  const failed = items.filter((i) => i.status === "failed" && i.kind === "notify").length;
  const rows = items
    .map((item) => {
      const replay =
        item.status === "failed"
          ? `<form method="post" action="/admin/enquiries/replay">
               <input type="hidden" name="id" value="${escapeHtml(item.id)}">
               <button type="submit">Send again</button>
             </form>`
          : "";
      return `<tr>
        <td>${escapeHtml(item.enquiry_id)}</td>
        <td>${escapeHtml(KIND_LABEL[item.kind] ?? item.kind)}</td>
        <td class="s-${escapeHtml(item.status)}">${escapeHtml(item.status)}</td>
        <td>${escapeHtml(item.attempts)}</td>
        <td>${escapeHtml(when(item.created_at))}</td>
        <td>${escapeHtml(when(item.sent_at))}</td>
        <td>${escapeHtml(item.last_error_code ?? "")}</td>
        <td>${replay}</td>
      </tr>`;
    })
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Enquiry deliveries</title>
<style>
  body { font: 16px/1.5 system-ui, sans-serif; margin: 2rem auto; max-width: 70rem; padding: 0 1rem; color: #1a1240; }
  table { border-collapse: collapse; width: 100%; }
  th, td { text-align: left; padding: .5rem .75rem; border-bottom: 1px solid #e0dcee; }
  .s-failed { color: #a60019; font-weight: 700; }
  .s-pending { color: #7a4b00; font-weight: 700; }
  .s-sent { color: #00695c; }
  button { min-height: 2.75rem; padding: 0 1rem; font: inherit; cursor: pointer; }
  .note { padding: .75rem 1rem; background: #f6f4fb; border-left: 4px solid #1a1240; }
</style>
</head>
<body>
<main>
<h1>Enquiry deliveries</h1>
${note ? `<p class="note" role="status">${escapeHtml(note)}</p>` : ""}
<p>${failed === 0 ? "No team email has failed." : `<strong>${failed} team email${failed === 1 ? " has" : "s have"} failed.</strong> Check the email provider, then press Send again.`}</p>
<p>This page shows no personal details. Read the enquiries in the shared inbox. An enquiry ID in an email matches the first column.</p>
<table aria-label="Deliveries, newest first">
<thead><tr><th>Enquiry</th><th>Email</th><th>State</th><th>Tries</th><th>Saved</th><th>Sent</th><th>Error code</th><th></th></tr></thead>
<tbody>${rows || '<tr><td colspan="8">Nothing yet.</td></tr>'}</tbody>
</table>
</main>
</body>
</html>`;
}
