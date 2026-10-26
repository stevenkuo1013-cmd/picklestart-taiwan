import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

const content = (name: string) => readFileSync(name, 'utf-8');

describe('Coach directory copy and high-contrast headings', () => {
  it('removes the repetitive self-reported labels from public views', () => {
    const profile = content('src/pages/coaches/[slug].astro');
    const index = content('src/pages/coaches/index.astro');
    expect(profile).toContain('教學經驗：');
    expect(profile).toContain('資格／經歷：');
    expect(profile).not.toContain('教練自述');
    expect(index).not.toContain('教練自述');
  });
  it('does not show self-reported labels in coach data', () => {
    const data = content('src/data/coaches.ts');
    expect(data).not.toContain('申請者自述');
  });
  it('sets all coach page main headings to high-contrast black', () => {
    const style = content('src/styles/coaches.css');
    expect(style).toContain('/* V4.18 Coach heading legibility: consistent near-black. */');
    expect(style).toMatch(/\.coach-hero h1 span\s*\{\s*color:\s*#161616/);
    expect(style).toMatch(/\.coach-directory h1,\s*\.coach-directory h2,\s*\.coach-profile h1,\s*\.coach-profile h2/);
  });
});
