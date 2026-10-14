import { describe, expect, it } from "vitest";
import { buildEventPath } from "../src/lib/analytics";
import { getCourtClickEvent } from "../src/lib/court-analytics";

describe("V4.12 court click analytics", () => {
  it("uses a stable court id for a map click on the all-courts page", () => {
    const event = getCourtClickEvent({
      action: "map",
      court: "pick-le-mode-neihu",
      city: "taipei",
      ownership: "private",
      page: "hub"
    });
    expect(event).not.toBeNull();
    expect(buildEventPath(event!.name, event!.props)).toBe(
      "court_map_clicked|city=taipei|court=pick-le-mode-neihu|ownership=private|page=hub"
    );
  });

  it("tracks booking clicks separately on a city page", () => {
    const event = getCourtClickEvent({
      action: "booking",
      court: "pick-le-mode-neihu",
      city: "taipei",
      ownership: "private",
      page: "city"
    });
    expect(event?.name).toBe("court_booking_clicked");
    expect(event?.props.page).toBe("city");
  });

  it("supports public courts' map clicks", () => {
    const event = getCourtClickEvent({
      action: "map",
      court: "zhishan-park",
      city: "taipei",
      ownership: "public",
      page: "city"
    });
    expect(event?.props.ownership).toBe("public");
  });

  it("rejects missing, unknown or unsafe dimensions", () => {
    const valid = {
      action: "map", city: "taipei", court: "zhishan-park", ownership: "public", page: "hub"
    };
    expect(getCourtClickEvent({ ...valid, action: "source" })).toBeNull();
    expect(getCourtClickEvent({ ...valid, court: "" })).toBeNull();
    expect(getCourtClickEvent({ ...valid, court: "someone@example.com" })).toBeNull();
    expect(getCourtClickEvent({ ...valid, page: "unknown" })).toBeNull();
    expect(getCourtClickEvent({ ...valid, ownership: "unknown" })).toBeNull();
    expect(getCourtClickEvent({ ...valid, city: "台北" })).toBeNull();
  });
});
