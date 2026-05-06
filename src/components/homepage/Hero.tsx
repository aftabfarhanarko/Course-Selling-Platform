"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowRightCircle, DollarSign } from "lucide-react";


import Link from "next/link";

function HomeHero() {
  // All data in one place
  const heroData = {
    badge: {
      text: "FINANCIAL EVOLUTION",
      bgColor: "#10B981",
      textColor: "#ffffff",
    },
    heading: {
      main: "Skill to Income",
      highlight: "Transformation",
      highlightColor: "#0052CC",
    },
    description:
      "Real earning promise. Master the high-demand skills that actually pay and bridge the gap between learning and financial freedom.",
    buttons: [
      {
        id: 1,
        text: "Start Learning",
        icon: "arrow",
        bgColor: "#0052CC",
        textColor: "#ffffff",
        href: "/student/courses",
      },
      {
        id: 2,
        text: "Earn as Affiliate",
        bgColor: "#f0f0f0",
        textColor: "#0052CC",
        href: "/affiliate",
      },
    ],
    card: {
      title: "Weekly Payout",
      amount: "+$4,290.00",
      amountColor: "#10B981",
      bgColor: "#f0fdf4",
      iconColor: "#10B981",
    },
  };

  const { badge, heading, description, buttons, card } = heroData;

  return (
    <section
      className="min-h-screen  bg-white flex items-center pt-20 pb-12"
      style={{ fontFamily: "var(--font-manrope)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col space-y-6">
            {/* Badge */}
            <div className="inline-flex w-fit">
              <span
                className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest"
                style={{
                  backgroundColor: badge.bgColor,
                  color: badge.textColor,
                }}
              >
                {badge.text}
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {heading.main}
              </h1>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ color: heading.highlightColor }}
              >
                {heading.highlight}
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 max-w-md leading-relaxed">
              {description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {buttons.map((btn) => (
                <Link key={btn.id} href={btn.href} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto rounded-full font-semibold text-base transition-transform hover:scale-105 active:scale-95"
                    style={{
                      backgroundColor: btn.bgColor,
                      color: btn.textColor,
                      border:
                        btn.bgColor === "#f0f0f0"
                          ? "1px solid #e0e0e0"
                          : "none",
                    }}
                  >
                    {btn.text}
                    {btn.icon === "arrow" && (
                      // <FaArrowTrendUp className="ml-2 h-5 w-5" />
                      <ArrowRightCircle/>
                    )}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Right - Card Section */}
          <div className="flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
            {/* Main Card Container */}
            <div
              className="w-full max-w-sm rounded-[2rem] p-8 shadow-2xl relative overflow-hidden transition-all duration-500 hover:shadow-emerald-100/50"
              style={{ backgroundColor: card.bgColor }}
            >
              <div
                className="absolute inset-0 pointer-events-none bg-center bg-no-repeat opacity-95"
                style={{
                  backgroundImage: "url('/images/overlay-blur.png')",
                  backgroundSize: "145% 145%",
                }}
              ></div>

              {/* Content Wrapper */}
              <div className="space-y-8 relative z-10">
                {/* Title */}
                <h3 className="text-gray-600 text-lg font-medium">
                  {card.title}
                </h3>

                {/* Amount and Floating Icon */}
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-4xl md:text-5xl font-extrabold tracking-tight"
                      style={{ color: card.amountColor }}
                    >
                      {card.amount}
                    </p>
                  </div>

                  {/* High Softness Icon Design */}
                  <div className="relative group">
                    {/* Atmospheric Shadow (The "Floating" effect) */}
                    <div
                      className="absolute inset-0 bg-black/20 rounded-full blur-xl scale-125 opacity-40 translate-y-2 group-hover:opacity-60 transition-opacity"
                    ></div>

                    {/* Actual Icon Circle */}
                    <div
                      className="flex items-center justify-center w-16 h-16 rounded-full relative z-10 shadow-inner"
                      style={{ backgroundColor: card.iconColor }}
                    >
                      <DollarSign className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle Top Left Glow for Balance */}
              <div
                className="absolute -top-10 -left-10 w-32 h-32 rounded-full pointer-events-none blur-[50px] opacity-10 bg-white"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
