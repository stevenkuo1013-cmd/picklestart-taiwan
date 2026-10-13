export type CourtType = "室內" | "室外" | "風雨球場";
export type CourtOwnership = "private" | "community" | "public";
export type CourtSourceType = "official" | "directory";

export type CourtPlace = {
  id: string;
  name: string;
  type: CourtType;
  address?: string | null;
  schedule: string;
  fee?: string | null;
  access: string;
  /** 未標記者保留為「公共／球聚」分類，避免將舊資料誤認為新核實的私人球館。 */
  ownership?: CourtOwnership;
  /** 先以 Google 地標 ID、場館提供的地圖網址定位，剩餘的才搜尋場館名稱。 */
  googlePlaceId?: string;
  mapsUrl?: string;
  /** Google Maps 頁面上可見的場館名稱；只是改善搜尋字詞，不代表地標已核實。 */
  mapsSearchName?: string;
  /** 若名稱高度相近，說明搜尋結果應如何核對；不代表已取得精確地標 ID。 */
  mapsSearchHint?: string;
  /** 站方以瀏覽器實際開啟，確認「名稱與地址相符」的 Google Maps 商家資訊頁日期。
   *  此欄位不等於取得 Place ID，也不是對場館營運狀態的實地驗證。
   */
  mapLinkCheckedAt?: string;
  /** 每間場地獨立資料來源，避免所有場地共用協會來源。 */
  sourceUrl?: string;
  sourceType?: CourtSourceType;
  bookingUrl?: string;
  /** 僅指公開網頁核對日期，不代表實地確認營運。 */
  verifiedAt?: string;
};

export type CourtCity = {
  region: "北部" | "中部" | "南部";
  id: string;
  city: string;
  description: string;
  places: CourtPlace[];
  guideHref?: string | null;
};

export const COURT_SOURCE_URL = "https://pickleball.org.tw/stadium/";
export const COURT_VERIFIED_AT = "2026-10-03";
export const COURT_LAST_UPDATED_AT = "2026-10-14";
export const COURT_DISCOVERY_SOURCE_URL = "https://ipickleball.com.tw/places/";

