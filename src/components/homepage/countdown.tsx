"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Users, DollarSign, TrendingUp, BookOpen, Star } from "lucide-react";
import Image from "next/image";
import { useGetStatsQuery } from "@/lib/api/statsApi";
import type { ReactNode } from "react";

// ── types ────────────────────────────────────────────────────────────────────
interface StatItem {
  id: number;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  icon: ReactNode;
  iconBg: string;
  borderColor: string;
}

// ── animated counter ─────────────────────────────────────────────────────────
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
            : Math.floor(val).toLocaleString(),
        );
      },
    });
    return () => controls.stop();
  }, [shouldStart, target, decimals]);

  return display;
}

// ── stat card ────────────────────────────────────────────────────────────────
function StatCard({
  stat,
  index,
  shouldStart,
}: {
  stat: StatItem;
  index: number;
  shouldStart: boolean;
}) {
  const count = useCounter(stat.value, stat.decimals ?? 0, shouldStart);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={shouldStart ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.13,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative group bg-white rounded-2xl p-7 border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      {/* icon circle */}
      <motion.div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{ backgroundColor: stat.iconBg }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={shouldStart ? { scale: 1, opacity: 1 } : {}}
        transition={{
          delay: index * 0.13 + 0.25,
          duration: 0.45,
          type: "spring",
          stiffness: 200,
        }}
      >
        <div className="text-[#0052CC]">{stat.icon}</div>
      </motion.div>

      {/* label */}
      <p className="text-sm font-medium text-gray-500 mb-2 tracking-wide">
        {stat.label}
      </p>

      {/* animated number */}
      <p className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-none">
        {stat.prefix ?? ""}
        {count}
        {stat.suffix ?? ""}
      </p>

      {/* bottom border grows left to right */}
      <motion.div
        className="absolute bottom-0 left-0 h-[3px]"
        style={{ backgroundColor: stat.borderColor }}
        initial={{ width: "0%" }}
        animate={shouldStart ? { width: "100%" } : {}}
        transition={{
          duration: 1.1,
          delay: index * 0.15 + 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 115%, ${stat.borderColor}30 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

// ── avatars ───────────────────────────────────────────────────────────────────
const avatars = [{ bg: "#e2e8f0" }, { bg: "#cbd5e1" }, { bg: "#10B981" }];

// ── main ──────────────────────────────────────────────────────────────────────
const CountDownTrust = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { data: statsData } = useGetStatsQuery();

  const parseNumber = (val: string) => parseFloat(val.replace(/[^0-9.-]+/g, "")) || 0;

  const totalStudents = statsData ? parseNumber(statsData.kpis.find(k => k.label === "Active Students")?.value || "0") : 50000;
  const rawRevenue = statsData ? parseNumber(statsData.kpis.find(k => k.label === "Total Revenue")?.value || "0") : 12400000;
  const totalCourses = statsData ? parseNumber(statsData.kpis.find(k => k.label === "Published Courses")?.value || "0") : 120;
  
  const revValue = rawRevenue > 1000000 ? rawRevenue / 1000000 : rawRevenue;
  const revSuffix = rawRevenue > 1000000 ? "M+" : "+";
  const revDecimals = rawRevenue > 1000000 ? 1 : 0;

  const stats: StatItem[] = [
    {
      id: 1,
      label: "Total Students",
      value: totalStudents || 50000,
      suffix: "+",
      icon: <Users className="w-5 h-5" />,
      iconBg: "#EEF2FF",
      borderColor: "#60A5FA",
    },
    {
      id: 2,
      label: "Total Earnings",
      value: revValue || 12.4,
      prefix: "$",
      suffix: revSuffix || "M+",
      decimals: revDecimals || 1,
      icon: <DollarSign className="w-5 h-5" />,
      iconBg: "rgba(16,185,129,0.28)",
      borderColor: "#34D399",
    },
    {
      id: 3,
      label: "Success Rate",
      value: 94.2,
      suffix: "%",
      decimals: 1,
      icon: <TrendingUp className="w-5 h-5" />,
      iconBg: "rgba(251,191,36,0.25)",
      borderColor: "#FCD34D",
    },
    {
      id: 4,
      label: "Total Courses",
      value: totalCourses || 120,
      suffix: "+",
      icon: <BookOpen className="w-5 h-5" />,
      iconBg: "rgba(168,85,247,0.20)",
      borderColor: "#A855F7",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-14 md:-mt-10 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #EEF2FF 0%, #F0F4FF 60%, #EDF4FF 100%)",
        fontFamily: "var(--font-manrope)",
      }}
    >
      {/* ── bg decorations ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-28 -right-28 w-[420px] h-[420px] rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, #ffffff 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, #93C5FD 0%, transparent 70%)",
          }}
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.035]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dots"
              x="0"
              y="0"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* section eyebrow */}
        <motion.p
          className="text-center text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Trusted by thousands worldwide
        </motion.p>

        {/* ── stat cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
          {stats.map((stat, idx) => (
            <StatCard
              key={stat.id}
              stat={stat}
              index={idx}
              shouldStart={isInView}
            />
          ))}
        </div>

        {/* ── trust row ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* avatar stack */}
          <div className="flex items-center">
            {avatars.map((av, i) => (
              <motion.div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center"
                style={{
                  backgroundColor: av.bg,
                  marginLeft: i === 0 ? 0 : "-10px",
                  zIndex: avatars.length - i,
                  position: "relative",
                }}
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.58 + i * 0.08, duration: 0.4 }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white/80">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </motion.div>
            ))}

            {/* +50k pill — white bg, blue text */}
            <motion.div
              className="relative z-10 -ml-2 bg-[#0038C6] text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md border-2 border-white whitespace-nowrap"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: 0.82,
                duration: 0.45,
                type: "spring",
                stiffness: 220,
              }}
            >
              +50k
            </motion.div>
          </div>

          {/* quote text */}
          <motion.p
            className="text-gray-600 text-base md:text-lg leading-relaxed text-center sm:text-left"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.92, duration: 0.5 }}
          >
            <span className="text-gray-400 mr-1">"</span>
            Join{" "}
            <span className="font-semibold text-gray-800">
              50k+ successful students
            </span>{" "}
            transforming their future today.
            <span className="text-gray-400 ml-1">"</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CountDownTrust;
