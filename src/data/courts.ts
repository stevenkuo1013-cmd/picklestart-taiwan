export type CourtType = "室內" | "室外" | "風雨球場";

export type CourtPlace = {
  id: string;
  name: string;
  type: CourtType;
  address?: string | null;
  schedule: string;
  fee?: string | null;
  access: string;
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

export const courtCities: CourtCity[] = [
  {
    "region": "北部",
    "id": "taipei",
    "city": "台北市",
    "description": "公開場地與固定球聚選擇最多，室內、戶外都有；新手第一次前往仍建議先確認當日場次或報名方式。",
    "places": [
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
    "description": "運動中心與學校場地很多，多數固定球聚需要先加入群組或報名，新手不建議直接到場碰運氣。",
    "places": [
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
    "region": "中部",
    "id": "taichung",
    "city": "台中市",
    "description": "室內運動中心、活動中心與戶外球場都有固定球聚，可先依時段與是否需要報名來選。",
    "places": [
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
        "access": "會員制資訊請先確認"
      }
    ],
    "guideHref": null
  },
  {
    "region": "南部",
    "id": "kaohsiung",
    "city": "高雄市",
    "description": "室內活動中心與戶外公園都有固定球聚，新手可先依天候與場次選擇。",
    "places": [
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
