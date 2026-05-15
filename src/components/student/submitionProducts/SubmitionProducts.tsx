'use client'

import React from 'react'
import {
  PlusCircle,
  FileText,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

export const DashboardSubmissionStatus = () => {

  // static data - later will come from backend
  const submissionStats = {
    title: 'Track Your Progress',
    description:
      'Review the feedback on your product submissions and scale your earnings through quality contributions.',

    totalSubmissions: 24,
    approvedRatio: 92
  }

  return (
    <div className="w-full">

      {/* heading */}
      <h2 className="text-[28px] font-bold text-[#1447E6] mb-5">
        Submission Status
      </h2>

      {/* layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5">

        {/* left card */}
        <div className="bg-[#1447E6] rounded-2xl p-8 flex flex-col justify-between min-h-[250px]">

          <div>
            <h3 className="text-[38px] leading-[48px] font-bold text-white">
              {submissionStats.title}
            </h3>

            <p className="text-[#C7D2FE] text-[17px] leading-8 mt-4 max-w-[520px]">
              {submissionStats.description}
            </p>
          </div>

          {/* button */}
          <div className="mt-8">
          <Link href='/student/submitProduct/createProduct' >
            <button className="bg-[#67F26B] cursor-pointer hover:bg-[#57e85c] transition-all text-[#065F46] font-semibold px-6 py-3 rounded-full flex items-center gap-2 text-sm">
              <PlusCircle className="w-4 h-4" />
              New Submission
            </button>
          </Link>
          </div>
        </div>

        {/* right side */}
        <div className="flex flex-col gap-5">

          {/* submissions */}
          <div className="bg-[#F5F7FF] rounded-2xl p-6 flex items-start justify-between min-h-[115px]">

            <div>
              <p className="text-[12px] uppercase tracking-[2px] text-[#9CA3AF] font-semibold">
                Total Submissions
              </p>

              <h3 className="text-[42px] font-bold text-[#111827] leading-none mt-3">
                {submissionStats.totalSubmissions}
              </h3>
            </div>

            {/* icon */}
            <div className="w-14 h-14 rounded-full bg-[#E0E7FF] flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#1447E6]" />
            </div>
          </div>

          {/* approved ratio */}
          <div className="bg-[#F5F7FF] rounded-2xl p-6 flex items-start justify-between min-h-[115px]">

            <div>
              <p className="text-[12px] uppercase tracking-[2px] text-[#9CA3AF] font-semibold">
                Approved Ratio
              </p>

              <h3 className="text-[42px] font-bold text-[#16A34A] leading-none mt-3">
                {submissionStats.approvedRatio}%
              </h3>
            </div>

            {/* icon */}
            <div className="w-14 h-14 rounded-full bg-[#DCFCE7] flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#16A34A]" />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}