"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Product data ─── */
const products = [
  {
    id: 1,
    category: "SECURITY",
    categoryColor: "text-blue-500",
    bgColor: "bg-[#eef1fb]",
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80&auto=format&fit=crop",
    title: "VelocityVPN – Secure Your Earnings",
    description:
      "Military-grade encryption for the nomad entrepreneur. Protect your transactions and access global markets without restrictions.",
    priceLabel: "STARTING AT",
    price: "$12.99",
    priceSuffix: "/mo",
    btnLabel: "Buy Now",
    tag: "Software",
  },
  {
    id: 2,
    category: "PRODUCTIVITY",
    categoryColor: "text-emerald-500",
    bgColor: "bg-[#eaf6f0]",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop",
    title: "Architect CRM – Client Management",
    description:
      "Built for high-ticket service providers. Pipeline tracking, automated invoicing, and lifetime client retention tools.",
    priceLabel: "ONE-TIME",
    price: "$297.00",
    priceSuffix: "",
    btnLabel: "Get Access",
    tag: "Software",
  },
  {
    id: 3,
    category: "LEGAL",
    categoryColor: "text-amber-600",
    bgColor: "bg-[#f5f3e4]",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&q=80&auto=format&fit=crop",
    title: "High-Ticket Contract Templates",
    description:
      "Iron-clad agreements vetted by specialized attorneys. Protect your intellectual property and guarantee payment terms.",
    priceLabel: "BUNDLE PRICE",
    price: "$149.00",
    priceSuffix: "",
    btnLabel: "Download",
    tag: "Templates",
  },
];

