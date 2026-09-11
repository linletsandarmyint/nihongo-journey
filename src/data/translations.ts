
export type Language = "English" | "Myanmar";

export const translations = {
  English: {
    nav: {
      home: "Home",
      studyPlan: "Study Plan",
      kanjiMaster: "Kanji Master",
      progress: "Progress",
      timer: "Timer",
      profile: "My Profile",
      settings: "Settings",
      logout: "Sign Out",
      login: "Log In",
      signup: "Sign Up",
      keepLearning: "Keep learning!",
      viewProfile: "View and edit your profile",
      appPreferences: "App preferences",
      seeYouNextTime: "See you next time ♡",
      toggleNavigation: "Toggle navigation menu",
      encouragement: "がんばってね！ 🌸✨",
    },

    common: {
      back: "Back",
      backToJourney: "Back to Journey",
      save: "Save Changes",
      saving: "Saving...",
      saved: "Changes saved",
      loading: "Loading...",
      cancel: "Cancel",
      start: "Start",
      continue: "Continue",
      close: "Close",
      enabled: "enabled",
      disabled: "disabled",
      dailyGoal: "Daily goal",
      focusedStudy: "Focused study",
      bright: "Bright",
      dim: "Dim",
      automatic: "Automatic",
    },

    settings: {
      title: "Settings",
      subtitle:
        "Customize your learning experience and make Nihongo Journey feel like your own.",

      preferences: "Preferences",

      appearance: "Appearance",
      appearanceDescription: "Choose how Nihongo Journey looks",

      light: "Light",
      dark: "Dark",
      system: "System",

      learningPreferences: "Learning Preferences",
      learningDescription:
        "Set your language and study goals",

      interfaceLanguage: "Interface Language",
      interfaceLanguageDescription:
        "Choose the language used throughout the app",

      english: "English",
      myanmar: "Myanmar",

      currentJlpt: "Current JLPT Level",
      currentJlptDescription:
        "Used to personalize your learning experience",

      dailyStudyGoal: "Daily Study Goal",
      dailyStudyGoalDescription:
        "How much time would you like to study each day?",

      minutes15: "15 min",
      minutes30: "30 min",
      minutes45: "45 min",
      hour1: "1 hour",
      hours1_5: "1.5 hours",
      hours2: "2 hours",

      notifications: "Notifications",
      notificationsDescription:
        "Control your study reminders",

      studyReminders: "Study Reminders",
      studyRemindersDescription:
        "Receive reminders when it's time to continue studying",

      sakuraAI: "Sakura AI",
      sakuraDescription:
        "Manage your Japanese learning assistant",

      enableSakura: "Enable Sakura AI",
      enableSakuraDescription:
        "Let Sakura help explain grammar, kanji, vocabulary and more",

      personalizedAssistance: "Personalized assistance",
      personalizedAssistanceDescription:
        "Sakura can use your JLPT level to tailor explanations and practice",

      loadingSettings: "Loading your settings...",
    },

    errors: {
      mustBeLoggedIn: "You must be logged in.",
    },
  },

  Myanmar: {
    nav: {
      home: "ပင်မစာမျက်နှာ",
      studyPlan: "လေ့လာမှုအစီအစဉ်",
      kanjiMaster: "Kanji Master",
      progress: "တိုးတက်မှု",
      timer: "Timer",
      profile: "ကိုယ်ရေးအချက်အလက်",
      settings: "ဆက်တင်များ",
      logout: "ထွက်မည်",
      login: "ဝင်မည်",
      signup: "အကောင့်ဖွင့်မည်",
      keepLearning: "ဆက်လက်လေ့လာကြရအောင်!",
      viewProfile: "ကိုယ်ရေးအချက်အလက်ကို ကြည့်ရှု/ပြင်ဆင်မည်",
      appPreferences: "App ဆက်တင်များ",
      seeYouNextTime: "နောက်တစ်ခါ ပြန်တွေ့ကြမယ် ♡",
      toggleNavigation: "Navigation menu ဖွင့်/ပိတ်မည်",
      encouragement: "がんばってね！ 🌸✨",
    },

    common: {
      back: "နောက်သို့",
      backToJourney: "Journey သို့ ပြန်သွားမည်",
      save: "ပြောင်းလဲမှုများ သိမ်းမည်",
      saving: "သိမ်းနေသည်...",
      saved: "ပြောင်းလဲမှုများ သိမ်းဆည်းပြီးပါပြီ",
      loading: "ဖွင့်နေသည်...",
      cancel: "ပယ်ဖျက်မည်",
      start: "စတင်မည်",
      continue: "ဆက်လုပ်မည်",
      close: "ပိတ်မည်",
      enabled: "ဖွင့်ထားသည်",
      disabled: "ပိတ်ထားသည်",
      dailyGoal: "နေ့စဉ်ရည်မှန်းချက်",
      focusedStudy: "အာရုံစိုက်လေ့လာမှု",
      bright: "အလင်း",
      dim: "မှိန်",
      automatic: "အလိုအလျောက်",
    },

    settings: {
      title: "ဆက်တင်များ",
      subtitle:
        "သင့်ရဲ့ Nihongo Journey လေ့လာမှုအတွေ့အကြုံကို စိတ်ကြိုက်ပြင်ဆင်ပါ။",

      preferences: "စိတ်ကြိုက်ဆက်တင်များ",

      appearance: "အသွင်အပြင်",
      appearanceDescription:
        "Nihongo Journey ရဲ့ အသွင်အပြင်ကို ရွေးချယ်ပါ",

      light: "အလင်း",
      dark: "အမှောင်",
      system: "System",

      learningPreferences: "လေ့လာမှုဆိုင်ရာ ဆက်တင်များ",
      learningDescription:
        "ဘာသာစကားနှင့် လေ့လာမှုရည်မှန်းချက်များ သတ်မှတ်ပါ",

      interfaceLanguage: "အသုံးပြုမည့် ဘာသာစကား",
      interfaceLanguageDescription:
        "App တစ်ခုလုံးတွင် အသုံးပြုမည့် ဘာသာစကားကို ရွေးချယ်ပါ",

      english: "English",
      myanmar: "မြန်မာ",

      currentJlpt: "လက်ရှိ JLPT Level",
      currentJlptDescription:
        "သင့်လေ့လာမှုကို စိတ်ကြိုက်ပြင်ဆင်ရန် အသုံးပြုပါမည်",

      dailyStudyGoal: "နေ့စဉ်လေ့လာမှု ရည်မှန်းချက်",
      dailyStudyGoalDescription:
        "တစ်နေ့လျှင် ဘယ်လောက်ကြာ လေ့လာချင်ပါသလဲ?",

      minutes15: "၁၅ မိနစ်",
      minutes30: "၃၀ မိနစ်",
      minutes45: "၄၅ မိနစ်",
      hour1: "၁ နာရီ",
      hours1_5: "၁.၅ နာရီ",
      hours2: "၂ နာရီ",

      notifications: "အသိပေးချက်များ",
      notificationsDescription:
        "လေ့လာမှုသတိပေးချက်များကို စီမံပါ",

      studyReminders: "လေ့လာမှု သတိပေးချက်များ",
      studyRemindersDescription:
        "လေ့လာရန်အချိန်ရောက်သောအခါ သတိပေးချက်ရယူပါ",

      sakuraAI: "Sakura AI",
      sakuraDescription:
        "သင့်ရဲ့ Japanese learning assistant ကို စီမံပါ",

      enableSakura: "Sakura AI ကို အသုံးပြုမည်",
      enableSakuraDescription:
        "Grammar, Kanji, Vocabulary နှင့် အခြားအရာများကို Sakura က ကူညီပေးနိုင်ပါမည်",

      personalizedAssistance: "စိတ်ကြိုက်အကူအညီ",
      personalizedAssistanceDescription:
        "သင့် JLPT Level ကို အသုံးပြုပြီး Sakura က ရှင်းပြချက်များနှင့် လေ့ကျင့်ခန်းများကို စိတ်ကြိုက်ပြင်ဆင်ပေးနိုင်ပါသည်",

      loadingSettings: "သင့်ရဲ့ ဆက်တင်များကို ဖွင့်နေသည်...",
    },

    errors: {
      mustBeLoggedIn: "အကောင့်ဝင်ထားရန် လိုအပ်ပါသည်။",
    },
  },
} as const;

