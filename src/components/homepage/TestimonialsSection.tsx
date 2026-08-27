"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, MessageSquareQuote, Sparkles } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
}

const row1: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Jenkins",
    role: "Fullstack Developer @ Stripe",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    comment: "The Next.js & SaaS architecture track exceeded all my expectations! Extremely practical code reviews and quick mentor responses.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Michael Chen",
    role: "Backend Engineer @ Uber",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    comment: "Great experience learning system design on EduNova. Highly organized curriculum and reliable 1-on-1 code reviews.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Sophia Martinez",
    role: "UI/UX Engineer @ Airbnb",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    comment: "Prompt mentor feedback and transparent curriculum. I leveled up my design engineering skills in just 4 weeks!",
    rating: 5,
  },
  {
    id: "t4",
    name: "Alex Rivera",
    role: "DevOps Specialist @ AWS",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    comment: "Hands down the best Cloud & Kubernetes track available online. Very detailed microservice blueprints.",
    rating: 5,
  },
];

const row2: Testimonial[] = [
  {
    id: "t5",
    name: "Bonnie M. Pattison",
    role: "Frontend Tech Lead @ Vercel",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    comment: "Thanks to the personalized guidance provided by EduNova mentors, I landed a $130k remote developer role!",
    rating: 5,
  },
  {
    id: "t6",
    name: "David Kim",
    role: "AI Engineer @ OpenAI",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
    comment: "The LLM & PyTorch course is unmatched. Building real AI agents directly inside the browser sandbox was super fun.",
    rating: 5,
  },
  {
    id: "t7",
    name: "Emma Watson",
    role: "Mobile Architect @ Shopify",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    comment: "EduNova's Flutter and React Native tracks gave me full confidence to launch production cross-platform apps.",
    rating: 5,
  },
  {
    id: "t8",
    name: "James Wilson",
    role: "Security Analyst @ Cloudflare",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    comment: "Top notch cybersecurity audits and ethical hacking labs. Verified certificate helped me stand out to recruiters.",
    rating: 5,
  },
];

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="w-[380px] sm:w-[440px] shrink-0 rounded-3xl bg-white/95 backdrop-blur-xl p-5 border border-slate-200/80 shadow-lg shadow-indigo-500/5 hover:shadow-2xl hover:border-[#5B50E6]/40 transition-all duration-500 flex gap-5 items-center group">
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-2xl overflow-hidden shadow-sm border border-slate-100">
        <img
          src={item.avatar}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: item.rating }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-xs font-medium text-slate-600 leading-relaxed mb-3 line-clamp-3">
            {item.comment}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-900 group-hover:text-[#5B50E6] transition-colors truncate">
            {item.name}
          </h4>
          <p className="text-[11px] font-bold text-slate-400 truncate">
            {item.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });

  return (
    <section ref={sectionRef} className="py-8 sm:py-12 bg-transparent overflow-hidden">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-row-1 {
          display: flex;
          width: max-content;
          animation: marquee-left 18s linear infinite;
        }
        .marquee-row-2 {
          display: flex;
          width: max-content;
          animation: marquee-right 18s linear infinite;
        }
        .marquee-row-1:hover, .marquee-row-2:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2.5"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] border border-[#5B50E6]/20 text-[#5B50E6] text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> CUSTOMER REVIEWS
          </div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">
            <MessageSquareQuote className="inline-block w-5 h-5 text-[#5B50E6] mr-1.5 -mt-1" />
            What Our Students <span className="text-[#5B50E6]">Say About Us</span>
          </h2>
          <p className="text-slate-500 text-xs sm:text-xs font-medium leading-relaxed">
            Trusted by thousands of happy learners and software engineers worldwide.
          </p>
        </motion.div>
      </div>

      {/* Marquee Rows */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6 relative"
        style={{
          maskImage: "linear-gradient(to right, transparent, white 8%, white 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, white 8%, white 92%, transparent)"
        }}
      >
        {/* Row 1 — Left Marquee */}
        <div className="overflow-hidden py-1">
          <div className="marquee-row-1 flex items-center gap-5">
            {row1.map((t) => (
              <TestimonialCard key={`r1-1-${t.id}`} item={t} />
            ))}
            {row1.map((t) => (
              <TestimonialCard key={`r1-2-${t.id}`} item={t} />
            ))}
          </div>
        </div>

        {/* Row 2 — Right Marquee */}
        <div className="overflow-hidden py-1">
          <div className="marquee-row-2 flex items-center gap-5">
            {row2.map((t) => (
              <TestimonialCard key={`r2-1-${t.id}`} item={t} />
            ))}
            {row2.map((t) => (
              <TestimonialCard key={`r2-2-${t.id}`} item={t} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
