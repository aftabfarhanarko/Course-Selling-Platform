"use client";

import Link from "next/link";
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  Star,
  HeartHandshake,
  Zap,
  Target,
  Globe2,
  Sparkles,
  ShieldCheck,
  Code2,
  Clock,
  HelpCircle
} from "lucide-react";
import LiveInsight from "@/components/homepage/LiveInsight";

export default function AboutPage() {
  const stats = [
    { label: "Active Students", value: "50,000+", icon: Users, desc: "Learners across 80+ countries" },
    { label: "Expert Instructors", value: "300+", icon: Award, desc: "Industry leaders & Tech architects" },
    { label: "Online Courses", value: "1,200+", icon: BookOpen, desc: "Project-based learning modules" },
    { label: "Satisfaction Rate", value: "99%", icon: Star, desc: "Based on 15,000+ reviews" },
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
      description: "Curriculum specifically built to get you job-ready with industry recognized certifications.",
      icon: CheckCircle,
    },
    {
      title: "Lifetime Access",
      description: "Access course materials, code repositories, and future updates anytime, anywhere.",
      icon: Clock,
    },
    {
      title: "Community Driven",
      description: "Join an active Discord & forum community of developers for collaboration & peer feedback.",
      icon: Globe2,
    },
    {
      title: "Verified Credentials",
      description: "Earn shareable, tamper-proof certificates to showcase on LinkedIn and tech resumes.",
      icon: ShieldCheck,
    },
  ];

  const faqs = [
    {
      q: "What makes EduNova different from other online platforms?",
      a: "EduNova focuses exclusively on industry-grade engineering practices. Our courses feature interactive coding environments, direct mentorship from senior engineers, and practical portfolio projects."
    },
    {
      q: "Are certificates included with the courses?",
      a: "Yes! Every completed course awards a verified digital certificate that you can easily attach to your resume or share on LinkedIn."
    },
    {
      q: "Can I access the course material on mobile devices?",
      a: "Absolutely. Our platform is 100% responsive, allowing you to watch videos, complete quizzes, and read guides seamlessly on any screen."
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-white pt-28 pb-20 overflow-hidden" style={{ fontFamily: "var(--font-bai-jamjuree)" }}>
      {/* Background Decorative Grid and Blobs matching Hero section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#E0E7FF]/50 blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-[450px] h-[450px] rounded-full bg-[#EEF2FF]/60 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[#4F46E5] text-xs font-bold uppercase tracking-wider shadow-sm">
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
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
                <p className="text-sm font-bold text-slate-800">{stat.label}</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">{stat.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Our Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center mb-6 border border-indigo-500/30">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">Our Mission</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              To democratize high-quality computer science education by giving anyone, anywhere access to industry-tested tech skills, world-class instructors, and career growth opportunities.
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl shadow-indigo-500/5">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">Our Vision</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              We envision a global community where eager learners transition smoothly into tech careers, driving global software innovation through continuous learning and practical mastery.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Why Learn With EduNova?</h2>
            <p className="text-slate-500 mt-2 font-medium">Built for real-world outcomes, tuned for developer success.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="mb-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-[#4F46E5] text-xs font-bold mb-3">
              <HelpCircle className="w-4 h-4" /> Got Questions?
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-[#4F46E5] shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed pl-7 font-medium">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Embedded LiveInsight Section */}
      <div className="w-full">
        <LiveInsight />
      </div>
    </div>
  );
}

