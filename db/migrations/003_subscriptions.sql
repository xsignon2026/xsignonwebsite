-- T-063 to T-078: newsletter sign-ups and gated white-paper downloads, in the private database
-- (personal data never goes to Sanity). Replaces the local files the first build used.

-- One row per "please confirm" email. The link holds a random token; only its hash is stored, so a
-- copy of this table cannot be used to confirm anything. A token works once.
create table verifications (
  id uuid primary key default gen_random_uuid(),
  token_hash text not null unique,
  email text not null,
  purpose text not null check (purpose in ('newsletter', 'whitepaper_download')),
  target_slug text,
  source_page text,
  wording_version text not null,
  status text not null default 'pending' check (status in ('pending', 'verified', 'bounced')),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  verified_at timestamptz,
  -- Who confirmed, for the consent record: a keyed hash, never the raw address.
  verified_ip_hash text
);
create index verifications_email_idx on verifications (email);
create index verifications_created_idx on verifications (created_at);

-- People who confirmed the newsletter. unsubscribed_at is set instead of deleting the row, so the
-- choice is remembered and we never mail them again by mistake.
create table subscribers (
  email text primary key,
  consented_at timestamptz not null,
  source text,
  wording_version text not null,
  unsubscribed_at timestamptz
);

-- Addresses that bounced or complained. Nothing is ever sent to these again.
create table suppressions (
  email text primary key,
  reason text not null,
  created_at timestamptz not null default now()
);

-- A record of each white paper download (kept 90 days).
create table download_log (
  id bigint generated always as identity primary key,
  verification_id uuid not null references verifications (id) on delete cascade,
  slug text not null,
  downloaded_at timestamptz not null default now()
);
create index download_log_at_idx on download_log (downloaded_at);
