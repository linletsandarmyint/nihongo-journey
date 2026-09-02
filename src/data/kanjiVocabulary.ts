export type KanjiVocabularyItem = {
  word: string;
  reading: string;
  meaning: string;
};

export type KanjiVocabulary = {
  kanji: string;
  vocabulary: KanjiVocabularyItem[];
};

export const kanjiVocabulary: KanjiVocabulary[] = [
  {
    kanji: "配",
    vocabulary: [
      {
        word: "配る",
        reading: "くばる",
        meaning: "ဝေငှသည်",
      },
      {
        word: "気を配る",
        reading: "きをくばる",
        meaning: "သတိထားသည်",
      },
      {
        word: "心配する",
        reading: "しんぱいする",
        meaning: "စိတ်ပူသည်",
      },
      {
        word: "配分する",
        reading: "はいぶんする",
        meaning: "ခွဲဝေသည်",
      },
      {
        word: "配達",
        reading: "はいたつ",
        meaning: "ပစ္စည်းပို့ဆောင်ခြင်း",
      },
    ],
  },

  {
    kanji: "渡",
    vocabulary: [
      {
        word: "渡る",
        reading: "わたる",
        meaning: "ဖြတ်ကူးသည်",
      },
      {
        word: "渡り鳥",
        reading: "わたりどり",
        meaning: "ရာသီအလိုက် နေရာပြောင်းသောငှက်",
      },
      {
        word: "渡す",
        reading: "わたす",
        meaning: "လက်ဆင့်ကမ်းသည်",
      },
      {
        word: "渡し舟",
        reading: "わたしぶね",
        meaning: "ကူးတို့လှေ",
      },
      {
        word: "渡航",
        reading: "とこう",
        meaning: "နိုင်ငံခြားသို့ ခရီးသွားခြင်း",
      },
    ],
  },

  {
    kanji: "招",
    vocabulary: [
      {
        word: "招く",
        reading: "まねく",
        meaning: "ဖိတ်ခေါ်သည်",
      },
      {
        word: "手招き",
        reading: "てまねき",
        meaning: "လက်ဖြင့် ခေါ်ပြသည်",
      },
      {
        word: "招待する",
        reading: "しょうたいする",
        meaning: "ဖိတ်ကြားသည်",
      },
      {
        word: "招待状",
        reading: "しょうたいじょう",
        meaning: "ဖိတ်စာ",
      },
      {
        word: "招集する",
        reading: "しょうしゅうする",
        meaning: "စုဝေးခေါ်သည်",
      },
    ],
  },

  {
    kanji: "届",
    vocabulary: [
      {
        word: "届く",
        reading: "とどく",
        meaning: "ရောက်လာသည်",
      },
      {
        word: "届ける",
        reading: "とどける",
        meaning: "ပို့ပေးသည်",
      },
      {
        word: "欠席届",
        reading: "けっせきとどけ",
        meaning: "ပျက်ကွက်ကြောင်းတင်ပြစာ",
      },
    ],
  },

  {
    kanji: "券",
    vocabulary: [
      {
        word: "乗車券",
        reading: "じょうしゃけん",
        meaning: "ရထား/ယာဉ်စီးလက်မှတ်",
      },
      {
        word: "入場券",
        reading: "にゅうじょうけん",
        meaning: "ဝင်ခွင့်လက်မှတ်",
      },
      {
        word: "定期券",
        reading: "ていきけん",
        meaning: "လစဉ်/ကာလသတ်မှတ် ခရီးသွားလက်မှတ်",
      },
      {
        word: "旅券",
        reading: "りょけん",
        meaning: "နိုင်ငံကူးလက်မှတ်",
      },
      {
        word: "株券",
        reading: "かぶけん",
        meaning: "ရှယ်ယာလက်မှတ်",
      },
      {
        word: "証券会社",
        reading: "しょうけんがいしゃ",
        meaning: "ငွေချေးသက်သေခံလက်မှတ် ကုမ္ပဏီ",
      },
    ],
  },

  {
    kanji: "贈",
    vocabulary: [
      {
        word: "贈る",
        reading: "おくる",
        meaning: "လက်ဆောင်ပေးသည်",
      },
      {
        word: "贈り物",
        reading: "おくりもの",
        meaning: "လက်ဆောင်",
      },
      {
        word: "贈答品売り場",
        reading: "ぞうとうひんうりば",
        meaning: "လက်ဆောင်ပစ္စည်းရောင်းသည့်နေရာ",
      },
      {
        word: "寄贈",
        reading: "きぞう",
        meaning: "လှူဒါန်းသည်",
      },
    ],
  },

  {
    kanji: "含",
    vocabulary: [
      {
        word: "含む",
        reading: "ふくむ",
        meaning: "ပါဝင်သည်",
      },
      {
        word: "含める",
        reading: "ふくめる",
        meaning: "ထည့်သွင်းသည်",
      },
      {
        word: "含有量",
        reading: "がんゆうりょう",
        meaning: "ပါဝင်ပမာဏ",
      },
    ],
  },

  {
    kanji: "溶",
    vocabulary: [
      {
        word: "溶ける",
        reading: "とける",
        meaning: "ပျော်ဝင်သည်",
      },
      {
        word: "溶け込む",
        reading: "とけこむ",
        meaning: "ရောနှောဝင်သွားသည်",
      },
      {
        word: "溶かす",
        reading: "とかす",
        meaning: "ပျော်ဝင်အောင်လုပ်သည်",
      },
      {
        word: "溶く",
        reading: "とく",
        meaning: "ရောမွှေသည်",
      },
      {
        word: "溶岩",
        reading: "ようがん",
        meaning: "ချော်ရည်",
      },
    ],
  },

  {
    kanji: "丼",
    vocabulary: [
      {
        word: "丼",
        reading: "どんぶり",
        meaning: "အစားအစာထည့်သည့်ပန်းကန်လုံး",
      },
      {
        word: "天丼",
        reading: "てんどん",
        meaning: "တန်ပူရာထည့်ထားသော ထမင်း",
      },
      {
        word: "カツ丼",
        reading: "かつどん",
        meaning: "ဝက်သားကြော်ထည့်ထားသော ထမင်း",
      },
      {
        word: "うな丼",
        reading: "うなどん",
        meaning: "ငါးရှဉ့်ကင်ထည့်ထားသော ထမင်း",
      },
    ],
  },

  {
    kanji: "混",
    vocabulary: [
      {
        word: "混じる",
        reading: "まじる",
        meaning: "ရောနှောပါဝင်သည်",
      },
      {
        word: "混ざる",
        reading: "まざる",
        meaning: "ရောနှောသည်",
      },
      {
        word: "混ぜる",
        reading: "まぜる",
        meaning: "ရောမွှေသည်",
      },
      {
        word: "混む",
        reading: "こむ",
        meaning: "လူများပြားသည်",
      },
      {
        word: "混雑",
        reading: "こんざつ",
        meaning: "လူများပြားကျပ်တည်းမှု",
      },
      {
        word: "混乱",
        reading: "こんらん",
        meaning: "ရှုပ်ထွေးမှု",
      },
    ],
  },

  {
    kanji: "汁",
    vocabulary: [
      {
        word: "汁",
        reading: "しる",
        meaning: "ဟင်းရည်",
      },
      {
        word: "みそ汁",
        reading: "みそしる",
        meaning: "မီဆိုဟင်းရည်",
      },
      {
        word: "果汁",
        reading: "かじゅう",
        meaning: "သစ်သီးဖျော်ရည်",
      },
    ],
  },

  {
    kanji: "盛",
    vocabulary: [
      {
        word: "盛る",
        reading: "もる",
        meaning: "ထည့်ပေးသည်",
      },
      {
        word: "大盛",
        reading: "おおもり",
        meaning: "အများကြီးထည့်ပေးခြင်း",
      },
      {
        word: "盛る",
        reading: "さかる",
        meaning: "တိုးတက်ထွန်းကားသည်",
      },
      {
        word: "育ち盛り",
        reading: "そだちざかり",
        meaning: "ကြီးထွားဖွံ့ဖြိုးနေသောအရွယ်",
      },
      {
        word: "盛んな",
        reading: "さかんな",
        meaning: "စည်ကားတက်ကြွသော",
      },
      {
        word: "盛大な",
        reading: "せいだいな",
        meaning: "ခမ်းနားကြီးကျယ်သော",
      },
    ],
  },

  {
    kanji: "契",
    vocabulary: [
      {
        word: "契る",
        reading: "ちぎる",
        meaning: "ကတိပြုသည်",
      },
      {
        word: "契約",
        reading: "けいやく",
        meaning: "စာချုပ်",
      },
      {
        word: "契約書",
        reading: "けいやくしょ",
        meaning: "စာချုပ်စာတမ်း",
      },
      {
        word: "契機",
        reading: "けいき",
        meaning: "အခွင့်အရေး / အကြောင်းရင်း",
      },
    ],
  },

  {
    kanji: "賃",
    vocabulary: [
      {
        word: "家賃",
        reading: "やちん",
        meaning: "အိမ်ငှားခ",
      },
      {
        word: "運賃",
        reading: "うんちん",
        meaning: "ခရီးစရိတ်",
      },
      {
        word: "賃金",
        reading: "ちんぎん",
        meaning: "လုပ်ခလစာ",
      },
      {
        word: "賃貸",
        reading: "ちんたい",
        meaning: "ငှားရမ်းခြင်း",
      },
    ],
  },

  {
    kanji: "証",
    vocabulary: [
      {
        word: "証明",
        reading: "しょうめい",
        meaning: "သက်သေပြခြင်း",
      },
      {
        word: "証言",
        reading: "しょうげん",
        meaning: "သက်သေခံပြောဆိုချက်",
      },
      {
        word: "保証人",
        reading: "ほしょうにん",
        meaning: "အာမခံသူ",
      },
      {
        word: "身分証明書",
        reading: "みぶんしょうめいしょ",
        meaning: "ကိုယ်ရေးအထောက်အထား",
      },
      {
        word: "免許証",
        reading: "めんきょしょう",
        meaning: "လိုင်စင်",
      },
    ],
  },

  {
    kanji: "越",
    vocabulary: [
      {
        word: "越す",
        reading: "こす",
        meaning: "ပြောင်းရွှေ့သည် / ကျော်လွန်သည်",
      },
      {
        word: "年越しそば",
        reading: "としこしそば",
        meaning: "နှစ်သစ်ကူးချိန်စားသော ဆိုဘာ",
      },
      {
        word: "追い越す",
        reading: "おいこす",
        meaning: "ကျော်တက်သည်",
      },
      {
        word: "越える",
        reading: "こえる",
        meaning: "ကျော်လွန်သည်",
      },
      {
        word: "優越感",
        reading: "ゆうえつかん",
        meaning: "သာလွန်မှုခံစားချက်",
      },
    ],
  },

  {
    kanji: "仮",
    vocabulary: [
      {
        word: "仮の住まい",
        reading: "かりのすまい",
        meaning: "ယာယီနေအိမ်",
      },
      {
        word: "仮免許",
        reading: "かりめんきょ",
        meaning: "ယာယီလိုင်စင်",
      },
      {
        word: "仮名",
        reading: "かな",
        meaning: "ကနာ",
      },
      {
        word: "仮定する",
        reading: "かていする",
        meaning: "ယူဆသည်",
      },
      {
        word: "仮説",
        reading: "かせつ",
        meaning: "ယူဆချက်",
      },
      {
        word: "仮病",
        reading: "けびょう",
        meaning: "နေမကောင်းဟန်ဆောင်ခြင်း",
      },
    ],
  },

  {
    kanji: "域",
    vocabulary: [
      {
        word: "地域",
        reading: "ちいき",
        meaning: "ဒေသ",
      },
      {
        word: "区域",
        reading: "くいき",
        meaning: "နယ်မြေ",
      },
      {
        word: "領域",
        reading: "りょういき",
        meaning: "နယ်ပယ်",
      },
      {
        word: "流域",
        reading: "りゅういき",
        meaning: "မြစ်ဝှမ်းဒေသ",
      },
    ],
  },

  {
    kanji: "雑",
    vocabulary: [
      {
        word: "雑音",
        reading: "ざつおん",
        meaning: "ဆူညံသံ",
      },
      {
        word: "雑談",
        reading: "ざつだん",
        meaning: "အပျင်းပြေစကားပြောခြင်း",
      },
      {
        word: "複雑な",
        reading: "ふくざつな",
        meaning: "ရှုပ်ထွေးသော",
      },
      {
        word: "雑巾",
        reading: "ぞうきん",
        meaning: "သန့်ရှင်းရေးအဝတ်",
      },
      {
        word: "お雑煮",
        reading: "おぞうに",
        meaning: "နှစ်သစ်ကူး မိုချီဟင်းရည်",
      },
    ],
  },

  {
    kanji: "誌",
    vocabulary: [
      {
        word: "雑誌",
        reading: "ざっし",
        meaning: "မဂ္ဂဇင်း",
      },
      {
        word: "ファッション誌",
        reading: "ファッションし",
        meaning: "ဖက်ရှင်မဂ္ဂဇင်း",
      },
      {
        word: "日誌",
        reading: "にっし",
        meaning: "နေ့စဉ်မှတ်တမ်း",
      },
      {
        word: "文芸誌",
        reading: "ぶんげいし",
        meaning: "စာပေမဂ္ဂဇင်း",
      },
    ],
  },

  {
    kanji: "刊",
    vocabulary: [
      {
        word: "刊行",
        reading: "かんこう",
        meaning: "ထုတ်ဝေခြင်း",
      },
      {
        word: "朝刊",
        reading: "ちょうかん",
        meaning: "မနက်သတင်းစာ",
      },
      {
        word: "夕刊",
        reading: "ゆうかん",
        meaning: "ညနေသတင်းစာ",
      },
      {
        word: "日刊紙",
        reading: "にっかんし",
        meaning: "နေ့စဉ်သတင်းစာ",
      },
      {
        word: "週刊誌",
        reading: "しゅうかんし",
        meaning: "အပတ်စဉ်မဂ္ဂဇင်း",
      },
      {
        word: "創刊号",
        reading: "そうかんごう",
        meaning: "ပထမဆုံးထုတ်ဝေသောစာစောင်",
      },
    ],
  },

  {
    kanji: "並",
    vocabulary: [
      {
        word: "並ぶ",
        reading: "ならぶ",
        meaning: "တန်းစီသည်",
      },
      {
        word: "並べる",
        reading: "ならべる",
        meaning: "တန်းစီထားသည်",
      },
      {
        word: "並びに",
        reading: "ならびに",
        meaning: "နှင့် / ထို့အပြင်",
      },
      {
        word: "並",
        reading: "なみ",
        meaning: "ပုံမှန်အဆင့်",
      },
      {
        word: "人並",
        reading: "ひとなみ",
        meaning: "သာမန်လူများကဲ့သို့",
      },
      {
        word: "並列",
        reading: "へいれつ",
        meaning: "ဘေးချင်းယှဉ်တန်းစီခြင်း",
      },
    ],
  },

  {
    kanji: "巻",
    vocabulary: [
      {
        word: "巻く",
        reading: "まく",
        meaning: "လိပ်သည် / ပတ်သည်",
      },
      {
        word: "のり巻き",
        reading: "のりまき",
        meaning: "နိုရီမာကီ",
      },
      {
        word: "右巻き",
        reading: "みぎまき",
        meaning: "ညာဘက်သို့ လိပ်ခြင်း",
      },
      {
        word: "虎の巻",
        reading: "とらのまき",
        meaning: "လျှို့ဝှက်လမ်းညွှန်",
      },
      {
        word: "上巻",
        reading: "じょうかん",
        meaning: "အပေါ်ပိုင်းစာအုပ်",
      },
      {
        word: "全巻",
        reading: "ぜんかん",
        meaning: "စာအုပ်အစုံ",
      },
    ],
  },

  {
    kanji: "著",
    vocabulary: [
      {
        word: "著す",
        reading: "あらわす",
        meaning: "စာအုပ်ရေးသားထုတ်ဝေသည်",
      },
      {
        word: "著しい",
        reading: "いちじるしい",
        meaning: "သိသိသာသာဖြစ်သော",
      },
      {
        word: "著名人",
        reading: "ちょめいじん",
        meaning: "နာမည်ကျော်ပုဂ္ဂိုလ်",
      },
      {
        word: "著書",
        reading: "ちょしょ",
        meaning: "ရေးသားထုတ်ဝေသောစာအုပ်",
      },
      {
        word: "著者",
        reading: "ちょしゃ",
        meaning: "စာရေးသူ",
      },
      {
        word: "名著",
        reading: "めいちょ",
        meaning: "ကျော်ကြားသောစာအုပ်",
      },
    ],
  },

  {
    kanji: "居",
    vocabulary: [
      {
        word: "居る",
        reading: "いる",
        meaning: "ရှိသည် / နေသည်",
      },
      {
        word: "居間",
        reading: "いま",
        meaning: "ဧည့်ခန်း / နားနေခန်း",
      },
      {
        word: "居留守",
        reading: "いるす",
        meaning: "အိမ်မှာရှိပေမယ့် မရှိဟန်ဆောင်ခြင်း",
      },
      {
        word: "芝居",
        reading: "しばい",
        meaning: "ပြဇာတ်",
      },
      {
        word: "居酒屋",
        reading: "いざかや",
        meaning: "ဂျပန်အရက်ဆိုင် / စားသောက်ဆိုင်",
      },
      {
        word: "住居",
        reading: "じゅうきょ",
        meaning: "နေအိမ်",
      },
      {
        word: "同居",
        reading: "どうきょ",
        meaning: "အတူနေခြင်း",
      },
      {
        word: "皇居",
        reading: "こうきょ",
        meaning: "ဂျပန်ဧကရာဇ်နန်းတော်",
      },
    ],
  },

  {
    kanji: "庭",
    vocabulary: [
      {
        word: "庭",
        reading: "にわ",
        meaning: "ခြံ / ဥယျာဉ်",
      },
      {
        word: "校庭",
        reading: "こうてい",
        meaning: "ကျောင်းဝင်း",
      },
      {
        word: "日本庭園",
        reading: "にほんていえん",
        meaning: "ဂျပန်ရိုးရာဥယျာဉ်",
      },
      {
        word: "家庭",
        reading: "かてい",
        meaning: "မိသားစု / အိမ်ထောင်စု",
      },
    ],
  },

  {
    kanji: "清",
    vocabulary: [
      {
        word: "清い",
        reading: "きよい",
        meaning: "သန့်ရှင်းသော",
      },
      {
        word: "清まる",
        reading: "きよまる",
        meaning: "သန့်ရှင်းလာသည်",
      },
      {
        word: "清める",
        reading: "きよめる",
        meaning: "သန့်ရှင်းစေသည်",
      },
      {
        word: "清書",
        reading: "せいしょ",
        meaning: "သပ်ရပ်စွာ ပြန်ရေးခြင်း",
      },
    ],
  },

  {
    kanji: "掃",
    vocabulary: [
      {
        word: "掃く",
        reading: "はく",
        meaning: "တံမြက်စည်းလှည်းသည်",
      },
      {
        word: "掃除",
        reading: "そうじ",
        meaning: "သန့်ရှင်းရေးလုပ်ခြင်း",
      },
      {
        word: "清掃",
        reading: "せいそう",
        meaning: "သန့်ရှင်းရေးလုပ်ခြင်း",
      },
      {
        word: "一掃",
        reading: "いっそう",
        meaning: "လုံးဝဖယ်ရှားခြင်း",
      },
    ],
  },

  {
    kanji: "整",
    vocabulary: [
      {
        word: "整える",
        reading: "ととのえる",
        meaning: "စနစ်တကျ ပြင်ဆင်သည်",
      },
      {
        word: "整う",
        reading: "ととのう",
        meaning: "စနစ်တကျဖြစ်လာသည်",
      },
      {
        word: "整理",
        reading: "せいり",
        meaning: "စီစဉ်သိမ်းဆည်းခြင်း",
      },
      {
        word: "整理整頓",
        reading: "せいりせいとん",
        meaning: "စနစ်တကျ စီစဉ်သိမ်းဆည်းခြင်း",
      },
    ],
  },

  {
    kanji: "汚",
    vocabulary: [
      {
        word: "汚す",
        reading: "よごす",
        meaning: "ညစ်ပတ်စေသည်",
      },
      {
        word: "汚れる",
        reading: "よごれる",
        meaning: "ညစ်ပတ်လာသည်",
      },
      {
        word: "汚い",
        reading: "きたない",
        meaning: "ညစ်ပတ်သော",
      },
      {
        word: "汚す",
        reading: "けがす",
        meaning: "ဂုဏ်သိက္ခာကို ညစ်နွမ်းစေသည်",
      },
      {
        word: "汚れる",
        reading: "けがれる",
        meaning: "ညစ်နွမ်းသည်",
      },
      {
        word: "汚らわしい",
        reading: "けがらわしい",
        meaning: "ရွံရှာဖွယ်ကောင်းသော",
      },
      {
        word: "汚職",
        reading: "おしょく",
        meaning: "အဂတိလိုက်စားမှု",
      },
    ],
  },
];
