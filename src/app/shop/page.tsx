"use client";

import { useState } from "react";
import {
  Check,
  GraduationCap,
  LayoutDashboard,
  Users,
  ReceiptText,
} from "lucide-react";
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
    <div className="min-h-screen bg-[#f5f5f9] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="w-full max-w-6xl mx-auto">
        {/* Success Icon */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
            <Check className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12 px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Welcome to the Academy, {selectedEnrollment.userName}!
          </h1>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Your enrollment in
            <span className="text-blue-600 font-medium ml-1">
              “{selectedEnrollment.courseTitle}”
            </span>
            is complete.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            {/* Access Details */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4 sm:mb-5">
                Access Details
              </p>

              <div className="bg-[#f7f8fc] rounded-2xl p-4 sm:p-6 border border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                  </div>

                  <div className="w-full">
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      You can now access your course in the “My Courses”
                      section. A confirmation email has been sent to your inbox.
                    </p>

                    {/* Buttons responsive */}
                    <div className=" flex-col sm:flex-row gap-3 mt-5 w-full">
                      <Link
                        href={`/shop/shopCard?id=${selectedEnrollment.id}&price=${selectedEnrollment.price}&title=${encodeURIComponent(selectedEnrollment.courseTitle)}`}
                        className="w-full sm:w-auto"
                      >
                        <button className="w-full sm:w-auto px-6  py-3 rounded-full bg-blue-600 text-white font-medium shadow-md hover:scale-[1.02] transition">
                          Start Learning Now
                        </button>
                      </Link>

                      <Link
                        href="/student/dashboard"
                        className="w-full sm:w-auto  md:mt-0"
                      >
                        <button className="w-full mt-4 sm:w-auto px-6 md:mt-2 py-3 rounded-full bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition flex items-center justify-center gap-2">
                          <LayoutDashboard className="w-4 h-4" />
                          Go to Dashboard
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Section */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Join the Collective
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 mt-1">
                    Connect with elite architects and start earning.
                  </p>
                </div>
                <Users className="text-gray-300 w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              <div className="bg-[#f8f9fd] border border-gray-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Join 15,000+ other students in our private Telegram group.
                </p>

                <Link
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="w-full cursor-pointer sm:w-auto bg-sky-500 text-white px-5 py-2.5 rounded-xl font-medium hover:opacity-90 transition">
                    Join Telegram
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-[#f8f8fc] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-100 h-fit order-1 lg:order-2">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-5 sm:mb-6">
              Order Summary
            </h3>

            <div className="space-y-4 sm:space-y-5 border-t pt-5">
              <Row label="Order ID" value={selectedEnrollment.orderId} />
              <Row label="Date" value={selectedEnrollment.date} />

              <div className="flex justify-between items-center gap-4">
                <span className="text-gray-500 text-sm sm:text-base">
                  Status
                </span>
                <span className="text-green-600 bg-green-100 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {selectedEnrollment.status}
                </span>
              </div>
            </div>

            <div className="border-t mt-6 sm:mt-8 pt-5 sm:pt-6">
              <p className="text-xs tracking-widest text-gray-400 font-semibold mb-2">
                TOTAL PAID
              </p>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 break-words">
                  {selectedEnrollment.price}
                </h2>
                <ReceiptText className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 shrink-0" />
              </div>
            </div>

            <p className="text-[10px] sm:text-xs text-center tracking-widest text-gray-400 mt-10 sm:mt-16 uppercase leading-relaxed">
              Transaction secured by IncomeArchitect Vault
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center gap-4">
      <span className="text-gray-500 text-sm sm:text-base">{label}</span>
      <span className="font-semibold text-slate-800 text-sm sm:text-base text-right">
        {value}
      </span>
    </div>
  );
}
