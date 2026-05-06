"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, DollarSign, TrendingUp, ShieldCheck } from "lucide-react";

interface StatItem {
  id: number;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
  color: string;
}

const CountDownTrust = () => {
  const stats: StatItem[] = [
    {
      id: 1,
      label: "Total Students",
      value: 50000,
      suffix: "+",
      icon: <Users className="w-6 h-6" />,
      color: "#0052CC",
    },
    {
      id: 2,
      label: "Total Earnings",
      value: 12.4,
      prefix: "$",
      suffix: "M+",
      icon: <DollarSign className="w-6 h-6" />,
      color: "#10B981",
    },
    {
      id: 3,
      label: "Success Rate",
      value: 94.2,
      suffix: "%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "#F59E0B",
    },
  ];

  const [counts, setCounts] = useState({
    1: 0,
    2: 0,
    3: 0,
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Start counting immediately when page loads/reloads
    if (!hasAnimated) {
      stats.forEach((stat) => {
        let start = 0;
        const end = stat.value;
        const duration = 2000; // 2 seconds
        const increment = end / (duration / 16);
        const stepTime = 16; // ~60fps

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCounts((prev) => ({ ...prev, [stat.id]: end }));
            clearInterval(timer);
          } else {
            setCounts((prev) => ({ ...prev, [stat.id]: start }));
          }
        }, stepTime);

        return () => clearInterval(timer);
      });
      setHasAnimated(true);
    }
  }, [hasAnimated, stats]);

  const formatValue = (statId: number, stat: StatItem) => {
    let val = counts[statId as keyof typeof counts];
    if (stat.id === 2) {
      // For earnings (12.4M)
      return `${stat.prefix || ""}${val.toFixed(1)}${stat.suffix || ""}`;
    }
    return `${stat.prefix || ""}${Math.floor(val)}${stat.suffix || ""}`;
  };

  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50"
      style={{ fontFamily: "var(--font-manrope)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-gray-100 hover:border-gray-200">
                {/* Icon Circle */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110 duration-300"
                  style={{ backgroundColor: `${stat.color}10` }}
                >
                  <div style={{ color: stat.color }}>{stat.icon}</div>
                </div>

                {/* Animated Number */}
                <div
                  className="text-4xl md:text-5xl font-extrabold mb-2"
                  style={{ color: stat.color }}
                >
                  {formatValue(stat.id, stat)}
                </div>

                {/* Label */}
                <div className="text-gray-600 font-medium text-lg">
                  {stat.label}
                </div>

                {/* Decorative line */}
                <div
                  className="w-full h-1 rounded-full mx-auto mt-4 opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: stat.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge + Testimonial Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
        

          {/* Quote */}
          <div className="relative">
           
           <div className="  md:flex  items-center justify-between mb-6">
             <span className="bg-[#0038C6] text-white py-2 px-1 rounded-full">+50K</span>
            <p className="md:text-2xl text-gray-700  leading-relaxed ">
              Join <span className=" ">50k+ successful students</span>{" "}
              transforming their future today.
            </p>
           </div>
          </div>

         
        </motion.div>
      </div>
    </section>
  );
};

export default CountDownTrust;