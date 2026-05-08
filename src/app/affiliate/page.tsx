"use client";
import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

const stats = [
  { value: "40%", label: "Commission Rate" },
  { value: "12K+", label: "Active Affiliates" },
  { value: "$500K+", label: "Total Paid Out" },
  { value: "90 Days", label: "Cookie Window" },
];

const steps = [
  {
    num: "01",
    title: "Sign up free",
    desc: "Create your affiliate account in minutes. Get your unique referral link instantly — no approval needed.",
  },
  {
    num: "02",
    title: "Share your link",
    desc: "Promote on YouTube, your blog, social media, or email. We provide banners and copy to help you convert.",
  },
  {
    num: "03",
    title: "Earn commissions",
    desc: "Earn up to 40% on every purchase. Get paid monthly via bKash, Nagad, or bank transfer.",
  },
];

const tiers = [
  {
    name: "Starter",
    pct: "20%",
    range: "0–10 sales/month",
    perks: ["Basic analytics dashboard", "Email support", "Marketing kit access"],
    featured: false,
  },
  {
    name: "Growth",
    pct: "30%",
    range: "11–50 sales/month",
    perks: ["Advanced analytics", "Priority support", "Bonus resources", "Custom landing page"],
    featured: true,
  },
  {
    name: "Pro Partner",
    pct: "40%",
    range: "50+ sales/month",
    perks: ["Full dashboard suite", "Dedicated account manager", "Recurring income", "Co-marketing deals"],
    featured: false,
  },
];

const testimonials = [
  {
    initials: "RS",
    name: "Rafiq Sarker",
    role: "YouTuber · Dhaka",
    quote: "Made my first $500 in the second month. The dashboard makes tracking so easy.",
    earning: "$1.2K/mo",
  },
  {
    initials: "NA",
    name: "Nadia Akter",
    role: "Blogger · Chittagong",
    quote: "The 90-day cookie window is a game changer. My passive income has tripled since joining.",
    earning: "$850/mo",
  },
  {
    initials: "MH",
    name: "Mamun Hossain",
    role: "Content Creator · Sylhet",
    quote: "Payouts are always on time. Best affiliate program I have ever worked with.",
    earning: "$2K/mo",
  },
];

const faqs = [
  {
    q: "Is there a minimum payout threshold?",
    a: "Yes, the minimum payout is $10. Once you reach that, payments are processed on the 5th of each month.",
  },
  {
    q: "Can I promote on any platform?",
    a: "Absolutely. YouTube, Facebook, Instagram, blogs, email newsletters — anywhere online works as long as you follow our terms.",
  },
  {
    q: "How long does approval take?",
    a: "There is no approval process. Sign up and you get your affiliate link instantly.",
  },
  {
    q: "What if a buyer requests a refund?",
    a: "Commissions on refunds within 7 days are reversed. After 7 days the sale is final and your commission is locked.",
  },
];

