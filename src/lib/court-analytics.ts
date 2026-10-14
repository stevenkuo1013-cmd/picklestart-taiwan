/**
 * PickleStart V4.12 - stable, non-personal court click dimensions.
 * Only predefined action/page/ownership and database ids are accepted.
 */
export type CourtClickInput = {
  action?: string;
  court?: string;
  city?: string;
  ownership?: string;
  page?: string;
};

export type CourtClickEvent = {
  name: "court_map_clicked" | "court_booking_clicked";
  props: {
    city: string;
    court: string;
    ownership: "private" | "public" | "community";
    page: "hub" | "city";
  };
};

const safeId = (value: string | undefined): value is string =>
  typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);

export function getCourtClickEvent(input: CourtClickInput): CourtClickEvent | null {
  if (input.action !== "map" && input.action !== "booking") return null;
  if (!safeId(input.court) || !safeId(input.city)) return null;
  if (input.page !== "hub" && input.page !== "city") return null;
  if (
    input.ownership !== "private" &&
    input.ownership !== "public" &&
    input.ownership !== "community"
  ) return null;

  return {
    name: input.action === "map" ? "court_map_clicked" : "court_booking_clicked",
    props: {
      city: input.city,
      court: input.court,
      ownership: input.ownership,
      page: input.page
    }
  };
}
