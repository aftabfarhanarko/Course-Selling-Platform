"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, animate } from "framer-motion";
import {
  Play,
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Star,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { useGetStatsQuery } from "@/lib/api/statsApi";

function useCounter(target: number, decimals = 0, shouldStart: boolean) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!shouldStart) return;
    const controls = animate(0, target, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(val) {
        setDisplay(
          decimals > 0
            ? val.toFixed(decimals)
            : Math.floor(val).toLocaleString()
        );
      },
    });
    return () => controls.stop();
  }, [shouldStart, target, decimals]);
  return display;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.15,
    },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.215, 0.61, 0.355, 1.0] as const,
    },
  },
};

const HERO_IMAGE_URL = "/file-removebg-preview.png";

const defaultStats = [
  { label: "Active Students", value: 50000, suffix: "+", decimals: 0 },
  { label: "Online Courses", value: 1200, suffix: "+", decimals: 0 },
  { label: "Expert Instructors", value: 300, suffix: "+", decimals: 0 },
  { label: "Student Rating", value: 4.8, suffix: "/5", decimals: 1 },
];

const statIconMap: Record<string, React.ReactNode> = {
  "Active Students": <Users className="w-5 h-5" />,
  "Online Courses": <BookOpen className="w-5 h-5" />,
  "Expert Instructors": <GraduationCap className="w-5 h-5" />,
  "Student Rating": <Star className="w-5 h-5" />,
};

