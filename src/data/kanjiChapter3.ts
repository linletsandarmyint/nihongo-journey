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
        meaning: "ဆာကူရာပန်း",
      },
      {
        word: "夜桜",
        reading: "よざくら",
        meaning: "ညဘက်ကြည့်ရသည့်စကူရာပန်း",
      },
      {
        word: "桜前線",
        reading: "さくらぜんせん",
        meaning: "ဆာကူရာပန်းပွင့်မည့် ခန့်မှန်းချက်",
      },
      {
        word: "桜エビ",
        reading: "さくらえび",
        meaning: "ပုစွန်အသေးစားအမျိုးအစားတစ်မျိုး",
      },
      {
        word: "桜桃",
        reading: "おうとう",
        meaning: "ချယ်ရီသီး",
      },
    ],
  },
  {
    kanji: "梅",
    vocabulary: [
      {
        word: "梅",
        reading: "うめ",
        meaning: "ဂျပန်းဇီးသီးတစ်မျိုး",
      },
      {
        word: "梅干し",
        reading: "うめぼし",
        meaning: "ဂျပန်းဇီးသီးခြောက်",
      },
      {
        word: "梅酒",
        reading: "うめしゅ",
        meaning: "ဂျပန်းဇီးသီးအရက်",
      },
      {
        word: "梅雨前線",
        reading: "ばいうぜんせん",
        meaning: "မိုးရာသီကာလ ကြိုတင်ခန့်မှန်းချက်",
      },
      {
        word: "梅雨",
        reading: "つゆ",
        meaning: "မိုးရာသီ",
      },
    ],
  },
  {
    kanji: "松",
    vocabulary: [
      {
        word: "松の木",
        reading: "まつのき",
        meaning: "ထင်းရှူးပင်တစ်မျိုး",
      },
      {
        word: "松ぼっくり",
        reading: "まつぼっくり",
        meaning: "ထင်းရှူးသီး",
      },
      {
        word: "門松",
        reading: "かどまつ",
        meaning:
          "နှစ်သစ်ကူးတွင် အိမ်ရှေ့မျက်နှာစာ၌ အလှဆင်သော ထင်းရှူးခက်၊ ဝါးနှင့် ဇီးသီးခက်ပါဝင်သော အလှဆင်ပစ္စည်း",
      },
      {
        word: "松竹梅",
        reading: "しょうちくばい",
        meaning: "ထင်းရှူး၊ ဝါးနှင့် ဇီးသီးပါဝင်သော",
      },
    ],
  },
  {
    kanji: "杉",
    vocabulary: [
      {
        word: "杉の木",
        reading: "すぎのき",
        meaning: "ဂျပန်းထင်းရှူး အနွယ်ဝင် တစ်မျိုး",
      },
      {
        word: "杉の花粉",
        reading: "すぎのかふん",
        meaning: "ရာသီဖုန်ဝတ်မှုန်",
      },
    ],
  },
  {
    kanji: "美",
    vocabulary: [
      {
        word: "美しい",
        reading: "うつくしい",
        meaning: "လှသော",
      },
      {
        word: "美",
        reading: "び",
        meaning: "လှခြင်း",
      },
      {
        word: "美容室",
        reading: "びようしつ",
        meaning: "အလှပြင်ဆိုင်",
      },
      {
        word: "美人",
        reading: "びじん",
        meaning: "လှပသူ",
      },
    ],
  },
  {
    kanji: "香",
    vocabulary: [
      {
        word: "香る",
        reading: "かおる",
        meaning: "မွှေးသည်",
      },
      {
        word: "香り",
        reading: "かおり",
        meaning: "မွှေးရနံ့",
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
        word: "芳香剤",
        reading: "ほうこうざい",
        meaning: "air fresher",
      },
    ],
  },
  {
    kanji: "脱",
    vocabulary: [
      {
        word: "脱げる",
        reading: "ぬげる",
        meaning: "ကျွတ်သည်",
      },
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
        word: "離脱",
        reading: "りだつ",
        meaning: "နှုတ်ထွက်ခြင်း",
      },
      {
        word: "脱税",
        reading: "だつぜい",
        meaning: "အခွန်ရှောင်ခြင်း",
      },
      {
        word: "脱線",
        reading: "だっせん",
        meaning: "ရထားလမ်းချော်ခြင်း",
      },
      {
        word: "脱退",
        reading: "だったい",
        meaning: "နှုတ်ထွက်ခြင်း",
      },
      {
        word: "脱する",
        reading: "だっする",
        meaning: "ထွက်ခွာသည်/နှုတ်ထွက်သည်",
      },
    ],
  },
  {
    kanji: "掛",
    vocabulary: [
      {
        word: "掛かる",
        reading: "かかる",
        meaning: "ချိတ်ဆွဲသည်",
      },
      {
        word: "掛ける",
        reading: "かける",
        meaning: "ခင်းသည်",
      },
      {
        word: "掛け算",
        reading: "かけざん",
        meaning: "အမြှောက်ကိန်း",
      },
      {
        word: "気掛かりなこと",
        reading: "きかがりなこと",
        meaning: "စိတ်မချစရာကိစ္စ",
      },
    ],
  },
  {
    kanji: "姿",
    vocabulary: [
      {
        word: "姿",
        reading: "すがた",
        meaning: "ပုံ",
      },
      {
        word: "着物姿",
        reading: "きものすがた",
        meaning: "ကီမိုနိုဝတ်ထားခြင်း",
      },
      {
        word: "容姿",
        reading: "ようし",
        meaning: "အပြင်ပန်းသွင်ပြင်",
      },
    ],
  },
  {
    kanji: "勢",
    vocabulary: [
      {
        word: "勢い",
        reading: "いきおい",
        meaning: "အရှိန်အဟုန်",
      },
      {
        word: "国際情勢",
        reading: "こくさいじょうせい",
        meaning: "နိုင်ငံတကာ အခြေအနေ",
      },
      {
        word: "姿勢",
        reading: "しせい",
        meaning: "ကိုယ်ဟန်အနေအထား",
      },
      {
        word: "勢力",
        reading: "せいりょく",
        meaning: "ဩဇာအာဏာ",
      },
      {
        word: "大勢の人",
        reading: "おおぜいのひと",
        meaning: "လူအမြောက်အမြား",
      },
    ],
  },
  {
    kanji: "柔",
    vocabulary: [
      {
        word: "柔らかな",
        reading: "やわらかな",
        meaning: "နုနယ်သော",
      },
      {
        word: "柔らかい",
        reading: "やわらかい",
        meaning: "နုနယ်သော",
      },
      {
        word: "柔道",
        reading: "じゅうどう",
        meaning: "ဂျူးဒိုးပညာ",
      },
      {
        word: "柔和な",
        reading: "にゅうわな",
        meaning: "နုနယ်သော",
      },
    ],
  },
  {
    kanji: "軟",
    vocabulary: [
      {
        word: "軟らかな",
        reading: "やわらかな",
        meaning: "နုနယ်သော",
      },
      {
        word: "軟らかい",
        reading: "やわらかい",
        meaning: "နုနယ်သော",
      },
      {
        word: "柔軟な",
        reading: "じゅうなんな",
        meaning: "နုနယ်သော",
      },
      {
        word: "柔軟剤",
        reading: "じゅうなんざい",
        meaning: "အဝတ်လျှော့ပျော့ဆေး",
      },
      {
        word: "軟化",
        reading: "なんか",
        meaning: "နုနယ်လာခြင်း",
      },
    ],
  },
  {
    kanji: "固",
    vocabulary: [
      {
        word: "固まる",
        reading: "かたまる",
        meaning: "မာကျောလာသည်",
      },
      {
        word: "固める",
        reading: "かためる",
        meaning: "မာကျောစေသည်",
      },
      {
        word: "固い",
        reading: "かたい",
        meaning: "မာကျောသော",
      },
      {
        word: "固体",
        reading: "こたい",
        meaning: "အစိုင်အခဲ",
      },
      {
        word: "固定",
        reading: "こてい",
        meaning: "အတည်တကျဖြစ်ခြင်း",
      },
    ],
  },
  {
    kanji: "純",
    vocabulary: [
      {
        word: "純情な人",
        reading: "じゅんじょうなひと",
        meaning: "စိတ်နှလုံးဖြူစင်သော လူ",
      },
      {
        word: "純粋な心",
        reading: "じゅんすいなこころ",
        meaning: "ဖြူစင်သော စိတ်နှလုံး",
      },
      {
        word: "単純な",
        reading: "たんじゅんな",
        meaning: "ရိုးရှင်းလွယ်ကူသော",
      },
    ],
  },
  {
    kanji: "快",
    vocabulary: [
      {
        word: "快い",
        reading: "こころよい",
        meaning: "သာယာကျေနပ်ဖွယ်သော",
      },
      {
        word: "快適な",
        reading: "かいてきな",
        meaning: "သာယာကျေနပ်ဖွယ်သော",
      },
      {
        word: "快調",
        reading: "かいちょう",
        meaning: "အခြေအနေကောင်းခြင်း",
      },
      {
        word: "快気祝い",
        reading: "かいきいわい",
        meaning: "နေပြန်ကောင်းလာခြင်း",
      },
    ],
  },
  {
    kanji: "甘",
    vocabulary: [
      {
        word: "甘える",
        reading: "あまえる",
        meaning: "ချွဲသည်",
      },
      {
        word: "甘やかす",
        reading: "あまやかす",
        meaning: "အလိုလိုက်သည်",
      },
      {
        word: "甘い",
        reading: "あまい",
        meaning: "ချိုသော",
      },
      {
        word: "甘酒",
        reading: "あまざけ",
        meaning: "အချိုရည်",
      },
      {
        word: "甘味料",
        reading: "かんみりょう",
        meaning: "အချိုအရသာ ဖြည့်စွက်သော ပစ္စည်း (ဥပမာ- သကြား)",
      },
    ],
  },
  {
    kanji: "濃",
    vocabulary: [
      {
        word: "濃い",
        reading: "こい",
        meaning: "ထူသော၊ ပျစ်သော",
      },
      {
        word: "濃厚な",
        reading: "のうこうな",
        meaning: "ထူသော၊ ပျစ်သော",
      },
      {
        word: "濃淡",
        reading: "のうたん",
        meaning: "အထူအပါး၊ အလင်းအမှောင်",
      },
    ],
  },
  {
    kanji: "薄",
    vocabulary: [
      {
        word: "薄める",
        reading: "うすめる",
        meaning: "ဖျော့စေသည်၊ ပါးစေသည်",
      },
      {
        word: "薄まる",
        reading: "うすまる",
        meaning: "ဖျော့သည်၊ ပါးသည်",
      },
      {
        word: "薄らぐ",
        reading: "うすらぐ",
        meaning: "ပါးလာသည်",
      },
      {
        word: "薄れる",
        reading: "うすれる",
        meaning: "မှိန်လာသည်",
      },
      {
        word: "薄い",
        reading: "うすい",
        meaning: "ပါးသော",
      },
      {
        word: "薄型",
        reading: "うすがた",
        meaning: "ပါးသည့်ပုံစံ",
      },
      {
        word: "軽薄な",
        reading: "けいはくな",
        meaning: "ပါးလွှာသော၊ ပေါ့ပျက်ပျက်",
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
        word: "演劇",
        reading: "えんげき",
        meaning: "ပြဇာတ်",
      },
      {
        word: "時代劇",
        reading: "じだいげき",
        meaning: "သမိုင်းဆိုင်ရာ ပြဇာတ်",
      },
      {
        word: "人形劇",
        reading: "にんぎょうげき",
        meaning: "ရုပ်သေးပြဇာတ်",
      },
      {
        word: "劇団員",
        reading: "げきだんいん",
        meaning: "ပြဇာတ်အဖွဲ့ဝင်",
      },
      {
        word: "悲劇",
        reading: "ひげき",
        meaning: "ကြေကွဲဝမ်းနည်းဖွယ်ပြဇာတ်",
      },
    ],
  },
  {
    kanji: "舞",
    vocabulary: [
      {
        word: "舞う",
        reading: "まう",
        meaning: "ကသည်",
      },
      {
        word: "見舞う",
        reading: "みまう",
        meaning: "လူနာမေးမြန်းသည်",
      },
      {
        word: "お見舞い",
        reading: "おみまい",
        meaning: "လူနာမေးမြန်းခြင်း",
      },
      {
        word: "舞妓",
        reading: "まいこ",
        meaning: "ဂေးရှာအနုပညာသင်ယူနေသော အပျိုစင်မလေး",
      },
      {
        word: "舞台",
        reading: "ぶたい",
        meaning: "စင်မြင့်",
      },
      {
        word: "歌舞伎",
        reading: "かぶき",
        meaning: "ဂျပန်းရိုးရာ ကဘုကိပြဇာတ်",
      },
    ],
  },
  {
    kanji: "堂",
    vocabulary: [
      {
        word: "食堂",
        reading: "しょくどう",
        meaning: "စားသောက်ဆိုင်",
      },
      {
        word: "本堂",
        reading: "ほんどう",
        meaning: "ပင်မဇရပ်",
      },
      {
        word: "講堂",
        reading: "こうどう",
        meaning: "စာသင်ဆောင်",
      },
      {
        word: "殿堂",
        reading: "でんどう",
        meaning: "နန်းတော်",
      },
      {
        word: "国会議事堂",
        reading: "こっかいぎじどう",
        meaning: "လွှတ်တော်အဆောက်အအုံ",
      },
      {
        word: "堂々と",
        reading: "どうどうと",
        meaning: "ပေါ်ပေါ်ထင်ထင်",
      },
    ],
  },
  {
    kanji: "展",
    vocabulary: [
      {
        word: "展示",
        reading: "てんじ",
        meaning: "ခင်းကျင်းပြသခြင်း",
      },
      {
        word: "絵画展",
        reading: "かいがてん",
        meaning: "ပန်းချီပွဲ",
      },
      {
        word: "発展",
        reading: "はってん",
        meaning: "တိုးတက်ခြင်း",
      },
      {
        word: "展開",
        reading: "てんかい",
        meaning: "တိုးတက်ခြင်း",
      },
      {
        word: "進展",
        reading: "しんてん",
        meaning: "တိုးတက်ခြင်း",
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
        meaning: "ဘာသာရေးဂိုဏ်းအုပ်စုအမျိုးအစား",
      },
      {
        word: "改宗",
        reading: "かいしゅう",
        meaning: "ဘာသာကူးပြောင်းခြင်း",
      },
      {
        word: "宗家",
        reading: "そうけ",
        meaning:
          "မိသားစုတွင် အဓိကမဏ္ဍိုင်ဖြစ်သူ (အထူးသဖြင့် မိသားစု၏ အနုပညာကို လမ်းကြောင်းပေးသူ)",
      },
    ],
  },
  {
    kanji: "恵",
    vocabulary: [
      {
        word: "恵む",
        reading: "めぐむ",
        meaning: "ကောင်းချီးပေးသည်",
      },
      {
        word: "恵まれた",
        reading: "めぐまれた",
        meaning: "ကောင်းချီးပေးခံရသော",
      },
      {
        word: "恩恵",
        reading: "おんけい",
        meaning: "ကောင်းချီး",
      },
      {
        word: "知恵",
        reading: "ちえ",
        meaning: "ပညာ",
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
        word: "宝くじ",
        reading: "たからくじ",
        meaning: "မဲ ထီ",
      },
      {
        word: "宝物",
        reading: "たからもの",
        meaning: "ရတနာပစ္စည်း",
      },
      {
        word: "子宝",
        reading: "こだから",
        meaning: "သားသမီးရတနာ",
      },
      {
        word: "宝船",
        reading: "たからぶね",
        meaning: "ယန်းရှစ်ကောင်ပါဝင်သော သင်္ဘော",
      },
      {
        word: "国宝",
        reading: "こくほう",
        meaning: "နိုင်ငံရတနာ",
      },
      {
        word: "宝石",
        reading: "ほうせき",
        meaning: "ကျောက်မျက်ရတနာ",
      },
      {
        word: "家宝",
        reading: "かほう",
        meaning: "မိသားစုအမွေအနှစ်",
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
        word: "大阪城",
        reading: "おおさかじょう",
        meaning: "အိုဆာကာရဲတိုက်",
      },
      {
        word: "城壁",
        reading: "じょうへき",
        meaning: "ရဲတိုက်နံရံ",
      },
      {
        word: "城下町",
        reading: "じょうかまち",
        meaning: "ရဲတိုက်ဝန်းကျင်ရှိ မြို့",
      },
      {
        word: "宮城県",
        reading: "みやぎけん",
        meaning: "မီယာဂီခရိုင်",
      },
    ],
  },
  {
    kanji: "栄",
    vocabulary: [
      {
        word: "栄える",
        reading: "さかえる",
        meaning: "စည်ပင်သည်",
      },
      {
        word: "映える",
        reading: "はえる",
        meaning: "စည်ပင်သည်",
      },
      {
        word: "繁栄",
        reading: "はんえい",
        meaning: "စည်ပင်ခြင်း",
      },
      {
        word: "栄養",
        reading: "えいよう",
        meaning: "အာဟာရ",
      },
      {
        word: "栄光",
        reading: "えいこう",
        meaning: "ဂုဏ်ကျက်သရေ",
      },
      {
        word: "光栄",
        reading: "こうえい",
        meaning: "ဂုဏ်ယူခြင်း",
      },
      {
        word: "見栄",
        reading: "みえ",
        meaning: "လူအထင်ကြီးအောင် ပြုပြင်ခြင်း",
      },
    ],
  },
  {
    kanji: "蔵",
    vocabulary: [
      {
        word: "蔵",
        reading: "くら",
        meaning: "စတော်ခန်း",
      },
      {
        word: "貯蔵",
        reading: "ちょぞう",
        meaning: "စတော်ခန်း",
      },
      {
        word: "冷蔵庫",
        reading: "れいぞうこ",
        meaning: "ရေခဲသေတ္တာ",
      },
      {
        word: "蔵書",
        reading: "ぞうしょ",
        meaning: "စာအုပ်စုဆောင်းခြင်း",
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
        meaning: "စစ်သည်တော်",
      },
      {
        word: "栄養士",
        reading: "えいようし",
        meaning: "အာဟာရပညာရှင်",
      },
      {
        word: "建築士",
        reading: "けんちくし",
        meaning: "ဗိသုကာပညာရှင်",
      },
      {
        word: "介護士",
        reading: "かいごし",
        meaning: "စောင့်ရှောက်ရေးပညာရှင်",
      },
    ],
  },
];
