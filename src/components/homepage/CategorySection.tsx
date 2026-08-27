"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Code2,
  Sparkles,
  CloudLightning,
  Database,
  Smartphone,
  ShieldCheck,
  Figma,
  Boxes,
  ArrowRight,
  Grid,
} from "lucide-react";

const categories = [
  {
    name: "Web Development",
    count: "450+ Courses",
    icon: Code2,
    desc: "React, Next.js, Node.js & Fullstack SaaS",
    gradient: "from-blue-500/10 to-indigo-500/10",
    iconBg: "bg-blue-500/10 text-blue-600 border border-blue-200/60",
    accentColor: "text-blue-600",
    hoverBg: "group-hover:bg-blue-600",
    hoverShadow: "hover:shadow-blue-500/20",
    hex: "#3B82F6",
  },
  {
    name: "AI & Machine Learning",
    count: "280+ Courses",
    icon: Sparkles,
    desc: "LLMs, PyTorch, OpenAI API & Data Models",
    gradient: "from-purple-500/10 to-pink-500/10",
    iconBg: "bg-purple-500/10 text-purple-600 border border-purple-200/60",
    accentColor: "text-purple-600",
    hoverBg: "group-hover:bg-purple-600",
    hoverShadow: "hover:shadow-purple-500/20",
    hex: "#9333EA",
  },
  {
    name: "Cloud & DevOps",
    count: "190+ Courses",
    icon: CloudLightning,
    desc: "Docker, Kubernetes, AWS & CI/CD Pipelines",
    gradient: "from-[#5B50E6]/10 to-indigo-500/10",
    iconBg: "bg-[#5B50E6]/10 text-[#5B50E6] border border-[#5B50E6]/20",
    accentColor: "text-[#5B50E6]",
    hoverBg: "group-hover:bg-[#5B50E6]",
    hoverShadow: "hover:shadow-indigo-500/20",
    hex: "#5B50E6",
  },
  {
    name: "Data Science",
    count: "320+ Courses",
    icon: Database,
    desc: "Python, SQL, BigData & Predictive Analytics",
    gradient: "from-emerald-500/10 to-teal-500/10",
    iconBg: "bg-emerald-500/10 text-emerald-600 border border-emerald-200/60",
    accentColor: "text-emerald-600",
    hoverBg: "group-hover:bg-emerald-600",
    hoverShadow: "hover:shadow-emerald-500/20",
    hex: "#059669",
  },
  {
    name: "Mobile App Dev",
    count: "210+ Courses",
    icon: Smartphone,
    desc: "Flutter, React Native, iOS & Android",
    gradient: "from-amber-500/10 to-orange-500/10",
    iconBg: "bg-amber-500/10 text-amber-600 border border-amber-200/60",
    accentColor: "text-amber-600",
    hoverBg: "group-hover:bg-amber-600",
    hoverShadow: "hover:shadow-amber-500/20",
    hex: "#D97706",
  },
  {
    name: "Cybersecurity",
    count: "150+ Courses",
    icon: ShieldCheck,
    desc: "Ethical Hacking, Network Security & Audits",
    gradient: "from-rose-500/10 to-red-500/10",
    iconBg: "bg-rose-500/10 text-rose-600 border border-rose-200/60",
    accentColor: "text-rose-600",
    hoverBg: "group-hover:bg-rose-600",
    hoverShadow: "hover:shadow-rose-500/20",
    hex: "#E11D48",
  },
  {
    name: "UI/UX & Design",
    count: "240+ Courses",
    icon: Figma,
    desc: "Figma, Product Design & Design Systems",
    gradient: "from-pink-500/10 to-rose-500/10",
    iconBg: "bg-pink-500/10 text-pink-600 border border-pink-200/60",
    accentColor: "text-pink-600",
    hoverBg: "group-hover:bg-pink-600",
    hoverShadow: "hover:shadow-pink-500/20",
    hex: "#DB2777",
  },
  {
    name: "Web3 & Blockchain",
    count: "110+ Courses",
    icon: Boxes,
    desc: "Solidity, Smart Contracts & Ethereum",
    gradient: "from-violet-500/10 to-purple-500/10",
    iconBg: "bg-violet-500/10 text-violet-600 border border-violet-200/60",
    accentColor: "text-violet-600",
    hoverBg: "group-hover:bg-violet-600",
    hoverShadow: "hover:shadow-violet-500/20",
    hex: "#7C3AED",
  },
];

type Category = (typeof categories)[number];

function CategoryCard({ cat, index, isInView }: { cat: Category; index: number; isInView: boolean }) {
  const Icon = cat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 45, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 45, scale: 0.95 }}
      transition={{ duration: 0.95, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link
        href="/courses"
        className={`relative group block rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-xl ${cat.hoverShadow} hover:border-[#5B50E6]/40 transition-all duration-300 h-full flex flex-col justify-between overflow-hidden hover:-translate-y-1.5`}
      >
        {/* Soft base wash */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <div
              className={`w-12 h-12 rounded-2xl ${cat.iconBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100/90 px-3 py-1 rounded-full border border-slate-200/60 group-hover:bg-white group-hover:text-slate-900 transition-colors duration-300">
              {cat.count}
            </span>
          </div>

          <h3 className="text-base font-black text-slate-900 group-hover:text-[#5B50E6] transition-colors duration-300 mb-1.5">
            {cat.name}
          </h3>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            {cat.desc}
          </p>
        </div>

        <div
          className={`relative z-10 mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold ${cat.accentColor}`}
        >
          <span className="group-hover:translate-x-1 transition-transform duration-300 ease-out">
            Explore Track
          </span>
          <div
            className={`w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center ${cat.hoverBg} group-hover:text-white transition-all duration-300 ease-out group-hover:rotate-45`}
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CategorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });

  return (
    <section ref={sectionRef} className="relative py-8 sm:py-12 bg-transparent overflow-hidden">
      {/* Ambient background blobs for depth */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-indigo-400/10 rounded-full blur-[100px]" />
      <div className="pointer-events-none absolute top-40 -right-24 w-96 h-96 bg-purple-400/10 rounded-full blur-[100px]" />

      <div className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] border border-[#5B50E6]/20 text-[#5B50E6] text-[11px] font-bold uppercase tracking-wider mb-2">
              <Grid className="w-3 h-3" /> Top Learning Paths
            </div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">
              Explore Popular Categories
            </h2>
            <p className="text-slate-500 text-xs sm:text-xs font-medium mt-1">
              Find the right track engineered for high-income career growth.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#5B50E6] hover:text-[#4D42DB] transition-all duration-300 group shrink-0"
          >
            <span>Browse All Categories</span>
            <div className="w-6 h-6 rounded-full bg-[#EEF2FF] flex items-center justify-center group-hover:bg-[#5B50E6] group-hover:text-white transition-all duration-500 ease-out group-hover:rotate-45">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.name} cat={cat} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}