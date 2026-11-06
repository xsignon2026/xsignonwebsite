export interface CaseStudyFeature {
  title: string;
  description: string;
}

export interface CaseStudyRolloutStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface CaseStudyQuote {
  quoteText?: string;
  quoteAuthor?: string;
  quoteRole?: string;
}

export interface CaseStudy {
  title: string;
  slug: string;
  industry: string;
  location?: string;
  deploymentDate?: string;
  headline: string;
  summary: string;
  logoUrl?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  challenge: string;
  challengeParagraph2?: string;
  approach: string;
  deployedFeatures?: CaseStudyFeature[];
  rolloutSteps?: CaseStudyRolloutStep[];
  outcome: string;
  outcomeStatus?: string;
  quote?: CaseStudyQuote;
  approvalOwner: string;
  approvalStatus: "draft" | "pending_approval" | "approved";
  evidenceLink: string;
  relatedProducts?: Array<{
    name: string;
    slug: string;
    type?: string;
  }>;
  relatedCaseStudies?: Array<{
    title: string;
    slug: string;
    industry?: string;
  }>;
}
