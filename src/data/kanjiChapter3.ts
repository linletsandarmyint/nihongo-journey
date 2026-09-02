
export type KanjiVocabularyItem = {
  word: string;
  reading: string;
  meaning: string;
};

export type KanjiVocabulary = {
  kanji: string;
  vocabulary: KanjiVocabularyItem[];
};

export const kanjiChapter3: KanjiVocabulary[] = [
  {
    kanji: "桜",
    vocabulary: [
      {
        word: "桜",
        reading: "さくら",
        meaning: "ချယ်ရီပန်း",
      },
      {
        word: "桜エビ",
        reading: "さくらえび",
        meaning: "ပုစွန်ဆိတ်တမျိုး",
      },
      {
        word: "夜桜",
        reading: "よざくら",
        meaning: "ညအခါကြည့်သော ချယ်ရီပန်း",
      },
      {
        word: "桜前線",
        reading: "さくらぜんせん",
        meaning: "ချယ်ရီပန်းပွင့်သည့် ရာသီဥတုမျဉ်း",
      },
    ],
  },
  {
    kanji: "梅",
    vocabulary: [
      {
        word: "梅",
        reading: "うめ",
        meaning: "မေပန်း / ဇီးပင်",
      },
      {
        word: "梅干し",
        reading: "うめぼし",
        meaning: "ဇီးသီးခြောက် (ဆားစိမ်)",
      },
      {
        word: "梅酒",
        reading: "うめしゅ",
        meaning: "ဇီးအရက်",
      },
      {
        word: "梅雨",
        reading: "つゆ / ばいう",
        meaning: "မိုးရာသီ / မိုးရွာသွန်းမှု",
      },
    ],
  },
  {
    kanji: "松",
    vocabulary: [
      {
        word: "松",
        reading: "まつ",
        meaning: "ထင်းရှူးပင်",
      },
      {
        word: "松原",
        reading: "まつばら",
        meaning: "ထင်းရှူးတော",
      },
      {
        word: "門松",
        reading: "かどまつ",
        meaning: "နှစ်သစ်ကူး အိမ်ရှေ့အလှဆင်ထင်းရှူး",
      },
      {
        word: "松竹梅",
        reading: "しょうちくばい",
        meaning: "ထင်းရှူး၊ ဝါးနှင့် ဇီးပင် (မင်္ဂလာရှိသော သင်္ကေတ)",
      },
    ],
  },
  {
    kanji: "杉",
    vocabulary: [
      {
        word: "杉",
        reading: "すぎ",
        meaning: "ဂျပန်စီဒါပင်",
      },
      {
        word: "杉の花粉",
        reading: "すぎのかふん",
        meaning: "စီဒါပင်၏ ဝတ်မှုန်",
      },
    ],
  },
  {
    kanji: "美",
    vocabulary: [
      {
        word: "美しい",
        reading: "うつくしい",
        meaning: "လှပသော",
      },
      {
        word: "美人",
        reading: "びじん",
        meaning: "အမျိုးသမီးချော",
      },
      {
        word: "美術",
        reading: "びじゅつ",
        meaning: "အနုပညာ",
      },
      {
        word: "美容院",
        reading: "びよういん",
        meaning: "အလှပြင်ဆိုင်",
      },
    ],
  },
  {
    kanji: "香",
    vocabulary: [
      {
        word: "香り",
        reading: "かおり",
        meaning: "မွှေးကြိုင်သောရနံ့",
      },
      {
        word: "香水",
        reading: "こうすい",
        meaning: "ရေမွှေး",
      },
      {
        word: "香辛料",
        reading: "こうしんりょう",
        meaning: "ဟင်းခတ်အမွှေးအကြိုင်",
      },
      {
        word: "線香",
        reading: "せんこう",
        meaning: "အမွှေးတိုင်",
      },
    ],
  },
  {
    kanji: "脱",
    vocabulary: [
      {
        word: "脱ぐ",
        reading: "ぬぐ",
        meaning: "ချွတ်သည်",
      },
      {
        word: "脱衣所",
        reading: "だついじょ",
        meaning: "အဝတ်လဲခန်း",
      },
      {
        word: "脱税",
        reading: "だつぜい",
        meaning: "အခွန်ရှောင်ခြင်း",
      },
      {
        word: "脱水",
        reading: "だっすい",
        meaning: "ရေဓာတ်ခမ်းခြောက်ခြင်း",
      },
    ],
  },
  {
    kanji: "掛",
    vocabulary: [
      {
        word: "掛ける",
        reading: "かける",
        meaning: "ချိတ်ဆွဲသည်",
      },
      {
        word: "掛け算",
        reading: "かけざん",
        meaning: "အမြှောက်တွက်နည်း",
      },
      {
        word: "気掛かり",
        reading: "きがかり",
        meaning: "စိုးရိမ်မှု",
      },
    ],
  },
  {
    kanji: "姿",
    vocabulary: [
      {
        word: "姿",
        reading: "すがた",
        meaning: "ပုံသဏ္ဌာန် / အမူအရာ",
      },
      {
        word: "容姿",
        reading: "ようし",
        meaning: "ရုပ်ရည်သွင်ပြင်",
      },
      {
        word: "姿勢",
        reading: "しせい",
        meaning: "ကိုယ်ဟန်အနေအထား",
      },
    ],
  },
  {
    kanji: "勢",
    vocabulary: [
      {
        word: "勢い",
        reading: "いきおい",
        meaning: "အရှိန်အဝါ / အရှိန်",
      },
      {
        word: "勢力",
        reading: "せいりょく",
        meaning: "ဩဇာအာဏာ",
      },
      {
        word: "情勢",
        reading: "じょうせい",
        meaning: "အခြေအနေ",
      },
    ],
  },
  {
    kanji: "柔",
    vocabulary: [
      {
        word: "柔らかい",
        reading: "やわらかい",
        meaning: "ပျော့ပျောင်းသော",
      },
      {
        word: "柔道",
        reading: "じゅうどう",
        meaning: "ဂျူးဒိုး",
      },
      {
        word: "柔軟",
        reading: "じゅうなん",
        meaning: "လိုက်လျောညီထွေရှိသော",
      },
    ],
  },
  {
    kanji: "軟",
    vocabulary: [
      {
        word: "軟らかい",
        reading: "やわらかい",
        meaning: "ပျော့သောအရာ",
      },
      {
        word: "軟体動物",
        reading: "なんたいどうぶつ",
        meaning: "ကျောရိုးမဲ့ ပျော့ဖတ်သတ္တဝါ",
      },
    ],
  },
  {
    kanji: "固",
    vocabulary: [
      {
        word: "硬い / 固い",
        reading: "かたい",
        meaning: "မာကျောသော",
      },
      {
        word: "固まる",
        reading: "かたまる",
        meaning: "ခဲသွားသည် / မာသွားသည်",
      },
      {
        word: "固定",
        reading: "こてい",
        meaning: "ပုံသေပြုလုပ်ခြင်း",
      },
    ],
  },
  {
    kanji: "純",
    vocabulary: [
      {
        word: "純粋な",
        reading: "じゅんすいな",
        meaning: "သန့်ရှင်းစင်ကြယ်သော",
      },
      {
        word: "単純な",
        reading: "たんじゅんな",
        meaning: "ရိုးရှင်းသော",
      },
      {
        word: "純情な",
        reading: "じゅんじょうな",
        meaning: "ရိုးသားဖြူစင်သော",
      },
    ],
  },
  {
    kanji: "快",
    vocabulary: [
      {
        word: "快い",
        reading: "こころよい",
        meaning: "နှစ်လိုဖွယ်ရှိသော",
      },
      {
        word: "快適な",
        reading: "かいてきな",
        meaning: "သက်သောင့်သက်သာရှိသော",
      },
      {
        word: "快晴",
        reading: "かいせい",
        meaning: "သာယာကြည်လင်သော ရာသီဥတု",
      },
    ],
  },
  {
    kanji: "甘",
    vocabulary: [
      {
        word: "甘い",
        reading: "あまい",
        meaning: "ချိုမြိန်သော",
      },
      {
        word: "甘える",
        reading: "あまえる",
        meaning: "ကဲသည် / ချွဲသည်",
      },
      {
        word: "甘ကိ",
        reading: "あまやかす",
        meaning: "အလိုလိုက်သည်",
      },
    ],
  },
  {
    kanji: "濃",
    vocabulary: [
      {
        word: "濃い",
        reading: "こい",
        meaning: "အရောင်ရင့်သော / အရသာပစ်သော",
      },
      {
        word: "濃厚な",
        reading: "のうこうな",
        meaning: "ပြင်းထန်သော / ပြည့်ဝသော",
      },
      {
        word: "濃度",
        reading: "のうど",
        meaning: "ပျစ်နှုန်း / အเข้มပျစ်",
      },
    ],
  },
  {
    kanji: "薄",
    vocabulary: [
      {
        word: "薄い",
        reading: "うすい",
        meaning: "ပါးလွှာသော / အရသာကျဲသော",
      },
      {
        word: "薄める",
        reading: "うすめる",
        meaning: "ကျဲအောင်လုပ်သည်",
      },
      {
        word: "薄弱な",
        reading: "はくじゃくな",
        meaning: "အားနည်းသော",
      },
    ],
  },
  {
    kanji: "劇",
    vocabulary: [
      {
        word: "劇",
        reading: "げき",
        meaning: "ပြဇာတ်",
      },
      {
        word: "劇場",
        reading: "げきじょう",
        meaning: "ဇာတ်ရုံ",
      },
      {
        word: "劇的な",
        reading: "げきてきな",
        meaning: "ဇာတ်လမ်းဆန်သော",
      },
    ],
  },
  {
    kanji: "舞",
    vocabulary: [
      {
        word: "舞う",
        reading: "まう",
        meaning: "ကခုန်သည် / ဝဲပျံသည်",
      },
      {
        word: "舞台",
        reading: "ぶたい",
        meaning: "စင်မြင့်",
      },
      {
        word: "歌舞伎",
        reading: "かぶき",
        meaning: "ဂျပန်ရိုးရာ ကဘုကိ ပြဇာတ်",
      },
    ],
  },
  {
    kanji: "堂",
    vocabulary: [
      {
        word: "食堂",
        reading: "しょくどう",
        meaning: "ထမင်းစားခန်း / ထမင်းဆိုင်",
      },
      {
        word: "講堂",
        reading: "こうどう",
        meaning: "နားမဆင်ခန်းမ",
      },
      {
        word: "堂々と",
        reading: "どうどうと",
        meaning: "ရဲရင့်စွာ",
      },
    ],
  },
  {
    kanji: "展",
    vocabulary: [
      {
        word: "展示する",
        reading: "てんじする",
        meaning: "ပြသသည်",
      },
      {
        word: "展覧会",
        reading: "てんらんかい",
        meaning: "ပြပွဲ",
      },
      {
        word: "発展する",
        reading: "はってんする",
        meaning: "ဖွံ့ဖြိုးတိုးတက်သည်",
      },
    ],
  },
  {
    kanji: "宗",
    vocabulary: [
      {
        word: "宗教",
        reading: "しゅうきょう",
        meaning: "ဘာသာရေး",
      },
      {
        word: "宗派",
        reading: "しゅうは",
        meaning: "ဂိုဏ်းဂဏ",
      },
    ],
  },
  {
    kanji: "恵",
    vocabulary: [
      {
        word: "恵まれる",
        reading: "めぐまれる",
        meaning: "ကောင်းချီးခံစားရသည်",
      },
      {
        word: "恵み",
        reading: "めぐみ",
        meaning: "ကောင်းချီး",
      },
      {
        word: "知恵",
        reading: "ちえ",
        meaning: "ဉာဏ်ပညာ",
      },
    ],
  },
  {
    kanji: "宝",
    vocabulary: [
      {
        word: "宝",
        reading: "たから",
        meaning: "ရတနာ",
      },
      {
        word: "国宝",
        reading: "こくほう",
        meaning: "အမျိုးသား အမွေအနှစ် ရတနာ",
      },
      {
        word: "宝くじ",
        reading: "たからくじ",
        meaning: "ထီ",
      },
    ],
  },
  {
    kanji: "城",
    vocabulary: [
      {
        word: "城",
        reading: "しろ",
        meaning: "ရဲတိုက်",
      },
      {
        word: "城城",
        reading: "じょうし",
        meaning: "ရဲတိုက်မြို့",
      },
    ],
  },
  {
    kanji: "栄",
    vocabulary: [
      {
        word: "栄える",
        reading: "さかえる",
        meaning: "စည်ပင်တိုးတက်သည်",
      },
      {
        word: "栄養",
        reading: "えいよう",
        meaning: "အာဟာရ",
      },
      {
        word: "光栄",
        reading: "こうえい",
        meaning: "ဂုဏ်ယူဖွယ်ရာ",
      },
    ],
  },
  {
    kanji: "蔵",
    vocabulary: [
      {
        word: "蔵",
        reading: "くら",
        meaning: "ဂိုဒေါင်",
      },
      {
        word: "冷蔵庫",
        reading: "れいぞうこ",
        meaning: "ရေခဲသေတ္တာ",
      },
      {
        word: "貯蔵する",
        reading: "ちょぞうする",
        meaning: "သိုလှောင်သည်",
      },
    ],
  },
  {
    kanji: "昭",
    vocabulary: [
      {
        word: "昭和",
        reading: "しょうわ",
        meaning: "ရှောဝါခေတ်",
      },
    ],
  },
  {
    kanji: "士",
    vocabulary: [
      {
        word: "武士",
        reading: "ぶし",
        meaning: "ဆာမူရိုင်းစစ်သည်",
      },
      {
        word: "弁護士",
        reading: "べんごし",
        meaning: "ရှေ့နေ",
      },
      {
        word: "博士",
        reading: "はかせ",
        meaning: "ပါမောက္ခ / ဒေါက်တာ",
      },
    ],
  },
];
;
