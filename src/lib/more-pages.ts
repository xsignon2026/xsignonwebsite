import "server-only";
import { contactPageFallback } from "@/data/contact-page-content";
import { legalPages } from "@/data/legal-pages";
import { proofPageFallback } from "@/data/proof-page-content";
import { mergeContactPage, mergeLegalPage, mergeProofPage } from "@/lib/more-pages-merge";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { CONTACT_PAGE_QUERY, LEGAL_PAGE_QUERY, PROOF_PAGE_QUERY } from "@/sanity/queries/morePages";
import type { ContactPageContent } from "@/types/contact-page-content";
import type { LegalPage } from "@/types/legal-page";
import type { ProofPageContent } from "@/types/proof-page-content";

// Each page: the built-in text, with the editors' version from Sanity laid over it when Sanity is connected.

export async function getLegalPage(slug: LegalPage["slug"]): Promise<LegalPage> {
  const fallback = legalPages.find((p) => p.slug === slug) as LegalPage;
  if (!isSanityConfigured) return fallback;
  try {
    const data = await sanityFetch<Partial<LegalPage> | null>({
      query: LEGAL_PAGE_QUERY,
      params: { slug },
      tags: [`slug:legalPage:${slug}`, "type:legalPage"],
    });
    return mergeLegalPage(fallback, data);
  } catch {
    return fallback;
  }
}

export async function getContactPageContent(): Promise<ContactPageContent> {
  if (!isSanityConfigured) return contactPageFallback;
  try {
    const data = await sanityFetch<Partial<ContactPageContent> | null>({
      query: CONTACT_PAGE_QUERY,
      tags: ["type:contactPage", "doc:contactPage"],
    });
    return mergeContactPage(contactPageFallback, data);
  } catch {
    return contactPageFallback;
  }
}

export async function getProofPageContent(): Promise<ProofPageContent> {
  if (!isSanityConfigured) return proofPageFallback;
  try {
    const data = await sanityFetch<Partial<ProofPageContent> | null>({
      query: PROOF_PAGE_QUERY,
      tags: ["type:proofPage", "doc:proofPage"],
    });
    return mergeProofPage(proofPageFallback, data);
  } catch {
    return proofPageFallback;
  }
}
