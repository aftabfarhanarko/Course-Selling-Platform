"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function LiveInsight() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-10/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#4F46E5] via-[#4338CA] to-[#3730A3] p-8 sm:p-14 overflow-hidden shadow-2xl shadow-indigo-500/20">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="1" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* CTA Text */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Ready to Start <br />
                Your Learning Journey?
              </h2>
              <p className="text-indigo-100 text-sm sm:text-base font-normal max-w-xl">
                Join thousands of learners and start mastering new skills today with top industry mentors.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#4F46E5] font-bold text-sm hover:bg-slate-50 transition-all shadow-md active:scale-95"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-indigo-600/50 text-white font-bold text-sm border border-indigo-300/30 hover:bg-indigo-600/80 transition-all active:scale-95"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Banner Image Illustration */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=800&q=80"
                  alt="Ready to start learning"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
