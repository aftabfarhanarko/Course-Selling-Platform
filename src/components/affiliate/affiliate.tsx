"use client";

import {
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  CheckCircle2,
  Copy,
  DollarSign,
  Gift,
  Globe,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";

const AffiliatePageComponents = ()=> {
  const features = [
    {
      icon: BadgeDollarSign,
      title: "High Commission",
      description:
        "Earn up to 35% recurring commissions from every successful enrollment.",
    },

    {
      icon: BarChart3,
      title: "Real-Time Tracking",
      description:
        "Monitor clicks, conversions, and earnings with precision analytics.",
    },

    {
      icon: Wallet,
      title: "Weekly Withdrawals",
      description:
        "Fast weekly payouts directly to your preferred payment method.",
    },
  ];

  const steps = [
    "Join Program",
    "Get Referral Link",
    "Share With Audience",
    "Earn Commission",
    "Withdraw Earnings",
  ];

  const plans = [
    {
      name: "Starter Affiliate",
      commission: "10%",
      income: "Up to $500/mo",
    },

    {
      name: "Pro Partner",
      commission: "25%",
      income: "Up to $5k/mo",
    },

    {
      name: "Elite Architect",
      commission: "35%",
      income: "Unlimited Potential",
    },
  ];

  const earnings = [
    {
      name: "Sadek H.",
      amount: "+$120.00",
    },

    {
      name: "Emma R.",
      amount: "+$340.00",
    },

    {
      name: "Alex",
      amount: "+$980.00",
    },

    {
      name: "Daniel K.",
      amount: "+$640.00",
    },
  ];

  const faq = [
    {
      q: "How do payouts work?",
      a: "Withdraw your earnings every week through supported payment methods.",
    },

    {
      q: "How long do cookies last?",
      a: "Referral tracking cookies stay active for 30 days.",
    },

    {
      q: "Is approval required?",
      a: "No. Anyone can join and start earning instantly.",
    },

    {
      q: "What payment methods are supported?",
      a: "Bank transfer, PayPal, Wise, Stripe, and crypto payouts.",
    },
  ];

  return (
    <main className="min-h-screen w-screen bg-[#F7F7FB] text-[#111827]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#E5E7EB]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-24 lg:grid-cols-2 lg:items-center">
          {/* LEFT */}
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm">
              <Gift className="h-4 w-4 text-[#0B57F0]" />
              AFFILIATE SYSTEM
            </p>

            <h1 className="max-w-[650px] text-5xl font-black leading-[1.05] tracking-[-2px] md:text-7xl">
              Build Income
              <span className="text-[#0B57F0]">
                {" "}
                Beyond Skills
              </span>
            </h1>

            <p className="mt-7 max-w-[620px] text-lg leading-8 text-[#6B7280]">
              Share IncomeArchitect with ambitious creators and
              earn recurring commissions from every successful
              referral.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="flex h-14 items-center gap-2 rounded-full bg-[#0B57F0] px-8 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(11,87,240,0.25)] transition hover:scale-[1.02]">
                Become an Affiliate
                <ArrowRight className="h-4 w-4" />
              </button>

              <button className="flex h-14 items-center rounded-full border border-[#D1D5DB] bg-white px-8 text-sm font-semibold">
                View Earnings
              </button>
            </div>

            {/* Stats */}
            <div className="mt-14 flex flex-wrap gap-10">
              <div>
                <h3 className="text-4xl font-black tracking-[-2px]">
                  $12.4M+
                </h3>

                <p className="mt-2 text-sm text-[#6B7280]">
                  Affiliate Payouts
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black tracking-[-2px]">
                  50K+
                </h3>

                <p className="mt-2 text-sm text-[#6B7280]">
                  Active Affiliates
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black tracking-[-2px]">
                  35%
                </h3>

                <p className="mt-2 text-sm text-[#6B7280]">
                  Max Commission
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="rounded-[32px] bg-white p-8 shadow-[0_25px_70px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">
                  Affiliate Earnings
                </h3>

                <div className="rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-semibold text-[#0B57F0]">
                  LIVE
                </div>
              </div>

              <div className="mt-10">
                <p className="text-sm text-[#6B7280]">
                  This Month
                </p>

                <h2 className="mt-2 text-6xl font-black tracking-[-3px] text-[#0B57F0]">
                  +$12,840
                </h2>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-5">
                <div className="rounded-3xl bg-[#F7F7FB] p-5">
                  <p className="text-sm text-[#6B7280]">
                    Conversion Rate
                  </p>

                  <h4 className="mt-3 text-3xl font-bold">
                    18.4%
                  </h4>
                </div>

                <div className="rounded-3xl bg-[#F7F7FB] p-5">
                  <p className="text-sm text-[#6B7280]">
                    Referrals
                  </p>

                  <h4 className="mt-3 text-3xl font-bold">
                    1,284
                  </h4>
                </div>
              </div>

              {/* Referral Link */}
              <div className="mt-8 rounded-3xl border border-[#E5E7EB] bg-[#FAFAFA] p-5">
                <p className="text-sm font-semibold text-[#6B7280]">
                  Your Referral Link
                </p>

                <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-white p-4">
                  <span className="truncate text-sm font-medium">
                    incomearchitect.com/ref/sadek
                  </span>

                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B57F0] text-white">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-[#0B57F0]">
            WHY JOIN
          </p>

          <h2 className="mt-4 text-5xl font-black tracking-[-2px]">
            Precision Affiliate Infrastructure
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-[32px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF2FF]">
                  <Icon className="h-8 w-8 text-[#0B57F0]" />
                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 leading-8 text-[#6B7280]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-[#0B57F0]">
              WORKFLOW
            </p>

            <h2 className="mt-4 text-5xl font-black tracking-[-2px]">
              The Affiliate Process
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {steps.map((step, index) => (
              <div
                key={index}
                className="rounded-[28px] border border-[#E5E7EB] bg-[#F9FAFB] p-7 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0B57F0] text-xl font-bold text-white">
                  {index + 1}
                </div>

                <h3 className="mt-6 text-lg font-bold">
                  {step}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-[#0B57F0]">
            COMMISSION TIERS
          </p>

          <h2 className="mt-4 text-5xl font-black tracking-[-2px]">
            Scale Your Earnings
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="rounded-[32px] bg-white p-10 shadow-[0_25px_70px_rgba(0,0,0,0.05)]"
            >
              <h3 className="text-2xl font-bold">
                {plan.name}
              </h3>

              <h2 className="mt-6 text-7xl font-black tracking-[-4px] text-[#0B57F0]">
                {plan.commission}
              </h2>

              <p className="mt-5 text-lg text-[#6B7280]">
                {plan.income}
              </p>

              <button className="mt-10 flex h-14 w-full items-center justify-center rounded-full bg-[#0B57F0] text-sm font-semibold text-white">
                Start Earning
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE FEED */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-[#0B57F0]">
              LIVE INSIGHT
            </p>

            <h2 className="mt-4 text-5xl font-black tracking-[-2px]">
              Real-Time Affiliate Earnings
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {earnings.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-[28px] bg-[#F7F7FB] p-7"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0B57F0] text-white">
                    <Users className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold">{item.name}</h3>

                    <p className="text-sm text-[#6B7280]">
                      Affiliate Commission
                    </p>
                  </div>
                </div>

                <h4 className="text-2xl font-black text-[#16A34A]">
                  {item.amount}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="rounded-[40px] bg-[#0B57F0] p-14 text-center text-white shadow-[0_25px_80px_rgba(11,87,240,0.25)]">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <h2 className="mx-auto mt-10 max-w-4xl text-4xl font-black leading-[1.2] tracking-[-2px]">
            “I made my first $2,000 online through the
            IncomeArchitect affiliate system.”
          </h2>

          <p className="mt-8 text-lg text-white/80">
            — Daniel K.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-16 text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-[#0B57F0]">
              FAQ
            </p>

            <h2 className="mt-4 text-5xl font-black tracking-[-2px]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faq.map((item, index) => (
              <div
                key={index}
                className="rounded-[28px] border border-[#E5E7EB] p-8"
              >
                <h3 className="text-xl font-bold">
                  {item.q}
                </h3>

                <p className="mt-4 leading-8 text-[#6B7280]">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl rounded-[40px] bg-[#111827] px-10 py-20 text-center text-white">
          <p className="text-sm font-semibold tracking-[0.2em] text-[#60A5FA]">
            START TODAY
          </p>

          <h2 className="mx-auto mt-6 max-w-4xl text-5xl font-black leading-[1.1] tracking-[-2px]">
            Turn Your Audience Into Monthly Income
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/70">
            Join thousands of affiliates building recurring
            revenue streams with IncomeArchitect.
          </p>

          <button className="mt-10 inline-flex h-14 items-center gap-2 rounded-full bg-[#0B57F0] px-10 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(11,87,240,0.35)] transition hover:scale-[1.02]">
            Become an Affiliate Today
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default AffiliatePageComponents;