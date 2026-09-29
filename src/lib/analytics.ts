export type AnalyticsProps = Record<
  string,
  string | number | boolean | null | undefined
>;

declare global {
  interface Window {
    goatcounter?: {
      count: (options: {
        path: string;
        title?: string;
        event?: boolean;
      }) => void;
    };
  }
}

function sanitizeSegment(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9._=-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function buildEventPath(
  name: string,
  props: AnalyticsProps = {}
): string {
  const eventName = sanitizeSegment(name) || "unknown_event";

  const propertyParts = Object.entries(props)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(
      ([key, value]) =>
        `${sanitizeSegment(key)}=${sanitizeSegment(String(value))}`
    );

  return [eventName, ...propertyParts].join("|").slice(0, 200);
}

export function trackEvent(
  name: string,
  props: AnalyticsProps = {}
): void {
  if (typeof window === "undefined") return;

  const path = buildEventPath(name, props);

  if (window.goatcounter?.count) {
    window.goatcounter.count({
      path,
      title: name,
      event: true
    });
    return;
  }

  if (import.meta.env.DEV) {
    console.debug("[PickleStart analytics]", path);
  }
}
