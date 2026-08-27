"use client";

import { motion } from "framer-motion";
import { Award, Star, BookOpen, Users } from "lucide-react";

export default function InstructorSection() {
  const instructors = [
    {
      name: "Alex Rivera",
      role: "Ex-Google Staff Engineer",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      courses: "12 Courses",
      students: "45k Students",
      rating: "4.9",
    },
    {
      name: "Sarah Chen",
      role: "Lead Architect at Stripe",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      courses: "8 Courses",
      students: "32k Students",
      rating: "4.9",
    },
    {
      name: "Michael Vance",
      role: "Senior DevOps Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      courses: "15 Courses",
      students: "60k Students",
      rating: "4.8",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[#4F46E5] text-xs font-extrabold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" /> World Class Mentors
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Learn From Top Instructors
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-medium">
            Engineers and tech leaders from world-renowned software companies.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {instructors.map((ins, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-slate-50/60 border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:bg-white transition-all duration-300 text-center flex flex-col justify-between"
            >
              <div>
                <div className="relative w-24 h-24 mx-auto mb-5">
                  <img
                    src={ins.image}
                    alt={ins.name}
                    className="w-full h-full rounded-full object-cover ring-4 ring-indigo-50 shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                    <Star className="w-3 h-3 fill-slate-900" />
                    {ins.rating}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{ins.name}</h3>
                <p className="text-xs font-bold text-[#4F46E5] mt-0.5 mb-4">{ins.role}</p>
              </div>

              <div className="flex items-center justify-around border-t border-slate-200/60 pt-4 text-xs text-slate-500 font-semibold">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  {ins.courses}
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  {ins.students}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
