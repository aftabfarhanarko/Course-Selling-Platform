"use client";

import { useRef, useState } from "react";
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
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  ChevronDown,
} from "lucide-react";
import LiveInsight from "@/components/homepage/LiveInsight";

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const isPageInView = useInView(pageRef, { once: false, amount: 0.1 });

  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const stats = [
    { label: "Active Students", value: "50,000+", icon: Users, desc: "Learners across 80+ countries" },
    { label: "Expert Instructors", value: "300+", icon: Award, desc: "Industry leaders & Tech architects" },
    { label: "Online Courses", value: "1,200+", icon: BookOpen, desc: "Project-based learning modules" },
    { label: "Satisfaction Rate", value: "99%", icon: Star, desc: "Based on 15,000+ reviews" },
  ];

  const teamMembers = [
    {
      name: "Aftab Farhan Arko",
      role: "Founder & Lead Architect",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Sophia Martinez",
      role: "Head of Curriculum",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Michael Chen",
      role: "Lead Systems Architect",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "David Vance",
      role: "Senior AI Strategist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Ultra-smooth & slow transition configuration
  const getSmoothTransition = (delay: number = 0) => ({
    duration: 1.5,
    delay,
    ease: "easeInOut" as const,
  });

  return (
    <div
      ref={pageRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-white pt-16 sm:pt-24 pb-24 overflow-hidden"
    >
      {/* Background Decorative Grid and Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-[#E0E7FF]/50 blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-[550px] h-[550px] rounded-full bg-[#EEF2FF]/60 blur-3xl" />
      </div>

      <div className="w-10/12 mx-auto relative z-10 md:px-11">
        
        {/* ── HERO BREADCRUMB & TITLE ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isPageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={getSmoothTransition(0)}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-3"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Our Mission To Make Education <br className="hidden sm:inline" /> Easy And Accessible To All
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium max-w-xl mx-auto">
            Begin your program at any of EduNova's global centers, laying a strong groundwork for advancement and propelling your success to new heights.
          </p>
        </motion.div>

        {/* ── HERO IMAGE GALLERY ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isPageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={getSmoothTransition(0.2)}
          className="w-full overflow-hidden py-4 mb-16 sm:mb-20"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-6 max-w-full mx-auto px-2">
            <div className="shrink-0 w-28 sm:w-40 md:w-48 h-44 sm:h-60 md:h-64 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-100 opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700 ease-out">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80"
                alt="Students studying"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="shrink-0 w-36 sm:w-52 md:w-60 h-56 sm:h-72 md:h-80 rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:scale-105 transition-all duration-700 ease-out">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80"
                alt="Group of students"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="shrink-0 w-44 sm:w-64 md:w-72 h-64 sm:h-84 md:h-96 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 hover:scale-105 transition-all duration-700 ease-out ring-4 ring-[#5B50E6]/15 z-10">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80"
                alt="Campus building"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="shrink-0 w-36 sm:w-52 md:w-60 h-56 sm:h-72 md:h-80 rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:scale-105 transition-all duration-700 ease-out">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=700&q=80"
                alt="Tech learners collaboration"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="shrink-0 w-28 sm:w-40 md:w-48 h-44 sm:h-60 md:h-64 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-100 opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700 ease-out">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
                alt="Graduation celebration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* ── SECTION 1: GLOBAL OVERVIEW WITH IMAGE ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isPageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={getSmoothTransition(0.35)}
          className="mb-16 sm:mb-24 text-center max-w-full mx-auto space-y-6"
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

          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-medium">
            EduNova is an authorized global educational institute offering vocational and language courses, licensed by the global education authority. We are committed to delivering high-quality education.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center text-left pt-2">
            <div className="lg:col-span-6 h-72 sm:h-88 rounded-3xl overflow-hidden shadow-xl border border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80"
                alt="Campus building"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>

            <div className="lg:col-span-6 space-y-4 max-w-lg">
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                EduNova is a leading educational company that offers internationally recognized education at levels 3, 4, and 5. As an accredited partner of global education bodies, we ensure that our students receive high-quality and globally recognized qualifications. With our partnership, students can access a wide range of educational opportunities and benefit from a comprehensive and reputable educational experience. At our learning facility, students can freely choose the international qualification they desire to pursue. Depending on the program chosen by the student, our team of experts will provide guidance on the most effective strategy for structuring their studies and optimizing their learning approach.
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#5B50E6] hover:bg-[#4D42DB] text-white font-bold text-xs transition-all duration-500 shadow-md shadow-[#5B50E6]/25 hover:scale-105"
              >
                Learn More
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── SECTION 2: DIVERSE PROGRAMS ACCORDION & IMAGE ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isPageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={getSmoothTransition(0.5)}
          className="mb-16 sm:mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Heading + Accordion */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-3 max-w-lg">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  A diverse range of programs offered in various languages and educational frameworks
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                  We service wide range of educational programs where each lead tailored outcome depend on the qualification provider we using on the program you assigned for and depend on which center you are assigned or studying in. As student its highly advice you learn more about each program you applying for and the qualification provider of what you applying for.
                </p>
              </div>

              {/* Accordion Programs List */}
              <div className="space-y-3 pt-1">
                {[
                  {
                    title: "British Programs Explanation",
                    content: "Our educational institute offers British programs in partnership with a respected third-party qualification provider. These programs adhere to the curriculum and standards of British educational institutions, providing students with an internationally recognized education. As an approved academic center, EduNova delivers prestigious qualifications from our partner, ensuring students receive a comprehensive education focused on academic excellence, critical thinking, and practical skills development."
                  },
                  {
                    title: "German Programs Explanation",
                    content: "Our German curriculum features engineering-grade coursework, dual vocational study programs, and practical applied science frameworks modeled after premier European institutes for deep technical competence."
                  },
                  {
                    title: "French Programs Explanation",
                    content: "The French qualification track focuses on analytical rigor, software design patterns, and international accreditation, allowing students to seamlessly transfer credits or build global engineering careers."
                  }
                ].map((item, index) => {
                  const isOpen = activeAccordion === index;
                  return (
                    <div
                      key={item.title}
                      onClick={() => setActiveAccordion(isOpen ? null : index)}
                      className={`border rounded-2xl p-4 space-y-2 cursor-pointer transition-all duration-500 ${
                        isOpen
                          ? "bg-slate-50 border-slate-300 shadow-sm"
                          : "bg-white border-slate-200 hover:border-[#5B50E6]/40 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900">
                        <span>{item.title}</span>
                        <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-600">
                          {isOpen ? "−" : "+"}
                        </span>
                      </div>
                      {isOpen && (
                        <p className="text-slate-500 text-xs leading-relaxed font-medium pt-1 border-t border-slate-200/60">
                          {item.content}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Group Students Image */}
            <div className="lg:col-span-6 h-80 sm:h-[420px] rounded-3xl overflow-hidden shadow-xl border border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                alt="Students in library"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
          </div>
        </motion.div>

        {/* ── SECTION 3: HISTORY AND BACKGROUND ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isPageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={getSmoothTransition(0.65)}
          className="mb-16 sm:mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Title & Multi-paragraph History */}
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                History and Background
              </h2>

              <div className="space-y-4 text-slate-500 text-xs sm:text-sm leading-relaxed font-medium max-w-xl">
                <p>
                  EduNova is a subsidiary of the renowned Global Tech Group, a leading educational entity with a rich history dating back to 2012. Backed by the education division, EduNova provides students with a world-class educational experience, drawing upon the vast expertise, resources, and global networks of the founders.
                </p>

                <p>
                  With over 300+ dedicated mentors and engineering staff, EduNova has successfully guided more than 50,000 students from various technical fields to graduation over the past decade. Our ultimate aim is to become a global leader in delivering software engineering and AI education for learners worldwide through a diverse range of project-based programs.
                </p>

                <div className="pt-2 border-t border-slate-200/80">
                  <p className="pt-2">
                    EduNova operates under modern interactive learning models. Firstly, we establish and operate digital academies across Europe, Asia, and North America. Secondly, we invest in existing educational projects worldwide, fostering growth and development in the tech education sector. Thirdly, we offer career counseling and portfolio development services, assisting learners in achieving their dream tech roles. Lastly, our higher education focus enables students to obtain verified industry credentials online.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Founder Quote Card */}
            <div className="lg:col-span-5 bg-slate-50/90 border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium italic">
                "EduNova was founded to bridge the gap between traditional theory and modern software engineering practices. As a tech lead, I realized the need for accessible, high-quality tech education—free from unnecessary financial burdens. Our vision is to provide practical and exceptional education, eliminating barriers and preparing students for success in a rapidly changing digital world. Join us in redefining education for a brighter future."
              </p>

              <div className="flex items-center gap-3.5 pt-2 border-t border-slate-200/80">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Aftab Farhan Arko"
                  className="w-12 h-12 rounded-2xl object-cover shadow-sm border border-slate-200"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">- Aftab Farhan Arko</h4>
                  <p className="text-[11px] text-slate-400 font-semibold">Founder & CEO, EduNova Global</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── SECTION 4: MEET THE PEOPLE BEHIND THE INNOVATION ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isPageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={getSmoothTransition(0.8)}
          className="mb-16 sm:mb-20"
        >
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10 sm:mb-12">
            <div className="space-y-1 max-w-md">
              <span className="text-xs font-bold text-[#5B50E6] uppercase tracking-widest">Our Team</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Meet the People Behind the Innovation
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-sm">
              <p className="text-slate-500 text-xs font-medium leading-relaxed">
                Our diverse team of strategists, developers, and technologists is united by a passion for solving real-world problems with smart, scalable solutions.
              </p>
              <Link
                href="/about"
                className="shrink-0 px-5 py-2.5 rounded-full bg-[#DCEBCA] hover:bg-[#cbe0b3] text-slate-900 font-bold text-xs transition-all duration-500 hover:scale-105 shadow-sm"
              >
                View All
              </Link>
            </div>
          </div>

          {/* 4 Portrait Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 35 }}
                animate={isPageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
                transition={getSmoothTransition(0.85 + idx * 0.15)}
                className="group flex flex-col space-y-3"
              >
                {/* Full Height Portrait Image Container with Glass Overlay */}
                <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden bg-slate-100 shadow-md group-hover:shadow-xl transition-all duration-700 ease-out">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />

                  {/* Floating Glassmorphic Social Icons Bar */}
                  <div className="absolute bottom-4 left-4 right-4 py-2.5 px-4 rounded-2xl bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center gap-4 text-white shadow-lg group-hover:bg-white/40 transition-all duration-500">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-transform duration-300">
                      <Facebook className="w-3.5 h-3.5" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-transform duration-300">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-transform duration-300">
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-transform duration-300">
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Member Info */}
                <div className="space-y-0.5 pt-1">
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#5B50E6] transition-colors duration-500">
                    {member.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

