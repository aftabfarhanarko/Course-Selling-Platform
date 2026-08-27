"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Compass,
  Code2,
  CheckCircle2,
  Award,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    step: "01",
    title: "Choose Your Track",
    desc: "Select from curated engineering paths designed by industry leaders.",
    icon: Compass,
    color: "text-blue-600 bg-blue-50 border-blue-100",
  },
  {
    step: "02",
    title: "Interactive Coding",
    desc: "Build real-world microservices and apps directly inside your browser.",
    icon: Code2,
    color: "text-purple-600 bg-purple-50 border-purple-100",
  },
  {
    step: "03",
    title: "Senior Code Review",
    desc: "Get 1-on-1 feedback and architectural guidance from tech leads.",
    icon: CheckCircle2,
    color: "text-indigo-600 bg-indigo-50 border-indigo-100",
  },
  {
    step: "04",
    title: "Earn Certification",
    desc: "Receive shareable, tamper-proof credentials to land top tech roles.",
    icon: Award,
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
];

export default function PrecisionWorkflow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="py-20 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[#4F46E5] text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Structured Learning Path
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How EduNova Works
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-medium">
            A proven 4-step precision workflow built for guaranteed software engineering outcomes.
          </p>
        </div>

        {/* 4 Steps Minimal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -4 }}
                className="relative rounded-3xl border border-slate-100 bg-slate-50/60 hover:bg-white p-7 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl border ${item.color} flex items-center justify-center shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-300">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100/80 flex items-center text-xs font-bold text-[#4F46E5]">
                  <span>Step {item.step}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
