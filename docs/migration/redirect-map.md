# Canonical Redirect Map Specification

**Document ID**: MIGRATION-RED-002  
**Standard**: RFC 9110 (HTTP Semantics), Google Search Central Migration Guidelines  
**Status**: Active  
**Effective Date**: January 2026  

---

## 1. Redirect Policies & Architectural Invariants

$$\forall u \in \text{LegacyUrls}, \quad \text{Redirect}(u) = v \implies v \ne u \land \text{Redirect}(v) = \text{null} \land \text{Status} = 308$$

1. **No Homepage Dumping**: Every legacy route maps to its closest semantic counterpart.
2. **Acyclicity & Single-Hop**: Chains ($A \to B \to C$) and circular loops are strictly forbidden. All mappings resolve in exactly 1 hop.
3. **HTTP 308 Permanent Status**: Uses HTTP 308 (Permanent Redirect) preserving HTTP verbs and SEO link equity across all user-agents.
4. **Query Parameter Preservation**: Next.js automatically passes search queries and UTM parameters through to the destination URL.

---

## 2. Canonical Mapping Table

| Source Legacy Path | Destination Canonical Route | Status | Rationale |
| :--- | :--- | :--- | :--- |
| `/product` | `/products` | 308 | Singular to plural hub convention |
| `/products/fido2` | `/products/keys` | 308 | Legacy FIDO2 token route to unified Keys product |
| `/products/posture` | `/products/postureone` | 308 | Abbreviation to official brand name PostureOne |
| `/products/eval` | `/products/evalone` | 308 | Abbreviation to official brand name EvalOne |
| `/products/compare` | `/compare` | 308 | Top-level comparison page consolidation |
| `/products/proof` | `/proof` | 308 | Evidence & case study consolidation |
| `/products/roi` | `/roi-calculator` | 308 | Legacy ROI path to canonical interactive calculator |
| `/roi` | `/roi-calculator` | 308 | Short alias to canonical interactive calculator |
| `/solution` | `/solutions` | 308 | Singular to plural hub convention |
| `/solutions/identity` | `/solutions/identity-governance` | 308 | Semantic completion to full solution identifier |
| `/solutions/ai` | `/solutions/ai-and-digital-governance` | 308 | Semantic completion to full solution identifier |
| `/solutions/quantum` | `/solutions/quantum-safe-security` | 308 | Semantic completion to full solution identifier |
| `/solutions/process` | `/solutions/business-process` | 308 | Semantic completion to full solution identifier |
| `/solutions/enterprise`| `/solutions/enterprise-technology` | 308 | Semantic completion to full solution identifier |
| `/about-us` | `/about` | 308 | Legacy URL to canonical about hub |
| `/company` | `/about` | 308 | Company alias to canonical about hub |
| `/company/who-we-are` | `/about#who-we-are` | 308 | In-page section anchor redirect |
| `/company/what-we-do` | `/about#what-we-do` | 308 | In-page section anchor redirect |
| `/company/how-we-work`| `/about#how-we-work`| 308 | In-page section anchor redirect |
| `/team` | `/about#who-we-are` | 308 | Team route to about section |
| `/leadership` | `/about#who-we-are` | 308 | Leadership route to about section |
| `/jobs` | `/careers` | 308 | Legacy jobs board to canonical careers page |
| `/careers/apply` | `/contact` | 308 | General application inquiries directed to contact |
| `/contact-us` | `/contact` | 308 | Legacy contact path to canonical contact |
| `/demo` | `/contact` | 308 | Demo booking consolidated into strategy contact |
| `/talk-to-us` | `/contact` | 308 | Marketing alias consolidated into contact |
| `/case-studies` | `/proof` | 308 | Legacy case studies slug to canonical proof hub |
| `/case-studies/:slug*` | `/proof/:slug*` | 308 | Wildcard migration of legacy case studies |
| `/articles` | `/thinking` | 308 | Legacy articles directory to thinking hub |
| `/articles/:slug*` | `/thinking/:slug*` | 308 | Wildcard migration of legacy articles |
| `/whitepaper` | `/white-papers/zero-trust-posture-guide` | 308 | Legacy single whitepaper link to canonical paper |
| `/whitepapers` | `/resources` | 308 | General whitepapers archive to resources hub |
