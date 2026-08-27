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

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
        
        {/* ── HERO BREADCRUMB & TITLE (Matches screenshot design) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isPageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3"
        >
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
            <span>Home</span>
            <span>/</span>
            <span>About</span>
            <span>/</span>
            <span className="text-slate-800 font-bold">About EduNova</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Our Mission To Make Education <br className="hidden sm:inline" /> Easy And Accessible To All
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium max-w-xl mx-auto">
            Begin your program at any of EduNova's global centers, laying a strong groundwork for advancement and propelling your success to new heights.
          </p>
        </motion.div>

        {/* ── HERO IMAGE GALLERY (Matches screenshot layout) ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isPageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={{ duration: 0.95, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 sm:gap-5 overflow-x-auto pb-4 mb-16 sm:mb-20 no-scrollbar px-2"
        >
          <div className="shrink-0 w-32 sm:w-44 h-48 sm:h-64 rounded-2xl overflow-hidden shadow-md border border-slate-100 opacity-60 hover:opacity-100 transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=500&q=80"
              alt="Students studying"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="shrink-0 w-44 sm:w-60 h-64 sm:h-80 rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:scale-[1.02] transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80"
              alt="Group of students"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="shrink-0 w-52 sm:w-72 h-72 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 hover:scale-[1.02] transition-transform duration-300 ring-4 ring-[#5B50E6]/10">
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=700&q=80"
              alt="Campus building"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="shrink-0 w-44 sm:w-60 h-64 sm:h-80 rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:scale-[1.02] transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80"
              alt="Tech learners collaboration"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="shrink-0 w-32 sm:w-44 h-48 sm:h-64 rounded-2xl overflow-hidden shadow-md border border-slate-100 opacity-60 hover:opacity-100 transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80"
              alt="Graduation celebration"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* ── GLOBAL ACCREDITATION & OVERVIEW SECTION (Matches bottom section in screenshot) ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isPageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={{ duration: 0.95, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 sm:mb-24 text-center max-w-full mx-auto space-y-8"
        >
          {/* Location Badges Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> EduNova Global
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-100">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> EduNova UK
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-100">
              <span className="w-2 h-2 rounded-full bg-[#5B50E6]" /> EduNova Worldwide
            </span>
          </div>

          <p className="text-slate-500 text-xs sm:text-xs leading-relaxed max-w-2xl mx-auto font-medium">
            EduNova is an authorized global educational institute offering accredited software engineering, AI, and vocational programs recognized by top tech enterprises worldwide.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-100">
            <div className="md:col-span-5 h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=700&q=80"
                alt="EduNova Headquarters"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-7 space-y-3">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                Globally Recognized Tech Qualifications & Career Pathways
              </h3>
              <p className="text-slate-500 text-xs sm:text-xs leading-relaxed font-medium">
                EduNova is a leading educational technology institution offering internationally recognized software certifications. As an accredited partner of global tech frameworks, we ensure that our students receive high-quality, practical engineering skills.
              </p>
              <p className="text-slate-500 text-xs sm:text-xs leading-relaxed font-medium">
                With our industry partnership network, students can access a wide range of career opportunities. Our team of senior architects provides 1-on-1 guidance on structuring your tech portfolio and optimizing your career trajectory.
              </p>
            </div>
          </div>
        </motion.div>

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