export const courtCities: CourtCity[] = [
  {
    "region": "北部",
    "id": "taipei",
    "city": "台北市",
    "description": "台北有室內私人球館、開放式球局與公園球聚；想初次體驗，優先查看有線上預約的場館。",
    "places": [
      {
        "id": "pick-le-mode-neihu",
        "mapsUrl": "https://maps.app.goo.gl/c2cbHSwpHnEE2RLy6",
        "mapLinkCheckedAt": "2026-10-14",
        "mapsSearchName": "Pick Le Mode",
        "name": "Pick Le Mode 匹克模｜內湖匹克球體驗館",
        "type": "室內",
        "address": "台北市內湖區行愛路141巷38號3樓",
        "schedule": "官網可預約私人場地與 Open Play；實際空檔以系統為準",
        "fee": "依場次與時段計費，以官網現價為準",
        "access": "官網有預約與零打；提供體驗拍與練習球，第一次可先查看新手場次。",
        "ownership": "private",
        "bookingUrl": "https://picklemode.io/zh/",
        "sourceUrl": "https://picklemode.io/zh/faq",
        "sourceType": "official",
        "verifiedAt": "2026-10-12"
      },
      {
        "id": "downstairs-pickleball-club",
        "mapLinkCheckedAt": "2026-10-12",
        "name": "樓下匹克球俱樂部 Downstairs Pickleball Club",
        "type": "室內",
        "address": "台北市北投區石牌路一段71巷9弄19號B1",
        "schedule": "場地體驗採線上選擇時段；請以官網可預約時段為準",
        "fee": null,
        "access": "有體驗方案，預約前先看室內鞋規範與場地使用說明。",
        "ownership": "private",
        "googlePlaceId": "ChIJczOVm5ivQjQRIzYsVoGq4UA",
        "bookingUrl": "https://downstairspickleballclub.com/collections/all",
        "sourceUrl": "https://downstairspickleballclub.com/pages/contact",
        "sourceType": "official",
        "verifiedAt": "2026-10-12"
      },
      {
        "id": "zhishan-park",
        "name": "士林至善公園",
        "type": "室外",
        "address": "台北市士林區至善路一段",
        "schedule": "週二、四 18:30–22:00；週六、日 14:00–18:00",
        "fee": "免費",
        "access": "固定球聚，出發前建議再確認"
      },
      {
        "id": "jingmei-riverside",
        "name": "景美河濱球場",
        "type": "室外",
        "address": "台北市文山區",
        "schedule": "週六、日 07:00–11:30",
        "fee": "免費",
        "access": "固定時段球聚"
      },
      {
        "id": "tianmu-park",
        "name": "士林天母公園",
        "type": "室外",
        "address": "台北市士林區中山北路七段141巷旁",
        "schedule": "週一～五 08:30–12:00",
        "fee": "免費",
        "access": "固定時段球聚"
      },
      {
        "id": "taoyuan-elementary",
        "name": "北投桃源國小",
        "type": "室外",
        "address": "台北市北投區中央北路三段40巷45號",
        "schedule": "週六、日 09:00–12:00",
        "fee": "免費",
        "access": "學校場地，建議先確認當日開放"
      },
      {
        "id": "beitou-sports-center",
        "name": "北投運動中心",
        "type": "室內",
        "address": "台北市北投區石牌路一段39巷100號",
        "schedule": "週二、四 12:00–16:00；週六 16:00–18:00",
        "fee": "約 NT$200–300",
        "access": "建議先確認場次或報名方式"
      },
      {
        "id": "beitou-metro-resort",
        "name": "捷運北投會館",
        "type": "室內",
        "address": "台北市北投區大業路527巷88號",
        "schedule": "週一、五 13:00–17:00",
        "fee": "約 NT$200–300",
        "access": "建議先確認場次"
      },
      {
        "id": "ntut-zhongzheng",
        "name": "北科大中正館",
        "type": "室內",
        "address": "台北市大安區忠孝東路三段1號",
        "schedule": "週六、日 18:00–21:30",
        "fee": "約 NT$200–250",
        "access": "校園場地，建議先確認進場方式"
      },
      {
        "id": "yongchun-high",
        "name": "信義區永春高中",
        "type": "室內",
        "address": "台北市信義區松山路654號",
        "schedule": "週四 20:00–22:00；週五晚間場次",
        "fee": "依人數收取場租",
        "access": "學校場地，建議先確認報名方式"
      },
      {
        "id": "xinyi-sports-center",
        "name": "信義運動中心",
        "type": "室內",
        "address": "台北市信義區松勤街100號",
        "schedule": "週五 13:00–15:00",
        "fee": null,
        "access": "建議先確認場次"
      },
      {
        "id": "wanhua-sports-center",
        "name": "萬華運動中心",
        "type": "室內",
        "address": "台北市萬華區西寧南路6-1號",
        "schedule": "週三 16:00–18:00",
        "fee": "約 NT$150–200",
        "access": "建議先確認場次"
      },
      {
        "id": "nanhu-elementary",
        "name": "內湖區南湖國小",
        "type": "室內",
        "address": "台北市內湖區康寧路三段200號",
        "schedule": "週六 18:00–21:00；週日 18:00–22:00",
        "fee": "約 NT$250–300",
        "access": "需透過球友群組確認／報名"
      },
      {
        "id": "xingan-elementary",
        "name": "大安區幸安國小",
        "type": "室內",
        "address": "台北市大安區仁愛路三段22號",
        "schedule": "週六 16:00–20:00；週日 10:00–12:00",
        "fee": "約 NT$250–350",
        "access": "需透過球友群組確認／報名"
      },
      {
        "id": "penglai-elementary",
        "name": "大同區蓬萊國小",
        "type": "室外",
        "address": "台北市大同區寧夏路35號",
        "schedule": "週日 10:00–12:00",
        "fee": "約 NT$200–300",
        "access": "需透過球友群組確認／報名"
      },
      {
        "id": "zhongxiao-junior",
        "name": "大同區忠孝國中",
        "type": "室外",
        "address": "台北市大同區西寧北路32號",
        "schedule": "週日 15:00–17:00",
        "fee": null,
        "access": "費用資料需再確認"
      },
      {
        "id": "jiancheng-junior",
        "name": "建成國中",
        "type": "室外",
        "address": "台北市大同區長安西路37-1號",
        "schedule": "週四 20:00–22:00",
        "fee": "約 NT$200–300",
        "access": "有新手教學場次，建議先報名"
      },
      {
        "id": "mingde-junior",
        "name": "北投區明德國中",
        "type": "室外",
        "address": "台北市北投區明德路50號",
        "schedule": "週日 16:00–18:00",
        "fee": "約 NT$150–250",
        "access": "需透過球友群組確認／報名"
      },
      {
        "id": "guting-elementary",
        "name": "古亭國小",
        "type": "室內",
        "address": "台北市大安區羅斯福路三段201號",
        "schedule": "週六、日 17:00–20:00",
        "fee": "約 NT$200–300",
        "access": "需透過球友群組確認／報名"
      },
      {
        "id": "xinsheng-elementary",
        "name": "新生國小",
        "type": "室外",
        "address": "台北市大安區新生南路二段36號",
        "schedule": "週一、三 18:50–20:50",
        "fee": "約 NT$200–300",
        "access": "需透過球友群組確認／報名"
      },
      {
        "id": "changan-elementary",
        "name": "長安國小",
        "type": "室內",
        "address": "台北市中山區吉林路15號",
        "schedule": "週日 14:00–16:00",
        "fee": "約 NT$200–300",
        "access": "需透過球友群組確認／報名"
      },
      {
        "id": "mingchuan-elementary",
        "name": "銘傳國小",
        "type": "室外",
        "address": "台北市大安區羅斯福路四段21號",
        "schedule": "週四 17:50–19:50；週六 09:00–13:00",
        "fee": "約 NT$200–300",
        "access": "有新手教學場次，建議先報名"
      }
    ],
    "guideHref": "/guide/taipei-pickleball-courts"
  },
  {
    "region": "北部",
    "id": "new-taipei",
    "city": "新北市",
    "description": "新北涵蓋淡水、新莊與中和一帶的專業球館，也有公共運動中心球聚；可依交通及預約方式選擇。",
    "places": [
      {
        "id": "pdang-tamsui",
        "mapLinkCheckedAt": "2026-10-13",
        "name": "Triple Ace & P.DANG 皮蛋匹克球館",
        "type": "室內",
        "address": "新北市淡水區中山北路一段285巷5號",
        "schedule": "官網提供場地預約，請以目前可選時段為準",
        "fee": "場租依官方最新公告",
        "access": "室內場館採預約制；首次前往請確認進場與室內鞋規範。",
        "ownership": "private",
        "bookingUrl": "https://pdang.club/",
        "sourceUrl": "https://pdang.club/",
        "sourceType": "official",
        "verifiedAt": "2026-10-12"
      },
      {
        "id": "pickle-ing-xinzhuang",
        "mapsUrl": "https://maps.app.goo.gl/Rzu5UGpAHZoESEMW9",
        "mapLinkCheckedAt": "2026-10-14",
        "name": "YoYo匹克贏（Pickle Ing／匹克贏）",
        "mapsSearchName": "YoYo匹克贏",
        "mapsSearchHint": "Google Maps 目前有「YoYo匹克贏」與「匹克贏」等相近結果。請以 YOYO 招牌、泰山區新五路一段14-1號及場館聯絡資訊交叉確認；這是名稱搜尋，尚未取得可指定單一地標的 Place ID。",
        "type": "室內",
        "address": "新北市泰山區新五路一段14-1號",
        "schedule": "官方社群提供預約及聯絡入口，詳細時段請先詢問",
        "fee": null,
        "access": "位於新北市泰山區新五路一段14-1號；地址有場館介紹與公開名錄交叉核對，實際入場動線及場次仍請向館方確認。",
        "ownership": "private",
        "bookingUrl": "https://linktr.ee/pickleinn0601",
        "sourceUrl": "https://sp-pickleball.com/venues/pickle-ing-pickleball-court",
        "sourceType": "directory",
        "verifiedAt": "2026-10-12"
      },
      {
        "id": "pickle-day-zhonghe",
        "mapLinkCheckedAt": "2026-10-13",
        "name": "Pickle Day Social Club 匹克日俱樂部（中和）",
        "type": "室內",
        "address": "新北市中和區錦和路388號2樓",
        "schedule": "可線上查看租場、Open Play 與體驗課",
        "fee": null,
        "access": "第一次去可先看官方體驗課或 Open Play，確認是否接受新手。",
        "ownership": "private",
        "googlePlaceId": "ChIJiZ5WPQADaDQR9JgfEJ1UHrc",
        "bookingUrl": "https://tinybot.cc/pickledaysocial/shop/",
        "sourceUrl": "https://tinybot.cc/pickledaysocial/shop/",
        "sourceType": "official",
        "verifiedAt": "2026-10-12"
      },
      {
        "id": "dope-pickleball-xinzhuang",
        "mapLinkCheckedAt": "2026-10-13",
        "name": "DOPE 水獺綠洲匹克球俱樂部",
        "type": "室內",
        "address": "新北市新莊區新北大道四段210-2號",
        "schedule": "課程及其他場次請向場館或合作教練確認",
        "fee": null,
        "access": "可詢問課程、體驗與是否能借拍；第一次去請先報名或聯絡。",
        "ownership": "private",
        "googlePlaceId": "ChIJ4SpUosOnQjQRztprt1FEoKc",
        "sourceUrl": "https://sp-pickleball.com/venues/dope-pickleball-club",
        "sourceType": "directory",
        "verifiedAt": "2026-10-12"
      },
      {
        "id": "sanchong-sports-center",
        "name": "三重國民運動中心",
        "type": "室內",
        "address": "新北市三重區集美街55號",
        "schedule": "週一、四 13:00–16:00；週二 20:00–22:00",
        "fee": "約 NT$200–300",
        "access": "需先確認／報名"
      },
      {
        "id": "wugu-civic-hall",
        "name": "五股公民會館",
        "type": "室內",
        "address": "新北市五股區御史路1巷59號",
        "schedule": "週三午後至晚間有場次",
        "fee": "約 NT$120–170",
        "access": "需先確認／報名"
      },
      {
        "id": "xinzhuang-sports-center",
        "name": "新莊國民運動中心",
        "type": "室內",
        "address": "新北市新莊區公園路11號",
        "schedule": "週二、四 13:00–16:00",
        "fee": "約 NT$200–250",
        "access": "需先確認／報名"
      },
      {
        "id": "taishan-sports-center",
        "name": "泰山運動中心",
        "type": "室內",
        "address": "新北市泰山區全興路167號",
        "schedule": "週五 13:00–16:00",
        "fee": "約 NT$200–300",
        "access": "需先確認／報名"
      },
      {
        "id": "taishan-gym",
        "name": "泰山體育館",
        "type": "室內",
        "address": "新北市泰山區公園路54號",
        "schedule": "週六 17:00–20:00",
        "fee": "約 NT$250–300",
        "access": "需先確認／報名"
      },
      {
        "id": "xinpu-elementary",
        "name": "板橋新埔國小",
        "type": "室內",
        "address": "新北市板橋區陽明街206號",
        "schedule": "週三、五 18:00–20:00",
        "fee": "約 NT$250–350",
        "access": "有新手教學場次，建議先報名"
      },
      {
        "id": "bihua-junior",
        "name": "三重碧華國中",
        "type": "室內",
        "address": "新北市三重區三信路166號",
        "schedule": "週六 13:00–16:00",
        "fee": "約 NT$350–450",
        "access": "需先確認／報名"
      },
      {
        "id": "linkou-junior",
        "name": "林口國中",
        "type": "室內",
        "address": "新北市林口區民治路25號",
        "schedule": "週日 18:00–20:00",
        "fee": "約 NT$200–300",
        "access": "需先確認／報名"
      },
      {
        "id": "fuxing-elementary",
        "name": "復興國小",
        "type": "室內",
        "address": "新北市中和區復興路301巷6號",
        "schedule": "週二 18:40–20:40",
        "fee": "約 NT$250–350",
        "access": "需先確認／報名"
      },
      {
        "id": "jisu-elementary",
        "name": "積穗國小",
        "type": "室外",
        "address": "新北市中和區員山路154號",
        "schedule": "週五 18:30–21:30",
        "fee": "約 NT$200–300",
        "access": "需先確認／報名"
      },
      {
        "id": "sanxia-sports-center",
        "name": "三峽國民運動中心",
        "type": "室內",
        "address": "新北市三峽區文化路210巷12號",
        "schedule": "週一、二、五 18:00–22:00",
        "fee": "4 小時約 NT$400／人",
        "access": "可先向運動中心確認"
      },
      {
        "id": "yingge-sports-center",
        "name": "鶯歌國民運動中心",
        "type": "室內",
        "address": "新北市鶯歌區館前路250號",
        "schedule": "需事先電話預約",
        "fee": "離峰約 NT$290／面；尖峰約 NT$490／面",
        "access": "預約制"
      }
    ],
    "guideHref": null
  },
  {
    "region": "北部",
    "id": "taoyuan",
    "city": "桃園市",
    "description": "目前協會公開表列以固定團體時段為主，第一次前往應先約定，避免直接到場沒有球局。",
    "places": [
      {
        "id": "walybao-pickleball",
        "mapLinkCheckedAt": "2026-10-13",
        "name": "邷力豹 Pickleball",
        "type": "室內",
        "address": "桃園市蘆竹區中興路756巷109號",
        "schedule": "請向場館確認可用球場與預約時段",
        "fee": null,
        "access": "排球、匹克球複合場地；預約前請先確認匹克球場次。",
        "ownership": "private",
        "googlePlaceId": "ChIJf84b9iAhaDQRDG4QbZMZiU8",
        "bookingUrl": "https://www.aligh.co/zh-TW/venue/1723?sportId=2",
        "sourceUrl": "https://www.aligh.co/zh-TW/venue/1723?sportId=2",
        "sourceType": "official",
        "verifiedAt": "2026-10-12"
      },
      {
        "id": "yuan-ze-university",
        "name": "元智大學",
        "type": "室內",
        "address": "桃園市中壢區遠東路135號",
        "schedule": "不固定，需事先約定",
        "fee": "3 小時約 NT$150；停車另計",
        "access": "需事先聯絡約定"
      }
    ],
    "guideHref": null
  },
  {
    "region": "北部",
    "id": "hsinchu-county",
    "city": "新竹縣",
    "description": "先收錄官方資訊可查的新竹專業匹克球館；其他場地待核實後擴充。",
    "places": [
      {
        "id": "p9-multisport-hsinchu",
        "mapLinkCheckedAt": "2026-10-12",
        "name": "P9 複合式運動競技館",
        "mapsSearchName": "P9複合式運動競技館",
        "type": "室內",
        "address": "新竹縣寶山鄉福德街13-1號",
        "schedule": "第三方公開名錄有收錄，場地與預約時段請向館方確認",
        "fee": null,
        "access": "複合運動場館；確認是否有匹克球專用時段和新手可否預約。",
        "ownership": "private",
        "sourceUrl": "https://picklemastertw.com/courts/indoor/",
        "sourceType": "directory",
        "verifiedAt": "2026-10-12"
      },
      {
        "id": "ppclub-hsinchu",
        "mapLinkCheckedAt": "2026-10-12",
        "name": "PPClub 酸黃瓜匹克球場",
        "type": "室內",
        "address": "新竹縣寶山鄉大崎一路195-9號",
        "schedule": "公開名錄列為需預約的室內場館，詳情請向館方確認",
        "fee": null,
        "access": "比對公開場館名錄及球具合作商資訊；請先確認實際入場與預約方式。",
        "ownership": "private",
        "googlePlaceId": "ChIJmeHKPABJaDQROO-Cv4S4ZL8",
        "sourceUrl": "https://picklemastertw.com/courts/indoor/",
        "sourceType": "directory",
        "verifiedAt": "2026-10-12"
      },
      {
        "id": "inazuma-pickleball",
        "mapLinkCheckedAt": "2026-10-13",
        "name": "INAZUMA 閃電匹克館",
        "type": "室內",
        "address": "新竹縣寶山鄉寶山路二段568之3號",
        "schedule": "官網提供線上預約、課程與活動資訊",
        "fee": null,
        "access": "官方資訊指出有球拍租借，需押證件或押金；預約後再前往。",
        "ownership": "private",
        "bookingUrl": "https://inazumaclub.com/",
        "sourceUrl": "https://inazumaclub.com/pages/faq",
        "sourceType": "official",
        "verifiedAt": "2026-10-12"
      }
    ],
    "guideHref": null
  },
  {
    "region": "中部",
    "id": "taichung",
    "city": "台中市",
    "description": "台中有南屯、北屯、烏日等區的付費室內場館，與固定球敘並存；建議先查清楚是否可以單人加入。",
    "places": [
      {
        "id": "picklepark-beitun",
        "mapLinkCheckedAt": "2026-10-12",
        "name": "PicklePark 匹克公園｜北屯場",
        "mapsSearchName": "PicklePark 匹克公園室內匹克球場 北屯場",
        "type": "室內",
        "address": "台中市北屯區敦和路125號",
        "schedule": "場地可依公開的場館聯絡資訊洽詢",
        "fee": null,
        "access": "付費室內場地；想單人加入，先向場館詢問零打／揪團方式。",
        "ownership": "private",
        "googlePlaceId": "ChIJhSkpxMQXaTQRxNhz1nKd4RA",
        "sourceUrl": "https://www.safeone.com.tw/pages/stores",
        "sourceType": "directory",
        "verifiedAt": "2026-10-12"
      },
      {
        "id": "pickle-king-nantun",
        "mapLinkCheckedAt": "2026-10-13",
        "name": "PICKLE KING 匹克王運動餐酒館",
        "mapsUrl": "https://maps.app.goo.gl/VYwDqcLsirmGZGJo9",
        "type": "室內",
        "address": "台中市南屯區環中路四段2號",
        "schedule": "官方 LINE 可洽詢訂場與球友交流",
        "fee": null,
        "access": "結合匹克球與餐飲的場館；預約、場地數與費用以場館官方確認為準。",
        "ownership": "private",
        "bookingUrl": "https://page.line.me/772wlyoq",
        "sourceUrl": "https://page.line.me/772wlyoq",
        "sourceType": "official",
        "verifiedAt": "2026-10-12"
      },
      {
        "id": "goodink-taichung",
        "mapLinkCheckedAt": "2026-10-13",
        "name": "GooDink 匹克球俱樂部",
        "type": "室內",
        "address": "台中市西屯區甘河路108號",
        "schedule": "公開店家資料提供社群預約資訊，實際場次以館方為準",
        "fee": null,
        "access": "公開店家資料列有場館 IG 與地址；首次前往請先詢問是否開放新手及借拍。",
        "ownership": "private",
        "bookingUrl": "https://www.instagram.com/goodink.pickleball/",
        "sourceUrl": "https://www.safeone.com.tw/pages/stores",
        "sourceType": "directory",
        "verifiedAt": "2026-10-12"
      },
      {
        "id": "sunset-pickleball-taichung",
        "mapLinkCheckedAt": "2026-10-13",
        "name": "日落匹克球 Sunset Pickleball",
        "type": "室內",
        "address": "台中市南屯區嶺東路109-12號",
        "schedule": "第三方場地資料指出可線上預約，詳細安排請與場館確認",
        "fee": null,
        "access": "公開名錄列為付費室內球館；線上預約入口尚待官方核對。",
        "ownership": "private",
        "sourceUrl": "https://picklemastertw.com/courts/indoor/",
        "sourceType": "directory",
        "verifiedAt": "2026-10-12"
      },
      {
        "id": "pb-club-wuri",
        "mapLinkCheckedAt": "2026-10-12",
        "name": "匹克領域 PB-Club",
        "type": "室內",
        "address": "台中市烏日區溪南路一段348巷33號",
        "schedule": "第三方名錄顯示有預約制；實際空檔請向球館確認",
        "fee": null,
        "access": "公開名錄列有室內球場；首次前往先核對地址與最新預約方式。",
        "ownership": "private",
        "googlePlaceId": "ChIJnZ5sEAA7aTQR5EJmLywqYFE",
        "sourceUrl": "https://picklemastertw.com/courts/indoor/",
        "sourceType": "directory",
        "verifiedAt": "2026-10-12"
      },
      {
        "id": "lala-dink",
        "name": "LaLa Dink Pickleball Club",
        "type": "室內",
        "address": "台中市南屯區文心南三路996巷1號",
        "schedule": "球場可線上預約；另有 Open Play 與體驗課選項",
        "fee": null,
        "access": "官方預約頁有租場、Open Play 與課程，可先依需求挑選。",
        "ownership": "private",
        "mapsUrl": "https://maps.app.goo.gl/stnu6v7x1CuVbt6bA",
        "mapLinkCheckedAt": "2026-10-13",
        "bookingUrl": "https://tinybot.cc/laladink/product-category/book-now/",
        "sourceUrl": "https://tinybot.cc/laladink/info/",
        "sourceType": "official",
        "verifiedAt": "2026-10-12"
      },
      {
        "id": "tanzi-sports-center",
        "name": "潭子國民運動中心",
        "type": "室內",
        "address": "台中市潭子區勝利路140號",
        "schedule": "週一 09:00–11:00",
        "fee": null,
        "access": "建議先確認群組或場次"
      },
      {
        "id": "taichung-tennis-center",
        "name": "台中國際網球中心",
        "type": "室外",
        "address": "台中市北屯區祥順二路224號",
        "schedule": "週三、五 19:00–21:00",
        "fee": "每次約 NT$130",
        "access": "有固定球聚"
      },
      {
        "id": "laixing-community-center",
        "name": "賴興里活動中心",
        "type": "室內",
        "address": "台中市北區山西路二段125號",
        "schedule": "週日 15:00–17:00",
        "fee": null,
        "access": "有報名入口，建議先報名"
      }
    ],
    "guideHref": null
  },
  {
    "region": "中部",
    "id": "changhua",
    "city": "彰化縣",
    "description": "協會目前列有多個固定戶外球聚，場次清楚且多為免費，仍建議出發前確認是否因天候調整。",
    "places": [
      {
        "id": "napa-huatan",
        "mapLinkCheckedAt": "2026-10-13",
        "name": "NAPA 匹克球｜花壇館",
        "type": "室內",
        "address": "彰化縣花壇鄉金墩村中山路一段335號",
        "schedule": "曾辦理公開匹克球賽事；一般訂場、營運時段請另行確認",
        "fee": null,
        "access": "賽事章程可確認場地位置，但未能核實一般散客訂場方式；不要直接前往。",
        "ownership": "private",
        "sourceUrl": "https://vicvoy.com/tournament/regulations/387",
        "sourceType": "directory",
        "verifiedAt": "2026-10-12"
      },
      {
        "id": "zhongzhang-sports-park",
        "name": "中彰運動公園",
        "type": "室外",
        "address": "彰化縣彰化市彰南路三段85號",
        "schedule": "週一 19:00–22:00",
        "fee": "免費",
        "access": "固定球聚"
      },
      {
        "id": "xiushui-park",
        "name": "彰化秀水公園",
        "type": "室外",
        "address": "彰化縣秀水鄉復新街",
        "schedule": "週二、四 19:00–21:30",
        "fee": "免費",
        "access": "固定球聚"
      },
      {
        "id": "yanping-park",
        "name": "彰化延平公園",
        "type": "室外",
        "address": "彰化縣彰化市文心街",
        "schedule": "週三、五、六 14:30–17:30",
        "fee": "免費",
        "access": "固定球聚"
      }
    ],
    "guideHref": null
  },
  {
    "region": "中部",
    "id": "yunlin",
    "city": "雲林縣",
    "description": "新加入雲林私營球館候選，建議先向場館取得正式預約方式與導航位置。",
    "places": [
      {
        "id": "pk-park-yunlin",
        "mapLinkCheckedAt": "2026-10-13",
        "name": "PK Park 匹克球館",
        "mapsUrl": "https://maps.app.goo.gl/2tM4uuAzJawyy7dw6",
        "type": "室內",
        "address": "雲林縣虎尾鎮興南里30-6號",
        "schedule": "官方入口提供加入會員、預約及球友社群",
        "fee": null,
        "access": "雲林專業球館；合作商門市資訊提供地址，仍請透過官方預約確認入口與場次。",
        "ownership": "private",
        "bookingUrl": "https://linktr.ee/pkpark2026",
        "sourceUrl": "https://linktr.ee/pkpark2026",
        "sourceType": "official",
        "verifiedAt": "2026-10-12"
      }
    ],
    "guideHref": null
  },
  {
    "region": "中部",
    "id": "nantou",
    "city": "南投縣",
    "description": "埔里一帶有戶外、風雨球場與室內場地，可依天候與時段選擇。",
    "places": [
      {
        "id": "geographic-center-badminton",
        "name": "地理中心碑羽球場",
        "type": "室外",
        "address": "南投縣埔里鎮中山路一段421號",
        "schedule": "週六、日",
        "fee": "免費",
        "access": "固定週末球聚，時段建議再確認"
      },
      {
        "id": "puli-comprehensive-court",
        "name": "埔里鎮立綜合球場",
        "type": "風雨球場",
        "address": "南投縣埔里鎮六合路228號",
        "schedule": "週一～五 15:00–20:00；週六、日 09:00–12:00",
        "fee": "免費",
        "access": "固定球聚"
      },
      {
        "id": "puli-elementary",
        "name": "埔里國小",
        "type": "室內",
        "address": "南投縣埔里鎮西康路127號",
        "schedule": "週二、四、五 18:00–20:00",
        "fee": null,
        "access": "學校場地，建議先確認進場方式"
      }
    ],
    "guideHref": null
  },
  {
    "region": "南部",
    "id": "chiayi",
    "city": "嘉義市",
    "description": "協會目前公開列有例假日租用型場地，是否開團會依實際租場狀況，出發前一定要先確認。",
    "places": [
      {
        "id": "chiayi-special-education",
        "name": "嘉義特殊教育學校",
        "type": "室內",
        "address": "嘉義市西區港坪里世賢路二段123號",
        "schedule": "例假日租場，有租用才開團",
        "fee": null,
        "access": "不是固定每天開放，需先聯絡確認"
      }
    ],
    "guideHref": null
  },
  {
    "region": "南部",
    "id": "tainan",
    "city": "台南市",
    "description": "目前協會公開資料有固定公園球聚與專用／私人場地，新手出發前仍建議確認當日活動與加入方式。",
    "places": [
      {
        "id": "yuchao-jingpai-yongkang",
        "mapsUrl": "https://maps.app.goo.gl/jFJhe66dgg2BoVDs9",
        "mapLinkCheckedAt": "2026-10-14",
        "mapsSearchName": "羽潮匹克球運動休閒館 永康勁拍館",
        "name": "羽潮匹克球｜永康勁拍館",
        "type": "室內",
        "address": "台南市永康區中正南路378-2號",
        "schedule": "公開營運公告顯示有場地預約與 Open Play；實際時段以官方預約系統為準",
        "fee": null,
        "access": "場館營運方於 2026 年公布永康勁拍館的匹克球場與下午 Open Play；先查是否有新手名額和可預約時間。",
        "ownership": "private",
        "bookingUrl": "https://badminton.yuchung.com.tw/index.php",
        "sourceUrl": "https://www.localgymsandfitness.com/TW/Tainan/105637705744439/%E7%BE%BD%E6%BD%AE%E7%BE%BD%E7%90%83%E9%81%8B%E5%8B%95%E4%BC%91%E9%96%92%E9%A4%A8-24h",
        "sourceType": "directory",
        "verifiedAt": "2026-10-12"
      },
      {
        "id": "antler-club-yongkang",
        "mapLinkCheckedAt": "2026-10-13",
        "name": "鹿角俱樂部｜永康館",
        "type": "室內",
        "address": "台南市永康區尚頂路68號",
        "schedule": "NPA 全民匹克球學院公開活動有在此安排新手球局；請先完成活動報名",
        "fee": null,
        "access": "活動主辦方有新手友善臨打團資訊，非保證每天可直接入場；可先查主辦方活動頁。",
        "ownership": "private",
        "bookingUrl": "https://www.npa.com.tw/",
        "sourceUrl": "https://www.npa.com.tw/",
        "sourceType": "directory",
        "verifiedAt": "2026-10-12"
      },
      {
        "id": "heavy-dinker-tainan",
        "mapLinkCheckedAt": "2026-10-13",
        "name": "Heavy Dinker",
        "type": "室內",
        "address": "台南市南區鯤鯓路26-9號",
        "schedule": "預約方式與開放時段請向場館確認",
        "fee": null,
        "access": "第三方名錄有收錄；出發前請再核實預約入口及室內外條件。",
        "ownership": "private",
        "sourceUrl": "https://picklemastertw.com/courts/court-174/",
        "sourceType": "directory",
        "verifiedAt": "2026-10-12"
      },
      {
        "id": "huafu-court",
        "name": "華府球場",
        "type": "室外",
        "address": null,
        "schedule": "每日 08:00–22:00",
        "fee": null,
        "access": "地址請以最新聯絡資訊確認"
      },
      {
        "id": "zhenxing-park",
        "name": "振興公園",
        "type": "室外",
        "address": "台南市北區林森路三段181號",
        "schedule": "週一、三 19:00–21:00",
        "fee": null,
        "access": "固定球聚，出發前建議再確認"
      },
      {
        "id": "dafu-cheng",
        "name": "大府城",
        "type": "室外",
        "address": null,
        "schedule": "每日 07:00–10:00、16:00–19:00",
        "fee": null,
        "access": "地址請以最新聯絡資訊確認"
      },
      {
        "id": "hahanar-court",
        "name": "哈赫拿爾匹克球場",
        "type": "室外",
        "address": "台南市南區體育路90號",
        "schedule": "平日 07:00–09:00、17:00–22:00；假日 07:00–11:00、17:00–22:00",
        "fee": "入會費 NT$1,000；年費 NT$1,200",
        "access": "會員制資訊請先確認",
        "ownership": "community"
      }
    ],
    "guideHref": null
  },
  {
    "region": "南部",
    "id": "kaohsiung",
    "city": "高雄市",
    "description": "高雄除公園與活動中心球聚，也有三民與鳥松的預約制場館；優先確認新手體驗及交通入口。",
    "places": [
      {
        "id": "clike-kaohsiung",
        "mapLinkCheckedAt": "2026-10-13",
        "mapsSearchName": "CLiKE CLUB",
        "name": "CLiKE CLUB 高雄克萊克",
        "type": "室內",
        "address": "高雄市三民區通化街111-1號",
        "schedule": "官網查詢 A／B／V 場地可預約時段",
        "fee": "依場地、會員方案與時段計費；以官網為準",
        "access": "有標準場地及會員預約系統，建議先看新手課或向球館詢問體驗方式。",
        "ownership": "private",
        "bookingUrl": "https://www.clike.club/room",
        "sourceUrl": "https://www.clike.club/room",
        "sourceType": "official",
        "verifiedAt": "2026-10-12"
      },
      {
        "id": "pick-me-kaohsiung",
        "mapLinkCheckedAt": "2026-10-13",
        "mapsSearchName": "PICK ME 匹克球館",
        "mapsSearchHint": "門牌目前僅由第三方公開名錄提供，官方 Linktree 尚未直接確認。請核對 Google Maps 商家名稱及灣興街39巷9號，不要把搜尋結果當成已驗證地標。",
        "name": "PICK.ME 室內匹克球場",
        "type": "室內",
        "address": "高雄市三民區灣興街39巷9號",
        "schedule": "官方社群提供包場及 Open Play 聯絡方式",
        "fee": null,
        "access": "官方提供包場及 Open Play 聯絡入口；灣興街39巷9號來自第三方名錄，正式地址與入口請先向場館確認。",
        "ownership": "private",
        "bookingUrl": "https://linktr.ee/PICK.ME.KHH",
        "sourceUrl": "https://picklemastertw.com/courts/indoor/",
        "sourceType": "directory",
        "verifiedAt": "2026-10-13"
      },
      {
        "id": "dinkers-kaohsiung",
        "mapLinkCheckedAt": "2026-10-13",
        "name": "Dinkers 丁克斯匹克球場",
        "type": "室內",
        "address": "高雄市鳥松區松埔北巷32號之12",
        "schedule": "球局與開放時段以官方社群或預約公告為準",
        "fee": null,
        "access": "可從場館提供的 LINE／社群詢問新手場次，再決定是否前往。",
        "ownership": "private",
        "mapsUrl": "https://maps.app.goo.gl/AtXSezMDFhq7rASj7",
        "bookingUrl": "https://linktr.ee/dinkerskhh",
        "sourceUrl": "https://trainge.com/tw/gymtrainer/dinkers",
        "sourceType": "directory",
        "verifiedAt": "2026-10-12"
      },
      {
        "id": "zhengqin-community-center",
        "name": "正勤活動中心",
        "type": "室內",
        "address": "高雄市前鎮區中華五路969巷12號",
        "schedule": "週一、三 17:00–20:00",
        "fee": null,
        "access": "固定球聚，出發前建議再確認"
      },
      {
        "id": "sanmin-park-kaohsiung",
        "name": "三民公園",
        "type": "室外",
        "address": "高雄市三民區十全一路100號",
        "schedule": "週三、日 18:00–21:00",
        "fee": null,
        "access": "固定球聚，出發前建議再確認"
      }
    ],
    "guideHref": null
  },
  {
    "region": "南部",
    "id": "pingtung",
    "city": "屏東縣",
    "description": "目前協會公開資訊以歸來球場固定球聚為主，第一次前往建議先確認當日是否正常開打。",
    "places": [
      {
        "id": "guilai-pickleball-court",
        "name": "屏東歸來匹克球場",
        "type": "室外",
        "address": "屏東縣屏東市歸仁路63巷70號",
        "schedule": "週一～五 18:30 起；週六、日 16:30 起",
        "fee": null,
        "access": "固定球聚，出發前建議再確認"
      }
    ],
    "guideHref": null
  }
];
