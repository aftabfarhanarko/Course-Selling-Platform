"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import { ChevronDown } from "lucide-react";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ArchitectureProgress = () => {
  return (
    <section className={`py-20 bg-[#f3f4f6] ${plusJakarta.className}`}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE */}
        <div>
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-10">
            The Architecture of{" "}
            <span className="text-green-600">Progress</span>
          </h2>

          {/* BEFORE CARD */}
          <div className="bg-[#e5e7eb] rounded-xl p-6 mb-6 border-l-4 border-red-400">
            <p className="text-xs text-gray-500 font-semibold mb-2">
              BEFORE INCOMEARCHITECT
            </p>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900">
                $1,200/mo
              </span>
              <span className="text-sm text-gray-500">
                Stagnant wage, no growth roadmap.
              </span>
            </div>
          </div>

          {/* ARROW */}
          <div className="flex justify-center my-4">
            <ChevronDown className="text-blue-600 w-6 h-6" />
          </div>

          {/* AFTER CARD */}
          <div className="bg-green-100 rounded-xl p-6 border-l-4 border-green-600">
            <p className="text-xs text-green-700 font-semibold mb-2">
              AFTER 6 MONTHS
            </p>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900">
                $7,850/mo
              </span>
              <span className="text-sm text-green-700">
                ↑ +554% Growth
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex justify-center">
          
          {/* Blurred Image Placeholder */}
          <div className="w-[320px] h-[400px] bg-gray-300 rounded-2xl blur-sm opacity-70"></div>

          {/* Testimonial Card */}
          <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-lg p-5 w-[260px]">
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              “I went from struggling freelancer to running a $10k/mo agency in
              less than a year thanks to the systems here.”
            </p>
            <p className="text-sm font-semibold text-blue-600">
              — Marcus J., UI Architect
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ArchitectureProgress;