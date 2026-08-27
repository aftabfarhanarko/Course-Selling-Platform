"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import {
  Compass,
  Code2,
  CheckCircle2,
  Award,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Select Course Track",
    desc: "Browse our wide range of premium, verified engineering categories and select what you need.",
    icon: Compass,
    color: "text-[#5B50E6]",
    dot: "bg-[#5B50E6]",
    glow: "bg-[#5B50E6]/20",
    borderColor: "border-[#5B50E6]",
    glowColor: "shadow-[#5B50E6]/20",
    hoverTitle: "group-hover:text-[#5B50E6]",
    hoverIconBg: "group-hover:bg-[#5B50E6]",
    side: "left",
  },
  {
    step: "02",
    title: "Interactive Live Coding",
    desc: "Build real-world production microservices & apps in an interactive environment.",
    icon: Code2,
    color: "text-purple-600",
    dot: "bg-purple-500",
    glow: "bg-purple-500/20",
    borderColor: "border-purple-500",
    glowColor: "shadow-purple-500/20",
    hoverTitle: "group-hover:text-purple-600",
    hoverIconBg: "group-hover:bg-purple-600",
    side: "right",
  },
  {
    step: "03",
    title: "1-on-1 Senior Code Review",
    desc: "Get line-by-line architectural feedback & guidance directly from expert tech leads.",
    icon: CheckCircle2,
    color: "text-blue-600",
    dot: "bg-blue-500",
    glow: "bg-blue-500/20",
    borderColor: "border-blue-500",
    glowColor: "shadow-blue-500/20",
    hoverTitle: "group-hover:text-blue-600",
    hoverIconBg: "group-hover:bg-blue-600",
    side: "left",
  },
  {
    step: "04",
    title: "Get Certified & Hired",
    desc: "Receive shareable, tamper-proof credentials to land top $120k+ remote engineering roles.",
    icon: Award,
    color: "text-emerald-600",
    dot: "bg-emerald-500",
    glow: "bg-emerald-500/20",
    borderColor: "border-emerald-500",
    glowColor: "shadow-emerald-500/20",
    hoverTitle: "group-hover:text-emerald-600",
    hoverIconBg: "group-hover:bg-emerald-600",
    side: "right",
  },
];

export default function PrecisionWorkflow() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  // Drives the "line fill" animation as the user scrolls through the timeline
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.35"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    mass: 0.6,
  });

  return (
    <section
      ref={sectionRef}
      className="relative py-10 sm:py-16 bg-transparent overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#5B50E6]/5 rounded-full blur-[140px]" />

      <div className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2.5"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] border border-[#5B50E6]/20 text-[#5B50E6] text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> Simple 4-Step Process
          </div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">
            How EduNova Works
          </h2>
          <p className="text-slate-500 text-xs sm:text-xs font-medium leading-relaxed">
            Get your engineering career transformed in 4 simple, hassle-free steps.
          </p>
        </motion.div>

        {/* ── VERTICAL TIMELINE ── */}
        <div ref={timelineRef} className="relative">
          {/* Base line (faint, static) */}
          <div className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-slate-200 hidden md:block" />

          {/* Animated fill line — draws downward as you scroll */}
          <motion.div
            style={{ scaleY: smoothProgress, transformOrigin: "top" }}
            className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#5B50E6] via-purple-500 to-emerald-500 hidden md:block"
          />

          <div className="space-y-14 sm:space-y-24 relative">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              const isLeft = item.side === "left";

              return (
                <div
                  key={item.step}
                  className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0"
                >
                  {/* Left Side Content (Desktop) */}
                  <div className="w-full md:w-[42%] order-2 md:order-1">
                    {isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={
                          isInView
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -40 }
                        }
                        transition={{
                          duration: 1.1,
                          delay: idx * 0.22,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="group max-w-sm mx-auto md:mx-0 md:ml-auto text-center md:text-right"
                      >
                        <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#5B50E6] mb-2.5 px-3 py-1 rounded-full bg-[#EEF2FF]">
                          Step {item.step}
                        </span>
                        <div className="flex items-center justify-center md:justify-end md:flex-row-reverse gap-2.5 mb-2.5">
                          <motion.div
                            whileHover={{ scale: 1.15, rotate: 8 }}
                            transition={{
                              type: "spring",
                              stiffness: 160,
                              damping: 14,
                            }}
                            className={`w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 ${item.hoverIconBg} group-hover:text-white transition-colors duration-700 ease-out`}
                          >
                            <Icon className="w-4 h-4" />
                          </motion.div>
                          <h3
                            className={`text-lg sm:text-xl font-black text-slate-900 ${item.hoverTitle} transition-colors duration-700 ease-out`}
                          >
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
                          {item.desc}
                        </p>
                        <span
                          className={`hidden md:block h-[2px] w-10 mt-4 ml-auto rounded-full ${item.dot} scale-x-0 origin-right group-hover:scale-x-150 transition-transform duration-700 ease-out`}
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Center Node */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      isInView
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0, opacity: 0 }
                    }
                    transition={{
                      duration: 0.9,
                      delay: idx * 0.22 + 0.12,
                      type: "spring",
                      stiffness: 120,
                      damping: 16,
                    }}
                    className="relative z-20 order-1 md:order-2 shrink-0"
                  >
                    {/* breathing pulse ring */}
                    <span
                      className={`absolute inset-0 rounded-full ${item.glow} animate-ping [animation-duration:3.5s]`}
                    />
                    <div
                      className={`relative w-12 h-12 rounded-full bg-white border-2 ${item.borderColor} shadow-lg ${item.glowColor} flex items-center justify-center text-sm font-black ${item.color} hover:scale-115 transition-transform duration-500 ease-out`}
                    >
                      {item.step}
                    </div>
                  </motion.div>

                  {/* Right Side Content (Desktop) */}
                  <div className="w-full md:w-[42%] order-3">
                    {!isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={
                          isInView
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: 40 }
                        }
                        transition={{
                          duration: 1.1,
                          delay: idx * 0.22,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="group max-w-sm mx-auto md:mx-0 text-center md:text-left"
                      >
                        <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#5B50E6] mb-2.5 px-3 py-1 rounded-full bg-[#EEF2FF]">
                          Step {item.step}
                        </span>
                        <div className="flex items-center justify-center md:justify-start gap-2.5 mb-2.5">
                          <motion.div
                            whileHover={{ scale: 1.15, rotate: -8 }}
                            transition={{
                              type: "spring",
                              stiffness: 160,
                              damping: 14,
                            }}
                            className={`w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 ${item.hoverIconBg} group-hover:text-white transition-colors duration-700 ease-out`}
                          >
                            <Icon className="w-4 h-4" />
                          </motion.div>
                          <h3
                            className={`text-lg sm:text-xl font-black text-slate-900 ${item.hoverTitle} transition-colors duration-700 ease-out`}
                          >
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
                          {item.desc}
                        </p>
                        <span
                          className={`hidden md:block h-[2px] w-10 mt-4 rounded-full ${item.dot} scale-x-0 origin-left group-hover:scale-x-150 transition-transform duration-700 ease-out`}
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}