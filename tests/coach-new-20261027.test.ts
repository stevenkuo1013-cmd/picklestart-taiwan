import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { coachDirectory } from "../src/data/coaches";
import { coachContacts, publishedCoaches } from "../src/lib/coach-directory";

const additions = [
  { id: "elvin-taipei", name: "Elvin", city: "臺北市" },
  { id: "red-chen-taipei", name: "Red Chen", city: "新北市" },
  { id: "alex-new-taipei", name: "阿政 Alex", city: "新北市" },
  { id: "poyun-yunlin", name: "PoYun", city: "雲林縣" },
];

describe("V4.19 manually reviewed coach additions (2026-10-27)", () => {
  it("keeps the existing five and publishes each of four new coaches once", () => {
    const published = publishedCoaches(coachDirectory);
    expect(published.length).toBe(9);
    for (const c of additions) {
      const matches = published.filter((coach) => coach.id === c.id);
      expect(matches).toHaveLength(1);
      expect(matches[0].displayName).toBe(c.name);
      expect(matches[0].cities).toContain(c.city);
    }
  });

  it("has approved, active records with nonempty public contacts", () => {
    for (const { id } of additions) {
      const coach = coachDirectory.find((c) => c.id === id)!;
      expect(coach.approved && coach.active).toBe(true);
      expect(coachContacts(coach).length).toBeGreaterThan(0);
      expect(coach.teachingAreas).toEqual(coach.cities);
    }
  });

  it("does not leak private contact data, shortlink exceptions, or unverified claims", () => {
    for (const { id } of additions) {
      const coach = coachDirectory.find((c) => c.id === id)!;
      expect((coach as any).email).toBeUndefined();
      expect((coach as any).submissionId).toBeUndefined();
      const copy = [coach.introduction, coach.experience, coach.qualifications].join(" ");
      expect(copy).not.toContain("待補");
      expect(copy).not.toContain("申請者自述");
      expect(copy).not.toContain("教練自述");
    }
  });

  it("references only local images when photo metadata is set", () => {
    for (const { id } of additions) {
      const coach = coachDirectory.find((c) => c.id === id)!;
      if (coach.photo) {
        expect(coach.photo).toBe(`/images/coaches/${id}.webp`);
        expect(existsSync(`public${coach.photo}`)).toBe(true);
      }
    }
  });
});
