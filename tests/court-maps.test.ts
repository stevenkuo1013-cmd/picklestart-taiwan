import { describe, expect, it } from "vitest";
import { courtCities } from "../src/data/courts";
import { getCourtMapAction } from "../src/lib/court-maps";

const places = courtCities.flatMap(city => city.places.map(place => ({ city: city.city, place })));

describe("court map links", () => {
  it("audits all 74 existing venues without pretending a search is an exact pin", () => {
    expect(places).toHaveLength(74);
    const ids = places.map(({ place }) => place.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const { city, place } of places) {
      const action = getCourtMapAction(city, place);
      if (action.kind === "place") {
        expect(place.googlePlaceId || place.mapsUrl).toBeTruthy();
        expect(action.href).toMatch(/^https:\/\//);
      } else if (action.kind === "search") {
        expect(place.googlePlaceId || place.mapsUrl).toBeFalsy();
        expect(action.href).toContain("/maps/search/");
        expect(action.href).not.toContain("place_id=");
        if (place.mapLinkCheckedAt) {
          expect(action.label).toContain("查看場館");
        } else {
          expect(action.label).toContain("需選擇");
        }
      } else {
        expect(action.href).toBeNull();
      }
    }
  });
  it("opens the place information card for exact Place IDs, not directions", () => {
    const act = getCourtMapAction("新竹縣", { name: "PPClub 酸黃瓜匹克球場", address: "新竹縣寶山鄉大崎一路195-9號", googlePlaceId: "ChIJmeHKPABJaDQROO-Cv4S4ZL8" });
    expect(act.kind).toBe("place");
    expect(act.href).toContain("/maps/search/?api=1");
    expect(act.href).toContain("query_place_id=ChIJmeHKPABJaDQROO-Cv4S4ZL8");
    expect(act.href).not.toContain("/maps/dir/");
    expect(act.label).toContain("場館資訊");
  });
  it("P9 is a tested text-search link, never represented as a Place ID", () => {
    const act = getCourtMapAction("新竹縣", { name: "P9 複合式運動競技館", address: "新竹縣寶山鄉福德街13-1號", mapLinkCheckedAt: "2026-10-12" });
    expect(act.kind).toBe("search");
    expect(act.href).toContain("P9%20");
    expect(act.href).not.toContain("query_place_id=");
    expect(act.label).toContain("查看場館");
  });
  it("does not navigate an unknown address or an injected map URL", () => {
    expect(getCourtMapAction("台南市", {name:"華府球場"}).kind).toBe("missing");
    const x = getCourtMapAction("台南市", {name:"Test", address:"台南市中西區民生路一段1號", mapsUrl:"https://evil.example/maps/location"});
    expect(x.kind).toBe("search");
    const y = getCourtMapAction("台南市", {name:"Test", address:"台南市中西區民生路一段1號", mapsUrl:"https://www.google.com/maps/dir/?api=1&destination=wrong"});
    expect(y.kind).toBe("search");
  });
});


describe("place card behavior for all venues", () => {
  it("never opens directions automatically, even for known place IDs", () => {
    for (const {city,place} of places) {
      const action = getCourtMapAction(city, place);
      if (!action.href) continue;
      expect(action.href).not.toContain("/maps/dir/");
      expect(action.href).not.toContain("destination_place_id=");
      if (place.googlePlaceId) {
        expect(action.href).toContain("query_place_id=");
        expect(action.label).toContain(place.mapLinkCheckedAt ? "查看場館" : "場館資訊");
      }
    }
  });
  it("opens newly matched PicklePark and PB-Club place cards rather than route planning", () => {
    const expected = [
      ["picklepark-beitun", "ChIJhSkpxMQXaTQRxNhz1nKd4RA"],
      ["pb-club-wuri", "ChIJnZ5sEAA7aTQR5EJmLywqYFE"]
    ] as const;
    for (const [id, placeId] of expected) {
      const found = places.find(x => x.place.id === id);
      expect(found).toBeDefined();
      const action = getCourtMapAction(found!.city, found!.place);
      expect(action.kind).toBe("place");
      expect(action.href).toContain(`query_place_id=${placeId}`);
      expect(action.href).not.toContain("/maps/dir/");
    }
  });
  it("labels manually checked P9 distinctly from unresolved place-ID searches", () => {
    const p9 = places.find(x => x.place.id === "p9-multisport-hsinchu")!;
    const action = getCourtMapAction(p9.city,p9.place);
    expect(action.kind).toBe("search");
    expect(action.label).toContain("查看場館");
    expect(action.note).toContain("結果可能變動");
    expect(decodeURIComponent(action.href!)).toContain("P9複合式運動競技館");
  });
  it("uses shared Google Maps URLs unchanged when supplied", () => {
    const venue = places.find(x => x.place.mapsUrl)!;
    expect(getCourtMapAction(venue.city,venue.place).href).toBe(venue.place.mapsUrl);
  });
});


describe("court-link verification records", () => {
  it("records all twenty-four private venues verified in Google Maps", () => {
    const checked = places.filter(x => x.place.mapLinkCheckedAt);
    expect(checked.map(x => x.place.id).sort()).toEqual([
      "downstairs-pickleball-club", "p9-multisport-hsinchu", "pb-club-wuri",
      "pickle-day-zhonghe", "dope-pickleball-xinzhuang", "walybao-pickleball", "pickle-king-nantun",
      "picklepark-beitun", "ppclub-hsinchu", "lala-dink",
      "goodink-taichung", "sunset-pickleball-taichung", "pdang-tamsui",
      "inazuma-pickleball", "napa-huatan", "pk-park-yunlin",
      "antler-club-yongkang", "heavy-dinker-tainan", "dinkers-kaohsiung",
      "clike-kaohsiung", "pick-me-kaohsiung",
      "pick-le-mode-neihu", "pickle-ing-xinzhuang", "yuchao-jingpai-yongkang"
    ].sort());
    for (const {city,place} of checked) {
      const newChecks = [
        "pickle-day-zhonghe", "dope-pickleball-xinzhuang", "walybao-pickleball", "pickle-king-nantun",
        "lala-dink", "goodink-taichung", "sunset-pickleball-taichung", "pdang-tamsui",
        "inazuma-pickleball", "napa-huatan", "pk-park-yunlin",
        "antler-club-yongkang", "heavy-dinker-tainan", "dinkers-kaohsiung",
      "clike-kaohsiung", "pick-me-kaohsiung"
      ];
      const lastChecks = ["pick-le-mode-neihu", "pickle-ing-xinzhuang", "yuchao-jingpai-yongkang"];
      const expectedDate = lastChecks.includes(place.id) ? "2026-10-14" : newChecks.includes(place.id) ? "2026-10-13" : "2026-10-12";
      expect(place.mapLinkCheckedAt).toBe(expectedDate);
      expect(getCourtMapAction(city,place).note).toContain(expectedDate);
    }
  });
  it("preserves the cross-checked Pickle Ing street address with the new user-supplied map URL", () => {
    const x = places.find(x => x.place.id === "pickle-ing-xinzhuang")!;
    expect(x.place.address).toBe("新北市泰山區新五路一段14-1號");
    const a = getCourtMapAction(x.city,x.place);
    expect(a.kind).toBe("place");
    expect(a.href).toBe("https://maps.app.goo.gl/Rzu5UGpAHZoESEMW9");
    expect(x.place.googlePlaceId).toBeUndefined();
  });
  it("uses PK Park's official Linktree map-sharing URL, not a guessed coordinate", () => {
    const x = places.find(x => x.place.id === "pk-park-yunlin")!;
    expect(x.place.mapsUrl).toBe("https://maps.app.goo.gl/2tM4uuAzJawyy7dw6");
    const a = getCourtMapAction(x.city,x.place);
    expect(a.kind).toBe("place");
    expect(a.href).toBe(x.place.mapsUrl);
    expect(a.href).not.toContain("/maps/dir/");
    expect(x.place.mapLinkCheckedAt).toBe("2026-10-13");
  });
  it("opens verified Pick Le Mode Google Maps place page", () => {
    const x=places.find(x => x.place.id === "pick-le-mode-neihu")!;
    const a=getCourtMapAction(x.city,x.place);
    expect(a.kind).toBe("place");
    expect(a.href).toBe("https://maps.app.goo.gl/c2cbHSwpHnEE2RLy6");
    expect(x.place.mapLinkCheckedAt).toBe("2026-10-14");
    expect(a.note).toContain("已實測");
  });
});


describe("V4.6 official-map sources and ambiguous-search safeguards", () => {
  it("uses two venue-published map links without inventing place IDs", () => {
    const expected = [
      ["pickle-king-nantun", "https://maps.app.goo.gl/VYwDqcLsirmGZGJo9"],
      ["lala-dink", "https://maps.app.goo.gl/stnu6v7x1CuVbt6bA"]
    ] as const;
    for (const [id, mapsUrl] of expected) {
      const found = places.find(({ place }) => place.id === id)!;
      expect(found.place.mapsUrl).toBe(mapsUrl);
      expect(found.place.googlePlaceId).toBeUndefined();
      const checked = id === "lala-dink" || id === "pickle-king-nantun";
      expect(found.place.mapLinkCheckedAt).toBe(checked ? "2026-10-13" : undefined);
      const action = getCourtMapAction(found.city, found.place);
      expect(action.kind).toBe("place");
      expect(action.href).toBe(mapsUrl);
      expect(action.label).toContain(checked ? "查看場館" : "待核對");
      expect(action.href).not.toContain("/maps/dir/");
    }
  });
  it("opens user-supplied YoYo maps URL, but does not claim a verified Place ID", () => {
    const found = places.find(({ place }) => place.id === "pickle-ing-xinzhuang")!;
    const action = getCourtMapAction(found.city, found.place);
    expect(action.kind).toBe("place");
    expect(action.href).toBe("https://maps.app.goo.gl/Rzu5UGpAHZoESEMW9");
    expect(found.place.googlePlaceId).toBeUndefined();
    expect(found.place.mapLinkCheckedAt).toBe("2026-10-14");
    expect(found.place.address).toContain("新五路一段14-1號");
  });
  it("preserves manually checked records and all 74 entries", () => {
    expect(places).toHaveLength(74);
    expect(places.filter(({ place }) => place.mapLinkCheckedAt)).toHaveLength(24);
    expect(places.filter(({ place }) => place.ownership === "private")).toHaveLength(24);
  });
});


describe("V4.7 business name and city corrections", () => {
  it("keeps YoYo matching name and historical alias while using supplied Google Maps link", () => {
    const found = places.find(({place}) => place.id === "pickle-ing-xinzhuang")!;
    expect(found.place.name).toContain("YoYo匹克贏");
    expect(found.place.name).toContain("Pickle Ing");
    const act = getCourtMapAction(found.city, found.place);
    expect(act.kind).toBe("place");
    expect(act.href).toBe("https://maps.app.goo.gl/Rzu5UGpAHZoESEMW9");
    expect(act.href).not.toContain("/maps/dir/");
  });
  it("retains Lala Dink as a manually checked Google Maps place page", () => {
    const found = places.find(({place}) => place.id === "lala-dink")!;
    const act = getCourtMapAction(found.city, found.place);
    expect(act.kind).toBe("place");
    expect(act.label).toContain("查看場館");
    expect(act.href).toBe("https://maps.app.goo.gl/stnu6v7x1CuVbt6bA");
  });
});


describe("V4.8 reviewed user-confirmed map links", () => {
  it("treats the ten named user-verified venues as normal Google Maps buttons", () => {
    const confirmed = [
      "goodink-taichung", "sunset-pickleball-taichung", "pdang-tamsui",
      "p9-multisport-hsinchu", "inazuma-pickleball", "napa-huatan",
      "pk-park-yunlin", "antler-club-yongkang", "heavy-dinker-tainan", "dinkers-kaohsiung",
      "clike-kaohsiung", "pick-me-kaohsiung"
    ];
    for (const id of confirmed) {
      const found = places.find(({ place }) => place.id === id)!;
      expect(found).toBeDefined();
      expect(found.place.mapLinkCheckedAt).toMatch(/^2026-10-/);
      const action = getCourtMapAction(found.city, found.place);
      expect(action.href).toMatch(/^https:\/\//);
      expect(action.label).toBe("Google Maps 查看場館 ↗");
      expect(action.note).toContain("已實測");
      expect(action.note).not.toContain("尚無已核對");
      expect(action.href).not.toContain("/maps/dir/");
      // A verified search remains a search; no synthetic Place ID is created.
      if (!found.place.googlePlaceId && !found.place.mapsUrl) {
        expect(action.kind).toBe("search");
        expect(action.href).not.toContain("query_place_id=");
      }
    }
  });
  it("has no unverified private venue map links after final user review", () => {
    const unchecked = places.filter(({ place }) => place.ownership === "private" && !place.mapLinkCheckedAt);
    expect(unchecked).toHaveLength(0);
    expect(places).toHaveLength(74);
  });
});


describe("V4.9 new venue checks and pending location safeguards", () => {
  it("keeps four newly confirmed venues as normal map buttons without creating fake IDs", () => {
    for (const id of ["pickle-day-zhonghe", "dope-pickleball-xinzhuang", "walybao-pickleball", "pickle-king-nantun"]) {
      const found = places.find(({ place }) => place.id === id)!;
      expect(found.place.mapLinkCheckedAt).toBe("2026-10-13");
      const action = getCourtMapAction(found.city, found.place);
      expect(action.label).toBe("Google Maps 查看場館 ↗");
      expect(action.note).toContain("已實測");
      expect(action.href).not.toContain("/maps/dir/");
    }
  });
  it("records verified PICK.ME Google search and retains third-party address caution", () => {
    const found = places.find(({ place }) => place.id === "pick-me-kaohsiung")!;
    expect(found.place.address).toBe("高雄市三民區灣興街39巷9號");
    expect(found.place.sourceType).toBe("directory");
    expect(found.place.mapLinkCheckedAt).toBe("2026-10-13");
    const action = getCourtMapAction(found.city, found.place);
    expect(action.kind).toBe("search");
    expect(decodeURIComponent(action.href!)).toContain("灣興街39巷9號");
    expect(action.label).toContain("查看場館");
    expect(action.note).toContain("搜尋結果可能變動");
  });
  it("preserves 74 total and all 24 private venue map verifications", () => {
    expect(places).toHaveLength(74);
    expect(places.filter(({place}) => place.ownership === "private")).toHaveLength(24);
    expect(places.filter(({place}) => place.ownership === "private" && !place.mapLinkCheckedAt)).toHaveLength(0);
  });
});


describe("V4.10 three shared venue links, verified in V4.11", () => {
  const toCheck = [
    ["pick-le-mode-neihu", "https://maps.app.goo.gl/c2cbHSwpHnEE2RLy6"],
    ["pickle-ing-xinzhuang", "https://maps.app.goo.gl/Rzu5UGpAHZoESEMW9"],
    ["yuchao-jingpai-yongkang", "https://maps.app.goo.gl/jFJhe66dgg2BoVDs9"]
  ] as const;
  it("preserves exact user-provided share URLs and records manual verification", () => {
    for (const [id, url] of toCheck) {
      const found = places.find(x => x.place.id === id)!;
      expect(found).toBeDefined();
      expect(found.place.mapsUrl).toBe(url);
      expect(found.place.mapLinkCheckedAt).toBe("2026-10-14");
      const action = getCourtMapAction(found.city, found.place);
      expect(action.kind).toBe("place");
      expect(action.href).toBe(url);
      expect(action.href).not.toContain("/maps/dir/");
      expect(action.note).toContain("已實測");
    }
  });
  it("marks CLiKE CLUB and PICK.ME as owner-checked without fabricating Place IDs", () => {
    for (const id of ["clike-kaohsiung", "pick-me-kaohsiung"]) {
      const found = places.find(x => x.place.id === id)!;
      expect(found.place.mapLinkCheckedAt).toBe("2026-10-13");
      expect(found.place.googlePlaceId).toBeUndefined();
      const action = getCourtMapAction(found.city, found.place);
      expect(action.kind).toBe("search");
      expect(action.label).toBe("Google Maps 查看場館 ↗");
    }
  });
});
