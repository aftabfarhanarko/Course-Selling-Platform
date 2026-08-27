"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  HelpCircle,
  Plus,
  Minus,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: any;
}

const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "How do I enroll and start learning on EduNova?",
    answer:
      "Simply choose your preferred course or learning track, click 'Enroll Now', and create your account. You get instant lifetime access to course videos, interactive coding sandboxes, and student community channels.",
    icon: Clock,
  },
  {
    id: "faq-2",
    question: "Are the instructors verified industry professionals?",
    answer:
      "Yes! All EduNova mentors and instructors are senior engineers and tech leads from top companies like Google, Meta, Microsoft, and Amazon with proven real-world engineering experience.",
    icon: ShieldCheck,
  },
  {
    id: "faq-3",
    question: "What if I am not satisfied with a course?",
    answer:
      "We offer a 100% risk-free 14-day money-back guarantee. If you feel the course doesn't meet your expectations, simply request a full refund with one click—no questions asked.",
    icon: HelpCircle,
  },
  {
    id: "faq-4",
    question: "Are there any hidden recurring charges or subscription fees?",
    answer:
      "No hidden fees! Each course purchase provides full lifetime access with all future course updates included free of charge. No monthly subscription traps.",
    icon: CreditCard,
  },
  {
    id: "faq-5",
    question: "How do EduNova certificates work for career growth?",
    answer:
      "Upon course completion, you earn a tamper-proof digital certificate with a unique verification link that you can share on LinkedIn, GitHub, and directly with recruiters.",
    icon: Award,
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section ref={sectionRef} className="py-8 sm:py-12 bg-transparent overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* ── LEFT SIDE: Section Header & Contact Support Box ── */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.96 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -40, scale: 0.96 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4 lg:sticky lg:top-28"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] border border-[#5B50E6]/20 text-[#5B50E6] text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> GOT QUESTIONS?
            </div>

            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
              Frequently Asked <br />
              <span className="text-[#5B50E6]">Questions</span>
            </h2>

            <ul className="space-y-3 text-xs sm:text-[13px] font-medium text-slate-500 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5B50E6] mt-1.5 shrink-0" />
                <span>Have queries regarding course access, pricing, or career certification?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5B50E6] mt-1.5 shrink-0" />
                <span>We provide transparent pricing, 14-day money-back guarantee, and 1-on-1 mentor support.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5B50E6] mt-1.5 shrink-0" />
                <span>Our verified industry professionals are available 24/7 across all learning paths.</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#5B50E6] text-white font-extrabold text-xs shadow-md shadow-[#5B50E6]/20 hover:bg-[#4D42DB] transition-all hover:scale-105 active:scale-95 uppercase tracking-wider"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>STILL NEED HELP? CONTACT SUPPORT</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* ── RIGHT SIDE: Accordion FAQ List ── */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openId === faq.id;
              const Icon = faq.icon;

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 35, scale: 0.96 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 35, scale: 0.96 }}
                  transition={{
                    duration: 1.1,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`rounded-2xl border transition-all duration-700 ease-out overflow-hidden ${
                    isOpen
                      ? "bg-white border-[#5B50E6]/40 shadow-xl shadow-indigo-500/10"
                      : "bg-white/80 backdrop-blur-md border-slate-200/80 hover:bg-white hover:border-[#5B50E6]/20 shadow-sm"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-5 sm:p-5.5 text-left flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ease-out ${
                          isOpen
                            ? "bg-[#5B50E6] text-white shadow-md shadow-[#5B50E6]/30"
                            : "bg-[#EEF2FF] text-[#5B50E6] group-hover:bg-[#5B50E6] group-hover:text-white"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#5B50E6] transition-colors duration-300">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ease-out ${
                        isOpen
                          ? "bg-[#5B50E6] border-[#5B50E6] text-white rotate-180"
                          : "bg-slate-100 border-slate-200 text-slate-500 group-hover:border-[#5B50E6] group-hover:text-[#5B50E6]"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-[13px] font-medium text-slate-500 leading-relaxed border-t border-slate-100/80">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
