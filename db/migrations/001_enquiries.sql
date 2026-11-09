-- T-055: enquiries from the contact form, and the delivery record saved with each one.
-- This database is private. It holds personal data (D1 in docs/build-plan.md), never Sanity.

create table enquiries (
  id bigint generated always as identity primary key,
  -- Chosen by the browser, so a double click or a retry after a lost response is one enquiry.
  submission_key uuid not null unique,
  name text not null,
  email text not null,
  company text,
  phone text,
  reason text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Retention (D11): rows are deleted after 12 months; this index makes that cheap.
create index enquiries_created_at_idx on enquiries (created_at);

-- Saved in the same transaction as the enquiry (the "outbox"): an accepted enquiry always has a
-- delivery record, so it cannot be lost between "saved" and "emailed". T-056 adds the worker.
create table deliveries (
  id bigint generated always as identity primary key,
  enquiry_id bigint not null references enquiries (id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'sent', 'failed')),
  attempts int not null default 0,
  next_attempt_at timestamptz not null default now(),
  -- A short code only. Never the text of an error, which could contain submitted data.
  last_error_code text,
  -- Sent to the email provider as its idempotency key, so a retry does not send a second email.
  delivery_key uuid not null default gen_random_uuid() unique,
  created_at timestamptz not null default now(),
  sent_at timestamptz
);

create index deliveries_pending_idx on deliveries (next_attempt_at) where status = 'pending';

-- Fixed-window counters. The key is a keyed hash of an address or IP, never the raw value.
-- expires_at (milliseconds since 1970) is when the window ends, so old rows can be deleted.
create table rate_limits (
  key text not null,
  bucket bigint not null,
  count int not null default 1,
  expires_at bigint not null,
  primary key (key, bucket)
);

create index rate_limits_expires_idx on rate_limits (expires_at);
