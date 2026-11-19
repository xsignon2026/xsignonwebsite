import { describe, expect, it } from "vitest";
import { aboutContentFallback } from "@/data/about-content";
import { mergeAboutContent } from "@/lib/about-content-merge";

describe("about content", () => {
  it("has the shape the page needs", () => {
    expect(aboutContentFallback.whatWeDo.items).toHaveLength(4);
    expect(aboutContentFallback.how.steps).toHaveLength(4);
    expect(aboutContentFallback.why.principles).toHaveLength(4);
    for (const p of aboutContentFallback.why.principles) expect(p.lines).toHaveLength(2);
  });

  it("returns the defaults when Sanity has nothing", () => {
    expect(mergeAboutContent(aboutContentFallback, null)).toBe(aboutContentFallback);
  });

  it("uses edited text and keeps defaults for empty parts", () => {
    const merged = mergeAboutContent(aboutContentFallback, {
      hero: { eyebrow: "", title: "New title", description: " " },
    });
    expect(merged.hero.title).toBe("New title");
    expect(merged.hero.eyebrow).toBe(aboutContentFallback.hero.eyebrow);
    expect(merged.hero.description).toBe(aboutContentFallback.hero.description);
  });

  it("shows the two founders until people are added in Studio", () => {
    expect(aboutContentFallback.team.title).toBe("Meet our team");
    expect(aboutContentFallback.team.members.map((m) => m.name)).toEqual([
      "Rameshwar Balanagu",
      "Nagaraj Dandeboyina",
    ]);
    expect(aboutContentFallback.team.emptyNote).toBeTruthy();
    // Nothing complete in Sanity: the built-in people stay.
    expect(
      mergeAboutContent(aboutContentFallback, { team: { title: "", emptyNote: "", members: [] } })
        .team.members,
    ).toBe(aboutContentFallback.team.members);
  });

  it("keeps team members that have a name and role, and drops unsafe photo links", () => {
    const merged = mergeAboutContent(aboutContentFallback, {
      team: {
        title: "Meet our team",
        emptyNote: "",
        members: [
          { name: "A Person", role: "Engineer", bio: "", photo: "https://cdn.sanity.io/a.jpg" },
          { name: "B Person", role: "Analyst", bio: "Short bio.", photo: "javascript:alert(1)" },
          { name: "No Role", role: " ", bio: "" },
          { name: "C Person", role: "Lead", bio: "", photo: "/images/team/c.webp" },
          { name: "D Person", role: "Lead", bio: "", photo: "//evil.com/x.jpg" },
        ],
      },
    });
    expect(merged.team.members).toHaveLength(4);
    expect(merged.team.members[0].photo).toBe("https://cdn.sanity.io/a.jpg");
    expect(merged.team.members[1].photo).toBeUndefined();
    expect(merged.team.members[2].photo).toBe("/images/team/c.webp");
    expect(merged.team.members[3].photo).toBeUndefined();
  });

  it("ignores a list with the wrong number of entries", () => {
    const merged = mergeAboutContent(aboutContentFallback, {
      how: { title: "How", steps: aboutContentFallback.how.steps.slice(0, 2) },
    });
    expect(merged.how.title).toBe("How");
    expect(merged.how.steps).toHaveLength(4);
  });
});