const tabs = ["All Products", "Software", "Templates"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function ShopArchitectPage() {
  const [activeTab, setActiveTab] = useState("All Products");

  const filtered =
    activeTab === "All Products"
      ? products
      : products.filter((p) => p.tag === activeTab);

  return (
    <div className="min-h-screen bg-[#f0f2f8] pt-10 font-sans overflow-x-hidden">
      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="relative mx-auto max-w-7xl  px-5 pt-20 pb-14 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Soft glow blob behind left text */}
        {/* <div className="pointer-events-none absolute -top-20 -left-32 w-[520px] h-[520px] rounded-full bg-blue-100/40 blur-[90px]" /> */}

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[0.65rem] font-semibold tracking-widest text-blue-600 uppercase mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Digital Assets Platform
          </motion.span>

          <h1 className="text-[2.8rem] sm:text-[3.5rem] font-extrabold leading-[1.1] text-[#0f1629] tracking-tight">
            Architect Your
            <br />
            <span className="text-blue-600">Prosperity.</span>
          </h1>

          <p className="mt-5 text-[0.9rem] text-[#56627a] leading-relaxed max-w-[420px]">
            Curated digital assets designed for the high-performance income
            generator. Secure your stack, manage your clients, and scale your
            operations.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="#toolkit"
              className="px-6 py-3 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 shadow-[0_6px_20px_rgba(37,99,235,0.3)] no-underline"
            >
              Explore Toolkit
            </Link>
            <Link
              href="/courses"
              className="px-6 py-3 rounded-full bg-white border border-[#e2e5f0] text-[#0f1629] text-sm font-semibold hover:bg-[#f5f7ff] transition-all duration-150 no-underline"
            >
              View Courses
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {["#c7d7f5", "#fce7f3", "#d1fae5", "#fef3c7"].map((bg, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-white"
                  style={{ background: bg }}
                />
              ))}
            </div>
            <p className="text-[0.75rem] text-[#7a839a]">
              <span className="font-semibold text-[#0f1629]">15,000+</span>{" "}
              architects already enrolled
            </p>
          </motion.div>
        </motion.div>

        {/* Right — Stats card */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[340px]">
            {/* Main card */}
            <div className="bg-white rounded-2xl border border-[#e2e5f0] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-[0.58rem] font-bold tracking-[0.16em] text-[#aab0c0] uppercase">
                    Platform Average
                  </p>
                  <p className="text-[1.55rem] font-extrabold text-green-600 leading-tight">
                    +124% Earnings
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[0.72rem] text-[#7a839a]">
                      Growth Rate
                    </span>
                    <span className="text-[0.72rem] font-bold text-green-600">
                      ↑ 124%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-[#e8eaf0] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "78%" }}
                      transition={{
                        delay: 0.8,
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-full bg-green-500 rounded-full"
                    />
                  </div>
                  <p className="mt-1.5 text-[0.65rem] text-green-500 font-semibold">
                    3/3 milestones achieved
                  </p>
                </div>

                <div className="border-t border-[#f0f2f8] pt-4 grid grid-cols-3 gap-3 text-center">
                  {[
                    ["$2.4M", "Revenue"],
                    ["98%", "Satisfaction"],
                    ["4.9★", "Rating"],
                  ].map(([val, lbl]) => (
                    <div key={lbl}>
                      <p className="text-[0.9rem] font-bold text-[#0f1629]">
                        {val}
                      </p>
                      <p className="text-[0.6rem] text-[#aab0c0] mt-0.5">
                        {lbl}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-blue-600 text-white rounded-xl px-3 py-2 shadow-lg text-[0.7rem] font-semibold"
            >
              🚀 +47 joined today
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════
          ESSENTIAL TOOLKIT
      ══════════════════════════════ */}
      <section id="toolkit" className="bg-[#eaecf5] py-10">
        <div className="mx-auto max-w-7xl px-5">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <h2 className="text-[1.7rem] font-extrabold text-[#0f1629] tracking-tight">
                Essential Toolkit
              </h2>
              <div className="mt-2 w-10 h-[3px] rounded-full bg-blue-600" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-1 bg-white border border-[#e2e5f0] rounded-full p-1 self-start sm:self-auto"
            >
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-[#eef1fb] text-blue-600 shadow-sm"
                      : "text-[#7a839a] hover:text-[#0f1629]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl border border-[#e2e5f0] overflow-hidden flex flex-col group cursor-pointer"
                >
                  {/* Image area */}
                  <div className="relative h-[180px] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span
                      className={`absolute top-3 left-3 text-[0.58rem] font-bold tracking-[0.16em] bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full ${p.categoryColor}`}
                    >
                      {p.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-[0.92rem] font-bold text-[#0f1629] leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[0.76rem] text-[#7a839a] leading-relaxed flex-1">
                      {p.description}
                    </p>

                    <div className="mt-5 flex items-end justify-between">
                      <div>
                        <p className="text-[0.58rem] font-bold tracking-widest text-[#aab0c0] uppercase">
                          {p.priceLabel}
                        </p>
                        <p className="text-[1.3rem] font-extrabold text-[#0f1629] leading-tight">
                          {p.price}
                          {p.priceSuffix && (
                            <span className="text-[0.7rem] font-medium text-[#7a839a]">
                              {p.priceSuffix}
                            </span>
                          )}
                        </p>
                      </div>
                      <Link
                        href={`/shop/payment?title=${encodeURIComponent(p.title)}&price=${encodeURIComponent(p.price)}`}
                        className="px-5 py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 hover:scale-[1.03] active:scale-[0.97] transition-all duration-150 shadow-[0_4px_14px_rgba(37,99,235,0.28)] no-underline"
                      >
                        {p.btnLabel}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          WEALTH STACK ADVANTAGE
      ══════════════════════════════ */}
      <section className="py-14 bg-[#f0f2f8] relative overflow-hidden">
        {/* bg decoration */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 
        w-[700px] h-[700px] rounded-full bg-blue-100/30 blur-[120px]" />

        <div className="relative mx-auto max-w-[1060px] px-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[0.65rem] font-bold tracking-widest text-blue-600 uppercase mb-4">
              Why Choose Us
            </span>
            <h2 className="text-[1.9rem] sm:text-[2.4rem] font-extrabold text-[#0f1629] tracking-tight">
              The Wealth Stack Advantage
            </h2>
            <p className="mt-3 text-[0.85rem] text-[#7a839a] max-w-[440px] mx-auto leading-relaxed">
              Every product in our shop is selected based on its ability to
              contribute directly to your bottom line.
            </p>
          </motion.div>

          {/* 3 feature cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              {
                emoji: "🛡️",
                bg: "bg-green-50",
                border: "border-green-100",
                iconBg: "bg-green-100",
                iconColor: "#16a34a",
                title: "Vetted Quality",
                text: "Battle-tested tools used by the top 1% of digital earners.",
                stat: "99.8%",
                statLabel: "Uptime",
                icon: (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                ),
              },
              {
                emoji: "⚡",
                bg: "bg-blue-50",
                border: "border-blue-100",
                iconBg: "bg-blue-100",
                iconColor: "#2563eb",
                title: "Instant Delivery",
                text: "Receive your licenses and downloads immediately after purchase.",
                stat: "<2s",
                statLabel: "Delivery",
                icon: (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                ),
              },
              {
                emoji: "🎧",
                bg: "bg-purple-50",
                border: "border-purple-100",
                iconBg: "bg-purple-100",
                iconColor: "#7c3aed",
                title: "Lifetime Support",
                text: "Our concierge team is here to help you integrate every tool.",
                stat: "24/7",
                statLabel: "Support",
                icon: (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`${item.bg} border ${item.border} rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden`}
              >
                {/* Decorative circle */}
                <div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20"
                  style={{ background: item.iconColor }}
                />

                <div
                  className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center`}
                >
                  {item.icon}
                </div>

                <div>
                  <p className="text-[0.92rem] font-bold text-[#0f1629]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[0.76rem] text-[#56627a] leading-relaxed">
                    {item.text}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-black/[0.06] flex items-center justify-between">
                  <span className="text-[0.68rem] text-[#7a839a]">
                    {item.statLabel}
                  </span>
                  <span
                    className="text-[1.05rem] font-extrabold"
                    style={{ color: item.iconColor }}
                  >
                    {item.stat}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-14 text-center"
          >
            <Link
              href="#toolkit"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 shadow-[0_6px_24px_rgba(37,99,235,0.3)] no-underline"
            >
              Start Building Your Stack
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
