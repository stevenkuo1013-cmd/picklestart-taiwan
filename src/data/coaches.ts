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
export const coachDirectory: CoachProfile[] = [
  {
    "id": "jk-hsinchu",
    "displayName": "JK",
    "cities": [
      "新竹縣"
    ],
    "teachingAreas": [
      "新竹縣"
    ],
    "levels": [
      "零基礎",
      "初學",
      "進階",
      "競技"
    ],
    "formats": [
      "一對一",
      "雙人",
      "團體"
    ],
    "introduction": "在新豐設有室內匹克球訓練室，提供多種輔助教具與數位匹克球模擬器協助教學；另提供銀髮族入門課程優惠。",
    "experience": "網球及高爾夫球教學經驗超過 10 年，匹克球教學約 1.3 年。",
    "qualifications": "匹克球丙級教練。",
    "photo": "/images/coaches/jk.webp",
    "lastConfirmed": "2026-10-26",
    "instagram": "https://www.instagram.com/everwellsports/",
    "line": "https://line.me/ti/p/3NNHf-rvsT",
    "approved": true,
    "active": true
  },
  {
    "id": "kay-lin-kaohsiung",
    "displayName": "Kay Lin",
    "cities": [
      "高雄市"
    ],
    "teachingAreas": [
      "高雄市"
    ],
    "levels": [
      "零基礎",
      "初學",
      "進階",
      "競技"
    ],
    "formats": [
      "一對一",
      "雙人",
      "團體"
    ],
    "introduction": "提供入門與進階匹克球教學，注重腳步移動技巧及比賽情境練習，課程包含球感、過渡區技巧及比賽模擬。",
    "qualifications": "PPR L1、PPR L2、PPR YD。",
    "photo": "/images/coaches/kay-lin.webp",
    "lastConfirmed": "2026-10-26",
    "line": "https://line.me/ti/p/-Y8p_4LUZY",
    "approved": true,
    "active": true
  },
  {
    "id": "yezi-taipei",
    "displayName": "葉子",
    "cities": [
      "臺北市",
      "新北市"
    ],
    "teachingAreas": [
      "臺北市",
      "新北市"
    ],
    "levels": [
      "零基礎",
      "初學"
    ],
    "formats": [
      "一對一",
      "雙人",
      "團體"
    ],
    "introduction": "喜歡匹克球，也投入匹克球新手推廣，希望陪更多人一起接觸這項運動。",
    "experience": "目前球技程度約 3.5，已有固定學生，教學對象包含新手至程度 2.5 的學員。",
    "photo": "/images/coaches/yezi.webp",
    "lastConfirmed": "2026-10-26",
    "instagram": "https://reurl.cc/rkqEqN",
    "line": "https://line.me/ti/p/FerP6Itqrk",
    "approved": true,
    "active": true
  },
  {
    "id": "dian-ge-taichung",
    "displayName": "點哥",
    "cities": [
      "臺中市"
    ],
    "teachingAreas": [
      "臺中市"
    ],
    "levels": [
      "零基礎",
      "初學",
      "進階"
    ],
    "formats": [
      "一對一",
      "雙人",
      "團體"
    ],
    "introduction": "具備超過 20 年的運動競技教學經驗，擅長用容易理解的方式講解技巧，協助學員循序漸進學習匹克球。",
    "experience": "具有超過 20 年的運動競技教學經驗。",
    "qualifications": "匹克球丙級教練、田徑 C 級教練、排球 C 級教練。",
    "photo": "/images/coaches/dian-ge.webp",
    "lastConfirmed": "2026-10-26",
    "instagram": "https://www.instagram.com/gosaxon/",
    "line": "https://line.me/ti/p/OiAR1wGQrn",
    "approved": true,
    "active": true
  },
  {
    "id": "sauli-taipei",
    "displayName": "Sauli",
    "cities": [
      "臺北市",
      "新北市"
    ],
    "teachingAreas": [
      "臺北市",
      "新北市"
    ],
    "levels": [
      "零基礎",
      "初學",
      "進階",
      "競技"
    ],
    "formats": [
      "一對一",
      "雙人",
      "團體"
    ],
    "introduction": "Hello，我是 Sauli，提供雙北地區的匹克球教學。",
    "qualifications": "PPR L1、中華民國匹克球協會丙級教練證；於林口南勢國小指導社團，並與匹克啾、SP Pickleball 團隊合作。",
    "photo": "/images/coaches/sauli.webp",
    "lastConfirmed": "2026-10-26",
    "instagram": "https://www.instagram.com/pickleball_sauli/",
    "line": "https://line.me/ti/p/dD538VFwAc",
    "approved": true,
    "active": true
  }
];
