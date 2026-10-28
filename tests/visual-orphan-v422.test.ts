import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const read = (file: string) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");

describe("V4.22 browser-audit orphan-wrap safeguards", () => {
  const globalCSS = read("src/styles/global.css");
  const publicCSS = read("src/styles/public.css");
  const home = read("src/pages/index.astro");

  it("balances content headings without changing global headings outside the page", () => {
    expect(globalCSS).toContain(".public-shell :is(h1, h2, h3, h4)");
    expect(globalCSS).toMatch(/\.public-shell :is\(h1, h2, h3, h4\)\s*\{\s*text-wrap:\s*balance;/);
  });

  it("improves content paragraph, FAQ and list endings", () => {
    expect(globalCSS).toMatch(/\.public-shell :is\(p, li, summary\)\s*\{\s*text-wrap:\s*pretty;/);
  });

  it("targets only narrow viewport hero typography", () => {
    expect(publicCSS).toContain("@media (max-width: 480px)");
    expect(publicCSS).toContain(".hero-v3 h1.hero-title-v4 .hero-title-line");
    expect(publicCSS).toContain("font-size: clamp(2.12rem, 9vw, 2.48rem)");
  });

  it("makes the feature ribbon text roomier without hiding it", () => {
    expect(publicCSS).toContain("@media (max-width: 820px)");
    expect(publicCSS).toContain(".trust-ribbon strong,");
    expect(publicCSS).toContain(".trust-ribbon small");
  });

  it("preserves the user's exact three-step heading and homepage links", () => {
    expect(home).toContain("3 步驟</span>，找到你的起步裝備");
    expect(home).toContain('data-home-event="homepage_builder_clicked"');
  });
});
