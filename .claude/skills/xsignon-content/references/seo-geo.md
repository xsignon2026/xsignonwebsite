# SEO and GEO

Write for a human first. Then add this layer. Never reverse the order.

## Search intent

| Intent | Reader wants | Page type | Example query |
|---|---|---|---|
| Informational | An answer | Article, FAQ | "what is micro-segmentation" |
| Navigational | A specific page | Home, product | "xsignon postureone" |
| Commercial | To compare | Comparison, product | "passwordless authentication hardware keys" |
| Transactional | To act | Contact, demo | "book zero trust assessment" |

One page, one primary query, one intent. No two pages target the same query.

## Keyword map for this site (starting point, confirm with search data)

| Page | Primary query (draft) | Intent |
|---|---|---|
| Home | identity governance and passwordless security | commercial |
| PostureOne | security posture management platform | commercial |
| Passwordless Authenticators | FIDO2 biometric security key | commercial |
| AUTH Bio | biometric FIDO2 security key | commercial |
| AMS | security key management system | commercial |
| XSignOn Mesh | micro-segmentation zero trust | commercial |
| EvalOne | AI system evaluation framework | commercial |
| Identity governance | identity governance | informational / commercial |
| AI and digital governance | NIST AI RMF compliance | informational |
| Quantum-safe security | post-quantum cryptography migration | informational |
| Insights articles | one question per article | informational |

## Metadata

- **Title tag:** 50 to 60 characters, unique, primary query and promise first. Format: `[Promise or query] | XSignOn`.
- **Meta description:** 150 to 160 characters, says what the page answers and why to click, query used naturally.
- **URL slug:** short, lowercase, hyphenated, query words. `/products/postureone`. If a slug changes, redirect the old one.
- **H1:** matches the title closely. One per page.
- **Open Graph / social:** same title and description; one image with alt text.

## Links, images, video

- Internal links from body copy to 2 to 4 related pages. Any key page reachable in 3 clicks. Anchor text 2 to 6 descriptive words.
- External links only to primary sources, and state the source in text near the claim.
- File names descriptive and hyphenated. Alt text states meaning in one sentence (under 125 characters). Decorative images: empty alt. Charts: state the trend in alt or nearby text.
- Video: transcript and captions.

## Trust signals (E-E-A-T)

Show experience (specific work, real photos), expertise (named author with role on every article), authority (cite primary sources), trust (contact details, privacy, terms, honest claims, dates). Security topics are high-stakes: only publish what a qualified person reviewed and say who and when.

## Freshness

Published date and last-updated date on articles. Update the date only when content changes. Review core pages every 3 months. Redirect, never delete, a page with traffic.

## GEO: be quotable by AI answers

1. **Answer first.** Open each page and section with a direct answer of 40 to 60 words that stands alone.
2. **Self-contained passages.** Repeat the subject; do not rely on "it" across sections.
3. **Question headings.** H2s as the questions people ask, each followed by the answer.
4. **Facts in tables and lists.** One fact per cell or item.
5. **Numbers with source, date and method.** Unsourced numbers are not citable.
6. **Consistent entity names.** Full brand, product and standard names on first use in each major section, spelled exactly as in the brief.
7. **Original evidence.** One original fact, example, worked scenario or approved case study per important page.
8. **Authorship and review.** Name, role, published date, updated date, and "Reviewed by [name, role] on [date]" for security guidance.
9. **Current facts.** Update when features, standards or statistics change.
10. **Machine-readable.** Schema, clean headings, alt text, sitemap, and crawler access checked.

Structures that get cited: definition box, "Key facts" summary box, comparison table with a stated basis, numbered steps, FAQ block, balanced pros and cons.

## Schema (supply facts; developer adds code; visible text must match)

| Page type | Schema |
|---|---|
| Every page | Organization, WebSite, BreadcrumbList |
| Home, About | Organization (name, logo, email, address) |
| Article | Article (headline, author, datePublished, dateModified) |
| FAQ block | FAQPage (questions and answers exactly as visible) |
| Product page | SoftwareApplication or Product, with description; Offer only if there is a public price |
| How-to | HowTo |
| Careers | JobPosting for each active role |

Never put a fact in schema that is not visible on the page. Validate before publish.

## AI crawler access

Do not block GPTBot, ClaudeBot, PerplexityBot or Google-Extended unless the company decides deliberately to opt out. Record the decision. Add `llms.txt` at the site root listing the 10 to 20 key pages with one-line summaries, and keep it in sync.

## Off-site consistency

Same company name, address and contact details on the site, LinkedIn, directories and press. Same author names and roles. Earn mentions with original data and clear guides. Never buy links or fake reviews.

## What not to do

No keyword stuffing, hidden text, schema that does not match the page, or "AI bait" paragraphs. No unreviewed AI-generated facts. One clear well-structured page serves every platform better than platform-specific tricks.

## Per-page SEO and GEO checklist

- One primary query matched to intent; no other page targets it.
- Title 50 to 60, meta 150 to 160, slug short, one H1, headings in order.
- Primary query in H1, first paragraph, one H2 and slug, without stuffing.
- 2 to 4 descriptive internal links; sourced external facts.
- Alt text on meaningful images; transcripts for video.
- Author and dates on articles; review date on core pages.
- Direct answer first; question H2s; tables or lists for key facts.
- FAQ block with schema matching visible text; schema validated.
