"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  BookOpen,
  ShoppingBag,
  BarChart2,
  Lock,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  Mail,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useGetStatsQuery } from "@/lib/api/statsApi";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// ── Nav Links ──
const navLinks = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Courses", href: "/courses", Icon: BookOpen },
  { label: "About", href: "/about", Icon: BarChart2 },
  { label: "Shop", href: "/shop", Icon: ShoppingBag },
  { label: "Blog", href: "/blog", Icon: BarChart2 },
  { label: "Contact", href: "/contact", Icon: Mail },
];

// ── Categories ──
const popularCategories = [
  { label: "Web Development", href: "/courses?category=web-dev" },
  { label: "AI & Machine Learning", href: "/courses?category=ai-ml" },
  { label: "Cloud & DevOps", href: "/courses?category=cloud-devops" },
  { label: "Data Science & SQL", href: "/courses?category=data-science" },
  { label: "Mobile App Dev", href: "/courses?category=mobile-dev" },
  { label: "Cybersecurity", href: "/courses?category=cybersecurity" },
];

// ── Support Links ──
const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund" },
  { label: "Cookie Settings", href: "/cookies" },
];

// ── Socials ──
const socials = [
  { label: "Twitter", href: "#", Icon: Twitter },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "YouTube", href: "#", Icon: Youtube },
  { label: "GitHub", href: "#", Icon: Github },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: false, amount: 0.15 });

  const pathname = usePathname();
  const { data: statsData } = useGetStatsQuery();

  const isDashboardPage = Boolean(
    pathname &&
      (pathname.startsWith("/dashboard") ||
        pathname.startsWith("/instructor") ||
        pathname.startsWith("/admin"))
  );

  if (isDashboardPage) return null;

  const stats = [
    {
      label: "Active Learners",
      value: statsData?.data?.totalUsers
        ? `${statsData.data.totalUsers.toLocaleString()}+`
        : "50,000+",
    },
    {
      label: "Curated Courses",
      value: statsData?.data?.totalCourses
        ? `${statsData.data.totalCourses}+`
        : "1,200+",
    },
    {
      label: "Verified Mentors",
      value: statsData?.data?.totalInstructors
        ? `${statsData.data.totalInstructors}+`
        : "250+",
    },
    {
      label: "Career Success",
      value: statsData?.data?.totalEnrollments
        ? `${statsData.data.totalEnrollments.toLocaleString()}+`
        : "98.4%",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className={`relative w-full bg-gradient-to-b from-white via-indigo-50/40 to-[#F1F5F9] border-t border-slate-200/80 mt-12 pt-16 pb-12 overflow-hidden text-slate-700 ${plusJakarta.className}`}
    >
      {/* Decorative Top Glow Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1.5px] bg-gradient-to-r from-transparent via-[#5B50E6]/50 to-transparent" />

      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#5B50E6]/5 rounded-full blur-[140px]" />

      <div className="w-full max-w-[96%] lg:max-w-10/12 mx-auto px-2.5 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 35, scale: 0.98 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12"
        >
          
          {/* ── Col 1: Brand Info & Bio (4 cols) ── */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="relative text-[#5B50E6] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out">
                <div className="absolute inset-0 bg-indigo-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <GraduationCap className="w-8 h-8 text-[#5B50E6] stroke-[2.2] relative z-10" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#111827] transition-colors duration-500 ease-out group-hover:text-indigo-600">
                Edu
                <span className="text-[#5B50E6] group-hover:text-purple-600 transition-colors duration-500 ease-out">
                  Nova
                </span>
              </span>
            </Link>

            <p className="text-xs sm:text-[13px] font-medium text-slate-500 leading-relaxed max-w-sm">
              Empowering engineers worldwide with production-ready skills, verified industry mentors, and high-income career opportunities.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 hover:bg-[#5B50E6] hover:text-white hover:border-[#5B50E6] shadow-sm hover:scale-110 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Navigation Links (2 cols) ── */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Quick Links
            </h4>
            <ul className="space-y-1.5">
              {navLinks.map(({ label, href }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={href}
                    className="group flex items-center gap-2 py-1 px-2.5 -ml-2.5 rounded-xl text-xs sm:text-[13px] font-semibold text-slate-600 hover:text-[#5B50E6] hover:bg-[#EEF2FF]/80 transition-all duration-300 ease-out"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B50E6] scale-0 group-hover:scale-100 transition-transform duration-300 ease-out shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300 ease-out">
                      {label}
                    </span>
                    <ArrowRight className="w-3 h-3 text-[#5B50E6] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out ml-auto shrink-0" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Popular Categories (3 cols) ── */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Top Categories
            </h4>
            <ul className="space-y-1.5">
              {popularCategories.map(({ label, href }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={href}
                    className="group flex items-center gap-2 py-1 px-2.5 -ml-2.5 rounded-xl text-xs sm:text-[13px] font-semibold text-slate-600 hover:text-[#5B50E6] hover:bg-[#EEF2FF]/80 transition-all duration-300 ease-out"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B50E6] scale-0 group-hover:scale-100 transition-transform duration-300 ease-out shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300 ease-out">
                      {label}
                    </span>
                    <ArrowRight className="w-3 h-3 text-[#5B50E6] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out ml-auto shrink-0" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Platform Metrics & Live Status (3 cols) ── */}
          <div className="lg:col-span-3 space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#EEF2FF] border border-[#5B50E6]/20 rounded-full px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.2)] animate-pulse" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#5B50E6]">
                Platform Online
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {stats.map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-2.5 shadow-sm hover:border-[#5B50E6]/30 transition-all duration-300"
                >
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
                    {label}
                  </p>
                  <p className="text-sm font-black text-slate-900 mt-0.5">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </motion.div>

        {/* ── Bottom Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs font-semibold text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} EduNova Inc. All rights reserved.{" "}
            <span className="text-slate-400">
              Developed with ❤️ by{" "}
              <a
                href="https://www.jevxo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-800 hover:text-[#5B50E6] transition-colors"
              >
                Aftab Farhan Arko
              </a>
            </span>
          </p>

          {/* Trust Badges */}
          <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-600" /> 256-bit SSL
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5B50E6]" /> Verified Mentors
            </span>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}

export default Footer;
