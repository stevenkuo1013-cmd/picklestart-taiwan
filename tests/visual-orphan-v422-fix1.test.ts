import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
const src = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

describe("V4.22 Fix1 — targeted heading wrap guards", () => {
  it("balances the builder question heading without changing the question text", () => {
    expect(src("src/styles/global.css")).toContain(".builder-shell .question-title { text-wrap: balance; }");
    expect(src("src/pages/builder.astro")).toContain("你目前是哪種狀態？");
  });
  it("keeps the original 3-step home heading unchanged", () => {
    expect(src("src/pages/index.astro")).toContain("3 步驟</span>，找到你的起步裝備");
  });
  it("balances existing guide text without rewriting it", () => {
    const css = src("src/styles/guide.css");
    expect(css).toContain(".guide-story-page .guide-hero h1 > .guide-story-heading-tail");
    expect(src("src/pages/guide/beginner-rules.astro")).toContain('class="guide-story-heading-tail">先懂這 5 條規則就好');
    expect(src("src/pages/guide/first-game.astro")).toContain('class="guide-story-heading-tail">不用假裝你什麼都懂');
  });
  it("limits the about and recommendation fixes to their original headings", () => {
    const a = src("src/pages/about.astro");
    expect(a).toContain('不是最好<span class="about-heading-accent">而是更適合現在的你');
    expect(a).toContain('準備好開始<span class="about-heading-accent">第一場匹克球了嗎？');
    const r = src("src/pages/how-we-recommend.astro");
    expect(r).toContain('class="recommend-heading-tail">而是找現在適合你的');
  });
  it("keeps the feedback headline and scopes the narrow-screen brand line", () => {
    const f = src("src/pages/feedback.astro");
    expect(f).toContain('有沒有什麼想對<span class="feedback-heading-tail">PickleStart 說的？');
    expect(f).toContain('.feedback-hero h1 > .feedback-heading-tail');
    expect(f).toContain('white-space: nowrap');
  });
});
