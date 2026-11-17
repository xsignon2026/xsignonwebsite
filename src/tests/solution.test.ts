import { describe, expect, it } from "vitest";
import { getAllSolutions, getSolutionBySlug } from "@/lib/solution";

describe("Epic E08: Solutions Data & Security Verification (T-106 to T-110)", () => {
  it("T-106: returns all 5 canonical solutions in ordered sequence", async () => {
    const solutions = await getAllSolutions();
    expect(solutions.length).toBe(5);

    expect(solutions[0].slug).toBe("identity-governance");
    expect(solutions[1].slug).toBe("ai-and-digital-governance");
    expect(solutions[2].slug).toBe("quantum-safe-security");
    expect(solutions[3].slug).toBe("business-process");
    expect(solutions[4].slug).toBe("enterprise-technology");

    for (const sol of solutions) {
      expect(sol.title).toBeTruthy();
      expect(sol.summary).toBeTruthy();
      expect(sol.challenge).toBeTruthy();
      expect(sol.features.length).toBe(4);
      expect(sol.deliveredBy.length).toBeGreaterThan(0);
      expect(sol.products.length).toBeGreaterThan(0);
      expect(sol.proofAndReading.length).toBeGreaterThan(0);
    }
  });

  it("T-108: retrieves Identity Governance by slug and alias", async () => {
    const bySlug = await getSolutionBySlug("identity-governance");
    expect(bySlug).not.toBeNull();
    expect(bySlug?.title).toBe("Identity Governance");
    expect(bySlug?.diagramKey).toBe("identity");
    expect(bySlug?.deliveredBy).toEqual(["PostureOne", "AMS", "Passwordless Keys"]);
    expect(bySlug?.products.map((p) => p.slug)).toEqual(["postureone", "ams", "keys"]);

    const byAlias = await getSolutionBySlug("sol-identity");
    expect(byAlias).not.toBeNull();
    expect(byAlias?.slug).toBe("identity-governance");
  });

  it("T-109: retrieves AI and Digital Governance by slug and alias", async () => {
    const bySlug = await getSolutionBySlug("ai-and-digital-governance");
    expect(bySlug).not.toBeNull();
    expect(bySlug?.title).toBe("AI and Digital Governance");
    expect(bySlug?.diagramKey).toBe("ai");
    expect(bySlug?.deliveredBy).toEqual(["EvalOne", "PostureOne"]);
    expect(bySlug?.products.map((p) => p.slug)).toEqual(["evalone", "postureone"]);

    const byAlias = await getSolutionBySlug("sol-ai");
    expect(byAlias).not.toBeNull();
    expect(byAlias?.slug).toBe("ai-and-digital-governance");
  });

  it("T-110: retrieves Quantum-Safe Security by slug and alias", async () => {
    const bySlug = await getSolutionBySlug("quantum-safe-security");
    expect(bySlug).not.toBeNull();
    expect(bySlug?.title).toBe("Quantum-Safe Security");
    expect(bySlug?.diagramKey).toBe("quantum");
    expect(bySlug?.deliveredBy).toEqual(["PostureOne", "Passwordless Keys"]);
    expect(bySlug?.products.map((p) => p.slug)).toEqual(["postureone", "keys"]);

    const byAlias = await getSolutionBySlug("sol-quantum");
    expect(byAlias).not.toBeNull();
    expect(byAlias?.slug).toBe("quantum-safe-security");
  });

  it("T-111: retrieves Business Process and Enterprise Technology solutions with verified content", async () => {
    const processSol = await getSolutionBySlug("business-process");
    expect(processSol).not.toBeNull();
    expect(processSol?.title).toBe("Business Process");
    expect(processSol?.diagramKey).toBe("process");
    expect(processSol?.ctaHeadline).toBe("Turn reviews into a clear, confident process.");
    expect(processSol?.deliveredBy).toEqual(["PostureOne", "AMS"]);
    expect(processSol?.products.map((p) => p.slug)).toEqual(["postureone", "ams"]);
    expect(processSol?.features[0].lead).toBe("Reviews as governed cycles");

    const byAliasProcess = await getSolutionBySlug("sol-process");
    expect(byAliasProcess?.slug).toBe("business-process");

    const enterpriseSol = await getSolutionBySlug("enterprise-technology");
    expect(enterpriseSol).not.toBeNull();
    expect(enterpriseSol?.title).toBe("Enterprise Technology");
    expect(enterpriseSol?.diagramKey).toBe("enterprise");
    expect(enterpriseSol?.ctaHeadline).toBe("Make your systems work as one layer.");
    expect(enterpriseSol?.deliveredBy).toEqual(["PostureOne", "Passwordless Keys", "AMS"]);
    expect(enterpriseSol?.products.map((p) => p.slug)).toEqual(["postureone", "keys", "ams"]);
    expect(enterpriseSol?.features[0].lead).toBe("Connect the platforms you have");

    const byAliasEnterprise = await getSolutionBySlug("sol-enterprise");
    expect(byAliasEnterprise?.slug).toBe("enterprise-technology");
  });

  it("rejects malicious, oversized, or invalid slugs safely with null", async () => {
    expect(await getSolutionBySlug("../etc/passwd")).toBeNull();
    expect(await getSolutionBySlug("solutions<script>")).toBeNull();
    expect(await getSolutionBySlug("unknown-solution-xyz")).toBeNull();
    expect(await getSolutionBySlug("")).toBeNull();
  });
});
