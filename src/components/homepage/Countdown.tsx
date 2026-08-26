"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Users, BookOpen, UserCheck, Star } from "lucide-react";
import { useGetStatsQuery } from "@/lib/api/statsApi";

interface StatItem {
  id: number;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  icon: any;
}

function useCounter(target: number, decimals = 0, shouldStart: boolean) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!shouldStart) return;
    const controls = animate(0, target, {
      duration: 2,
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

export default function CountDownTrust() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { data: statsData } = useGetStatsQuery();

  const parseNumber = (val: string) =>
    parseFloat(val.replace(/[^0-9.-]+/g, "")) || 0;

  const totalStudents = statsData
    ? parseNumber(
        statsData.kpis.find((k) => k.label === "Active Students")?.value || "0"
      )
    : 50000;

  const totalCourses = statsData
    ? parseNumber(
        statsData.kpis.find((k) => k.label === "Published Courses")?.value || "0"
      )
    : 1200;

  const stats: StatItem[] = [
    {
      id: 1,
      label: "Active Students",
      value: totalStudents || 50000,
      suffix: "+",
      icon: Users,
    },
    {
      id: 2,
      label: "Online Courses",
      value: totalCourses || 1200,
      suffix: "+",
      icon: BookOpen,
    },
    {
      id: 3,
      label: "Expert Instructors",
      value: 300,
      suffix: "+",
      icon: UserCheck,
    },
    {
      id: 4,
      label: "Student Rating",
      value: 4.8,
      suffix: "/5",
      decimals: 1,
      icon: Star,
    },
  ];

  return (
    <section ref={sectionRef} className="py-10 bg-white relative z-20">
      <div className="max-w-10/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-6 sm:p-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              const count = useCounter(stat.value, stat.decimals ?? 0, isInView);

              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.25,
                    ease: [0.215, 0.61, 0.355, 1.0],
                  }}
                  className={`flex flex-col items-center text-center ${
                    idx !== 0 ? "pt-6 lg:pt-0" : ""
                  }`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#4F46E5] mb-4">
                    <Icon className="w-7 h-7 text-[#4F46E5]" />
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    {stat.prefix ?? ""}
                    {count}
                    {stat.suffix ?? ""}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
