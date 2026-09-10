
import { useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowUp,
  BookOpen,
  Brain,
  Check,
  Clock3,
  MessageCircle,
  RotateCcw,
  Sparkles,
  Target,
  X,
} from "lucide-react";

type Message = {
  id: number;
  sender: "ai" | "user";
  text: string;
};

const quickActions = [
  {
    label: "Grammar",
    description: "Explain N2 grammar",
    icon: BookOpen,
    prompt: "Can you explain JLPT N2 grammar to me?",
  },
  {
    label: "Kanji",
    description: "Help with Kanji",
    icon: Brain,
    prompt: "Help me understand a Japanese Kanji.",
  },
  {
    label: "Vocabulary",
    description: "Practice vocabulary",
    icon: MessageCircle,
    prompt: "Give me a Japanese vocabulary quiz.",
  },
  {
    label: "N2 Practice",
    description: "Test my knowledge",
    icon: Target,
    prompt: "Give me a JLPT N2 practice question.",
  },
];

function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Current learner level.
  // We will make this selectable later.
  const [learnerLevel] = useState("N2");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: "こんにちは！ 🌸 I'm Sakura, your Japanese learning assistant. What would you like to study today?",
    },
  ]);

  // ============================================================
  // SEND MESSAGE TO REAL SAKURA API
  // ============================================================

  const sendMessage = async (messageText?: string) => {
    const text = messageText ?? input.trim();

    if (!text || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text,
    };

    // Show user's message immediately
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          level: learnerLevel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Sakura could not respond."
        );
      }

      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text:
          data.reply ||
          "Sorry 🌸 Sakura couldn't generate a response.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Sakura AI error:", error);

      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text:
          "ごめんなさい 🌸 Sakura couldn't connect right now.\n\nPlease make sure the Sakura AI server is running on port 5000.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // ============================================================
  // FORM SUBMIT
  // ============================================================

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  // ============================================================
  // QUICK ACTION
  // ============================================================

  const handleQuickAction = (prompt: string) => {
    sendMessage(prompt);
  };

  // ============================================================
  // CLEAR CHAT
  // ============================================================

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: "ai",
        text: "こんにちは！ 🌸 I'm Sakura, your Japanese learning assistant. What would you like to study today?",
      },
    ]);

    setInput("");
  };

  return (
    <>
      {/* =========================================================
          FLOATING AI ORB
      ========================================================= */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open Sakura AI"
          className="group fixed bottom-6 right-6 z-50"
        >
          {/* Tooltip */}
          <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-xl border border-pink-100 bg-white px-3 py-1.5 text-xs font-semibold text-[#4A2848] opacity-0 shadow-md shadow-pink-100/40 transition-all duration-200 group-hover:opacity-100">
            Sakura AI 🌸
          </span>

          {/* Orb */}
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-pink-200 bg-gradient-to-br from-white via-pink-50 to-rose-100 text-pink-400 shadow-lg shadow-pink-200/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-pink-200/60">
            {/* Inner ring */}
            <span className="absolute inset-1.5 rounded-full border border-pink-200/50" />

            {/* Sparkle */}
            <Sparkles
              size={19}
              strokeWidth={1.8}
              className="relative transition-transform duration-300 group-hover:rotate-12"
            />

            {/* Status dot */}
            <span className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-pink-400" />
          </span>
        </button>
      )}

      {/* =========================================================
          CHAT WINDOW
      ========================================================= */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 flex h-[min(700px,calc(100vh-40px))] w-[min(430px,calc(100vw-32px))] flex-col overflow-hidden rounded-[28px] border border-pink-100 bg-white shadow-2xl shadow-pink-200/40">
          {/* =====================================================
              HEADER
          ===================================================== */}
          <div className="relative overflow-hidden bg-gradient-to-br from-pink-400 via-pink-300 to-rose-300 px-5 py-4 text-white">
            {/* Decorative circles */}
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10" />
            <div className="absolute -bottom-12 right-24 h-24 w-24 rounded-full bg-white/10" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 shadow-sm backdrop-blur-sm">
                  <Sparkles size={22} strokeWidth={1.8} />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-base font-extrabold">
                      Sakura AI
                    </h2>

                    <Sparkles size={13} />
                  </div>

                  <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    <span>Japanese Learning Assistant</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Clear chat */}
                <button
                  type="button"
                  onClick={clearChat}
                  aria-label="Clear chat"
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-white/75 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <RotateCcw size={16} />
                </button>

                {/* Close */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Sakura AI"
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-white/75 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* =====================================================
              STUDY CONTEXT
          ===================================================== */}
          <div className="border-b border-pink-100 bg-white px-4 py-3">
            <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 px-3.5 py-2.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-pink-400 shadow-sm">
                  <Clock3 size={15} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-pink-400">
                    Study Mode
                  </p>

                  <p className="text-xs font-semibold text-[#4A2848]">
                    Japanese · JLPT {learnerLevel}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-pink-400 shadow-sm">
                Ready
              </span>
            </div>
          </div>

          {/* =====================================================
              MESSAGES
          ===================================================== */}
          <div className="flex-1 overflow-y-auto bg-[#fffafd] px-4 py-5">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {/* AI icon */}
                  {message.sender === "ai" && (
                    <div className="mr-2 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-400">
                      <Sparkles size={14} />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.sender === "user"
                        ? "rounded-br-md bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-sm"
                        : "rounded-bl-md border border-pink-100 bg-white text-[#4A2848] shadow-sm"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {/* =================================================
                  TYPING INDICATOR
              ================================================= */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="mr-2 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-400">
                    <Sparkles size={14} />
                  </div>

                  <div className="rounded-2xl rounded-bl-md border border-pink-100 bg-white px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-pink-300 [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-pink-300 [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-pink-300" />
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================
                  QUICK ACTIONS
              ================================================= */}
              {messages.length === 1 && !isTyping && (
                <div className="pt-1">
                  <div className="mb-3 flex items-center gap-2 px-1">
                    <div className="h-px flex-1 bg-pink-100" />

                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A2848]/35">
                      Quick Start
                    </span>

                    <div className="h-px flex-1 bg-pink-100" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action) => {
                      const Icon = action.icon;

                      return (
                        <button
                          key={action.label}
                          type="button"
                          onClick={() =>
                            handleQuickAction(action.prompt)
                          }
                          className="group rounded-2xl border border-pink-100 bg-white p-3 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-pink-200 hover:bg-pink-50 hover:shadow-md"
                        >
                          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-pink-50 text-pink-400 transition-colors group-hover:bg-pink-100">
                            <Icon size={15} />
                          </div>

                          <p className="text-xs font-bold text-[#4A2848]">
                            {action.label}
                          </p>

                          <p className="mt-0.5 text-[10px] leading-4 text-[#4A2848]/40">
                            {action.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* =====================================================
              INPUT AREA
          ===================================================== */}
          <div className="border-t border-pink-100 bg-white p-3">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-2 rounded-2xl border border-pink-100 bg-[#fff9fb] p-1.5 pl-4 transition-all focus-within:border-pink-300 focus-within:ring-2 focus-within:ring-pink-100">
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask Sakura anything... 🌸"
                  disabled={isTyping}
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm text-[#4A2848] outline-none placeholder:text-[#4A2848]/35 disabled:cursor-not-allowed"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  aria-label="Send message"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pink-400 text-white shadow-sm transition-all hover:bg-pink-500 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ArrowUp
                    size={17}
                    strokeWidth={2.2}
                  />
                </button>
              </div>
            </form>

            <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-[#4A2848]/30">
              <Check size={10} />
              <span>Made for your Japanese learning journey</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AIAssistant;
