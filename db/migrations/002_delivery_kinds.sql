-- T-056, T-057: each enquiry has two deliveries, saved together with it.
--   notify  the email to the team's shared inbox (this is the one that must never be lost)
--   confirm the short thank-you email to the visitor (best effort)
alter table deliveries
  add column kind text not null default 'notify' check (kind in ('notify', 'confirm'));

-- One delivery of each kind per enquiry, so a retry can never create a second one.
create unique index deliveries_one_per_kind on deliveries (enquiry_id, kind);
