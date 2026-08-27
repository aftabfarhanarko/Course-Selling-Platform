"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-gradient-to-r from-[#4F46E5] via-indigo-600 to-purple-700 p-8 sm:p-14 text-white shadow-2xl shadow-indigo-500/20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 overflow-hidden"
        >
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-wider mb-4 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" /> Start Learning Today
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold mb-3 tracking-tight">
              Ready to master high-demand tech skills?
            </h2>
            <p className="text-indigo-100 text-sm sm:text-base font-medium">
              Join 50,000+ developers building production-ready projects today.
            </p>
          </div>

          <Link
            href="/signup"
            className="relative z-10 shrink-0 inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white text-[#4F46E5] font-extrabold text-sm hover:bg-slate-50 transition-all shadow-xl hover:scale-105 active:scale-95 duration-300"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
