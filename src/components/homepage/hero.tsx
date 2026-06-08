"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRightCircle,
  DollarSign,
  TrendingUp,
  Users,
  BarChart2,
  Star,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// ── Fixed Animation Variants ─────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
      delay,
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1] as const, // Replaced "easeOut" with cubic-bezier
      delay,
    },
  }),
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.88 },
  show: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
      delay,
    },
  }),
};

// ── tiny dashboard rows ─────────────────────────────────────────────────────
const rows = [
  { label: "Figma UI Kit", pct: 78, color: "#0052CC", earn: "$1,240" },
  { label: "React Bootcamp", pct: 62, color: "#10B981", earn: "$980" },
  { label: "SEO Mastery", pct: 45, color: "#6366F1", earn: "$670" },
  { label: "Copywriting", pct: 91, color: "#F59E0B", earn: "$1,400" },
];

const stats = [
  { icon: Users, label: "Students", value: "24.8k" },
  { icon: TrendingUp, label: "Avg. ROI", value: "312%" },
  { icon: Star, label: "Rating", value: "4.9" },
];

// ── Main Component ───────────────────────────────────────────────────────────
function HomeHero() {
  const heroData = {
    badge: { text: "FINANCIAL EVOLUTION" },
    heading: { main: "Skill to Income", highlight: "Transformation" },
    description:
      "Real earning promise. Master the high-demand skills that actually pay and bridge the gap between learning and financial freedom.",
    buttons: [
      {
        id: 1,
        text: "Start Learning",
        href: "/signup",
        primary: true,
        icon: (
          <ArrowRightCircle className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        ),
      },
      {
        id: 2,
        text: "Earn as Affiliate",
        href: "/signup?role=affiliate",
        primary: false,
      },
    ],
    card: { title: "Weekly Payout", amount: "+$4,290.00" },
  };

  const { badge, heading, description, buttons, card } = heroData;

  return (
    <section
      className="min-h-screen max-w-7xl mx-auto bg-white flex items-center pt-20 md:pt-0 pb-12 overflow-hidden"
      style={{ fontFamily: "var(--font-manrope)" }}
    >
      {/* subtle radial bg glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 75% 40%, rgba(16,185,129,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="flex flex-col space-y-7">
            {/* badge */}
            <motion.div
              className="inline-flex w-fit"
              variants={fadeIn}
              initial="hidden"
              animate="show"
              custom={0}
            >
              <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest bg-emerald-500 text-white">
                {badge.text}
              </span>
            </motion.div>

            {/* heading */}
            <div className="space-y-1">
              <motion.h1
                className="text-4xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.1}
              >
                {heading.main}
              </motion.h1>
              <motion.h2
                className="text-4xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#0052CC]"
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.2}
              >
                {heading.highlight}
              </motion.h2>
            </div>

            {/* description */}
            <motion.p
              className="text-lg text-gray-600 max-w-md leading-relaxed"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.3}
            >
              {description}
            </motion.p>

            {/* buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-3 pt-2"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.4}
            >
              <Link href={buttons[0].href} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-full font-semibold text-base bg-[#0052CC] text-white hover:bg-[#0047B3] transition-transform hover:scale-105 active:scale-95 px-6 md:px-9 py-6 md:py-7 gap-2 shadow-md shadow-blue-200"
                >
                  {buttons[0].text}
                  <TrendingUp className="h-4 w-4 shrink-0" />
                </Button>
              </Link>

              <Link href={buttons[1].href} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full sm:w-auto rounded-full border-2 border-[#367fed] font-semibold text-base text-[#0052CC] hover:bg-transparent bg-transparent transition-transform hover:scale-105 active:scale-95 px-6 md:px-9 py-6 md:py-7"
                >
                  {buttons[1].text}
                </Button>
              </Link>
            </motion.div>

            {/* mini stats row */}
            <motion.div
              className="flex gap-6 pt-2"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.5}
            >
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-[#0052CC]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 leading-none">
                      {value}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT – DASHBOARD MOCKUP */}
          <motion.div
            className="flex items-center justify-center lg:justify-end mt-8 lg:mt-0"
            variants={scaleUp}
            initial="hidden"
            animate="show"
            custom={0.25}
          >
            <div className="relative w-full max-w-[480px]">
              {/* floating glow */}
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-emerald-100/60 via-blue-100/30 to-transparent blur-2xl pointer-events-none" />

              {/* browser chrome */}
              <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl border border-gray-100 bg-[#0F1C2E]">
                {/* top bar */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-[#162032] border-b border-white/5">
                  <span className="w-3 h-3 rounded-full bg-red-400/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
                  <div className="flex-1 mx-4 h-5 rounded-md bg-white/10 flex items-center px-3">
                    <span className="text-[10px] text-white/30 tracking-wide">
                      app.skillpay.io/dashboard
                    </span>
                  </div>
                </div>

                {/* dashboard body */}
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                      Dashboard
                    </p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold">
                      Live
                    </span>
                  </div>

                  {/* stat chips */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      {
                        label: "Total Earned",
                        val: "$18,420",
                        color: "text-emerald-400",
                      },
                      {
                        label: "This Month",
                        val: "$4,290",
                        color: "text-blue-400",
                      },
                      {
                        label: "Pending",
                        val: "$830",
                        color: "text-yellow-400",
                      },
                    ].map(({ label, val, color }) => (
                      <div
                        key={label}
                        className="bg-white/5 rounded-xl p-3 border border-white/5"
                      >
                        <p className="text-[10px] text-white/40 mb-1">
                          {label}
                        </p>
                        <p className={`text-sm font-bold ${color}`}>{val}</p>
                      </div>
                    ))}
                  </div>

                  {/* course progress rows */}
                  <div className="space-y-2.5">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">
                      Course Earnings
                    </p>
                    {rows.map(({ label, pct, color, earn }, i) => (
                      <motion.div
                        key={label}
                        className="space-y-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.55 + i * 0.08,
                          duration: 0.5,
                          ease: [0.25, 0.1, 0.25, 1] as const,
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] text-white/60">
                            {label}
                          </span>
                          <span className="text-[11px] font-semibold text-white/80">
                            {earn}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{
                              delay: 0.7 + i * 0.1,
                              duration: 0.8,
                              ease: [0.22, 1, 0.36, 1] as const,
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* mini bar chart */}
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart2 className="h-3.5 w-3.5 text-blue-400" />
                      <span className="text-[10px] text-white/50 font-semibold uppercase tracking-widest">
                        6-Month Revenue
                      </span>
                    </div>
                    <div className="flex items-end gap-1.5 h-14">
                      {[40, 55, 38, 70, 62, 88].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-t-sm"
                          style={{
                            background:
                              i === 5 ? "#10B981" : "rgba(255,255,255,0.12)",
                            height: `${h}%`,
                          }}
                          initial={{ scaleY: 0, originY: 1 }}
                          animate={{ scaleY: 1 }}
                          transition={{
                            delay: 0.8 + i * 0.07,
                            duration: 0.5,
                            ease: [0.25, 0.1, 0.25, 1] as const,
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-1">
                      {["Dec", "Jan", "Feb", "Mar", "Apr", "May"].map((m) => (
                        <span
                          key={m}
                          className="text-[9px] text-white/25 flex-1 text-center"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Payout Card */}
              <motion.div
                className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 flex items-center gap-4 min-w-[210px]"
                initial={{ opacity: 0, y: 20, x: -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{
                  delay: 0.85,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-md scale-125" />
                  <div className="relative z-10 w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-md">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">
                    {card.title}
                  </p>
                  <p className="text-xl font-extrabold text-emerald-500 tracking-tight">
                    {card.amount}
                  </p>
                </div>
              </motion.div>

              {/* Floating ROI Badge */}
              <motion.div
                className="absolute -top-4 -right-4 bg-[#0052CC] text-white rounded-xl px-3 py-2 shadow-lg flex items-center gap-1.5"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <TrendingUp className="h-3.5 w-3.5" />
                <span className="text-xs font-bold">+312% ROI</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
