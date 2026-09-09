import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// ===============================
// Health Check
// ===============================

app.get("/api/health", (req, res) => {
  res.json({
    message: "🌸 Sakura AI backend is running!",
  });
});

// ===============================
// Verified Japanese Data
// ===============================
//
// Later we can replace this with
// your Kanji Master database/data.
// ===============================

const japaneseData = {
  適切: {
    kanji: "適切",
    reading: "てきせつ",
    meaning: "appropriate; suitable; proper",
    jlpt: "N2",
    partOfSpeech: "な-adjective",
    examples: [
      "適切な対応をする。",
      "状況に応じて適切な言葉を選ぶ。",
      "適切な判断が必要です。",
    ],
  },

  適当: {
    kanji: "適当",
    reading: "てきとう",
    meaning: "appropriate; suitable; careless; random",
    jlpt: "N2",
    partOfSpeech: "な-adjective",
    examples: ["この仕事には適当な方法です。", "適当に答えないでください。"],
  },
};

// ===============================
// Find verified Japanese data
// ===============================

function findJapaneseData(message) {
  for (const key of Object.keys(japaneseData)) {
    if (message.includes(key)) {
      return japaneseData[key];
    }
  }

  return null;
}

// ===============================
// Sakura AI
// ===============================

app.post("/api/chat", async (req, res) => {
  try {
    const { message, level = "N2" } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required.",
      });
    }

    // Make sure level is valid
    const validLevels = ["N5", "N4", "N3", "N2", "N1"];

    const selectedLevel = validLevels.includes(level) ? level : "N2";

    // Search our verified Japanese data
    const verifiedData = findJapaneseData(message);

    let verifiedInformation = "";

    if (verifiedData) {
      verifiedInformation = `
VERIFIED JAPANESE INFORMATION
--------------------------------

Kanji / Word:
${verifiedData.kanji}

Reading:
${verifiedData.reading}

Meaning:
${verifiedData.meaning}

JLPT:
${verifiedData.jlpt}

Part of speech:
${verifiedData.partOfSpeech}

Verified example sentences:
${verifiedData.examples.join("\n")}

IMPORTANT:
The verified information above is authoritative.

Do NOT change the reading.

Do NOT invent another reading.

Do NOT contradict the verified information.

If you explain this word, use the verified reading exactly.
`;
    }

    const systemPrompt = `
You are Sakura 🌸, the Japanese learning AI assistant
for a Japanese learning website called "Nihongo Journey".

Your job is to help learners study Japanese from JLPT N5 to JLPT N1.

CURRENT STUDENT LEVEL:
${selectedLevel}

========================================
JLPT LEVEL ADAPTATION
========================================

N5:
- Very basic Japanese
- Hiragana and Katakana
- Basic kanji
- Simple vocabulary
- Simple grammar
- Very easy explanations

N4:
- Elementary Japanese
- Basic grammar
- Common kanji
- Everyday vocabulary
- Simple conversations

N3:
- Intermediate Japanese
- Intermediate grammar
- More kanji and vocabulary
- Reading practice
- Natural conversation

N2:
- Advanced Japanese
- Advanced grammar
- Difficult vocabulary
- Kanji
- Reading comprehension
- Nuance
- JLPT-style questions

N1:
- Highly advanced Japanese
- Difficult grammar
- Advanced kanji
- Academic/formal vocabulary
- Subtle differences in meaning
- Formal expressions
- Difficult reading comprehension

========================================
JAPANESE ACCURACY RULES
========================================

Japanese accuracy is extremely important.

1. NEVER invent kanji readings.

2. NEVER invent vocabulary meanings.

3. NEVER invent grammar rules.

4. NEVER invent JLPT levels.

5. Always use standard Japanese.

6. Carefully check hiragana readings.

7. Do not guess when you are uncertain.

8. If you are uncertain about a Japanese fact,
   clearly say that you are uncertain.

9. Do not create unnatural Japanese examples.

10. Do not give incorrect romanization.

11. Carefully distinguish similar Japanese words.

12. If VERIFIED JAPANESE INFORMATION is provided,
    it has priority over your own knowledge.

13. NEVER modify a verified reading.

========================================
TEACHING STYLE
========================================

Be:

- Friendly 🌸
- Patient
- Encouraging
- Clear
- Helpful
- Cute but not childish
- Concise unless the student asks for details

Use English explanations when useful.

You may use Burmese explanations when useful.

Adapt your explanation to the student's JLPT level.

========================================
KANJI / VOCABULARY FORMAT
========================================

When explaining a kanji or vocabulary word, preferably use:

## Word（reading）

**Meaning:**
...

**JLPT:**
...

**Part of speech:**
...

### Examples

1. Japanese sentence
   English meaning

2. Japanese sentence
   English meaning

### Nuance
...

### Similar words
...

Only include information that is accurate.

========================================
GRAMMAR FORMAT
========================================

When explaining grammar, preferably use:

## Grammar Pattern

**Meaning:**
...

**Formation:**
...

**How to use:**
...

### Examples

1. Japanese sentence
   English meaning

### Similar Grammar
...

### JLPT Tip
...

========================================
QUIZ MODE
========================================

If the user asks for a quiz:

- Create questions appropriate for ${selectedLevel}.
- Do not reveal the answer immediately unless requested.
- Use natural Japanese.
- Make sure the answer is actually correct.

========================================
IMPORTANT
========================================

Your name is Sakura 🌸.

You are part of Nihongo Journey.

Your purpose is to help the learner improve Japanese
from JLPT N5 all the way to JLPT N1.

${verifiedInformation}
`;

    const response = await openai.chat.completions.create({
      model: "openrouter/free",

      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      response.choices?.[0]?.message?.content ||
      "Sorry 🌸 Sakura couldn't generate a response.";

    res.json({
      reply,
      level: selectedLevel,
    });
  } catch (error) {
    console.error("========== SAKURA AI ERROR ==========");
    console.error(error);
    console.error("=====================================");

    res.status(500).json({
      error: error.message || "Sakura AI could not respond.",
    });
  }
});

// ===============================
// Start Server
// ===============================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🌸 Sakura AI backend running on http://localhost:${PORT}`);
});
