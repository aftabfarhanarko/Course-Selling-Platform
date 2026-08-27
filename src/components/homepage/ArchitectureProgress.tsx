"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Mail, Sparkles, Send } from "lucide-react";
import { toast } from "sonner";

export default function ArchitectureProgress() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  const benefits = [
    "100% Industry-ready hands-on project curriculum",
    "Direct 1-on-1 mentorship & live code reviews",
    "Verifiable digital certificates for LinkedIn & resumes",
    "Lifetime access to all materials & future updates",
  ];

  return (
    <section ref={ref} className="py-20 sm:py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Feature Box */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-[#4F46E5] text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Why EduNova?
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
                Engineered for Real-World Tech Careers
              </h2>

              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#4F46E5] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 leading-snug">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center gap-6">
              <div>
                <p className="text-2xl font-black text-slate-900">50k+</p>
                <p className="text-xs font-medium text-slate-500">Active Students</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <p className="text-2xl font-black text-slate-900">4.8/5</p>
                <p className="text-xs font-medium text-slate-500">Student Rating</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <p className="text-2xl font-black text-slate-900">99%</p>
                <p className="text-xs font-medium text-slate-500">Satisfaction</p>
              </div>
            </div>
          </motion.div>

          {/* Right Newsletter Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center mb-6 border border-indigo-400/30">
                <Mail className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-extrabold text-white tracking-tight mb-2">
                Stay Ahead in Tech
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium mb-6">
                Subscribe to get new course alerts, tech roadmaps, and exclusive discount codes directly to your inbox.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-3 mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-xs font-semibold focus:outline-none focus:border-indigo-400 transition-all"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#4F46E5] text-white text-xs font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
                >
                  <span>Subscribe to Newsletter</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            <p className="text-[11px] text-slate-400 font-medium border-t border-white/10 pt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}