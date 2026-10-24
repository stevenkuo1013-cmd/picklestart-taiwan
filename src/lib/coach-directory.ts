import { COACH_CITIES, type CoachProfile, type CoachLevel } from "../data/coaches";

export type CoachNetwork = "instagram" | "facebook" | "line";
export type CoachFilters = { city?: string; level?: string; query?: string };

const trustedHosts: Record<CoachNetwork, readonly string[]> = {
  instagram: ["instagram.com", "www.instagram.com"],
  facebook: ["facebook.com", "www.facebook.com", "m.facebook.com", "fb.me"],
  line: ["line.me", "www.line.me", "lin.ee"]
};

/** Reject javascript:, spoofed hosts, non-HTTPS and untrusted public links. */
export function safeCoachLink(network: CoachNetwork, candidate?: string): string | null {
  if (typeof candidate !== "string" || !candidate.trim()) return null;
  try {
    const url = new URL(candidate.trim());
    if (url.protocol !== "https:" || !trustedHosts[network].includes(url.hostname.toLowerCase())) return null;
    if (url.username || url.password || url.port || !url.pathname || url.pathname === "/") return null;
    if (network === "line" && !(
      url.hostname === "lin.ee" ||
      url.pathname.startsWith("/R/ti/p/") ||
      url.pathname.startsWith("/ti/p/") ||
      url.pathname.startsWith("/ti/g/") ||
      url.pathname.startsWith("/R/ti/g/")
    )) return null;
    return url.href;
  } catch { return null; }
}

export const coachContacts = (coach: CoachProfile) => (
  (["instagram", "facebook", "line"] as const)
    .map((network) => ({ network, href: safeCoachLink(network, coach[network]) }))
    .filter((contact): contact is { network: CoachNetwork; href: string } => contact.href !== null)
);

const isCleanId = (value: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
const isValidDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  !Number.isNaN(Date.parse(`${value}T00:00:00Z`));

/** Validation is a safeguard, NOT a replacement for manual screening. */
export function isPublishableCoach(coach: CoachProfile): boolean {
  return coach.approved === true && coach.active === true &&
    isCleanId(coach.id) && coach.displayName.trim().length > 0 &&
    coach.introduction.trim().length > 0 &&
    coach.cities.length > 0 && coach.cities.every((city) => COACH_CITIES.includes(city)) &&
    coach.teachingAreas.length > 0 && coach.levels.length > 0 &&
    coach.formats.length > 0 && isValidDate(coach.lastConfirmed) &&
    (coach.photo === undefined || /^\/images\/coaches\/[a-zA-Z0-9._-]+\.(?:webp|png|jpe?g)$/.test(coach.photo)) &&
    coachContacts(coach).length > 0;
}

export function publishedCoaches(coaches: readonly CoachProfile[]): CoachProfile[] {
  const seen = new Set<string>();
  return coaches.filter((coach) => {
    if (!isPublishableCoach(coach) || seen.has(coach.id)) return false;
    seen.add(coach.id);
    return true;
  });
}

function searchableText(coach: CoachProfile): string {
  return [coach.displayName, ...coach.cities, ...coach.teachingAreas,
    ...coach.levels, ...coach.formats, coach.introduction, coach.experience || "",
    coach.qualifications || ""].join(" ").toLocaleLowerCase("zh-TW");
}

export function filterCoaches(coaches: readonly CoachProfile[], filters: CoachFilters): CoachProfile[] {
  const query = (filters.query || "").trim().toLocaleLowerCase("zh-TW");
  return coaches.filter((coach) =>
    (!filters.city || coach.cities.includes(filters.city as CoachProfile["cities"][number])) &&
    (!filters.level || coach.levels.includes(filters.level as CoachLevel)) &&
    (!query || searchableText(coach).includes(query))
  );
}
