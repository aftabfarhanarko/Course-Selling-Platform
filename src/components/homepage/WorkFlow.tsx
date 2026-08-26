"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  Code,
  Briefcase,
  Palette,
  Megaphone,
  User,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Development",
    count: "120+ Courses",
    description: "Build fullstack web & mobile apps with modern tech stack.",
    icon: Code,
    gradient: "from-indigo-500 to-purple-600",
    shadow: "shadow-indigo-500/25",
    bgHover: "group-hover:border-indigo-200",
  },
  {
    id: 2,
    title: "Business",
    count: "98+ Courses",
    description: "Master startup strategies, leadership & finance management.",
    icon: Briefcase,
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/25",
    bgHover: "group-hover:border-emerald-200",
  },
  {
    id: 3,
    title: "Design & UI/UX",
    count: "85+ Courses",
    description: "Craft stunning web UIs, vector graphics and visual experiences.",
    icon: Palette,
    gradient: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/25",
    bgHover: "group-hover:border-amber-200",
  },
  {
    id: 4,
    title: "Digital Marketing",
    count: "75+ Courses",
    description: "SEO, social media growth, ads & high-converting campaigns.",
    icon: Megaphone,
    gradient: "from-sky-500 to-blue-600",
    shadow: "shadow-sky-500/25",
    bgHover: "group-hover:border-sky-200",
  },
  {
    id: 5,
    title: "Personal Growth",
    count: "60+ Courses",
    description: "Productivity hacks, communication & career acceleration.",
    icon: User,
    gradient: "from-rose-500 to-pink-600",
    shadow: "shadow-rose-500/25",
    bgHover: "group-hover:border-rose-200",
  },
];

export default function PrecisionWorkflow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#FAFAFC] relative overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-10/12 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-[#4F46E5] text-xs font-extrabold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Explore Top Fields
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Popular <span className="bg-gradient-to-r from-[#4F46E5] via-purple-600 to-indigo-600 bg-clip-text text-transparent">Categories</span>
            </h2>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#4F46E5] hover:text-purple-600 transition-all duration-300 group"
          >
            <span>View all categories</span>
            <div className="w-8 h-8 rounded-full bg-indigo-50 group-hover:bg-[#4F46E5] group-hover:text-white flex items-center justify-center transition-all duration-300">
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 ${cat.bgHover} hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between overflow-hidden`}
              >
                {/* Top Subtle Gradient Line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div>
                  {/* Icon Badge with Gradient & Glow */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} text-white flex items-center justify-center mb-6 ${cat.shadow} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                  >
                    <Icon className="w-7 h-7 stroke-[2]" />
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-1.5 group-hover:text-[#4F46E5] transition-colors duration-200">
                    {cat.title}
                  </h3>
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-[11px] font-extrabold text-slate-600 mb-3">
                    {cat.count}
                  </span>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                <Link
                  href="/courses"
                  className="inline-flex items-center justify-between pt-4 border-t border-slate-100/80 text-xs font-bold text-slate-700 group-hover:text-[#4F46E5] transition-colors"
                >
                  <span>Explore Courses</span>
                  <div className="w-6 h-6 rounded-full bg-slate-50 group-hover:bg-indigo-50 text-slate-400 group-hover:text-[#4F46E5] flex items-center justify-center transition-all duration-300">
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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

