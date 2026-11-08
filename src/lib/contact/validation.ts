// T-054 / T-055 / T-059: Contact form validation, security sanitization, and TCPA consent rules.

export const CONTACT_REASONS = [
  "Book a strategy call",
  "Product question",
  "Partnership",
  "Support",
  "Careers",
  "Other",
] as const;

export type ContactReason = (typeof CONTACT_REASONS)[number];

export type ContactFormData = {
  name: string;
  email: string;
  company: string;
  phone?: string;
  reason: string;
  message: string;
  sms?: boolean;
  website_url_hp?: string;
  timestamp?: number;
  idempotencyKey?: string;
};

export type ValidationResult = {
  valid: boolean;
  errors: Record<string, string>;
};

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,20}$/;

export function validateContactForm(
  data: Partial<ContactFormData>,
  now: number = Date.now()
): ValidationResult {
  const errors: Record<string, string> = {};

  // 1. Bot checks
  if (data.website_url_hp && data.website_url_hp.trim().length > 0) {
    errors.bot = "Automated submission detected.";
  }

  if (data.timestamp && now - Number(data.timestamp) < 1500) {
    errors.bot = "Form submitted too quickly. Please review your inquiry.";
  }

  // 2. Name
  const name = typeof data.name === "string" ? data.name.trim() : "";
  if (!name) {
    errors.name = "Please enter your full name.";
  } else if (name.length > 100) {
    errors.name = "Name must be 100 characters or fewer.";
  }

  // 3. Email
  const email = typeof data.email === "string" ? data.email.trim() : "";
  if (!email) {
    errors.email = "Please enter your work email.";
  } else if (!EMAIL_REGEX.test(email) || email.length > 150) {
    errors.email = "Please enter a valid email address.";
  }

  // 4. Company
  const company = typeof data.company === "string" ? data.company.trim() : "";
  if (!company) {
    errors.company = "Please enter your company or organization.";
  } else if (company.length > 100) {
    errors.company = "Company must be 100 characters or fewer.";
  }

  // 5. Phone (optional)
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  if (phone && !PHONE_REGEX.test(phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  // 6. Reason
  const reason = typeof data.reason === "string" ? data.reason.trim() : "";
  if (!reason) {
    errors.reason = "Please select a reason for contacting us.";
  } else if (!CONTACT_REASONS.includes(reason as ContactReason)) {
    errors.reason = "Please choose a valid reason from the list.";
  }

  // 7. Message
  const message = typeof data.message === "string" ? data.message.trim() : "";
  if (!message) {
    errors.message = "Please include a message describing your inquiry.";
  } else if (message.length < 5) {
    errors.message = "Message is too short (minimum 5 characters).";
  } else if (message.length > 3000) {
    errors.message = "Message must be 3,000 characters or fewer.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
