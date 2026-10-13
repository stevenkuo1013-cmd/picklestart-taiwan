import type { CourtPlace } from "../data/courts";

/**
 * Google Maps URL tiers:
 *  - place: open the POI information card with query_place_id, or a supplied Google Maps place link
 *  - search: search nearby candidates only; never imply a confirmed venue card or directions
 *  - missing: not enough location information to safely link
 *
 * A name/address search is never upgraded to an exact venue pin by assumption.
 */
export type CourtMapAction = {
  kind: "place" | "search" | "missing";
  href: string | null;
  label: string;
  note: string;
};

type MapFields = Pick<CourtPlace, "name" | "address" | "googlePlaceId" | "mapsUrl" | "mapsSearchName" | "mapsSearchHint" | "mapLinkCheckedAt">;

function validMapsUrl(value: string | undefined): boolean {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      (url.hostname === "maps.app.goo.gl" || url.hostname === "www.google.com" || url.hostname === "google.com" || url.hostname === "maps.google.com") &&
      (url.hostname === "maps.app.goo.gl" || url.pathname.startsWith("/maps/place/"));
  } catch {
    return false;
  }
}

function readableName(name: string): string {
  return name
    .replace(/｜/g, " ")
    .replace(/（([^）]*)）/g, " $1 ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getCourtMapAction(city: string, place: MapFields): CourtMapAction {
  const placeId = place.googlePlaceId?.trim();
  const displayName = readableName(place.mapsSearchName || place.name);
  const address = place.address?.trim();

  // Explicit Google Place ID -> specific POI *details*, NOT /maps/dir/ directions.
  // Google Maps only uses the fallback query if the Place ID is missing or unrecognized.
  if (placeId && /^[A-Za-z0-9_-]{16,}$/.test(placeId)) {
    const query = [displayName, address || city].filter(Boolean).join(",");
    return {
      kind: "place",
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}&query_place_id=${encodeURIComponent(placeId)}`,
      label: place.mapLinkCheckedAt ? "Google Maps 查看場館 ↗" : "開啟 Google Maps 場館資訊 ↗",
      note: place.mapLinkCheckedAt
        ? `地圖頁已實測（${place.mapLinkCheckedAt}）；不代表已確認場館營運或入場方式。`
        : "此連結會指定 Google 地標資訊頁，尚待人工核對；請在地圖內自行選擇導航並確認入口。"
    };
  }
  // Shared Google Maps place URL: leave unchanged. No assumptions about the venue entrance.
  if (validMapsUrl(place.mapsUrl)) {
    return {
      kind: "place",
      href: place.mapsUrl!,
      label: place.mapLinkCheckedAt ? "Google Maps 查看場館 ↗" : "開啟 Google Maps 地點（待核對）↗",
      note: place.mapLinkCheckedAt
        ? `地圖頁已實測（${place.mapLinkCheckedAt}）；出發前請確認場館開放與入口。`
        : "這是公開來源提供的 Google Maps 連結，尚未經 PickleStart 實際確認開啟結果；請核對名稱、地址及入口。"
    };
  }

  // Only a *search*: even a detailed text query can have multiple/ambiguous results.
  // Show the same intent across desktop and mobile instead of masquerading as a direct POI.
  if (address && displayName && /(?:號|巷|路|街|段|公園|球場|體育館|運動中心)/.test(address)) {
    const query = `${displayName},${address}`;
    return {
      kind: "search",
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
      label: place.mapLinkCheckedAt ? "Google Maps 查看場館 ↗" : "Google Maps 查找場館（需選擇）↗",
      note: place.mapLinkCheckedAt
        ? `地圖頁已實測（${place.mapLinkCheckedAt}）；Google 搜尋結果可能變動，出發前仍請核對地址。`
        : place.mapsSearchHint
          ? `尚未取得可核實的指定地標連結。${place.mapsSearchHint}`
          : "尚無已核對的 Google 地標 ID；搜尋可能顯示多筆結果。請選擇名稱和地址都相符的場館資訊頁，再自行按路線規劃。"
    };
  }
  return {
    kind: "missing",
    href: null,
    label: "位置待核對",
    note: "尚無足夠精確的地標或地址，請先參閱資料來源或詢問場地方。"
  };
}
