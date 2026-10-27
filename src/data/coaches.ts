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
  },
{
    "id": "elvin-taipei",
    "displayName": "Elvin",
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
      "進階"
    ],
    "formats": [
      "一對一",
      "雙人"
    ],
    "introduction": "具有約 7–8 年桌球教學經驗，接觸匹克球後同時投入桌球與匹克球教學。提供雙北地區的一對一與雙人課程，歡迎有興趣的學員洽詢試上。",
    "experience": "桌球教學經驗約 7–8 年；曾獲台中國際匹克球公開賽 4.0 級單打第三名。",
    "instagram": "https://www.instagram.com/_elvin526/",
    "line": "https://line.me/ti/p/K9fqCmyNRa",
    "lastConfirmed": "2026-10-26",
    "photo": "/images/coaches/elvin-taipei.webp",
    "approved": true,
    "active": true
  },
  {
    "id": "red-chen-taipei",
    "displayName": "Red Chen",
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
      "進階"
    ],
    "formats": [
      "一對一",
      "雙人",
      "團體"
    ],
    "introduction": "在臺北市、新北市提供匹克球初學、進階班及企業團體活動。具有約 8 年網球經驗、接觸匹克球約一年半；課程從握拍、站位、發球與 Dink，逐步進入第三拍、截擊及實戰對打，重視將動作拆解成容易理解的步驟。",
    "experience": "曾教授雙北初學與進階小班、6 人體驗課及企業團體課程；另具日本新潟地區單板滑雪授課經驗。",
    "qualifications": "PPR Level 1 匹克球教練；CASI Level 1 單板滑雪教練、CASI Park Level 1 單板公園教練。",
    "instagram": "https://www.instagram.com/red.snowboard.chen/",
    "line": "https://line.me/ti/p/ZXtrTkQF-T",
    "lastConfirmed": "2026-10-26",
    "photo": "/images/coaches/red-chen-taipei.webp",
    "approved": true,
    "active": true
  },
  {
    "id": "alex-new-taipei",
    "displayName": "阿政 Alex",
    "cities": [
      "新北市",
      "臺北市"
    ],
    "teachingAreas": [
      "新北市",
      "臺北市"
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
    "introduction": "接觸匹克球約 3 年，具有約 2 年教學經驗，善於觀察學員需要加強的部分，依照個人程度提供指導。主要提供臺北市、新北市的匹克球教學。",
    "experience": "2024 年起從事成人匹克球教學；2025 年 9 月起與匹克日合作；2026 年 9 月起與新北市板橋運動中心、Hoopers268 球館合作；曾擔任 2026 VOGUE TAIWAN wellness 匹克球運動會客座教練。",
    "qualifications": "丙級匹克球教練證。",
    "instagram": "https://www.instagram.com/3731alex/",
    "line": "https://line.me/ti/p/f_AqlUWN0o",
    "lastConfirmed": "2026-10-27",
    "photo": "/images/coaches/alex-new-taipei.webp",
    "approved": true,
    "active": true
  },
  {
    "id": "poyun-yunlin",
    "displayName": "PoYun",
    "cities": [
      "雲林縣"
    ],
    "teachingAreas": [
      "雲林縣"
    ],
    "levels": [
      "初學",
      "進階",
      "競技"
    ],
    "formats": [
      "一對一",
      "雙人",
      "團體"
    ],
    "introduction": "主要在雲林地區提供匹克球教學，歡迎附近想學球、加強技巧的朋友洽詢課程。",
    "experience": "學校匹克球社指導老師；申請時填寫的 DUPR Rating 為 4.6。",
    "qualifications": "中華民國匹克球協會丙級教練。",
    "line": "https://line.me/ti/p/ycFv6mWCTJ",
    "lastConfirmed": "2026-10-27",
    "photo": "/images/coaches/poyun-yunlin.webp",
    "approved": true,
    "active": true
  }
];
