/**
 * PickleStart V4.17 — approved public coach records ONLY.
 * Do not add emails, application form answers, phone numbers, consent records,
 * private LINE IDs, or any other non-public application information here.
 */
export const COACH_CITIES = [
  "臺北市", "新北市", "桃園市", "臺中市", "臺南市", "高雄市",
  "基隆市", "新竹市", "新竹縣", "苗栗縣", "彰化縣", "南投縣",
  "雲林縣", "嘉義市", "嘉義縣", "屏東縣", "宜蘭縣", "花蓮縣",
  "臺東縣", "澎湖縣", "金門縣", "連江縣"
] as const;

export type CoachCity = (typeof COACH_CITIES)[number];
export type CoachLevel = "零基礎" | "初學" | "進階" | "競技";
export type LessonFormat = "一對一" | "雙人" | "團體";

export interface CoachProfile {
  /** Public slug e.g. "coach-chen-taipei". */
  id: string;
  /** Must be explicitly approved for publication by the coach. */
  approved: boolean;
  /** Set false for withdrawal or expired/paused listing. */
  active: boolean;
  displayName: string;
  cities: CoachCity[];
  teachingAreas: string[];
  levels: CoachLevel[];
  formats: LessonFormat[];
  introduction: string;
  /** Optional, self-reported, not independently verified by PickleStart. */
  experience?: string;
  qualifications?: string;
  /** Optional *local* image whose publication has been authorized. */
  photo?: string;
  /** Date the information was last confirmed with this coach. */
  lastConfirmed: string;
  /** Coach-approved public social links; at least one must be valid. */
  instagram?: string;
  facebook?: string;
  line?: string;
}

/**
 * Start with NO fictional public coaches. Add records only after reviewing the
 * private form submission, checking the links and retaining consent evidence.
 */
export const coachDirectory: CoachProfile[] = [];
