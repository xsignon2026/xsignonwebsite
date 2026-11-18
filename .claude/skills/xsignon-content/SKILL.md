---
name: xsignon-content
description: Write, edit, review and fact-check all copy for the XSignOn website (xsignon.com) so it is accurate, plain, accessible, SEO friendly and GEO friendly (cited by AI answers). Use whenever the user asks to draft, rewrite, improve, proofread, localise, audit or approve website content for XSignOn — pages, sections, product and solution copy, articles and insights, FAQs, hero text, buttons, forms and error messages, meta titles and descriptions, schema, alt text, case studies, careers, legal summaries, newsletters — or asks "is this claim OK", "write the About page", "draft the Mesh page", "make this clearer". Also use when moving content from the old live site into the new one. Do not publish or paste copy that skipped this skill's claims check.
---

# XSignOn content skill

Goal: copy that is correct, easy to read for the widest possible audience, and findable by both search engines and AI answers. Every page must have one job, one reader, one next step. Nothing ships with an unproven claim.

## Before you write anything (do not skip)

1. Read `references/xsignon-brief.md` (who we write for, the promise, voice, approved names and terms, page jobs).
2. Read `references/claims-and-compliance.md` (what may and may not be claimed, and the open claims that still need proof).
3. If the task touches a product, solution, article or page that already exists on the live site, open `docs/content-from-live-site.md` and reuse its facts. Do not invent facts.

If a fact, number, name, date, certification or customer is not in those files or in something the user supplied this session, **do not write it as fact**. Mark it `[CHECK: what is needed]` and list it in the "Needs confirming" part of your reply.

## The workflow (one page or section at a time)

Follow these steps in order. Say which step you are on when the task is large.

1. **Brief (state it in 5 lines).** Page or section, its single job, the reader, the primary search query (for pages), the one next step (CTA). If you cannot state the job in one sentence, ask the user one question, then continue.
2. **Outline.** Headings only, in the section order from `references/page-patterns.md`. Check that the headings alone tell the story.
3. **Draft.** Answer first in every section. Use only facts you have a source for. Write for the reader, using the rules in `references/style-guide.md`.
4. **Self-edit.** Cut 20% of the words. Apply the ten sentence rules. Remove every weak word on the swap list.
5. **Claims check.** Every number, comparison, superlative, standard, certification, partner name, quote or result goes in the claims log (template in `references/templates.md`) with a source and date, or it is cut or marked `[CHECK]`.
6. **Run the checker** on the draft file:
   `python .claude/skills/xsignon-content/scripts/lint_content.py <file.md>`
   Fix every `ERROR`. Fix or justify every `WARN`. Re-run until clean. If you did not write a file, save the draft to `compare/drafts/<slug>.md` first.
7. **Search and AI layer.** Title, meta description, slug, headings, FAQ block, schema facts, alt text, internal links (`references/seo-geo.md`).
8. **Accessibility and reach pass.** Plain language, translation-ready wording, inclusive terms, link text, alt text (`references/style-guide.md`, section "Reach").
9. **Deliver in the reply format below.**

## Reply format (always)

1. The draft, ready to paste, with headings and the exact wording of buttons.
2. **Meta:** title tag (50 to 60 characters), meta description (150 to 160), URL slug, primary and secondary queries.
3. **Claims log:** a table of every checkable claim, its source, and status (verified / needs confirming / removed).
4. **Needs confirming:** a short list of what the company must supply or approve.
5. **Checker result:** "lint: clean" or the remaining warnings with the reason each is kept.

Keep replies brief. Do not explain the method back to the user.

## Non-negotiable rules

- **One page, one job, one reader, one next step.** No page without a job.
- **Truth first.** No claim without proof. No invented numbers, customers, quotes, partners, awards or certifications. Never write that XSignOn "is SOC 2 certified", "ISO 27001 certified", "GDPR compliant" or "99.9% uptime" unless the claims file says it is verified. Say what is true: "built to align with NIST AI-RMF" only if that is accurate and approved.
- **Answer first.** The most important sentence leads each section. The first 40 to 60 words of a page or section should answer its question on their own.
- **Plain words.** Grade 6 to 8 for homepage and help copy, grade 8 to 10 for technical product copy. Short sentences (15 to 20 words, never over 25 without a reason).
- **Active voice, strong verbs, concrete nouns.** Benefits before features.
- **Sentence case** for headings and buttons. **US English.** Serial comma. No em dashes in web copy (use a comma, colon or full stop). Dates as "March 4, 2026".
- **Buttons:** verb plus outcome, 2 to 5 words. Never "Submit", "Click here" or "Read more".
- **Links:** descriptive, 2 to 6 words. Never "click here".
- **Security copy must not frighten or exaggerate.** No fear-selling, no "unhackable", "100% secure", "guaranteed", "military grade", "foolproof". State what the product does and the evidence for it.
- **Customers and partners:** never name a customer, partner or quote a person without written permission recorded in the claims log.
- **AI-written text is a draft.** Verify every fact against a source. Never present AI-generated quotes or reviews as real.
- **Do not copy** text from other sites or from the old site's placeholder text ("Nullam dignissim...") or internal notes ("The deck identifies it as...").

## Quality bar for "top notch and no errors"

A draft is finished only when all of these are true:

- The checker reports no `ERROR` and every `WARN` is fixed or justified.
- Every claim is in the log with a source, or removed, or marked `[CHECK]`.
- Spelling, product names and terms match `references/xsignon-brief.md` exactly (see the approved names list).
- Numbers, dates, prices and names agree everywhere on the page and with other pages.
- Read-aloud test passes: no sentence you stumble on.
- Headings run H1, H2, H3 with no skipped levels. One H1.
- Nothing is promised that the product or the page does not deliver.

When asked to **review** existing copy: list each problem with the exact quote, the rule it breaks, and the corrected line. Do not rewrite the whole page unless asked.

## Reaching as many people as possible

Write so that more people can use, find and trust the page: plain language and short sentences, no idioms or slang (they break translation and AI parsing), descriptive links and alt text, instructions that do not depend on colour or position, key facts in text not in images, content that works on a small phone screen, and wording that does not assume gender, age, ability or location. Details in `references/style-guide.md`.

## Files in this skill

- `references/xsignon-brief.md` — audience, promise, voice, approved names, page jobs and sitemap.
- `references/claims-and-compliance.md` — claim rules, the open-claims register, regulated-topic care, legal checks.
- `references/style-guide.md` — voice, the ten sentence rules, mechanics, weak-word swaps, inclusive language, reach.
- `references/seo-geo.md` — search intent, keyword map, metadata, links, schema, GEO structures, llms.txt.
- `references/page-patterns.md` — section order and a drafting pattern for each page and section type on this site.
- `references/templates.md` — brief, claims log, outline, metadata, schema, FAQ, article, microcopy and checklists.
- `scripts/lint_content.py` — the mechanical checker.
