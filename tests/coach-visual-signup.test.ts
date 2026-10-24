import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const read = (path: string) => readFileSync(path, "utf8");

describe("V4.17 clean coach design and direct signup", () => {
  it("uses the real signup form URL, not sample placeholders", () => {
    const form = read("src/data/coach-form.ts");
    expect(form).toContain('COACH_FORM_URL = "https://tally.so/r/2jE6Le"');
    expect(form).not.toContain("ABC123");
  });
  it("has one light hero and no dark coach background blocks", () => {
    const page = read("src/pages/coaches/index.astro");
    const css = read("src/styles/coaches.css");
    expect(page).toContain('class="coach-hero"');
    expect(page).not.toContain('class="coach-hero-aside"');
    expect(css).not.toMatch(/background\s*:\s*#10243f/i);
    expect(css).toMatch(/\.coach-application\{[^}]*background:\s*linear-gradient/s);
  });
  it("offers only a new-coach application and preserves an official contact option", () => {
    const page = read("src/pages/coaches/index.astro");
    const profile = read("src/pages/coaches/[slug].astro");
    expect(page).toContain("免費申請教練刊登");
    expect(page).toContain("目前這張表單只提供新增刊登申請");
    expect(page).not.toContain("刊登／修改申請");
    expect(page).not.toContain("同一張表單提出申請");
    expect(page).toContain("https://www.instagram.com/picklestart.taiwan/");
    expect(profile).toContain("https://www.instagram.com/picklestart.taiwan/");
  });
});
