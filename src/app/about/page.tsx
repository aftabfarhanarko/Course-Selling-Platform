"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
  HelpCircle,
  ArrowRight,
  Compass,
  CheckCircle2,
} from "lucide-react";
import LiveInsight from "@/components/homepage/LiveInsight";

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const isPageInView = useInView(pageRef, { once: false, amount: 0.1 });

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

  const teamMembers = [
    {
      name: "Aftab Farhan Arko",
      role: "Founder & Lead Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      bio: "Ex-Vercel Tech Lead with 8+ years building enterprise scale microservices and e-learning platforms.",
    },
    {
      name: "Sophia Martinez",
      role: "Head of Curriculum",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      bio: "Senior UI/UX Engineer specialized in interactive learning systems and frontend architectures.",
    },
    {
      name: "Michael Chen",
      role: "Lead Systems Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      bio: "DevOps & Cloud Security Architect passionate about scaling cloud infrastructure and Kubernetes.",
    },
  ];

  return (
    <div
      ref={pageRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-white pt-14 sm:pt-20 pb-16 overflow-hidden"
    >
      {/* Background Decorative Grid and Blobs matching Hero section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#E0E7FF]/50 blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-[450px] h-[450px] rounded-full bg-[#EEF2FF]/60 blur-3xl" />
      </div>

      <div className="w-full max-w-[96%] lg:max-w-10/12 mx-auto px-2.5 sm:px-6 relative z-10">
        
        {/* ── HERO HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isPageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] border border-[#5B50E6]/20 text-[#5B50E6] text-[11px] font-bold uppercase tracking-wider shadow-sm">
            <GraduationCap className="w-3.5 h-3.5" /> Empowering Future Developers
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            We Are Transforming <span className="text-[#5B50E6]">Tech Education</span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
            EduNova is a premier online learning platform engineered to bridge the gap between aspirational learners and industry-grade engineering expertise.
          </p>
        </motion.div>

        {/* ── STATS GRID ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-24">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={isPageInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.96 }}
                transition={{ duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-lg shadow-indigo-500/5 hover:shadow-xl hover:border-[#5B50E6]/30 transition-all duration-500 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#EEF2FF] text-[#5B50E6] flex items-center justify-center mb-3.5 group-hover:scale-110 group-hover:bg-[#5B50E6] group-hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1 group-hover:text-[#5B50E6] transition-colors">{stat.value}</h3>
                <p className="text-xs sm:text-sm font-bold text-slate-800">{stat.label}</p>
                <p className="text-[11px] text-slate-400 mt-1 font-medium leading-normal">{stat.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* ── OUR MISSION & VISION GRID ── */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isPageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="bg-gradient-to-br from-[#1E1B4B] via-[#2E2A72] to-[#1E1B4B] text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl shadow-indigo-500/10"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#5B50E6]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="w-11 h-11 rounded-2xl bg-white/10 text-[#5B50E6] flex items-center justify-center mb-5 border border-white/20">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Our Mission</h2>
            <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed font-normal">
              To democratize high-quality computer science education by giving anyone, anywhere access to industry-tested tech skills, world-class instructors, and career growth opportunities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isPageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-lg shadow-indigo-500/5 hover:border-[#5B50E6]/30 transition-all duration-500"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#EEF2FF] text-[#5B50E6] flex items-center justify-center mb-5">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">Our Vision</h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
              We envision a global community where eager learners transition smoothly into tech careers, driving global software innovation through continuous learning and practical mastery.
            </p>
          </motion.div>
        </div>

        {/* ── CORE VALUES SECTION ── */}
        <div className="mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isPageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-xl mx-auto mb-10 space-y-2"
          >
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">Why Learn With EduNova?</h2>
            <p className="text-slate-500 text-xs sm:text-xs font-medium">Built for real-world outcomes, tuned for developer success.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 35, scale: 0.96 }}
                  animate={isPageInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 35, scale: 0.96 }}
                  transition={{ duration: 0.85, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-[#5B50E6]/30 transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#5B50E6] to-[#4D42DB] text-white flex items-center justify-center mb-5 shadow-md shadow-[#5B50E6]/25 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-[#5B50E6] transition-colors">{val.title}</h3>
                  <p className="text-slate-500 text-xs sm:text-xs leading-relaxed font-medium">{val.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── MEET OUR LEADERSHIP TEAM ── */}
        <div className="mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isPageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-xl mx-auto mb-10 space-y-2"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] border border-[#5B50E6]/20 text-[#5B50E6] text-[11px] font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" /> Leadership & Mentors
            </div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">Meet Our Team</h2>
            <p className="text-slate-500 text-xs sm:text-xs font-medium">Guided by senior software architects and industry veterans.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                animate={isPageInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 35, scale: 0.96 }}
                transition={{ duration: 0.9, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 text-center shadow-lg shadow-indigo-500/5 hover:shadow-2xl hover:border-[#5B50E6]/40 transition-all duration-500 group"
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                </div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-[#5B50E6] transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-bold text-[#5B50E6] mb-2">{member.role}</p>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* ── EMBEDDED LIVE INSIGHT BANNER ── */}
      <div className="w-full">
        <LiveInsight />
      </div>
    </div>
  );
}

