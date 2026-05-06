"use client";

import { motion } from "framer-motion";
import { GraduationCap, SquarePen, Receipt, Sparkles } from "lucide-react";

const PrecisionWorkflow = () => {
  const workflowSteps = [
    {
      id: 1,
      title: "Learn",
      icon: <GraduationCap className="w-10 h-10" />,
      iconBg: "#0052CC",
      description:
        "Master high-income skills through curated, professional architected curriculum.",
    },
    {
      id: 2,
      title: "Create",
      icon: <SquarePen className="w-10 h-10" />,
      iconBg: "#006E2A",
      description:
        "Build your portfolio and real-world assets while you learn from industry titans.",
    },
    {
      id: 3,
      title: "Earn",
      icon: <Receipt className="w-10 h-10" />,
      iconBg: "#705D00",
      description:
        "Deploy your skills into the market and watch your income architecture flourish.",
    },
  ];

  return (
    <section
      className="py-20 md:py-28 bg-white"
      style={{ fontFamily: "var(--font-manrope)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-4 mx-auto">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              PRECISION WORKFLOW
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            <span className="text-[#0052CC]">Precision</span> Workflow
          </h2>
          <div className="w-16 h-1 bg-[#0052CC] mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Steps - All Centered */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              {/* Icon Container with Background, Shadow, and Padding Effect */}
              <div className="relative inline-block mx-auto">
                {/* Shadow/Background layer behind icon */}
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-40 transition-opacity group-hover:opacity-60"
                  style={{ backgroundColor: step.iconBg }}
                />
                
                {/* Main Icon with Background and Padding */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 relative"
                  style={{ 
                    backgroundColor: step.iconBg,
                    boxShadow: `0 4px 0 0 ${step.iconBg}60, 0 2px 8px 0 rgba(0,0,0,0.1)`
                  }}
                >
                  <div className="text-white">{step.icon}</div>
                </div>
              </div>

              {/* Title - Centered */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                {step.title}
              </h3>

              {/* Description - Centered */}
              <p className="text-gray-600 leading-relaxed text-center max-w-sm mx-auto">
                {step.description}
              </p>

              {/* Hover Arrow - Centered */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-center">
                <span
                  className="text-sm cursor-pointer font-semibold inline-flex items-center gap-1"
                  style={{ color: step.iconBg }}
                >
                  Get started →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrecisionWorkflow;