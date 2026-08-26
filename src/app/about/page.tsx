"use client";

import Link from "next/link";
import { GraduationCap, Users, Award, BookOpen, CheckCircle, ArrowRight, Star, HeartHandshake, Zap } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Active Students", value: "25,000+", icon: Users },
    { label: "Expert Instructors", value: "120+", icon: Award },
    { label: "Premium Courses", value: "450+", icon: BookOpen },
    { label: "Satisfaction Rate", value: "99%", icon: Star },
  ];

  const values = [
    {
      title: "Interactive Learning",
      description: "Hands-on projects and real-world coding challenges engineered for fast skill mastery.",
      icon: Zap,
    },
    {
      title: "Expert Mentorship",
      description: "Learn directly from top industry engineers with dedicated Q&A support and code reviews.",
      icon: HeartHandshake,
    },
    {
      title: "Career Oriented",
      description: "Curriculum specifically built to get you job-ready with industry Recognized Certifications.",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-10 pb-20 overflow-hidden" style={{ fontFamily: "var(--font-bai-jamjuree)" }}>
      {/* Background Ambient Glow Patterns matching Homepage */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[#4F46E5] text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" /> Empowering Future Developers
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            We Are Transforming <span className="bg-gradient-to-r from-[#4F46E5] via-purple-600 to-indigo-600 bg-clip-text text-transparent">Tech Education</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
            EduNova is a premier online learning platform designed to bridge the gap between aspirational learners and industry-grade engineering expertise.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-3xl p-6 shadow-xl shadow-indigo-500/5 hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#4F46E5] group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-1">{stat.value}</h3>
                <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Core Values Section */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Why Learn With EduNova?</h2>
            <p className="text-slate-500 mt-2 font-medium">Built for outcomes, tuned for developer success.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <div
                  key={i}
                  className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-100 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center mb-6 shadow-md shadow-indigo-500/20">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{val.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#4F46E5] via-indigo-600 to-purple-700 p-8 sm:p-12 text-white overflow-hidden shadow-2xl shadow-indigo-500/25 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Ready to start your tech journey?</h2>
            <p className="text-indigo-100 text-sm sm:text-base font-medium">Explore hundreds of courses taught by software architects and lead developers.</p>
          </div>
          <Link
            href="/courses"
            className="relative z-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-[#4F46E5] font-bold hover:bg-slate-50 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Explore Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
