# Templates

## Page brief

```
Page: [name and URL slug]
Job (one sentence): 
Reader: 
Intent: [Informational / Navigational / Commercial / Transactional]
Primary query: 
One promise: 
3 supports: 1.  2.  3.
Proof (source and date): 
One CTA (verb + outcome, and what happens next): 
Constraints (legal, brand, length): 
Success measure (one metric): 
Owner:                Review date: 
```

## Claims log

| # | Exact claim as written | Type (number / comparison / standard / customer / partner / quote / result) | Source | Date of evidence | Verified by | Status |
|---|---|---|---|---|---|---|
| 1 | | | | | | verified / needs confirming / removed |

## Outline skeleton

```
H1: [Promise or answer]
Supporting line
CTA
Proof strip
H2: [Problem, in the reader's words]
H2: [How it works]
  H3: Step 1 [verb phrase]
  H3: Step 2
  H3: Step 3
H2: [Evidence]
H2: [Details or comparison table]
H2: [Questions]
  H3: [Question 1]
H2: [Final CTA heading]
```

## Metadata

```
URL slug: /[short-hyphenated-slug]
Title tag (50-60): [Primary query or promise] | XSignOn
Meta description (150-160): [What the page answers]. [Why to click].
H1: 
Primary query: 
Secondary queries: 
Hero image alt: 
```

## Schema skeletons

Organization (supply the facts; keep visible text identical):

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "XSignOn",
  "url": "https://xsignon.com",
  "logo": "[logo URL]",
  "description": "[one sentence, matching the About page]",
  "email": "info@xsignon.com",
  "address": { "@type": "PostalAddress", "addressLocality": "McKinney", "addressRegion": "TX", "addressCountry": "US" }
}
```

FAQPage (text must match the page exactly):

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "[Question]", "acceptedAnswer": { "@type": "Answer", "text": "[Answer]" } }
  ]
}
```

Article:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Headline]",
  "author": { "@type": "Person", "name": "[Author]", "url": "[Author page]" },
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "description": "[One sentence]"
}
```

Validate each block with the Rich Results Test or the Schema.org validator.

## llms.txt starter

```
# XSignOn
> XSignOn develops security products for identity governance, passwordless authentication, AI evaluation and emerging digital risk.

## Key pages
- Home: https://xsignon.com/ - What XSignOn does and who it serves
- PostureOne: [URL] - One view of identity, data and AI risk
- Passwordless Authenticators: [URL] - FIDO2 biometric security keys
```

## FAQ item

```
Q: [The question, in the reader's words]
A: [Direct answer in the first sentence.] [One or two sentences of detail.] [Link to the detail page.]
```
Keep each answer to 30 to 80 words.

## Article skeleton

```
Title: [Question or promise]
Byline: [Author, role] | Published [date] | Updated [date] | Reviewed by [name, role] on [date]
Short answer (40-60 words)
Key facts: 3 to 5 bullets
H2 [Question 1] -> direct answer -> detail -> source
H2 [Question 2] ...
H2 What to do next (numbered steps)
FAQ (2 to 4)
Sources (list)
CTA: [one action]
```

## Final checklist (copy per page)

Content and structure
- [ ] One job, one reader, one CTA stated in the brief
- [ ] H1 is the promise or answer; headings tell the story alone
- [ ] Answer first in each section
- [ ] Paragraphs 2 to 4 sentences; lists parallel and introduced
- [ ] Sentences mostly 15 to 20 words; active voice
- [ ] No banned or vague words without proof
- [ ] Every claim in the log with a source, or removed
- [ ] CTA states verb, outcome and what happens next
- [ ] Links descriptive and working
- [ ] Product names match the brief exactly

SEO and GEO
- [ ] Title, meta, slug, headings per `seo-geo.md`
- [ ] Question H2s, tables or lists for key facts
- [ ] FAQ block with schema matching visible text; schema validated
- [ ] Alt text; author and dates on articles; review date on core pages

Accessibility and legal
- [ ] Headings in order; alt text; instructions not by colour alone
- [ ] Error and form copy states the fix; required marked in words
- [ ] Testimonials permitted and disclosed
- [ ] Standards and certifications worded per the ladder
- [ ] Pricing shows total, period, renewal, cancellation
- [ ] Privacy and consent copy counsel-reviewed
- [ ] No dark patterns; inclusive language checked

Run: `python .claude/skills/xsignon-content/scripts/lint_content.py <file.md>` and fix every ERROR.

## Site launch checklist

- [ ] Sitemap complete; every page has a job, owner and review date
- [ ] Navigation labels tested with 3 new readers
- [ ] 404, search and footer content complete
- [ ] Unique title tags and meta descriptions on every page
- [ ] Sitemap submitted; robots.txt checked; AI crawler decision recorded
- [ ] Schema validated; llms.txt added if used
- [ ] Internal links checked; redirects for changed URLs
- [ ] Analytics set up; one success measure per key page
- [ ] Legal pages live, dated, counsel-reviewed
- [ ] Accessibility spot check: keyboard, screen-reader headings, contrast on key text

## Monthly maintenance

- [ ] Top pages: stale numbers, prices, dates
- [ ] Broken links; redirects for moved pages
- [ ] Search queries and support questions into FAQ and guides
- [ ] AI citations and impressions for key pages
- [ ] Change log updated; next review dates set
