import { describe, it, expect } from "vitest";
import {
  serializeToNdjson,
  parseNdjson,
  validateDatasetIntegrity,
  simulateBackupAndRestore,
} from "../../scripts/sanity-dataset-backup.mjs";

interface TestSanityDoc {
  _id: string;
  _type: string;
  [key: string]: unknown;
}

describe("T-154: Sanity CMS Dataset Export & Restore Engine (Offline Mode)", () => {
  const sampleDocs: TestSanityDoc[] = [
    {
      _id: "author-security-team",
      _type: "author",
      name: "XSignOn Security Research Team",
      bio: "Zero Trust and Identity Security",
    },
    {
      _id: "article-identity-first",
      _type: "article",
      title: "Elevate Enterprise Security with Identity-First Controls",
      slug: "identity-first-controls",
      author: {
        _type: "reference",
        _ref: "author-security-team",
      },
    },
    {
      _id: "product-postureone",
      _type: "product",
      name: "PostureOne",
      slug: "postureone",
      tagline: "Continuous Posture Evaluation",
    },
    {
      _id: "solution-governance",
      _type: "solution",
      title: "Identity Governance",
      slug: "identity-governance",
    },
  ];

  it("serializes and parses documents to NDJSON format with 100% fidelity", () => {
    const ndjson = serializeToNdjson(sampleDocs);
    expect(typeof ndjson).toBe("string");
    expect(ndjson.split("\n")).toHaveLength(4);

    const parsed = parseNdjson(ndjson);
    expect(parsed).toEqual(sampleDocs);
  });

  it("validates reference integrity and identifies broken references", () => {
    const validResult = validateDatasetIntegrity(sampleDocs);
    expect(validResult.valid).toBe(true);
    expect(validResult.docCount).toBe(4);
    expect(validResult.brokenRefs).toHaveLength(0);
    expect(validResult.types).toEqual({
      author: 1,
      article: 1,
      product: 1,
      solution: 1,
    });

    // Test with broken reference
    const corruptDocs: TestSanityDoc[] = [
      {
        _id: "article-broken",
        _type: "article",
        title: "Broken Ref Article",
        author: {
          _type: "reference",
          _ref: "non-existent-author-id",
        },
      },
    ];

    const corruptResult = validateDatasetIntegrity(corruptDocs);
    expect(corruptResult.valid).toBe(false);
    expect(corruptResult.brokenRefs).toHaveLength(1);
    expect(corruptResult.brokenRefs[0].ref).toBe("non-existent-author-id");
  });

  it("simulates full backup and restore cycle with zero data loss", () => {
    const result = simulateBackupAndRestore(sampleDocs);
    expect(result.parity).toBe(true);
    expect(result.originalCount).toBe(4);
    expect(result.restoredCount).toBe(4);
    expect(result.validation.valid).toBe(true);
  });

  it("throws clear error on malformed NDJSON input", () => {
    const badNdjson = '{"_id":"valid"}\n{invalid-json}';
    expect(() => parseNdjson(badNdjson)).toThrow(/Invalid JSON on line 2/);
  });
});
