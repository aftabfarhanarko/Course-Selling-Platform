"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export default function CareerOutcomes() {
  const stats = [
    { title: "89% Placement", desc: "Hired within 6 months of graduation" },
    { title: "$95,000", desc: "Average starting annual salary" },
    { title: "150+ Partners", desc: "Direct referrals to tech startups & enterprises" },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-extrabold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" /> Proven Track Record
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Career Outcomes That Matter
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Transforming learners into high-paying software engineers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 text-center hover:shadow-xl hover:border-indigo-200 transition-all duration-300"
            >
              <h3 className="text-3xl sm:text-4xl font-black text-indigo-600 mb-2">
                {s.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm font-medium">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
