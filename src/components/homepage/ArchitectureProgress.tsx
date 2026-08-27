"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Mail } from "lucide-react";
import { toast } from "sonner";

export default function ArchitectureProgress() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  const benefits = [
    "Learn from industry experts",
    "Flexible and self-paced learning",
    "Certificate on course completion",
    "Access on any device, anytime",
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* ── Left Feature Box (Why Choose EduNova?) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-indigo-50/60 border border-indigo-100/80 rounded-3xl p-8 sm:p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
          >
            {/* Left Content */}
            <div className="flex-1">
              <span className="text-xs font-black tracking-widest text-[#4F46E5] uppercase">
                WHY CHOOSE EDUNOVA?
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-6 leading-tight">
                The Best Way to <br className="hidden sm:inline" />
                Achieve Your Goals
              </h2>

              <ul className="space-y-3.5">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#4F46E5] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side Illustration */}
            <div className="relative w-full md:w-5/12 max-w-[260px] sm:max-w-[290px] shrink-0 flex justify-center mt-6 md:mt-0">
              <svg
                viewBox="0 0 400 320"
                className="w-full h-auto drop-shadow-xl"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="210" cy="150" r="160" fill="#4F46E5" opacity="0.06" />

                {/* plant */}
                <path d="M78 250 C58 200 58 158 80 128 C102 158 102 200 82 250 Z" fill="#059669" />
                <path d="M58 256 C28 220 18 180 40 150 C66 176 70 216 58 256 Z" fill="#10B981" />
                <path d="M102 256 C132 220 142 180 122 150 C96 176 90 216 102 256 Z" fill="#34D399" />
                <path d="M38 258 L122 258 L112 300 L50 300 Z" fill="#D97706" />
                <rect x="33" y="248" width="94" height="14" rx="4" fill="#F59E0B" />

                {/* books */}
                <rect x="228" y="272" width="150" height="22" rx="4" fill="#4F46E5" />
                <rect x="228" y="272" width="150" height="6" rx="3" fill="#6366F1" />
                <rect x="244" y="250" width="120" height="20" rx="4" fill="#FFFFFF" stroke="#C7D2FE" strokeWidth="2" />
                <rect x="244" y="250" width="120" height="5" rx="2.5" fill="#EEF2FF" />

                {/* laptop */}
                <rect x="108" y="58" width="222" height="152" rx="16" fill="#312E81" />
                <rect x="120" y="70" width="198" height="128" rx="9" fill="#EEF2FF" />

                {/* video thumbnail */}
                <rect x="138" y="84" width="162" height="72" rx="8" fill="#C7D2FE" />
                <circle cx="219" cy="120" r="19" fill="#4F46E5" />
                <path d="M213 111 L213 129 L230 120 Z" fill="#FFFFFF" />

                {/* content lines */}
                <rect x="138" y="166" width="100" height="8" rx="4" fill="#A5B4FC" />
                <rect x="138" y="180" width="70" height="8" rx="4" fill="#C7D2FE" />

                {/* keyboard base */}
                <path d="M93 210 L337 210 L358 236 L72 236 Z" fill="#4338CA" />
                <rect x="192" y="216" width="44" height="6" rx="3" fill="#818CF8" />

                {/* graduation cap */}
                <g transform="rotate(-8 285 48)">
                  <rect x="262" y="46" width="46" height="11" rx="2" fill="#1E1B4B" />
                  <path d="M285 20 L332 44 L285 68 L238 44 Z" fill="#1E1B4B" />
                  <circle cx="285" cy="44" r="4" fill="#F59E0B" />
                  <path d="M320 44 L320 72" stroke="#F59E0B" strokeWidth="2" />
                  <circle cx="320" cy="76" r="4" fill="#F59E0B" />
                </g>

                {/* decorative dots */}
                <circle cx="60" cy="90" r="5" fill="#4F46E5" opacity="0.3" />
                <circle cx="360" cy="120" r="6" fill="#F59E0B" opacity="0.3" />
                <circle cx="340" cy="250" r="4" fill="#10B981" opacity="0.3" />
              </svg>
            </div>
          </motion.div>

          {/* ── Right Newsletter Card (Get the Latest Updates) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 bg-[#FFFDF5] rounded-3xl p-8 sm:p-10 border border-amber-100/80 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6 shadow-sm">
                <Mail className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                Get the Latest Updates
              </h3>
              <p className="text-xs font-medium text-slate-500 leading-relaxed mb-6">
                Subscribe to our newsletter and get the latest courses and offers directly in your inbox.
              </p>

              <form onSubmit={handleSubscribe} className="flex items-center gap-2 mb-8">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#4F46E5] bg-white text-slate-800 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-[#4F46E5] hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/20 shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <div className="flex items-center gap-3.5 pt-4 border-t border-amber-200/50">
              <div className="flex -space-x-2 shrink-0">
                <img
                  className="h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Learner"
                />
                <img
                  className="h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Learner"
                />
                <img
                  className="h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                  alt="Learner"
                />
              </div>
              <p className="text-xs font-bold text-slate-700 leading-snug">
                Trusted by 50,000+ learners <br className="hidden sm:block" /> around the world
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}