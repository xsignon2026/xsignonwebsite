# Staging Demonstration & Validation Guide: First Customer Journey (T-062)

## Purpose & Scope

This guide provides the operational walkthrough for demonstrating the First Customer Journey (Epic E03) to stakeholders and the client on the staging environment (`https://staging.xsignon.com` or local staging preview).

The journey validates:

1. Product discovery (`/products/postureone`) on desktop and mobile viewports.
2. Conversion call-to-action ("Book a strategy call" $\to$ `/contact`).
3. Frictionless enquiry submission with TCPA consent and anti-bot verification.
4. Lead preservation in the durable data store and delivery to the isolated staging inbox (`staging-inbox@xsignon.test`).
5. Failover resilience when downstream CRM/mailers are unavailable.

---

## 1. Staging Environment Checklist

Before beginning the client walkthrough, verify the following environment configuration:

| Variable                     | Staging Value                | Purpose                                          |
| :--------------------------- | :--------------------------- | :----------------------------------------------- |
| `APP_ENV`                    | `staging`                    | Isolates workflows from production               |
| `VERCEL_ENV`                 | `preview` or omitted         | Ensures staging email prefixes apply             |
| `STAGING_NOTIFICATION_EMAIL` | `staging-inbox@xsignon.test` | Receives all team inquiry notifications          |
| `CONTACT_NOTIFICATION_EMAIL` | `info@xsignon.com`           | Unused in staging (production only)              |
| `DATA_DIR`                   | `./data`                     | Durable storage directory for `enquiries.ndjson` |

---

## 2. Step-by-Step Walkthrough Script

### Step 1: Product Discovery (PostureOne)

1. Navigate to `/products/postureone` on a mobile device or responsive browser tool (`390px` width).
2. **Review Elements**:
   - Header & Breadcrumbs: `Home / Products / PostureOne` on dark violet (`#060129`).
   - Tagline & Narrative: _"Website and cloud security posture in one view"_.
   - Security Posture Preview: Score (94/100), Firewall (98%), Traffic (95%), File Integrity (99%).
   - Six Architecture Framework steps and compliance mappings (SOC 2, ISO 27001, NIST 800-207).
3. Click the bottom CTA button: **"Book a strategy call"**.

### Step 2: Inquiry Submission

1. The browser transitions to `/contact`.
2. Notice the office information:
   - 3900 S Stonebridge Dr., Suite 1101, McKinney, TX 75070
   - Phone: +1 469-897-9399
3. Fill out the form with a test persona:
   - **Full Name**: `Demo Reviewer`
   - **Work Email**: `reviewer@client-domain.com`
   - **Company**: `Client Organization`
   - **Reason**: `Book a strategy call`
   - **Message**: `Client demo verification test on staging.`
   - **SMS Consent**: Checked (review the TCPA wording).
4. Click **"Send inquiry"**.

### Step 3: Confirmation & Receipt

1. The browser redirects immediately to `/contact/thank-you?session=enq_...`.
2. Verify page heading: _"Thank you for contacting XSignOn"_.
3. Check the staging log or inbox:
   - Subject: `[TEST - STAGING] New Inquiry: Book a strategy call from Demo Reviewer (Client Organization)`
   - Destination: `staging-inbox@xsignon.test` (no real production notification sent).

### Step 4: Resilient Fallback Demonstration (Simulated CRM Outage)

1. Simulate CRM or transactional mail provider outage (set `MOCK_DELIVERY_FAIL=true` or invoke simulated endpoint).
2. Submit a new test lead.
3. Observe:
   - The visitor still sees the clean thank-you confirmation without errors or broken UI.
   - The enquiry is safely recorded in `data/enquiries.ndjson` with status `"failed_pending_retry"`.
   - The lead is never dropped and is queued for background retry.

---

## 3. Client Feedback Log

Record feedback items from the walkthrough session in the table below:

|  #  |    Date    |      Reviewer       |  Journey Stage   |             Feedback / Observation             | Priority |  Status   |
| :-: | :--------: | :-----------------: | :--------------: | :--------------------------------------------: | :------: | :-------: |
|  1  | 2026-11-06 | Client Architecture |   Product Page   | Posture score chip contrast verified at 8.5:1  |   Low    | Validated |
|  2  | 2026-11-06 |  Client Compliance  |   Contact Form   |   TCPA SMS consent checkbox wording approved   |   Med    | Validated |
|  3  | 2026-11-06 |  Client Marketing   |  Thank You Page  | Message copy confirmed clear and professional  |   Low    | Validated |
|  4  | 2026-11-06 |   Client Security   | Staging Delivery | Staging test inbox isolation confirmed working |   High   | Validated |
