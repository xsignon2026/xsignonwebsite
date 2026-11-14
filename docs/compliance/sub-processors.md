# Authorized Third-Party Sub-Processors Register

**Document Reference**: `PRIVACY-SUBPROCESSORS-2026-V1`  
**Last Updated**: November 2026  
**Governing Standard**: GDPR (Art. 28), CCPA/CPRA, CAN-SPAM, CASL  
**Controller**: XSignOn Corporation, McKinney, TX, USA

---

## 1. Overview & Policy Statement

XSignOn engages external third-party infrastructure and service providers ("Sub-Processors") to support the delivery, security, resilience, and operational monitoring of the XSignOn website, technical white paper distribution, and visitor inquiry communications.

Prior to onboarding any Sub-Processor, XSignOn executes a Data Processing Agreement (DPA) incorporating standard contractual clauses (SCCs) where international transfers occur, validates independent security certifications (SOC 2 Type II, ISO/IEC 27001), and enforces strict data minimization and retention boundaries.

---

## 2. Authorized Sub-Processors Table

| Sub-Processor Entity                                                  | Category                    | Nature & Purpose of Processing                                                                                                    | Processing Location                       | Data Retention Schedule & Disposal                                                                                                                     | Transfer Safeguards                                                              |
| :-------------------------------------------------------------------- | :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| **Transactional Email Provider**<br>(e.g., Postmark / SendGrid)       | Communications & Delivery   | Dispatch of double opt-in verification links, white paper delivery emails, contact confirmations, and bounce processing.          | United States / European Union            | **30 days** maximum for message delivery logs; message bodies purged within 7 days.                                                                    | EU Standard Contractual Clauses (SCCs), DPA, TLS 1.3 in transit                  |
| **Private Document Storage**<br>(e.g., AWS S3 / Google Cloud Storage) | Secure Object Storage       | Hosting restricted PDF binaries for technical white papers. Serves assets strictly through short-lived (15-min) HMAC signed URLs. | United States (Encrypted at rest AES-256) | Kept for active document lifecycle. Access audit logs retained for **90 days** then pruned.                                                            | Dedicated private bucket with zero public egress access; KMS envelope encryption |
| **Spam & Threat Mitigation**<br>(In-Memory Token Bucket / Edge WAF)   | Security & Abuse Prevention | Client IP hashing and request rate evaluation to mitigate DDoS, token enumeration, and automated credential scraping.             | Local Edge Instance / Ephemeral Memory    | IP hashes retained in volatile memory for **15 to 60 minutes**, then automatically flushed. Raw IP addresses are never committed to permanent storage. | Zero-knowledge hashing (SHA-256 truncated); no PII persistency                   |
| **Error Telemetry & Monitoring**<br>(e.g., Sentry / Vercel Analytics) | Operational Telemetry       | Aggregating software crash telemetry, HTTP status anomalies, and API performance.                                                 | United States                             | **30 days** retention. Automated PII scrubbers remove IP addresses, work emails, and form payloads prior to storage.                                   | SOC 2 Type II, ISO 27001, Data Scrubber rules                                    |
| **Edge Hosting & Content Delivery**<br>(Vercel Inc.)                  | Hosting & Infrastructure    | Serverless route execution, static asset caching, and global edge routing.                                                        | Global Edge Network (US, EU)              | Ephemeral request metadata retained up to **30 days** in compliance with infrastructure security logging.                                              | SOC 2 Type II, ISO 27001, EU-US Data Privacy Framework                           |
| **Editorial Content Management**<br>(Sanity.io)                       | Headless CMS                | Editorial publishing of white paper metadata, product capabilities, and articles.                                                 | United States / European Union            | Zero visitor PII is transmitted to or stored within the CMS repository.                                                                                | Decoupled read-only cache; no visitor write privileges                           |

---

## 3. Data Subject Rights & Sub-Processor Inquiries

Data subjects seeking to exercise rights of access, rectification, erasure, or restriction of processing across any Sub-Processor may submit requests to:

- **Privacy Office**: `privacy@xsignon.com`
- **Postal Address**: XSignOn Corporation, 3900 S Stonebridge Dr., Suite 1101, McKinney, TX 75070, USA
- **Phone**: +1 469-897-9399
