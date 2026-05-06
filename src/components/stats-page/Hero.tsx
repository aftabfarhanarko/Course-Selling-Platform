"use client";
import { useState, useEffect, useRef } from "react";

const AI_RESPONSES: Record<string, string> = {
  "Is this for beginners?":
    "This course suits intermediate designers. Basic Figma/design knowledge is recommended, but beginners with strong motivation do just fine! 💪",
  "What do I get?":
    "You get 40+ hours of video, live project templates, a private community, lifetime access, and 1-on-1 feedback sessions. 🎯",
  "Is there a refund policy?":
    "Yes! Full 30-day money-back guarantee — no questions asked. Your investment is risk-free. ✅",
};

const GENERIC = [
  "Great question! This course covers real-world SaaS design patterns used by top-tier product companies.",
  "The curriculum is updated quarterly to reflect industry changes. You'll always learn what's current.",
  "Most students land their first $5k–$10k project within 90 days of completing the course.",
];

function AIPanel({ open }: { open: boolean }) {
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Hi! 👋 I'm your AI guide for this masterclass. What would you like to know?",
    },
  ]);
  const [chips, setChips] = useState([
    "Is this for beginners?",
    "What do I get?",
    "Is there a refund policy?",
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  // FIXED: typed as HTMLDivElement
  const msgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msgRef.current) msgRef.current.scrollTop = msgRef.current.scrollHeight;
  }, [messages, typing]);

  const addReply = (text: string) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { type: "ai", text }]);
    }, 1400);
  };

  const sendChip = (chip: string) => {
    setChips((prev) => prev.filter((c) => c !== chip));
    setMessages((prev) => [...prev, { type: "user", text: chip }]);
    addReply(
      AI_RESPONSES[chip] || GENERIC[Math.floor(Math.random() * GENERIC.length)],
    );
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const val = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { type: "user", text: val }]);
    addReply(
      AI_RESPONSES[val] || GENERIC[Math.floor(Math.random() * GENERIC.length)],
    );
  };

  return (
    <div
      className={`absolute top-11 right-[-10px] w-[300px]  rounded-[18px] shadow-[0_20px_60px_rgba(12,26,59,0.18)] overflow-hidden z-20 transition-all duration-300 origin-top-right ${
        open
          ? "scale-100 opacity-100 pointer-events-auto"
          : "scale-90 opacity-0 pointer-events-none"
      }`}
    >
      {/* Header */}
      <div className="bg-[#1a4bff] px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-base">
          ✦
        </div>
        <div className="text-white flex-1">
          <div className="text-[13px] font-semibold">AI Course Assistant</div>
          <div className="text-[11px] opacity-75">
            Ask anything about the course
          </div>
        </div>
        <div className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">
          AI
        </div>
      </div>

      {/* Messages */}
      <div
        ref={msgRef}
        className="px-3.5 pt-3.5 flex flex-col gap-2.5 max-h-[200px] overflow-y-auto"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 items-start ${msg.type === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-[26px] h-[26px] rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-bold ${
                msg.type === "user"
                  ? "bg-[#0c1a3b] text-white"
                  : "bg-gradient-to-br from-[#c7d6ff] to-[#a5b4fc] text-[#1a4bff]"
              }`}
            >
              {msg.type === "user" ? "You" : "✦"}
            </div>
            <div
              className={`px-3 py-2 text-[12px] leading-relaxed max-w-[210px] ${
                msg.type === "user"
                  ? "bg-[#1a4bff] text-white rounded-[12px_12px_3px_12px]"
                  : "bg-[#f0f3fa] text-[#0c1a3b] rounded-[12px_12px_12px_3px]"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-2 items-start">
            <div className="w-[26px] h-[26px] rounded-full bg-gradient-to-br from-[#c7d6ff] to-[#a5b4fc] flex-shrink-0 flex items-center justify-center text-[11px] font-bold text-[#1a4bff]">
              ✦
            </div>
            <div className="bg-[#f0f3fa] rounded-[12px_12px_12px_3px] px-3 py-2.5 flex gap-1 items-center">
              {[0, 200, 400].map((delay) => (
                <span
                  key={delay}
                  className="w-1.5 h-1.5 bg-[#8896b3] rounded-full animate-bounce"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Chips */}
      {chips.length > 0 && (
        <div className="px-3.5 pb-2.5 pt-2 flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => sendChip(chip)}
              className="bg-[#f0f3fa] border border-[#e2e6f0] rounded-full px-2.5 py-1 text-[11px] text-[#1a4bff] hover:bg-[#dce3ff] hover:border-[#b3c0ff] transition-all"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-3.5 pb-3.5 pt-2 flex gap-2 items-center border-t border-[#f0f3fa]">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask a question..."
          className="flex-1 border border-[#e2e6f0] rounded-full px-3.5 py-1.5 text-[12px] text-[#0c1a3b] outline-none focus:border-[#1a4bff]"
        />
        <button
          onClick={sendMessage}
          className="w-8 h-8 bg-[#1a4bff] hover:bg-[#1238d4] rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon
              points="22 2 15 22 11 13 2 9 22 2"
              fill="rgba(255,255,255,0.3)"
              stroke="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className=" min-h-screen flex items-center justify-center ">
      <div
        className={`max-w-11/12 w-full grid md:grid-cols-2 gap-14 items-center transition-all duration-700 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 bg-[#dcfce7] text-[#15803d] text-[10.5px] font-bold tracking-[0.13em] uppercase px-4 py-1.5 rounded-full w-fit">
            <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
            Enrollment Open
          </div>

          <h1 className="font-['Syne'] text-[clamp(2.2rem,4.8vw,3.5rem)] font-extrabold leading-[1.07] tracking-[-0.022em] text-[#0c1a3b]">
            SaaS Interface{" "}
            <em className="not-italic text-[#1a4bff]">Architect</em> Masterclass
          </h1>

          <p className="text-base leading-relaxed text-[#5b6580] max-w-md">
            Master the high-ticket skill of SaaS product design. Move beyond "UI
            design" and start building scalable interface architectures that
            command $10k+ project fees.
          </p>

          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#c7d6ff] to-[#a5b4fc] flex items-center justify-center font-['Syne'] font-extrabold text-[#1a4bff] text-sm flex-shrink-0">
                AR
              </div>
              <div>
                <div className="font-medium text-[#0c1a3b] text-sm">
                  Alex Rivera
                </div>
                <div className="text-xs text-[#5b6580]">Lead Instructor</div>
              </div>
            </div>
            <div className="w-px h-8 bg-[#d0d5e8] hidden sm:block" />
            <div>
              <div className="text-[#f59e0b] text-sm">★★★★★</div>
              <div className="text-xs text-[#5b6580]">4.9 (1.2k Ratings)</div>
            </div>
            <div className="w-px h-8 bg-[#d0d5e8] hidden sm:block" />
            <div className="text-sm font-medium text-[#0c1a3b]">
              5,000+ Students
            </div>
          </div>

          <div className="flex items-center gap-5 flex-wrap">
            <button className="inline-flex items-center gap-3 bg-[#1a4bff] hover:bg-[#1238d4] text-white font-medium px-8 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-[0_8px_28px_rgb(26,75,255,0.32)]">
              Buy Now — $499
            </button>
            <div className="text-sm text-[#5b6580]">
              Limited time{" "}
              <span className="line-through text-gray-400">50% discount</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="relative flex justify-center">
          {/* AI FAB Button */}
          <button
            onClick={() => setAiOpen((o) => !o)}
            className="absolute top-[-20px] right-[-20px] z-10 w-[52px] h-[52px] bg-[#1a4bff] hover:scale-110 transition-transform rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(26,75,255,0.4)]"
            title="Ask AI Assistant"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z" />
              <circle cx="9" cy="10" r="1" fill="white" stroke="none" />
              <circle cx="15" cy="10" r="1" fill="white" stroke="none" />
            </svg>
          </button>

          {/* AI Panel */}
          <AIPanel open={aiOpen} />

          {/* Mockup Card */}
          <div className="w-full max-w-[500px] bg-white rounded-3xl shadow-[0_32px_80px_rgba(12,26,59,0.14)] overflow-hidden">
            <div className="bg-[#1e2333] px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                <div className="w-2 h-2 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 bg-[#2d3450] h-5 rounded-md text-[10px] text-[#6b7a9e] font-mono flex items-center px-3">
                dashboard.buildlabs.io
              </div>
            </div>
            <div className="relative bg-[#f8f9fc] p-5">
              <div className="text-[#0c1a3b] font-['Syne'] text-xs font-bold tracking-widest uppercase mb-1">
                Create New SaaS Project
              </div>
              <div className="text-[#8896b3] text-[11px] -mt-1 mb-4">
                Load your interface, save time
              </div>
              <div className="space-y-2 mb-5">
                <div className="h-9 bg-white border border-[#e2e6f0] rounded-xl w-full" />
                <div className="h-9 bg-white border border-[#e2e6f0] rounded-xl w-3/5" />
                <div className="h-9 bg-white border border-[#e2e6f0] rounded-xl w-full" />
              </div>
              <div className="h-7 w-20 bg-[#1a4bff] rounded-lg" />
              <div className="absolute right-0 top-0 bottom-0 w-[42%] bg-gradient-to-br from-[#7db5e8] via-[#a8d5f0] to-[#b8e0f0] rounded-tl-[60px] overflow-hidden">
                <svg
                  className="absolute bottom-0 left-0 right-0 w-full"
                  viewBox="0 0 200 120"
                  preserveAspectRatio="xMidYMax slice"
                >
                  <path
                    d="M0 120 L60 40 L100 70 L140 20 L200 80 L200 120 Z"
                    fill="rgba(40,90,50,0.6)"
                  />
                  <path
                    d="M0 120 L80 60 L120 90 L160 50 L200 100 L200 120 Z"
                    fill="rgba(30,70,40,0.5)"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Floating Stat Card */}
          <div className="absolute -bottom-5 -left-6 bg-white rounded-2xl p-5 shadow-[0_16px_40px_rgba(12,26,59,0.16)] min-w-[180px] animate-[float_3s_ease-in-out_infinite]">
            <div className="text-[#1a4bff] text-[10px] font-bold tracking-widest uppercase mb-1">
              Student Revenue
            </div>
            <div className="font-['Syne'] text-3xl font-extrabold text-[#0c1a3b]">
              $8,500/mo
            </div>
            <div className="text-[#22c55e] text-sm flex items-center gap-1 mt-2">
              ↗ Avg. Project Target
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


