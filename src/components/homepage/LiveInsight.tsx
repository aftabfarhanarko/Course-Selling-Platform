"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LiveInsight() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section ref={sectionRef} className="py-8 md:py-12 bg-transparent overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-gradient-to-r from-[#5B50E6] via-[#4D42DB] to-[#3B32BD] p-6 sm:p-10 overflow-hidden shadow-2xl shadow-[#5B50E6]/25"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="1" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* CTA Text */}
            <div className="lg:col-span-7 space-y-3.5 text-center lg:text-left">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight"
              >
                Ready to Start <br />
                Your Learning Journey?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-indigo-100 text-xs sm:text-sm font-medium max-w-xl leading-relaxed"
              >
                Join thousands of learners and start mastering new skills today with top industry mentors.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4"
              >
                <Link
                  href="/signup"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#5B50E6] font-extrabold text-xs sm:text-sm hover:bg-slate-50 transition-all shadow-md active:scale-95 hover:scale-105"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/courses"
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 backdrop-blur-md text-white font-extrabold text-xs sm:text-sm border border-white/20 hover:bg-white/20 transition-all active:scale-95 hover:scale-105"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* Right Banner Image Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.9, x: 30 }}
              transition={{ duration: 0.95, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 group hover:scale-[1.03] transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=800&q=80"
                  alt="Ready to start learning"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
