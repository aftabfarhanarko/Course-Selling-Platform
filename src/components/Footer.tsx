"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  BookOpen,
  Users,
  TrendingUp,
  Info,
  Mail,
  Lock,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Courses", href: "/courses", Icon: BookOpen },
  { label: "Community", href: "/community", Icon: Users },
  { label: "Results", href: "/results", Icon: TrendingUp },
  { label: "About", href: "/about", Icon: Info },
];

const stats = [
  { label: "Total distributed", value: "$12.4M+" },
  { label: "Active students", value: "50,000+" },
  { label: "Courses available", value: "120+" },
  { label: "Avg. student rating", value: "4.9 / 5.0" },
];

const socials = [
  { label: "Twitter/X", Icon: Twitter, href: "https://twitter.com" },
  { label: "Instagram", Icon: Instagram, href: "https://instagram.com" },
  { label: "LinkedIn", Icon: Linkedin, href: "https://linkedin.com" },
  { label: "YouTube", Icon: Youtube, href: "https://youtube.com" },
  { label: "Email", Icon: Mail, href: "mailto:hello@incomearchitect.com" },
];

// ─── Component ────────────────────────────────────────────────────────────────

function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/student"))
    return null;

  return (
    <footer
      className={`${plusJakarta.className} bg-[#DFE2FF] border-t border-indigo-200/40 `}
    >
      {/* ── Top Grid ───────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-6 py-15 border-b border-indigo-200/30">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="text-[17px] font-extrabold text-indigo-950 tracking-tight">
              JEV<span className="text-indigo-600">XO</span>
            </span>
          </div>
          <p className="text-[11px] font-bold tracking-[.06em] text-indigo-500 mb-3">
            PRECISION PROSPERITY
          </p>
          <p className="text-[13px] text-gray-500 leading-relaxed max-w-[220px]">
            Build sustainable income streams with proven frameworks and
            expert-led courses trusted by 50,000+ creators.
          </p>
        </div>

        {/* Navigate */}
        <div>
          <p className="text-[11px] font-extrabold tracking-[.1em] text-indigo-500 uppercase mb-4">
            Navigate
          </p>
          <ul className="space-y-2.5">
            {navLinks.map(({ label, href, Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="flex items-center gap-2 text-[13.5px] font-medium text-gray-600 hover:text-indigo-600 transition-colors group"
                >
                  <Icon className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Stats */}
        <div>
          {/* Live badge */}
          <div className="inline-flex items-center gap-1.5 bg-indigo-100/60 border border-indigo-200/40 rounded-full px-3 py-1 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_0_3px_rgba(34,197,94,.2)]" />
            <span className="text-[11px] font-bold tracking-[.04em] text-indigo-700">
              Platform Live
            </span>
          </div>

          <div className="space-y-2">
            {stats.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between bg-white/45 border border-white/60 rounded-xl px-3 py-2"
              >
                <span className="text-[11.5px] text-gray-500 font-medium">
                  {label}
                </span>
                <span className="text-[13px] font-extrabold text-indigo-950">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ─────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4 px-6 md:px-12 py-4">
        {/* Copyright */}
        <p className="text-[12px] text-gray-500 font-medium">
          © 2024{" "}
          <strong className="text-gray-700 font-bold">IncomeArchitect</strong>.
          All rights reserved.
        </p>

        {/* Trust badges */}
        <div className="hidden md:flex items-center gap-1.5 text-[11.5px] text-gray-400 font-medium">
          <div className="w-4.5 h-4.5 rounded-full bg-green-100 flex items-center justify-center">
            <Lock className="w-2.5 h-2.5 text-green-600" />
          </div>
          SSL Secured
          <span className="w-1 h-1 rounded-full bg-gray-300 mx-1" />
          GDPR Compliant
          <span className="w-1 h-1 rounded-full bg-gray-300 mx-1" />
          256-bit Encryption
        </div>

        {/* Socials */}
        <div className="flex items-center gap-2.5">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/50 border border-indigo-200/30 flex items-center justify-center text-indigo-600 hover:bg-white hover:-translate-y-0.5 transition-all duration-200"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
