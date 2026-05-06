"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How much time do I need?",
    answer:
      "We recommend committing 4-6 hours per week. The curriculum is self-paced, so you can accelerate or slow down as your schedule allows.",
  },
  {
    question: "What skills are required?",
    answer:
      "Basic understanding of design principles and familiarity with design tools like Figma is recommended, but we cover the systematic approach from the ground up.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Yes, we offer a 14-day satisfaction guarantee. If you feel the masterclass isn't the right fit for you within the first two weeks, we'll provide a full refund.",
  },
];

const Fqs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className=" py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] text-center mb-16 tracking-tight">
          Frequently Asked
        </h2>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-lg md:text-xl font-bold text-[#1E293B]">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#1E293B] shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#1E293B] shrink-0" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-height-1000 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
                style={{ maxHeight: openIndex === index ? "500px" : "0" }}
              >
                <div className="px-6 md:px-8 pb-8 text-[#64748B] text-base md:text-lg leading-relaxed border-t border-slate-50 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fqs;
