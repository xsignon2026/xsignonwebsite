# CMS Backup & Disaster Recovery Runbook (T-154)
**Standard**: Sanity CMS Dataset Protection & Migration  
**Target RPO (Recovery Point Objective)**: < 1 hour  
**Target RTO (Recovery Time Objective)**: < 30 minutes  
**Mode**: Non-destructive, multi-environment replication  

---

## 1. Overview & Dataset Architecture

The XSignOn content repository is structured into two core datasets:
1. `production`: Live dataset powering public visitor traffic and ISR caching.
2. `staging`: Isolated verification dataset used for editorial staging and pre-release review.

Before any major release or content cutover, a snapshot export must be generated and verified.

---

## 2. Production Export Procedure (Live Provider Commands)

When live Sanity project credentials and access tokens are configured, execute the following commands in terminal:

```bash
# 1. Authenticate with Sanity CLI
npx sanity login

# 2. Set active project
export SANITY_PROJECT_ID="<your-project-id>"
export SANITY_DATASET="production"

# 3. Export production dataset to a compressed NDJSON archive
npx sanity dataset export production ./backups/sanity-prod-backup-$(date +%Y%m%d-%H%M).tar.gz --raw

# 4. Verify archive creation and file size
ls -lh ./backups/sanity-prod-backup-*.tar.gz
```

---

## 3. Dataset Restore / Test Replication Procedure

To restore into a staging or disaster-recovery dataset without impacting production:

```bash
# 1. Create temporary recovery dataset if not already created
npx sanity dataset create recovery-test

# 2. Import backup archive into the test dataset
npx sanity dataset import ./backups/sanity-prod-backup-latest.tar.gz recovery-test --replace

# 3. Verify document parity using the automated checker
node scripts/sanity-dataset-backup.mjs --validate ./backups/extracted/data.ndjson
```

---

## 4. Offline Verification & CI Parity

For automated CI environments and developers working offline without provider tokens:
- Use `scripts/sanity-dataset-backup.mjs --offline`.
- Vitest test suite `src/tests/sanity-export-restore.test.ts` executes complete NDJSON serialization, deserialization, reference tree checking, and broken reference detection in memory with zero network calls.

---

## 5. Rollback Emergency Checklist

If a corrupted batch import or unauthorized modification occurs:
1. Freeze CMS publishing via project management settings.
2. Locate the most recent valid backup timestamp in `./backups/`.
3. Import the clean backup archive into production:
   ```bash
   npx sanity dataset import ./backups/sanity-prod-backup-clean.tar.gz production --replace
   ```
4. Trigger on-demand cache revalidation endpoint:
   ```bash
   curl -X POST https://xsignon.com/api/revalidate -H "Authorization: Bearer <secret>"
   ```
5. Confirm sample pages render matching content.
