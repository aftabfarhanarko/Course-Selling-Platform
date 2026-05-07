"use client";

import {
  ShieldCheck,
  Lock,
  Headphones,
} from "lucide-react";

const WealthStackAdvantage = () => {
  const features = [
    {
      id: 1,
      title: "Vetted Quality",
      description:
        "Battle-tested tools used by the top 1% of digital earners.",
      icon: ShieldCheck,
    },
    {
      id: 2,
      title: "Instant Delivery",
      description:
        "Receive your licenses and downloads immediately after purchase.",
      icon: Lock,
    },
    {
      id: 3,
      title: "Lifetime Support",
      description:
        "Our concierge team is here to help you integrate every tool.",
      icon: Headphones,
    },
  ];

  return (
    <section className="bg-[#F5F5FA] px-4 py-20">
      <div className="mx-auto max-w-6xl rounded-[36px] bg-[#F7F7FB] px-6 py-16 md:px-12">
        {/* Heading */}
        <div className="mx-auto max-w-[620px] text-center">
          <h1 className="text-[32px] font-bold tracking-[-1px] text-[#111827] md:text-[42px]">
            The Wealth Stack Advantage
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#6B7280] md:text-base">
            Every product in our shop is selected based on its ability to
            contribute directly to your bottom line.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto mt-20 max-w-5xl">
          {/* Horizontal Line */}
          <div className="absolute top-7 left-0 hidden h-[1px] w-full bg-[#E5E7EB] md:block" />

          {/* Items */}
          <div className="relative grid gap-14 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.id}
                  className="flex flex-col items-center text-center"
                >
                  {/* Icon */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#DCFCE7] shadow-[0px_0px_35px_rgba(34,197,94,0.20)]">
                    <Icon
                      className="h-5 w-5 text-[#16A34A]"
                      strokeWidth={2.4}
                    />
                  </div>

                  {/* Content */}
                  <h2 className="mt-5 text-[15px] font-semibold text-[#111827]">
                    {feature.title}
                  </h2>

                  <p className="mt-2 max-w-[230px] text-[13px] leading-6 text-[#6B7280]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WealthStackAdvantage;