function HeroStatCard({ stat, index, isInView }: { stat: any; index: number; isInView: boolean }) {
  const rawNum = typeof stat.value === "number" ? stat.value : parseFloat(String(stat.value).replace(/[^0-9.-]+/g, "")) || 0;
  const decimals = stat.decimals ?? (String(stat.value).includes(".") ? 1 : 0);
  const counterVal = useCounter(rawNum, decimals, isInView);
  const suffix = stat.suffix ?? (String(stat.value).includes("+") ? "+" : "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.215, 0.61, 0.355, 1.0],
      }}
      className="flex flex-col items-center justify-center gap-2 py-6 px-4 text-center group hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="w-11 h-11 rounded-xl bg-[#EEF2FF] group-hover:bg-[#4F46E5] group-hover:text-white flex items-center justify-center text-[#4F46E5] transition-all duration-300">
        {statIconMap[stat.label] ?? <Award className="w-5 h-5" />}
      </div>
      <p className="text-xl sm:text-2xl font-black text-slate-900">
        {counterVal}{suffix}
      </p>
      <p className="text-xs sm:text-sm font-medium text-slate-500">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-50px" });

  const { data: statsData } = useGetStatsQuery();

  const parseNumber = (val: string) =>
    parseFloat(val.replace(/[^0-9.-]+/g, "")) || 0;

  const totalStudents = statsData
    ? parseNumber(
        statsData.kpis.find((k) => k.label === "Active Students")?.value || "0"
      )
    : 50000;

  const activeStudentCount = useCounter(totalStudents, 0, isHeroInView);

  return (
    <section ref={heroRef} className="relative w-full min-h-[92vh] bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-white flex items-center pt-28 pb-16 overflow-hidden">
      {/* Background Decorative Grid and Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#E0E7FF]/50 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 -left-32 w-[450px] h-[450px] rounded-full bg-[#EEF2FF]/60 blur-3xl"
        />

        <svg
          className="absolute top-20 right-1/3 w-[300px] h-[200px] text-indigo-300/40 hidden xl:block"
          viewBox="0 0 300 200"
          fill="none"
        >
          <path
            d="M 10 180 Q 150 10 290 100"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <polygon points="290,100 280,95 282,105" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-10/12 mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ══ LEFT HERO CONTENT (Staggered Children with Delay) ══ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isHeroInView ? "show" : "hidden"}
            className="lg:col-span-6 space-y-8 text-center lg:text-left"
          >
            <motion.div
              variants={fadeUpItem}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EEF2FF] border border-[#E0E7FF] text-[#4F46E5] text-xs font-bold tracking-wide shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#4F46E5]" />
              <span>Unlock Your Potential</span>
            </motion.div>

            <motion.div variants={fadeUpItem} className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-slate-900 leading-[1.12] tracking-tight">
                Learn Today, <br />
                Lead <span className="bg-gradient-to-r from-[#4F46E5] via-purple-600 to-indigo-600 bg-clip-text text-transparent">Tomorrow</span>
              </h1>
              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed pt-2">
                Discover world-class online courses from expert instructors. Learn at your pace and achieve your professional goals.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUpItem}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#4F46E5] text-white font-bold text-sm hover:bg-[#4338CA] transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 duration-300"
              >
                <span>Explore Courses</span>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </Link>

              <button
                type="button"
                onClick={() => {
                  window.open("https://www.youtube.com", "_blank");
                }}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-slate-800 font-bold text-sm border border-slate-200 hover:bg-slate-50 transition-all shadow-sm hover:scale-105 active:scale-95 duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5]">
                  <Play className="w-4 h-4 fill-[#4F46E5] ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </button>
            </motion.div>

            <motion.div
              variants={fadeUpItem}
              className="flex items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-md"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Student"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-md"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Student"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-md"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                  alt="Student"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-md"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                  alt="Student"
                />
              </div>

              <div className="text-left">
                <p className="text-sm font-extrabold text-slate-900 leading-tight">
                  Join {activeStudentCount}+ students
                </p>
                <p className="text-xs font-medium text-slate-500">
                  learning worldwide
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ══ RIGHT HERO GRAPHIC & FLOATING CARDS ══ */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1.0], delay: 0.4 }}
              className="relative z-10 w-full max-w-[460px] flex items-center justify-center py-4"
            >
              {/* Soft Purple Circle Backdrop */}
              <div className="absolute w-[350px] sm:w-[420px] h-[350px] sm:h-[420px] rounded-full bg-[#E2E6FF] -z-10 shadow-inner" />

              {/* Dotted Paper Plane Swirl Background SVG */}
              <svg
                className="absolute -top-8 right-0 sm:right-2 w-40 h-32 text-[#5B50E6] z-0 opacity-80"
                viewBox="0 0 160 120"
                fill="none"
              >
                <path
                  d="M10 90 Q 60 20 140 30"
                  stroke="#5B50E6"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <path
                  d="M135 15 L155 32 L130 38 L138 28 Z"
                  fill="#5B50E6"
                />
              </svg>

              {/* Primary Student Cutout Image */}
              <div className="relative z-10 w-[240px] sm:w-[290px] h-[310px] sm:h-[380px] flex items-end justify-center">
                <Image
                  src={HERO_IMAGE_URL}
                  alt="Learn Today Lead Tomorrow Student"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 290px"
                  className="object-contain object-center"
                />
              </div>

              {/* ── Floating Badge 1: Best Learning Experience (Left) ── */}
              <motion.div
                initial={{ opacity: 0, x: -40, y: 0 }}
                animate={isHeroInView ? { opacity: 1, x: 0, y: [0, -10, 0] } : {}}
                transition={{
                  opacity: { delay: 0.7, duration: 0.8 },
                  x: { delay: 0.7, duration: 0.8 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
                }}
                className="absolute top-16 -left-2 sm:-left-6 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100/90 flex flex-col gap-1.5 max-w-[150px]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[#5B50E6]">
                    <GraduationCap className="w-4 h-4 text-[#5B50E6]" />
                  </div>
                  <p className="text-[11px] font-bold text-slate-900 leading-tight">
                    Best Learning Experience
                  </p>
                </div>
                <svg className="w-full h-2.5 text-[#5B50E6]" viewBox="0 0 100 20" fill="none">
                  <path
                    d="M 0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>

              {/* ── Floating Badge 2: Your Progress 75% (Right) ── */}
              <motion.div
                initial={{ opacity: 0, x: 40, y: 0 }}
                animate={isHeroInView ? { opacity: 1, x: 0, y: [0, -12, 0] } : {}}
                transition={{
                  opacity: { delay: 0.85, duration: 0.8 },
                  x: { delay: 0.85, duration: 0.8 },
                  y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
                }}
                className="absolute top-24 -right-2 sm:-right-4 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100/90 w-40"
              >
                <p className="text-[10px] font-bold text-slate-500 mb-0.5">Your Progress</p>
                <p className="text-lg font-black text-[#5B50E6] mb-1.5">75%</p>
                <div className="w-full h-1.5 bg-[#EEF2FF] rounded-full overflow-hidden">
                  <div className="h-full bg-[#5B50E6] rounded-full w-[75%]" />
                </div>
              </motion.div>

              {/* ── Floating Badge 3: Book icon (Bottom Right) ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 0 }}
                animate={isHeroInView ? { opacity: 1, scale: 1, y: [0, -8, 0] } : {}}
                transition={{
                  opacity: { delay: 1, duration: 0.8 },
                  scale: { delay: 1, duration: 0.8 },
                  y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.8 },
                }}
                className="absolute bottom-6 right-2 sm:right-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-100/90 flex items-center justify-center"
              >
                <div className="relative">
                  <BookOpen className="w-6 h-6 text-[#5B50E6]" />
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute -top-1 -right-1 ring-2 ring-white animate-ping" />
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute -top-1 -right-1 ring-2 ring-white" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ══ STATS BAR WITH SCROLL COUNTING ══ */}
        <div
          ref={statsRef}
          className="mt-16 lg:mt-20 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl shadow-indigo-500/5 border border-slate-100 grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100"
        >
          {defaultStats.map((stat, i) => (
            <HeroStatCard key={stat.label} stat={stat} index={i} isInView={isStatsInView} />
          ))}
        </div>
      </div>
    </section>
  );
}