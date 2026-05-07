"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const HeroArchitect = () => {
  return (
    <section
      className="py-20 md:py-28 bg-white overflow-hidden"
      style={{ fontFamily: "var(--font-manrope)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex Container */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Side - Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Architect Your  <br />
                <span className="text-[#0052CC]"> Prosperity.</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-600 text-lg leading-relaxed max-w-xl lg:mx-0 mx-auto"
            >
              Curated digital assets designed for the high-performance income generator. 
              Secure your stack, manage your clients, and scale your operations.
            </motion.p>
          </div>

          {/* Right Side - Rotated Card with repositioning */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 flex justify-center lg:justify-end relative"
          >
            {/* Soft Glow Background */}
            <div
              className="absolute inset-0 rounded-3xl blur-3xl opacity-40"
              style={{
                background: "radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(16,185,129,0) 70%)",
                transform: "scale(1.2)",
              }}
            />

            {/* CARD: rotated, moved right & down, extra left/top/bottom adjustment */}
            <div
              className="relative bg-gradient-to-br from-white to-green-50 rounded-3xl p-8 shadow-2xl border border-green-100 w-full max-w-sm"
              style={{
                transform: "rotate(2deg) translate(12px, 16px)", // right + down
                // extra left/top/bottom pushes:
                marginLeft: "8px",
                marginTop: "-4px",
                marginBottom: "8px",
                boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.8), 0 20px 40px -10px rgba(16,185,129,0.2)",
              }}
            >
              <div className="relative z-10">
                {/* Platform Average Label */}
              <div className="flex ">
                  <div className="flex items-center justify-center gap-2 mb-4">
                 <button className="bg-[#DBFBE5]  p-4 rounded-full">
                     <TrendingUp className="w-5 h-5 text-[#006E2A] " />
                 </button>
                 
                </div>

                {/* Earnings Value */}
                <div className=" flex flex-col text-center">
                     <span className="text-sm font-semibold text-green-700 tracking-wider uppercase">
                    PLATFORM AVERAGE
                  </span>
                  <span className="text-2xl md:text-3xl font-semibold text-green-600 ml-1">
                     +124% Earnings
                  </span>
                </div>
              </div>

                {/* Small Progress Indicator - 3 equal parts, all fully filled (green), rest gray */}
                <div className="mt-6 pt-4 border-t border-green-100">
                  <div className="flex items-center justify-between text-xs text-green-600 mb-2">
                    <span>Growth Rate</span>
                    <span>↑ 124%</span>
                  </div>

                  {/* 3-part segmented progress bar */}
                  <div className="flex  w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    {/* Segment 1 - full green */}
                    <div className="h-full bg-green-700 flex-1"></div>
                    {/* Segment 2 - full green */}
                    <div className="h-full bg-green-700 flex-1"></div>
                    {/* Segment 3 - full green */}
                    <div className="h-full rounded-r-full bg-gray-400 flex-1"></div>
                  </div>
                  {/* Note: The background track is gray (bg-gray-200), and 3 segments are all fully filled green = 100% progress */}
                </div>

                {/* Extra note for clarity */}
                <div className="text-center text-[10px] text-green-500 mt-3 opacity-70">
                  3/3 milestones achieved
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroArchitect;