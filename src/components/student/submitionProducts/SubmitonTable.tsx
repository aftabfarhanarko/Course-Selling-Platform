'use client'

import React, { useState } from 'react'
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react'

// Type Definition
type StatusType = 'Approved' | 'Pending' | 'Rejected'

interface Submission {
  id: number
  productName: string
  associatedCourse: string
  submissionDate: string
  status: StatusType
}

export const ProductSubmissionsTable = () => {
  // Static Mock Data
  const mockSubmissions: Submission[] = [
    {
      id: 1,
      productName: 'Ultimate UI Toolkit v2',
      associatedCourse: 'Advanced Figma Masterclass',
      submissionDate: 'Oct 12, 2023',
      status: 'Approved'
    },
    {
      id: 2,
      productName: 'Startup Pitch Deck Template',
      associatedCourse: 'Business Funding 101',
      submissionDate: 'Oct 22, 2023',
      status: 'Pending'
    },
    {
      id: 3,
      productName: 'Python Script Bundle',
      associatedCourse: 'Automation Academy',
      submissionDate: 'Oct 18, 2023',
      status: 'Rejected'
    },
    {
      id: 4,
      productName: 'Marketing Strategy Doc',
      associatedCourse: 'Digital Growth Strategies',
      submissionDate: 'Oct 5, 2023',
      status: 'Approved'
    },
    {
      id: 5,
      productName: 'SEO Backlink Pack',
      associatedCourse: 'SEO Mastery',
      submissionDate: 'Oct 28, 2023',
      status: 'Pending'
    }
  ]

  // State Management
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 4

  // Filtering Logic
  const filteredData = 
    activeFilter === 'All'
      ? mockSubmissions
      : mockSubmissions.filter((item) => item.status === activeFilter)

  // Pagination Logic
  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentTableData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    setCurrentPage(1)
  }

  // Status Badge Styles
  const getStatusStyle = (status: StatusType) => {
    switch (status) {
      case 'Approved':
        return 'bg-[#DCFCE7] text-[#16A34A]'
      case 'Pending':
        return 'bg-[#FEF9C3] text-[#CA8A04]'
      case 'Rejected':
        return 'bg-[#FEE2E2] text-[#DC2626]'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const categories = ['All', 'Approved', 'Pending', 'Rejected']

  return (
    <div className="w-full bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
      
      {/* Header: Title and Filters */}
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
          Product Submissions
        </h2>

        {/* Responsive Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === category
                  ? 'bg-[#1447E6] text-white shadow-sm'
                  : 'bg-[#F3F4F6] text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop/Tablet Table View (Hidden in small mobile) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="pb-3 text-sm font-semibold text-[#6B7280]">Product Name</th>
              <th className="pb-3 text-sm font-semibold text-[#6B7280]">Associated Course</th>
              <th className="pb-3 text-sm font-semibold text-[#6B7280]">Submission Date</th>
              <th className="pb-3 text-sm font-semibold text-[#6B7280]">Status</th>
              <th className="pb-3 text-sm font-semibold text-[#6B7280] text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.length > 0 ? (
              currentTableData.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4 text-[15px] font-medium text-[#111827]">
                    {item.productName}
                  </td>
                  <td className="py-4 text-[15px] text-[#6B7280]">
                    {item.associatedCourse}
                  </td>
                  <td className="py-4 text-[15px] text-[#6B7280]">
                    {item.submissionDate}
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="p-2 rounded-lg hover:bg-gray-100 text-[#6B7280] hover:text-[#1447E6] transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-500">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (Visible only in small mobile) */}
      <div className="md:hidden space-y-4">
        {currentTableData.length > 0 ? (
          currentTableData.map((item) => (
            <div key={item.id} className="bg-[#F9FAFB] rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-[15px] font-semibold text-[#111827] pr-4">{item.productName}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${getStatusStyle(item.status)}`}>
                  {item.status}
                </span>
              </div>
              
              <div className="text-sm text-[#6B7280] space-y-1">
                <p><span className="font-medium text-[#374151]">Course:</span> {item.associatedCourse}</p>
                <p><span className="font-medium text-[#374151]">Date:</span> {item.submissionDate}</p>
              </div>

              <div className="pt-2 border-t border-gray-200 flex justify-end">
                <button className="p-2 rounded-lg hover:bg-gray-200 text-[#6B7280] hover:text-[#1447E6] transition-colors">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-gray-500">
            No submissions found.
          </div>
        )}
      </div>

      {/* Responsive Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t border-gray-100 gap-4">
        
        {/* Data Count Text */}
        <p className="text-xs sm:text-sm text-[#6B7280] order-2 sm:order-1">
          Showing{' '}
          <span className="font-medium text-[#111827]">
            {totalItems === 0 ? 0 : startIndex + 1}
          </span>
          {' - '}
          <span className="font-medium text-[#111827]">
            {Math.min(startIndex + itemsPerPage, totalItems)}
          </span>
          {' of '}
          <span className="font-medium text-[#111827]">{totalItems}</span>
          {' records'}
        </p>

        {/* Pagination Buttons */}
        <div className="flex items-center gap-2 order-1 sm:order-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-[#6B7280] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {/* Page Numbers - Hidden on mobile to save space */}
          <div className="hidden sm:flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-[#1447E6] text-white border-[#1447E6]'
                    : 'border-gray-200 text-[#6B7280] hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Mobile Page Indicator */}
          <span className="sm:hidden text-sm font-medium text-[#111827]">
            {currentPage} / {totalPages || 1}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-[#6B7280] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}