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

        {/* ── HERO IMAGE GALLERY (Centered Marquee Layout - No Scrollbar) ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isPageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={{ duration: 0.95, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full overflow-hidden py-4 mb-16 sm:mb-20"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 max-w-full mx-auto px-2">
            <div className="shrink-0 w-28 sm:w-40 md:w-48 h-44 sm:h-60 md:h-64 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-100 opacity-75 hover:opacity-100 hover:scale-105 transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=500&q=80"
                alt="Students studying"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="shrink-0 w-36 sm:w-52 md:w-60 h-56 sm:h-72 md:h-80 rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:scale-105 transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80"
                alt="Group of students"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="shrink-0 w-44 sm:w-64 md:w-72 h-64 sm:h-84 md:h-96 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 hover:scale-105 transition-all duration-500 ring-4 ring-[#5B50E6]/15 z-10">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=700&q=80"
                alt="Campus building"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="shrink-0 w-36 sm:w-52 md:w-60 h-56 sm:h-72 md:h-80 rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:scale-105 transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80"
                alt="Tech learners collaboration"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="shrink-0 w-28 sm:w-40 md:w-48 h-44 sm:h-60 md:h-64 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-100 opacity-75 hover:opacity-100 hover:scale-105 transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80"
                alt="Graduation celebration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* ── SECTION 1: GLOBAL OVERVIEW WITH IMAGE (Matches Screenshot 1) ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isPageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={{ duration: 0.95, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 sm:mb-28 text-center max-w-full mx-auto space-y-8"
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
            EduNova is an authorized global educational institute offering vocational and language courses, licensed by the global education authority. We are committed to delivering high-quality education.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left pt-4">
            <div className="lg:col-span-6 h-72 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80"
                alt="Campus building"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-6 space-y-4">
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                EduNova is a leading educational company that offers internationally recognized education at levels 3, 4, and 5. As an accredited partner of global education bodies, we ensure that our students receive high-quality and globally recognized qualifications. With our partnership, students can access a wide range of educational opportunities and benefit from a comprehensive and reputable educational experience. At our learning facility, students can freely choose the international qualification they desire to pursue. Depending on the program chosen by the student, our team of experts will provide guidance on the most effective strategy for structuring their studies and optimizing their learning approach.
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#5B50E6] hover:bg-[#4D42DB] text-white font-bold text-xs transition-all duration-300 shadow-md shadow-[#5B50E6]/25 hover:scale-105"
              >
                Learn More
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── SECTION 2: DIVERSE PROGRAMS ACCORDION & IMAGE (Matches Screenshot 2) ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isPageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={{ duration: 0.95, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 sm:mb-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Heading + Accordion */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  A diverse range of programs offered in various languages and educational frameworks
                </h2>
                <p className="text-slate-500 text-xs sm:text-xs leading-relaxed font-medium">
                  We service wide range of educational programs where each lead tailored outcome depend on the qualification provider we using on the program you assigned for and depend on which center you are assigned or studying in. As student its highly advice you learn more about each program you applying for and the qualification provider of what you applying for.
                </p>
              </div>

              {/* Accordion Programs List */}
              <div className="space-y-3 pt-2">
                {/* Accordion Item 1 (Open) */}
                <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-2">
                  <div className="flex items-center justify-between font-bold text-sm text-slate-900">
                    <span>British Programs Explanation</span>
                    <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-xs font-black text-slate-600">−</span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium pt-1">
                    Our educational institute offers British programs in partnership with a respected third-party qualification provider. These programs adhere to the curriculum and standards of British educational institutions, providing students with an internationally recognized education. As an approved academic center, EduNova delivers prestigious qualifications from our partner, ensuring students receive a comprehensive education focused on academic excellence, critical thinking, and practical skills development. With a dedicated faculty, students engage in a rigorous curriculum covering various subjects, preparing them for success in higher education and their future careers.
                  </p>
                </div>

                {/* Accordion Item 2 */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between font-bold text-sm text-slate-800 hover:border-[#5B50E6]/30 transition-all cursor-pointer">
                  <span>German Programs Explanation</span>
                  <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-xs font-black text-slate-400">+</span>
                </div>

                {/* Accordion Item 3 */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between font-bold text-sm text-slate-800 hover:border-[#5B50E6]/30 transition-all cursor-pointer">
                  <span>French Programs Explanation</span>
                  <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-xs font-black text-slate-400">+</span>
                </div>
              </div>
            </div>

            {/* Right Column: Group Students Image */}
            <div className="lg:col-span-6 h-80 sm:h-[450px] rounded-3xl overflow-hidden shadow-xl border border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                alt="Students in library"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── EMBEDDED LIVE INSIGHT BANNER ── */}
      <div className="w-full">
        <LiveInsight />
      </div>
    </div>
  );
}

