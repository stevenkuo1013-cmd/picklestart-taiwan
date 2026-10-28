import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
const source = (path: string) => readFileSync(path, "utf8");

describe("V4.21 Fix1 — exact copy and balanced wrapping", () => {
  it("keeps the original three-step heading", () => {
    const home = source("src/pages/index.astro");
    expect(home).toContain("<h2><span>3 步驟</span>，找到你的起步裝備</h2>");
    expect(home).not.toContain("3 步驟</span>，整理好起步裝備");
  });
  it("removes just the comma from the homepage promise", () => {
    const home = source("src/pages/index.astro");
    expect(home).toContain("<h2>少買錯裝備<br />更容易開始</h2>");
    expect(home).not.toContain("少買錯裝備，<br />");
  });
  it("keeps the complete court heading and the existing guide CTA copy", () => {
    const courts = source("src/pages/courts/index.astro");
    expect(courts).toContain("<h1><span>全台匹克球場地</span><span>依縣市找球館與球聚</span></h1>");
    expect(courts).toContain("回答 6 題，配裝工具會依你的場地、現有裝備與預算，把現在要買、可以沿用、之後再買和目前不用買分清楚。");
    expect(courts).toContain('id="court-search"');
    expect(courts).toContain('getCourtMapAction');
  });
  it("balances only the court heading and end CTA text", () => {
    const guide = source("src/styles/guide.css");
    expect(guide).toContain("V4.21 Fix1 · Court headline + CTA balanced wrapping only.");
    expect(guide).toContain(".courts-v2-page .courts-v2-hero h1 > span");
    expect(guide).toContain(".courts-v2-page .guide-end-cta p:not(.eyebrow)");
    expect(guide).toContain("text-wrap: balance;");
  });
});
