import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const article = readFileSync(resolve("src/pages/guide/pickleball-paddle.astro"), "utf8");
const hub = readFileSync(resolve("src/pages/guide/index.astro"), "utf8");
const equipment = readFileSync(resolve("src/pages/guide/beginner-equipment.astro"), "utf8");

describe("paddle buying guide SEO and internal links", () => {
  it("uses an article layout with stable metadata and breadcrumbs", () => {
    expect(article).toContain('pageType="article"');
    expect(article).toContain('title="匹克球拍推薦與選購指南');
    expect(article).toContain('href: "/guide/pickleball-paddle/"');
    expect(article.match(/<h1\b/g)?.length).toBe(1);
  });

  it("answers practical questions, not only shopping queries", () => {
    for (const topic of ["13mm", "16mm", "玻璃纖維", "碳纖維", "重量與握把", "匹克球拍價格", "先借拍"]) {
      expect(article).toContain(topic);
    }
  });

  it("integrates with the existing Builder analytics naming", () => {
    expect(article).toContain('data-analytics-event="guide_builder_clicked"');
    expect(article).toContain('data-analytics-article="pickleball-paddle"');
    expect(article).toContain("<GuideEndCTA");
  });

  it("is discoverable from both guide hub and existing equipment guide", () => {
    expect(hub).toContain('href="/guide/pickleball-paddle/"');
    expect(equipment).toContain('href="/guide/pickleball-paddle/"');
  });
});
