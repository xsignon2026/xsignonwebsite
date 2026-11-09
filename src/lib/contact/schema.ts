import { z } from "zod";

// T-054, T-055: the contact form rules, shared by the browser (to show errors early) and the server
// (which always checks again: the browser check is only a convenience).

export const REASONS = [
  { value: "strategy-call", label: "Book a strategy call" },
  { value: "product-question", label: "Product question" },
  { value: "partnership", label: "Partnership" },
  { value: "support", label: "Support" },
  { value: "careers", label: "Careers" },
  { value: "other", label: "Other" },
] as const;

export const LIMITS = {
  name: 100,
  email: 254,
  company: 120,
  message: { min: 10, max: 2000 },
} as const;

// Line breaks, control characters and invisible direction-changing characters are never allowed in
// single-line fields. This stops header injection if a value is ever placed in an email header or
// subject, and names that read differently from how they are written (right-to-left override).
const CONTROL = /[\u0000-\u001f\u007f-\u009f\u200b\u200e\u200f\u2028-\u202e\u2066-\u2069\ufeff]/;

const blankToUndefined = (value: string | undefined) => (value ? value : undefined);

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter your name.")
    .max(LIMITS.name, `Use ${LIMITS.name} characters or fewer.`)
    .refine((v) => !CONTROL.test(v), "Remove line breaks and special characters."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Enter your email address.")
    .max(LIMITS.email, "That email address is too long.")
    .refine((v) => !CONTROL.test(v), "Remove line breaks and special characters.")
    .pipe(z.email("Enter a valid email address, such as name@company.com.")),
  company: z
    .string()
    .trim()
    .max(LIMITS.company, `Use ${LIMITS.company} characters or fewer.`)
    .refine((v) => !CONTROL.test(v), "Remove line breaks and special characters.")
    .optional()
    .transform(blankToUndefined),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+()\-.\s]{7,25}$/, "Enter a phone number, or leave this empty.")
    .or(z.literal(""))
    .optional()
    .transform(blankToUndefined),
  reason: z.enum(
    REASONS.map((r) => r.value),
    { error: "Choose what your message is about." },
  ),
  message: z
    .string()
    .trim()
    .min(LIMITS.message.min, `Write at least ${LIMITS.message.min} characters.`)
    .max(LIMITS.message.max, `Use ${LIMITS.message.max} characters or fewer.`)
    // Tabs and new lines are fine in a message; other control characters are not.
    .refine(
      (v) => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(v),
      "Remove special characters.",
    ),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactErrors = Partial<Record<ContactField, string>>;

export function validateContact(
  input: unknown,
): { ok: true; data: ContactData } | { ok: false; errors: ContactErrors } {
  const parsed = contactSchema.safeParse(input);
  if (parsed.success) return { ok: true, data: parsed.data };
  const errors: ContactErrors = {};
  for (const issue of parsed.error.issues) {
    const field = issue.path[0] as ContactField | undefined;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return { ok: false, errors };
}
