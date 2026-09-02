export type KanjiVocabularyItem = {
  word: string;
  reading: string;
  meaning: string;
};

export type KanjiVocabulary = {
  kanji: string;
  vocabulary: KanjiVocabularyItem[];
};

export const kanjiChapter2: KanjiVocabulary[] = [
  {
    kanji: "駐",
    vocabulary: [
      {
        word: "駐在",
        reading: "ちゅうざい",
        meaning: "နေထိုင်ခြင်း",
      },
      {
        word: "駐車禁止",
        reading: "ちゅうしゃきんし",
        meaning: "ကားမရပ်ရ",
      },
      {
        word: "駐日大使",
        reading: "ちゅうにちたいし",
        meaning: "ဂျပန်နိုင်ငံဆိုင်ရာ သံအမတ်",
      },
    ],
  },

  {
    kanji: "輪",
    vocabulary: [
      {
        word: "輪",
        reading: "わ",
        meaning: "စက်ဝိုင်း",
      },
      {
        word: "指輪",
        reading: "ゆびわ",
        meaning: "လက်စွပ်",
      },
      {
        word: "花輪",
        reading: "はなわ",
        meaning: "ပန်းကုံးခွေ",
      },
      {
        word: "車輪",
        reading: "しゃりん",
        meaning: "ကားဘီး",
      },
      {
        word: "三輪車",
        reading: "さんりんしゃ",
        meaning: "သုံးဘီးယာဉ်",
      },
      {
        word: "駐輪",
        reading: "ちゅうりん",
        meaning: "စက်ဘီးရပ်ခြင်း",
      },
      {
        word: "前輪",
        reading: "ぜんりん",
        meaning: "ရှေ့ဘီး",
      },
      {
        word: "後輪",
        reading: "こうりん",
        meaning: "နောက်ဘီး",
      },
      {
        word: "一輪",
        reading: "いちりん",
        meaning: "ဘီးတစ်ဘီး",
      },
    ],
  },

  {
    kanji: "港",
    vocabulary: [
      {
        word: "港",
        reading: "みなと",
        meaning: "ဆိပ်ကမ်း",
      },
      {
        word: "神戸港",
        reading: "こうべこう",
        meaning: "ကိုဘေးဆိပ်ကမ်း",
      },
      {
        word: "漁港",
        reading: "ぎょこう",
        meaning: "ငါးဖမ်းဆိပ်ကမ်း",
      },
      {
        word: "出港",
        reading: "しゅっこう",
        meaning: "ဆိပ်ကမ်းမှ ထွက်စွာခြင်း",
      },
      {
        word: "空港",
        reading: "くうこう",
        meaning: "လေဆိပ်",
      },
      {
        word: "香港",
        reading: "ほんこん",
        meaning: "ဟောင်ကောင်မြို့",
      },
    ],
  },

  {
    kanji: "到",
    vocabulary: [
      {
        word: "到着",
        reading: "とうちゃく",
        meaning: "ဆိုက်ရောက်ခြင်း",
      },
      {
        word: "到達",
        reading: "とうたつ",
        meaning: "ဆိုက်ရောက်ခြင်း",
      },
      {
        word: "殺到",
        reading: "さっとう",
        meaning: "စုပြုံဝင်လာခြင်း",
      },
      {
        word: "用意周到",
        reading: "よういしゅうとう",
        meaning: "ကောင်းမွန်စွာ ကြိုတင်ပြင်ဆင်ခြင်း",
      },
    ],
  },

  {
    kanji: "途",
    vocabulary: [
      {
        word: "途中",
        reading: "とちゅう",
        meaning: "လမ်းတစ်ဝက်",
      },
      {
        word: "発展途上国",
        reading: "はってんとじょうこく",
        meaning: "ဖွံ့ဖြိုးဆဲနိုင်ငံ",
      },
      {
        word: "中途半端",
        reading: "ちゅうとはんぱ",
        meaning: "တစ်ဝက်တစ်ပျက်",
      },
      {
        word: "途方にくれる",
        reading: "とほうにくれる",
        meaning: "ဘာဆက်လုပ်ရမှန်းမသိ ဖြစ်သည်",
      },
      {
        word: "前途多難",
        reading: "ぜんとたなん",
        meaning: "အခက်အခဲများစွာဖြစ်ခြင်း",
      },
    ],
  },

  {
    kanji: "過",
    vocabulary: [
      {
        word: "過ぎる",
        reading: "すぎる",
        meaning: "ကျော်လွန်သည်",
      },
      {
        word: "過ごす",
        reading: "すごす",
        meaning: "ကျော်လွန်စေသည်",
      },
      {
        word: "過つ",
        reading: "あやまつ",
        meaning: "မှားသည်",
      },
      {
        word: "過ち",
        reading: "あやまち",
        meaning: "အမှား",
      },
      {
        word: "通過",
        reading: "つうか",
        meaning: "ဖြတ်သန်းခြင်း",
      },
      {
        word: "過去",
        reading: "かこ",
        meaning: "အတိတ်",
      },
      {
        word: "過半数",
        reading: "かはんすう",
        meaning: "အများစုသော",
      },
    ],
  },

  {
    kanji: "符",
    vocabulary: [
      {
        word: "切符",
        reading: "きっぷ",
        meaning: "လက်မှတ်",
      },
      {
        word: "音符",
        reading: "おんぷ",
        meaning: "ဂီတနုတ်",
      },
      {
        word: "符号",
        reading: "ふごう",
        meaning: "သင်္ကေတ",
      },
    ],
  },

  {
    kanji: "停",
    vocabulary: [
      {
        word: "停車",
        reading: "ていしゃ",
        meaning: "ယာဉ်ရပ်ခြင်း",
      },
      {
        word: "停留所",
        reading: "ていりゅうじょ",
        meaning: "ယာဉ်ရပ်ရန်နေရာ (ဘူတာ၊ မှတ်တိုင်)",
      },
      {
        word: "各駅停車",
        reading: "かくえきていしゃ",
        meaning: "ဘူတာတိုင်းရပ်သည့် ရထား",
      },
      {
        word: "停止",
        reading: "ていし",
        meaning: "ရပ်တန့်ခြင်း",
      },
      {
        word: "停滞",
        reading: "ていたい",
        meaning: "ကြန့်ကြာခြင်း",
      },
      {
        word: "停学",
        reading: "ていがく",
        meaning: "ကျောင်းထုတ်ခံရခြင်း / ကျောင်းနားခံရခြင်း",
      },
      {
        word: "停戦",
        reading: "ていせん",
        meaning: "အပစ်အခတ်ရပ်စဲခြင်း",
      },
      {
        word: "停電",
        reading: "ていでん",
        meaning: "မီးပျက်ခြင်း",
      },
    ],
  },

  {
    kanji: "標",
    vocabulary: [
      {
        word: "目標",
        reading: "もくひょう",
        meaning: "ရည်ရွယ်ချက်",
      },
      {
        word: "標準",
        reading: "ひょうじゅん",
        meaning: "စံနှုန်း",
      },
      {
        word: "道路標識",
        reading: "どうろひょうしき",
        meaning: "လမ်းဆိုင်းဘုတ်",
      },
      {
        word: "標本",
        reading: "ひょうほん",
        meaning: "ဥပမာ / နမူနာ",
      },
      {
        word: "標語",
        reading: "ひょうご",
        meaning: "ဆောင်ပုဒ်၊ ကြွေးကြော်သံ",
      },
    ],
  },

  {
    kanji: "普",
    vocabulary: [
      {
        word: "普通",
        reading: "ふつう",
        meaning: "သာမန်၊ ပုံမှန်",
      },
      {
        word: "普段着",
        reading: "ふだんぎ",
        meaning: "နေ့စဉ်ဝတ် အဝတ်အစား",
      },
      {
        word: "普及",
        reading: "ふきゅう",
        meaning: "ပျံ့နှံ့လာခြင်း",
      },
      {
        word: "普遍的",
        reading: "ふへんてき",
        meaning: "အများဆုံးဖြစ်သော / ဘက်စုံဖြစ်သော",
      },
    ],
  },

  {
    kanji: "刻",
    vocabulary: [
      {
        word: "刻む",
        reading: "きざむ",
        meaning: "ပါးပါးလှီးသည်",
      },
      {
        word: "彫刻",
        reading: "ちょうこく",
        meaning: "ပန်းပု",
      },
      {
        word: "遅刻",
        reading: "ちこく",
        meaning: "နောက်ကျခြင်း",
      },
      {
        word: "時刻",
        reading: "じこく",
        meaning: "အချိန်ကာလ",
      },
      {
        word: "定刻",
        reading: "ていこく",
        meaning: "အချိန်ဇယား",
      },
      {
        word: "深刻な",
        reading: "しんこくな",
        meaning: "လေးနက်သော",
      },
    ],
  },

  {
    kanji: "違",
    vocabulary: [
      {
        word: "違う",
        reading: "ちがう",
        meaning: "မှားယွင်းသည်",
      },
      {
        word: "違える",
        reading: "ちがえる",
        meaning: "မှားယွင်းစေသည်",
      },
      {
        word: "交通違反",
        reading: "こうつういはん",
        meaning: "ယာဉ်စည်းကမ်း ချိုးဖောက်ခြင်း",
      },
      {
        word: "違法",
        reading: "いほう",
        meaning: "ဥပဒေချိုးဖောက်ခြင်း",
      },
      {
        word: "相違点",
        reading: "そういてん",
        meaning: "ကွာခြားချက်",
      },
      {
        word: "違和感",
        reading: "いわかん",
        meaning: "သက်တောင့်သက်သာ မရှိသော",
      },
    ],
  },

  {
    kanji: "漁",
    vocabulary: [
      {
        word: "漁業",
        reading: "ぎょぎょう",
        meaning: "ငါးဖမ်းလုပ်ငန်း",
      },
      {
        word: "漁村",
        reading: "ぎょそん",
        meaning: "တံငါရွာ",
      },
      {
        word: "漁港",
        reading: "ぎょこう",
        meaning: "ငါးဖမ်းဆိပ်ကမ်း",
      },
      {
        word: "漁船",
        reading: "ぎょせん",
        meaning: "ငါးဖမ်းလှေ",
      },
      {
        word: "漁",
        reading: "りょう",
        meaning: "ငါးဖမ်းခြင်း",
      },
      {
        word: "漁師",
        reading: "りょうし",
        meaning: "ငါးဖမ်းသမား",
      },
      {
        word: "大漁",
        reading: "たいりょう",
        meaning: "ငါးအကြီးကြီး",
      },
    ],
  },

  {
    kanji: "輸",
    vocabulary: [
      {
        word: "輸出",
        reading: "ゆしゅつ",
        meaning: "တင်ပို့ခြင်း",
      },
      {
        word: "輸入",
        reading: "ゆにゅう",
        meaning: "တင်သွင်းခြင်း",
      },
      {
        word: "輸送",
        reading: "ゆそう",
        meaning: "သယ်ယူပို့ဆောင်ခြင်း",
      },
      {
        word: "輸血",
        reading: "ゆけつ",
        meaning: "သွေးသွင်းခြင်း",
      },
      {
        word: "空輸",
        reading: "くうゆ",
        meaning: "လေကြောင်းဖြင့် ပို့ခြင်း",
      },
      {
        word: "密輸",
        reading: "みつゆ",
        meaning: "မှောင်ခို",
      },
    ],
  },

  {
    kanji: "製",
    vocabulary: [
      {
        word: "新製品",
        reading: "しんせいひん",
        meaning: "ထုတ်ကုန်သစ်",
      },
      {
        word: "製作",
        reading: "せいさく",
        meaning: "ထုတ်လုပ်ခြင်း",
      },
      {
        word: "イタリア製",
        reading: "イタリアせい",
        meaning: "အီတလီနိုင်ငံထုတ်",
      },
      {
        word: "製造年月日",
        reading: "せいぞうねんがっぴ",
        meaning: "ထုတ်လုပ်သည့်ရက်စွဲ",
      },
      {
        word: "木製",
        reading: "もくせい",
        meaning: "သစ်သားဖြင့်ပြုလုပ်ခြင်း",
      },
      {
        word: "複製",
        reading: "ふくせい",
        meaning: "ပြန်လည်ပြုလုပ်၊ ထုတ်လုပ်ခြင်း",
      },
    ],
  },

  {
    kanji: "郵",
    vocabulary: [
      {
        word: "郵便局",
        reading: "ゆうびんきょく",
        meaning: "စာတိုက်",
      },
      {
        word: "郵便",
        reading: "ゆうびん",
        meaning: "စာပို့ခြင်း",
      },
      {
        word: "郵送",
        reading: "ゆうそう",
        meaning: "ပို့ခြင်း",
      },
    ],
  },

  {
    kanji: "航",
    vocabulary: [
      {
        word: "航海",
        reading: "こうかい",
        meaning: "ရွက်လွှင့်ခြင်း",
      },
      {
        word: "航空機",
        reading: "こうくうき",
        meaning: "လေယာဉ်",
      },
      {
        word: "航空便",
        reading: "こうくうびん",
        meaning: "လေကြောင်းစာ",
      },
      {
        word: "航路",
        reading: "こうろ",
        meaning: "ရေ၊ လေလမ်းကြောင်း",
      },
      {
        word: "欠航",
        reading: "けっこう",
        meaning: "လေယာဉ်မထွက်ခြင်း",
      },
      {
        word: "難航",
        reading: "なんこう",
        meaning: "ရေလမ်းကြမ်းခြင်း",
      },
    ],
  },

  {
    kanji: "融",
    vocabulary: [
      {
        word: "金融機関",
        reading: "きんゆうきかん",
        meaning: "ငွေရေးကြေးရေးယန္တရား",
      },
      {
        word: "融資",
        reading: "ゆうし",
        meaning: "ငွေထုတ်ချေးပေးခြင်း",
      },
      {
        word: "融合",
        reading: "ゆうごう",
        meaning: "ပေါင်းဆုံခြင်း",
      },
      {
        word: "融点",
        reading: "ゆうてん",
        meaning: "အရည်ပျော်မှတ်",
      },
      {
        word: "融通",
        reading: "ゆうずう",
        meaning: "ချေးပေးခြင်း",
      },
    ],
  },

  {
    kanji: "戻",
    vocabulary: [
      {
        word: "戻る",
        reading: "もどる",
        meaning: "ပြန်လှည့်သည်",
      },
      {
        word: "後戻り",
        reading: "あともどり",
        meaning: "နောက်ပြန်လှည့်ခြင်း",
      },
      {
        word: "戻す",
        reading: "もどす",
        meaning: "ပြန်ထားသည်",
      },
      {
        word: "払い戻す",
        reading: "はらいもどす",
        meaning: "ငွေပြန်ပေးသည်",
      },
      {
        word: "返戻",
        reading: "へんれい",
        meaning: "ပြန်ပေးခြင်း",
      },
    ],
  },

  {
    kanji: "換",
    vocabulary: [
      {
        word: "換わる",
        reading: "かわる",
        meaning: "လဲလှယ်သည်",
      },
      {
        word: "換える",
        reading: "かえる",
        meaning: "လဲလှယ်သည်",
      },
      {
        word: "換気",
        reading: "かんき",
        meaning: "လေဝင်လေထွက်",
      },
      {
        word: "交換",
        reading: "こうかん",
        meaning: "လဲလှယ်ခြင်း",
      },
      {
        word: "変換",
        reading: "へんかん",
        meaning: "လဲလှယ်ခြင်း",
      },
      {
        word: "気分転換",
        reading: "きぶんてんかん",
        meaning: "စိတ်အပြောင်းအလဲ",
      },
    ],
  },

  {
    kanji: "払",
    vocabulary: [
      {
        word: "払う",
        reading: "はらう",
        meaning: "ငွေပေးချေသည်",
      },
      {
        word: "前払い",
        reading: "まえばらい",
        meaning: "ကြိုတင်ငွေပေးချေခြင်း",
      },
      {
        word: "支払い",
        reading: "しはらい",
        meaning: "ငွေပေးချေခြင်း",
      },
      {
        word: "払拭",
        reading: "ふっしょく",
        meaning: "သုတ်ခြင်း",
      },
    ],
  },

  {
    kanji: "込",
    vocabulary: [
      {
        word: "込む",
        reading: "こむ",
        meaning: "အပြည့်ဖြစ်သည်",
      },
      {
        word: "税込み",
        reading: "ぜいこみ",
        meaning: "အခွန်ပါဝင်ပြီးသား",
      },
      {
        word: "詰め込む",
        reading: "つめこむ",
        meaning: "အပြည့်ထည့်သည်",
      },
      {
        word: "黙り込む",
        reading: "だまりこむ",
        meaning: "နှုတ်ပိတ်သည်",
      },
      {
        word: "込める",
        reading: "こめる",
        meaning: "အပြည့်ထည့်သည်",
      },
    ],
  },

  {
    kanji: "両",
    vocabulary: [
      {
        word: "両方",
        reading: "りょうほう",
        meaning: "နှစ်ဘက်စလုံး",
      },
      {
        word: "両側",
        reading: "りょうがわ",
        meaning: "နှစ်ဘက်",
      },
      {
        word: "両手",
        reading: "りょうて",
        meaning: "လက်နှစ်ဘက်",
      },
      {
        word: "両親",
        reading: "りょうしん",
        meaning: "မိဘနှစ်ပါး",
      },
      {
        word: "車両",
        reading: "しゃりょう",
        meaning: "ဘီးထပ်ယာဉ်",
      },
      {
        word: "両立",
        reading: "りょうりつ",
        meaning: "နှစ်ခုလုံးလုပ်ဆောင်ခြင်း",
      },
    ],
  },

  {
    kanji: "替",
    vocabulary: [
      {
        word: "替わる",
        reading: "かわる",
        meaning: "လဲလှယ်အစားထိုးသည်",
      },
      {
        word: "替える",
        reading: "かえる",
        meaning: "လဲလှယ်အစားထိုးသည်",
      },
      {
        word: "両替",
        reading: "りょうがえ",
        meaning: "ငွေလဲခြင်း",
      },
      {
        word: "交代する",
        reading: "こうたいする",
        meaning: "လဲလှယ်အစားထိုးသည်",
      },
      {
        word: "為替レート",
        reading: "かわせレート",
        meaning: "ငွေလဲလှယ်နှုန်း",
      },
    ],
  },

  {
    kanji: "照",
    vocabulary: [
      {
        word: "照る",
        reading: "てる",
        meaning: "နေထိုးသည်",
      },
      {
        word: "照らす",
        reading: "てらす",
        meaning: "နေထိုးသည်",
      },
      {
        word: "照れる",
        reading: "てれる",
        meaning: "ရှက်ရွံ့သည်",
      },
      {
        word: "照明",
        reading: "しょうめい",
        meaning: "အလင်းထွန်းခြင်း",
      },
      {
        word: "残高照会",
        reading: "ざんだかしょうかい",
        meaning: "လက်ကျန်ငွေ စစ်ဆေးခြင်း",
      },
      {
        word: "参照",
        reading: "さんしょう",
        meaning: "ရည်ညွှန်းယူခြင်း",
      },
      {
        word: "対象",
        reading: "たいしょう",
        meaning: "ရည်ရွယ်ဦးတည်ခြင်း",
      },
    ],
  },

  {
    kanji: "預",
    vocabulary: [
      {
        word: "預かる",
        reading: "あずかる",
        meaning: "အပ်နှံခြင်းကို လက်ခံသည်",
      },
      {
        word: "預ける",
        reading: "あずける",
        meaning: "အပ်နှံသည်",
      },
      {
        word: "預金",
        reading: "よきん",
        meaning: "ဘဏ်စုငွေ/အပ်ငွေ",
      },
      {
        word: "普通預金",
        reading: "ふつうよきん",
        meaning: "သာမန်ဘဏ်အကောင့်",
      },
    ],
  },

  {
    kanji: "札",
    vocabulary: [
      {
        word: "札",
        reading: "ふだ",
        meaning: "ကတ်ပြား",
      },
      {
        word: "名札",
        reading: "なふだ",
        meaning: "နာမည်ကတ်ပြား",
      },
      {
        word: "千円札",
        reading: "せんえんさつ",
        meaning: "ယန်း ၁၀၀၀ တန်ငွေစက္ကူ",
      },
      {
        word: "札束",
        reading: "さつたば",
        meaning: "ပိုက်ဆံအုပ်",
      },
      {
        word: "改札口",
        reading: "かいさつぐち",
        meaning: "လက်မှတ်စစ်ပေါက်",
      },
      {
        word: "表札",
        reading: "ひょうさつ",
        meaning: "အိမ်အဝင်နာမည်ကတ်ပြား",
      },
    ],
  },

  {
    kanji: "貨",
    vocabulary: [
      {
        word: "貨幣",
        reading: "かへい",
        meaning: "ငွေကြေး",
      },
      {
        word: "硬貨",
        reading: "こうか",
        meaning: "ငွေအကြွေစေ့",
      },
      {
        word: "通貨",
        reading: "つうか",
        meaning: "ငွေကြေး",
      },
      {
        word: "外貨",
        reading: "がいか",
        meaning: "နိုင်ငံခြားငွေကြေး",
      },
      {
        word: "金貨",
        reading: "きんか",
        meaning: "ရွှေဒင်္ဂါး / ငွေဒင်္ဂါး",
      },
      {
        word: "貨物列車",
        reading: "かもつれっしゃ",
        meaning: "ကုန်တင်ရထား",
      },
      {
        word: "雑貨",
        reading: "ざっか",
        meaning: "နေ့စဉ်သုံး အထွေထွေပစ္စည်း",
      },
      {
        word: "百貨店",
        reading: "ひゃっかてん",
        meaning: "ကုန်တိုက်",
      },
    ],
  },

  {
    kanji: "帳",
    vocabulary: [
      {
        word: "手帳",
        reading: "てちょう",
        meaning: "အိတ်ဆောင်မှတ်စုစာအုပ်",
      },
      {
        word: "通帳",
        reading: "つうちょう",
        meaning: "ဘဏ်ငွေစုစာအုပ်",
      },
      {
        word: "記帳",
        reading: "きちょう",
        meaning: "နာမည်စာရင်းစာအုပ်",
      },
      {
        word: "帳簿",
        reading: "ちょうぼ",
        meaning: "စာရင်းစာအုပ်",
      },
      {
        word: "帳消し",
        reading: "ちょうけし",
        meaning: "ပယ်ဖျက်ခြင်း",
      },
    ],
  },

  {
    kanji: "振",
    vocabulary: [
      {
        word: "振る",
        reading: "ふる",
        meaning: "လှုပ်ရမ်းသည်",
      },
      {
        word: "振られる",
        reading: "ふられる",
        meaning: "လမ်းခွဲခံရသည်",
      },
      {
        word: "振れる",
        reading: "ふれる",
        meaning: "လှုပ်ရမ်းသည်",
      },
      {
        word: "腕を振るう",
        reading: "うでをふるう",
        meaning: "အရည်အချင်းပြသသည်",
      },
      {
        word: "経営不振",
        reading: "けいえいふしん",
        meaning: "လုပ်ငန်းစီးပွားရေး မကောင်းခြင်း",
      },
      {
        word: "振動",
        reading: "しんどう",
        meaning: "လှုပ်ရမ်းခြင်း",
      },
      {
        word: "振り込み",
        reading: "ふりこみ",
        meaning: "ဘဏ်မှတစ်ဆင့် ငွေပေးချေခြင်း",
      },
      {
        word: "口座振替",
        reading: "こうざふりかえ",
        meaning: "ဘဏ်မှတစ်ဆင့် ငွေပေးချေခြင်း",
      },
    ],
  },
];