export default function AffiliatePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">

      {/* HERO SECTION */}
      <section className="bg-white border-b border-slate-200 overflow-hidden relative">
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/60 rounded-full px-3.5 py-1.5 text-[11px] font-bold text-blue-700 tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              Affiliate Program
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6">
              Earn while you<br />
              <span className="text-blue-600">teach others</span> to grow
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-xl">
              Share our premium courses and earn up to 40% commission on every sale —
              with real-time tracking, 90-day cookies, and monthly payouts.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-600/20">
                Join for free
              </button>
              <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 px-8 py-3.5 rounded-xl font-semibold transition-all">
                See how it works &rarr;
              </button>
            </div>
          </div>

          {/* Hero Right Dashboard Preview */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-200/50 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-white/80 rounded-3xl pointer-events-none" />
            <h3 className="text-lg font-bold tracking-tight mb-6 relative z-10">Your Affiliate Dashboard</h3>

            <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                <div className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight">$2,840</div>
                <div className="text-xs font-semibold text-slate-500 mt-1">This month</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                <div className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight">142</div>
                <div className="text-xs font-semibold text-slate-500 mt-1">Referrals</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                <div className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight">30%</div>
                <div className="text-xs font-semibold text-slate-500 mt-1">Commission</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                <div className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight">89%</div>
                <div className="text-xs font-semibold text-slate-500 mt-1">Conversion</div>
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between py-3 border-t border-slate-100 text-sm">
                <span className="font-medium text-slate-500">Last payout</span>
                <span className="font-bold text-emerald-600">$1,920.00</span>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-slate-100 text-sm">
                <span className="font-medium text-slate-500">Pending</span>
                <span className="font-bold text-emerald-600">$920.00</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full mt-2 relative z-10">
              &uarr; +18.2% vs last month
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100">
          {stats.map((s) => (
            <div key={s.label} className="p-8 sm:p-10 text-center hover:bg-slate-50 transition-colors">
              <div className="text-3xl sm:text-4xl font-black text-blue-600 tracking-tight mb-2">{s.value}</div>
              <div className="text-sm font-semibold text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="py-20 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-3">
            <div className="w-4 h-0.5 bg-blue-600 rounded-full" /> How it works
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Three steps to your first payout</h2>
          <p className="text-slate-500 max-w-lg leading-relaxed text-lg">
            No lengthy onboarding. No approval queues. Just sign up and start earning today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-1 bg-slate-200 border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          {steps.map((s) => (
            <div key={s.num} className="bg-white p-8 sm:p-10 hover:bg-slate-50 transition-colors group">
              <div className="text-5xl font-black text-slate-100 group-hover:text-blue-50 transition-colors tracking-tighter mb-6">{s.num}</div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm sm:text-base">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TIERS */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-3">
              <div className="w-4 h-0.5 bg-blue-600 rounded-full" /> Commission Tiers
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">The more you sell, the more you keep</h2>
            <p className="text-slate-500 max-w-lg mx-auto leading-relaxed text-lg">
              Tiers upgrade automatically as your monthly sales grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`relative bg-white rounded-3xl p-8 sm:p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${t.featured
                  ? "border-2 border-blue-600 shadow-xl shadow-blue-600/10 z-10"
                  : "border border-slate-200 shadow-sm"
                  }`}
              >
                {t.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="text-5xl sm:text-6xl font-black text-blue-600 tracking-tight mb-2">{t.pct}</div>
                <div className="text-sm font-semibold text-slate-400 mb-6">{t.range}</div>

                <h3 className="text-xl font-bold pb-6 border-b border-slate-100 mb-6">{t.name}</h3>

                <ul className="space-y-4 mb-8">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                      <div className="bg-emerald-100 text-emerald-600 rounded-full p-1 mt-0.5 shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      {p}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${t.featured
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
                    : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300"
                    }`}
                >
                  {t.featured ? "Get started now" : "Join this tier"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-3">
            <div className="w-4 h-0.5 bg-blue-600 rounded-full" /> Partner Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Real affiliates, real results</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-6">
                Earning {t.earning}
              </div>
              <p className="text-slate-600 leading-relaxed italic mb-8">"{t.quote}"</p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center text-xs font-black shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs font-medium text-slate-500 mt-0.5">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-[800px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-3">
            <div className="w-4 h-0.5 bg-blue-600 rounded-full" /> FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Common questions</h2>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="py-2">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left group"
                >
                  <span className={`font-bold transition-colors ${isOpen ? "text-blue-600" : "text-slate-900 group-hover:text-blue-600"}`}>
                    {f.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen
                    ? "bg-blue-50 border-blue-200 text-blue-600 transform rotate-180"
                    : "bg-white border-slate-200 text-slate-400 group-hover:border-blue-200 group-hover:text-blue-600"
                    }`}>
                    <ChevronDown size={16} strokeWidth={3} />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-48 opacity-100 pb-6" : "max-h-0 opacity-0"
                    }`}
                >
                  <p className="text-slate-500 leading-relaxed text-sm pr-12">
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}