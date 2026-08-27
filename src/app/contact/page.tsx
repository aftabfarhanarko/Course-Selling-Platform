"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { toast } from "sonner";

/** Simple X (formerly Twitter) logo, since lucide-react only ships the old bird icon */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.1-9.3L1 2h7.2l5 6.6L18.9 2Zm-1.2 18h1.7L7.4 3.9H5.6L17.7 20Z" />
    </svg>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  const faqs = [
    {
      question: "Do I get a certificate after completing a course?",
      answer: "Yes! All paid courses come with a downloadable certificate. Free courses do not include certificates.",
    },
    {
      question: "Can I learn at my own pace?",
      answer: "Absolutely. All courses are self-paced, allowing you to study whenever and wherever fits your schedule.",
    },
    {
      question: "How do I get help if I get stuck on a coding lesson?",
      answer: "Every course features a dedicated Q&A forum and Discord access where instructors and community peers answer your questions.",
    },
    {
      question: "What is your refund policy?",
      answer: "We offer a 30-day money-back guarantee if you are not completely satisfied with your course experience.",
    },
  ];

  const socials = [
    { label: "X", href: "https://twitter.com", icon: XIcon, bg: "bg-black", text: "text-white" },
    { label: "Facebook", href: "https://facebook.com", icon: Facebook, bg: "bg-[#1877F2]", text: "text-white" },
    { label: "Instagram", href: "https://instagram.com", icon: Instagram, bg: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]", text: "text-white" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin, bg: "bg-[#0A66C2]", text: "text-white" },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#F8FAFC] pb-16 overflow-hidden"
    >
      {/* ── TOP HERO BANNER (Matches screenshot layout with #5B50E6) ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full bg-[#5B50E6] text-white pt-16 sm:pt-20 pb-14 sm:pb-16 text-center px-4 overflow-hidden"
      >
        {/* Decorative Abstract Shapes — matches screenshot: amber curl (top-left), green plaid (top-right), pink pinwheel (bottom-left), amber curl (bottom-right) */}
        <div className="pointer-events-none absolute -top-2 left-4 sm:left-8 opacity-90">
          <svg width="110" height="90" viewBox="0 0 110 90" fill="none">
            <path
              d="M8 55 Q 10 20 42 14 Q 68 9 66 30"
              stroke="#FBBF24"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M55 24 L66 30 L59 41"
              stroke="#FBBF24"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        <div className="pointer-events-none absolute -top-4 -right-4 sm:right-2 opacity-80">
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
            {Array.from({ length: 5 }).map((_, row) =>
              Array.from({ length: 5 }).map((_, col) => (
                <rect
                  key={`${row}-${col}`}
                  x={col * 22}
                  y={row * 22}
                  width="16"
                  height="16"
                  transform={`rotate(45 ${col * 22 + 8} ${row * 22 + 8})`}
                  fill={(row + col) % 2 === 0 ? "#A3E635" : "#65A30D"}
                />
              ))
            )}
          </svg>
        </div>

        <div className="pointer-events-none absolute bottom-2 left-2 sm:left-8 opacity-90">
          <svg width="80" height="80" viewBox="0 0 90 90" fill="none">
            {Array.from({ length: 8 }).map((_, i) => (
              <path
                key={i}
                d="M45 45 L41 10 A4 4 0 0 1 49 10 Z"
                fill={i % 2 === 0 ? "#F472B6" : "#F9A8D4"}
                transform={`rotate(${i * 45} 45 45)`}
              />
            ))}
          </svg>
        </div>

        <div className="pointer-events-none absolute bottom-4 right-6 sm:right-10 opacity-90">
          <svg width="100" height="90" viewBox="0 0 100 90" fill="none">
            <path
              d="M92 55 Q 90 20 58 14 Q 32 9 34 30"
              stroke="#FBBF24"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M45 24 L34 30 L41 41"
              stroke="#FBBF24"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        <div className="max-w-2xl mx-auto relative z-10 space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            <span className="text-amber-300">Get</span> In Touch With{" "}
            <span className="text-amber-300">Us</span>
          </h1>
          <p className="text-indigo-100 text-xs sm:text-xs max-w-lg mx-auto font-medium leading-relaxed">
            Have questions, need support, or just want to say hello? We're here to help.
          </p>
        </div>
      </motion.div>

      {/* ── MAIN CONTENT (2-Column Info & Form Section - Matches screenshot) ── */}
      <div className="w-full max-w-[96%] lg:max-w-10/12 mx-auto px-2.5 sm:px-6 relative z-10 -mt-6">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl shadow-indigo-500/10 border border-slate-100"
        >
          {/* Left Column: Have Questions Info */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6 flex flex-col justify-between">
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-900 leading-tight">
                Have Questions? <br />
                <span className="text-[#5B50E6]">We're Here To Help!</span>
              </h2>
              <p className="text-slate-500 text-xs sm:text-xs leading-relaxed font-medium">
                We're here to help. Submit your inquiry through the form, and our team will respond within 24–48 hours.
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#5B50E6]">Email</p>
                <p className="text-xs font-black text-slate-800 break-all">info@viewlightstudio.com</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#5B50E6]">Phone</p>
                <p className="text-xs font-black text-slate-800">+1 (800) 234-9876</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#5B50E6]">Location</p>
                <p className="text-xs font-bold text-slate-700 leading-snug">
                  Eduvance HQ – 28 Sunrise Ave, San Francisco, CA 94104, USA
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#5B50E6]">Hours Operation</p>
                <p className="text-xs font-bold text-slate-700 leading-snug">
                  Monday – Friday: 9:00 AM – 6:00 PM (PST)
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Follow Us</p>
              <div className="flex items-center gap-2">
                {socials.map(({ label, href, icon: Icon, bg, text }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`w-8 h-8 rounded-full ${bg} ${text} flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-sm`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Clean White Form Card with Smooth Border & Shadow */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 shadow-lg shadow-indigo-500/5">
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-slate-400 font-normal">(Required)</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/80 focus:outline-none focus:border-[#5B50E6] focus:ring-2 focus:ring-[#5B50E6]/20 text-slate-900 text-xs font-medium transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address <span className="text-slate-400 font-normal">(Required)</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/80 focus:outline-none focus:border-[#5B50E6] focus:ring-2 focus:ring-[#5B50E6]/20 text-slate-900 text-xs font-medium transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subject <span className="text-slate-400 font-normal">(Required)</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/80 focus:outline-none focus:border-[#5B50E6] focus:ring-2 focus:ring-[#5B50E6]/20 text-slate-900 text-xs font-medium transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message <span className="text-slate-400 font-normal">(Required)</span>
                </label>
                <textarea
                  rows={3.5}
                  required
                  placeholder="Type your message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/80 focus:outline-none focus:border-[#5B50E6] focus:ring-2 focus:ring-[#5B50E6]/20 text-slate-900 text-xs font-medium transition-all shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#5B50E6] hover:bg-[#4D42DB] text-white font-bold text-xs transition-all duration-300 shadow-md shadow-[#5B50E6]/25 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Get In Touch"}
              </button>
            </form>
          </div>
        </motion.div>

        {/* ── FAQ SECTION (Matches screenshot design) ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={{ duration: 0.95, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="my-12 sm:my-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            {/* Left FAQ Title */}
            <div className="lg:col-span-5 space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#EEF2FF] text-[#5B50E6] text-[10px] font-extrabold uppercase tracking-wider">
                FAQ'S
              </span>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-900 leading-tight">
                Frequently <span className="text-[#5B50E6]">Asked Question</span>
              </h2>
              <p className="text-slate-500 text-xs font-medium leading-relaxed">
                Everything you need to know about our courses, certification, and platform policies.
              </p>
            </div>

            {/* Right Accordion List */}
            <div className="lg:col-span-7 space-y-2.5">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className="border-b border-slate-200 pb-3 transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between text-left py-1.5 gap-4 group"
                    >
                      <span className={`text-xs sm:text-sm font-bold transition-colors ${isOpen ? "text-[#5B50E6]" : "text-slate-800 group-hover:text-[#5B50E6]"}`}>
                        Q: {faq.question}
                      </span>
                      <span className="text-[#5B50E6] font-bold text-base shrink-0">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                        className="text-xs text-slate-500 font-medium leading-relaxed pt-1 pl-3"
                      >
                        A: {faq.answer}
                      </motion.p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>

   
    </div>
  );
}