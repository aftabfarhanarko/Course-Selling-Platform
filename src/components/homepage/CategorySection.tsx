"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2,
  Cpu,
  Terminal,
  Database,
  Smartphone,
  ShieldCheck,
  Palette,
  Zap,
  ArrowRight,
  Grid,
} from "lucide-react";

export default function CategorySection() {
  const categories = [
    {
      name: "Web Development",
      count: "450+ Courses",
      icon: Code2,
      desc: "React, Next.js, Node.js & Fullstack SaaS",
      bg: "bg-blue-50 border-blue-100",
      iconBg: "bg-blue-600 text-white",
      hoverBorder: "hover:border-blue-300",
    },
    {
      name: "AI & Machine Learning",
      count: "280+ Courses",
      icon: Cpu,
      desc: "LLMs, PyTorch, OpenAI API & Data Models",
      bg: "bg-purple-50 border-purple-100",
      iconBg: "bg-purple-600 text-white",
      hoverBorder: "hover:border-purple-300",
    },
    {
      name: "Cloud & DevOps",
      count: "190+ Courses",
      icon: Terminal,
      desc: "Docker, Kubernetes, AWS & CI/CD Pipelines",
      bg: "bg-indigo-50 border-indigo-100",
      iconBg: "bg-[#4F46E5] text-white",
      hoverBorder: "hover:border-indigo-300",
    },
    {
      name: "Data Science",
      count: "320+ Courses",
      icon: Database,
      desc: "Python, SQL, BigData & Predictive Analytics",
      bg: "bg-emerald-50 border-emerald-100",
      iconBg: "bg-emerald-600 text-white",
      hoverBorder: "hover:border-emerald-300",
    },
    {
      name: "Mobile App Dev",
      count: "210+ Courses",
      icon: Smartphone,
      desc: "Flutter, React Native, iOS & Android",
      bg: "bg-amber-50 border-amber-100",
      iconBg: "bg-amber-600 text-white",
      hoverBorder: "hover:border-amber-300",
    },
    {
      name: "Cybersecurity",
      count: "150+ Courses",
      icon: ShieldCheck,
      desc: "Ethical Hacking, Network Security & Audits",
      bg: "bg-rose-50 border-rose-100",
      iconBg: "bg-rose-600 text-white",
      hoverBorder: "hover:border-rose-300",
    },
    {
      name: "UI/UX & Design",
      count: "240+ Courses",
      icon: Palette,
      desc: "Figma, Product Design & Design Systems",
      bg: "bg-pink-50 border-pink-100",
      iconBg: "bg-pink-600 text-white",
      hoverBorder: "hover:border-pink-300",
    },
    {
      name: "Web3 & Blockchain",
      count: "110+ Courses",
      icon: Zap,
      desc: "Solidity, Smart Contracts & Ethereum",
      bg: "bg-violet-50 border-violet-100",
      iconBg: "bg-violet-600 text-white",
      hoverBorder: "hover:border-violet-300",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[#4F46E5] text-xs font-extrabold uppercase tracking-wider mb-3">
              <Grid className="w-3.5 h-3.5" /> Top Learning Paths
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Explore Popular Categories
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-medium mt-1">
              Find the right track engineered for high-income career growth.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#4F46E5] hover:text-indigo-700 transition-colors group shrink-0"
          >
            Browse All Categories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Link
                  href="/courses"
                  className={`block rounded-3xl border bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 ${cat.hoverBorder} transition-all duration-300 group h-full flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-2xl ${cat.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-extrabold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                        {cat.count}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#4F46E5] transition-colors mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-[#4F46E5] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore Courses</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
