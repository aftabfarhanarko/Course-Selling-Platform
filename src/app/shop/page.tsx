"use client";

import { useState } from "react";
import Link from "next/link";

const enrollments = [
  {
    id: 1,
    orderId: "#IA-98234",
    userName: "Alex",
    courseTitle: "SaaS Interface Architect Masterclass",
    price: "$499.00",
    date: "Oct 24, 2024",
    status: "Paid",
  },
];

export default function ShopPage() {
  const [selectedEnrollment] = useState(enrollments[0]);

  return (
    <div className="min-h-screen bg-[#f0f2f8] flex items-start justify-center px-4 py-10 font-sans">
      <div className="mt-15 max-w-7xl mx-auto">

        {/* Check Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-[52px] h-[52px] rounded-full bg-green-500 flex items-center justify-center shadow-[0_4px_20px_rgba(34,197,94,0.28)]">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-[2rem] font-semibold text-[#0f1629] leading-tight tracking-tight">
            Welcome to the Academy, {selectedEnrollment.userName}!
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#7a839a] font-normal leading-relaxed">
            Your enrollment in{" "}
            <span className="text-blue-600 font-medium">
              &quot;{selectedEnrollment.courseTitle}&quot;
            </span>{" "}
            is complete.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">

          {/* Left Column */}
          <div className="flex flex-col gap-4 order-2 lg:order-1">

            {/* Access Details Card */}
            <div className="bg-white rounded-[18px] p-5 border border-black/[0.07]">
              <p className="text-[0.65rem] font-semibold tracking-[0.12em] text-[#aab0c0] uppercase mb-3.5">
                Access Details
              </p>
              <div className="bg-[#f7f8fc] rounded-[14px] p-4 border border-black/[0.05] flex gap-3.5 items-start">
                <div className="w-10 h-10 rounded-[10px] bg-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <div>
                  <p className="text-[0.82rem] text-[#56627a] leading-relaxed">
                    You can now access your course in the &quot;My Courses&quot; section. A confirmation email has been sent to your inbox.
                  </p>
                  <div className="flex flex-wrap gap-2.5 mt-3.5">
                    <Link
                      href={`/shop/shopCard?id=${selectedEnrollment.id}&price=${selectedEnrollment.price}&title=${encodeURIComponent(selectedEnrollment.courseTitle)}`}
                      className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600 text-white text-[0.8rem] font-medium hover:scale-[1.02] hover:shadow-[0_4px_14px_rgba(37,99,235,0.3)] transition-all duration-150 no-underline"
                    >
                      Start Learning Now
                    </Link>
                    <Link
                      href="/student"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-[0.8rem] font-medium hover:bg-blue-100 transition-colors duration-150 no-underline"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="7" height="7" rx="1" />
                      </svg>
                      Go to Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Card */}
            <div className="bg-white rounded-[18px] p-5 border border-black/[0.07]">
              <div className="flex justify-between items-start mb-3.5">
                <div>
                  <h3 className="text-[1.05rem] font-semibold text-[#0f1629]">Join the Collective</h3>
                  <p className="text-[0.78rem] text-[#7a839a] mt-0.5">Connect with elite architects and start earning.</p>
                </div>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d1d5e0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="bg-[#f8f9fd] rounded-[13px] border border-black/[0.06] p-3.5 flex flex-wrap justify-between items-center gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Avatar Stack */}
                  <div className="flex">
                    <div className="w-[26px] h-[26px] rounded-full border-2 border-white bg-[#c7d7f5] flex items-center justify-center text-[0.6rem] font-semibold text-blue-600 -mr-1.5 z-30">AJ</div>
                    <div className="w-[26px] h-[26px] rounded-full border-2 border-white bg-pink-100 flex items-center justify-center text-[0.6rem] font-semibold text-pink-700 -mr-1.5 z-20">MK</div>
                    <div className="w-[26px] h-[26px] rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-[0.6rem] font-semibold text-emerald-800 z-10">RS</div>
                  </div>
                  <p className="text-[0.78rem] text-[#56627a]">Join 15,000+ students in our private Telegram group.</p>
                </div>
                <Link
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] bg-sky-500 text-white text-[0.77rem] font-medium hover:opacity-90 transition-opacity duration-150 whitespace-nowrap no-underline"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
                  </svg>
                  Join Telegram
                </Link>
              </div>
            </div>

          </div>

          {/* Right Column — Order Summary */}
          <div className="order-1 lg:order-2">
            <div className="bg-[#f8f8fc] rounded-[18px] p-5 border border-black/[0.07] h-fit">
              <h3 className="text-[0.95rem] font-semibold text-[#0f1629] mb-4">Order Summary</h3>

              <div className="border-t border-black/[0.07] pt-4 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-[0.78rem] text-[#7a839a]">Order ID</span>
                  <span className="text-[0.8rem] font-medium text-blue-600">{selectedEnrollment.orderId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[0.78rem] text-[#7a839a]">Date</span>
                  <span className="text-[0.8rem] font-medium text-[#0f1629]">{selectedEnrollment.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[0.78rem] text-[#7a839a]">Status</span>
                  <span className="text-[0.7rem] font-medium text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full">
                    {selectedEnrollment.status}
                  </span>
                </div>
              </div>

              <div className="border-t border-black/[0.07] mt-5 pt-4">
                <p className="text-[0.63rem] tracking-[0.12em] uppercase text-[#aab0c0] font-semibold mb-1">
                  Total Paid
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl sm:text-3xl font-semibold text-[#0f1629]">
                    {selectedEnrollment.price}
                  </span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#aab0c0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
              </div>

              {/* Preview placeholder */}
              <div className="mt-4 rounded-[10px] overflow-hidden border border-black/[0.08] h-[72px] flex items-center justify-center bg-gradient-to-br from-[#c7d7f5] to-[#e0e7ff]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6b7baa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>

              <p className="text-[0.6rem] tracking-[0.1em] uppercase text-[#aab0c0] text-center mt-10 leading-relaxed">
                Transaction secured by<br />IncomeArchitect Vault
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
