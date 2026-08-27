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
  Crown,
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
        delay: index * 0.15,
        ease: [0.215, 0.61, 0.355, 1.0],
      }}
      className="relative flex flex-col items-center justify-center gap-2 py-4 px-4 text-center group hover:-translate-y-1.5 transition-transform duration-300 cursor-default"
    >
      <div className="w-12 h-12 rounded-2xl bg-[#5B50E6]/10 border border-[#5B50E6]/20 group-hover:bg-[#5B50E6] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#5B50E6]/30 flex items-center justify-center text-[#5B50E6] transition-all duration-300">
        {statIconMap[stat.label] ?? <Award className="w-5 h-5" />}
      </div>
      <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-slate-900 via-[#1E1B4B] to-slate-800 bg-clip-text text-transparent group-hover:from-[#5B50E6] group-hover:to-[#5B50E6] transition-all duration-300 tracking-tight">
        {counterVal}{suffix}
      </p>
      <p className="text-xs sm:text-sm font-semibold text-slate-500 group-hover:text-slate-700 transition-colors duration-300">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.2 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.2 });

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

        {/* Subtle premium grain texture, sits above the blobs at very low opacity */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <svg
          className="absolute top-20 right-1/3 w-[300px] h-[200px] text-[#5B50E6]/40 hidden xl:block"
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

      <div className="w-full max-w-[96%] lg:max-w-10/12 mx-auto px-2.5 sm:px-6 lg:px-8 relative z-10">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EEF2FF]/80 backdrop-blur-sm border border-white/60 text-[#5B50E6] text-xs font-bold tracking-wide shadow-sm hover:scale-105 hover:bg-[#EEF2FF] transition-all duration-300 group cursor-default"
            >
              <Crown className="w-4 h-4 text-[#5B50E6] group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-[#5B50E6] font-extrabold">Loved by 50,000+ learners worldwide</span>
            </motion.div>

            <motion.div variants={fadeUpItem} className="space-y-3">
              <h1 className="text-4xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.18] tracking-tight">
                Turn Curiosity <br />
                Into{" "}
                <span className="text-[#5B50E6] inline-block drop-shadow-sm">
                  Capability
                </span>
              </h1>
              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed pt-1 transition-colors duration-300 hover:text-slate-800">
                Structured courses, real mentors, and a pace that fits your life. Everything you need to turn a skill into a career, in one place.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUpItem}
              className="flex flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-4"
            >
              <Link
                href="/courses"
                className="group relative inline-flex items-center gap-1.5 sm:gap-2.5 px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-[#5B50E6] text-white font-bold text-xs sm:text-sm overflow-hidden shadow-lg shadow-[#5B50E6]/25 hover:shadow-[#5B50E6]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                <span className="relative z-10 whitespace-nowrap">Browse Courses</span>
                <div className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#5B50E6] transition-all duration-300">
                  <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
                <div className="absolute inset-0 bg-[#4D42DB] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  window.open("https://www.youtube.com", "_blank");
                }}
                className="group inline-flex items-center gap-2 sm:gap-3 px-3.5 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-white/80 backdrop-blur-sm text-slate-800 font-bold text-xs sm:text-sm border border-slate-200/80 hover:border-[#5B50E6]/30 hover:bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#5B50E6] group-hover:scale-110 group-hover:bg-[#5B50E6] group-hover:text-white transition-all duration-300">
                  <Play className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current ml-0.5" />
                </div>
                <span className="group-hover:text-[#5B50E6] transition-colors duration-300 whitespace-nowrap">Watch Preview</span>
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
                  Join {activeStudentCount}+ learners
                </p>
                <p className="text-xs font-medium text-slate-500">
                  already growing with us
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ══ RIGHT HERO GRAPHIC & FLOATING CARDS ══ */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={isHeroInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 30 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative z-10 w-full max-w-[460px] flex items-center justify-center py-4"
            >
              {/* Soft Purple Circle Backdrop with scroll pulse */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isHeroInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-[350px] sm:w-[420px] h-[350px] sm:h-[420px] rounded-full bg-[#E2E6FF] -z-10 shadow-inner"
              />

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
              {/* ── Floating Badge 1: Award-Winning Curriculum (Top Left) ── */}
              <motion.div
                initial={{ opacity: 0, x: -60, scale: 0.8, rotate: -4 }}
                animate={
                  isHeroInView
                    ? { opacity: 1, x: 0, scale: 1, rotate: 0, y: [0, -12, 0] }
                    : { opacity: 0, x: -60, scale: 0.8, rotate: -4 }
                }
                transition={{
                  opacity: { delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  x: { delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  scale: { delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  rotate: { delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.3 },
                }}
                className="absolute -top-2 -left-3 sm:-left-16 z-20 bg-white/90 backdrop-blur-xl p-2.5 sm:p-3.5 rounded-2xl shadow-[0_15px_35px_-5px_rgba(91,80,230,0.18)] border border-white/80 flex flex-col gap-1 sm:gap-1.5 max-w-[130px] sm:max-w-[155px] scale-90 sm:scale-100 hover:scale-105 hover:-rotate-2 transition-all duration-500 ease-out cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[#5B50E6] group-hover:scale-110 group-hover:bg-[#5B50E6] group-hover:text-white transition-all duration-300">
                    <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-extrabold text-slate-900 leading-tight group-hover:text-[#5B50E6] transition-colors duration-300">
                    Award-Winning Curriculum
                  </p>
                </div>
                <svg className="w-full h-2 sm:h-2.5 text-[#5B50E6]" viewBox="0 0 100 20" fill="none">
                  <path
                    d="M 0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>

              {/* ── Floating Badge 2: Your Progress 75% (Top Right) ── */}
              <motion.div
                initial={{ opacity: 0, x: 60, scale: 0.8, rotate: 4 }}
                animate={
                  isHeroInView
                    ? { opacity: 1, x: 0, scale: 1, rotate: 0, y: [0, -14, 0] }
                    : { opacity: 0, x: 60, scale: 0.8, rotate: 4 }
                }
                transition={{
                  opacity: { delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  x: { delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  scale: { delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  rotate: { delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.45 },
                }}
                className="absolute top-2 -right-3 sm:-right-14 z-20 bg-white/90 backdrop-blur-xl p-2.5 sm:p-3.5 rounded-2xl shadow-[0_15px_35px_-5px_rgba(91,80,230,0.18)] border border-white/80 w-32 sm:w-40 scale-90 sm:scale-100 hover:scale-105 hover:rotate-2 transition-all duration-500 ease-out cursor-pointer group"
              >
                <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 mb-0.5 group-hover:text-[#5B50E6] transition-colors duration-300">Your Progress</p>
                <p className="text-base sm:text-lg font-black text-[#5B50E6] mb-1 sm:mb-1.5 group-hover:scale-105 transition-transform duration-300 origin-left">75%</p>
                <div className="w-full h-1 sm:h-1.5 bg-[#EEF2FF] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#5B50E6] to-purple-600 rounded-full w-[75%] group-hover:w-[85%] transition-all duration-700 ease-out" />
                </div>
              </motion.div>

              {/* ── Floating Badge 3: 24/7 Live Mentor Support (Mid Left) ── */}
              <motion.div
                initial={{ opacity: 0, x: -50, scale: 0.8 }}
                animate={
                  isHeroInView
                    ? { opacity: 1, x: 0, scale: 1, y: [0, -10, 0] }
                    : { opacity: 0, x: -50, scale: 0.8 }
                }
                transition={{
                  opacity: { delay: 0.75, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  x: { delay: 0.75, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  scale: { delay: 0.75, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.55 },
                }}
                className="absolute top-44 -left-3 sm:-left-20 z-20 bg-white/90 backdrop-blur-xl px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-2xl shadow-[0_15px_35px_-5px_rgba(91,80,230,0.18)] border border-white/80 flex items-center gap-2 sm:gap-2.5 scale-90 sm:scale-100 hover:scale-105 transition-all duration-500 ease-out cursor-pointer group"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-[11px] font-extrabold text-slate-900 leading-tight group-hover:text-[#5B50E6] transition-colors duration-300">24/7 Support</p>
                  <p className="text-[8px] sm:text-[9px] font-semibold text-emerald-600 flex items-center gap-1">
                    <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Mentors Online
                  </p>
                </div>
              </motion.div>

              {/* ── Floating Badge 4: Verified Certificate (Mid Right) ── */}
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.8 }}
                animate={
                  isHeroInView
                    ? { opacity: 1, x: 0, scale: 1, y: [0, -11, 0] }
                    : { opacity: 0, x: 50, scale: 0.8 }
                }
                transition={{
                  opacity: { delay: 0.85, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  x: { delay: 0.85, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  scale: { delay: 0.85, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.65 },
                }}
                className="absolute top-48 -right-3 sm:-right-16 z-20 bg-white/90 backdrop-blur-xl px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-2xl shadow-[0_15px_35px_-5px_rgba(91,80,230,0.18)] border border-white/80 flex items-center gap-2 sm:gap-2.5 scale-90 sm:scale-100 hover:scale-105 transition-all duration-500 ease-out cursor-pointer group"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-[11px] font-extrabold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors duration-300">Verified Certs</p>
                  <p className="text-[8px] sm:text-[9px] font-medium text-slate-500">Sharable PDF</p>
                </div>
              </motion.div>

              {/* ── Floating Badge 5: Top Instructors (Bottom Left) ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                animate={
                  isHeroInView
                    ? { opacity: 1, scale: 1, y: [0, -10, 0] }
                    : { opacity: 0, scale: 0.7, y: 20 }
                }
                transition={{
                  opacity: { delay: 0.95, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  scale: { delay: 0.95, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 1.75 },
                }}
                className="absolute -bottom-2 -left-2 sm:-left-12 z-20 bg-white/90 backdrop-blur-xl px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-2xl shadow-[0_15px_35px_-5px_rgba(91,80,230,0.18)] border border-white/80 flex items-center gap-1.5 sm:gap-2 scale-90 sm:scale-100 hover:scale-105 transition-all duration-500 ease-out cursor-pointer group"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center text-[#5B50E6] group-hover:scale-110 group-hover:bg-[#5B50E6] group-hover:text-white transition-all duration-300">
                  <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-slate-800 group-hover:text-[#5B50E6] transition-colors duration-300">
                  <span>300+ Mentors</span>
                </div>
              </motion.div>

              {/* ── Floating Badge 6: Certified icon (Bottom Right) ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                animate={
                  isHeroInView
                    ? { opacity: 1, scale: 1, y: [0, -9, 0] }
                    : { opacity: 0, scale: 0.7, y: 20 }
                }
                transition={{
                  opacity: { delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  scale: { delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.8 },
                }}
                className="absolute -bottom-2 -right-2 sm:-right-8 z-20 bg-white/90 backdrop-blur-xl p-2.5 sm:p-3 rounded-2xl shadow-[0_15px_35px_-5px_rgba(91,80,230,0.18)] border border-white/80 flex items-center justify-center scale-90 sm:scale-100 hover:scale-105 transition-all duration-500 ease-out cursor-pointer group"
              >
                <div className="relative">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#5B50E6] group-hover:scale-110 transition-transform duration-300" />
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-emerald-500 rounded-full absolute -top-1 -right-1 ring-2 ring-white animate-ping" />
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-emerald-500 rounded-full absolute -top-1 -right-1 ring-2 ring-white" />
                </div>
              </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ══ STATS BAR — CLEAN TRANSPARENT PREMIUM STATS ══ */}
        <div
          ref={statsRef}
          className="relative mt-14 lg:mt-16 pt-8 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 items-center justify-center"
        >
          {defaultStats.map((stat, i) => (
            <HeroStatCard key={stat.label} stat={stat} index={i} isInView={isStatsInView} />
          ))}
        </div>
      </div>
    </section>
  );
}