"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  Landmark,
  Clock,
  TrendingUp,
} from "lucide-react";

type Status = "Pending" | "Approved" | "Rejected";

interface Request {
  id: number;
  name: string;
  email: string;
  initials: string;
  amount: string;
  method: string;
  date: string;
  time: string;
  status: Status;
}

const initialRequests: Request[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: "Jordan Smith",
  email: "jordan@example.com",
  initials: "JS",
  amount: "$2,400.00",
  method: "Bank Transfer",
  date: "Oct 24, 2023",
  time: "14:22 PM",
  status: "Pending",
}));

export default function Withdrawpage() {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState<{ msg: string; type: "approve" | "reject" } | null>(null);

  const showToast = (msg: string, type: "approve" | "reject") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAction = (id: number, action: "Approved" | "Rejected") => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r))
    );
    showToast(
      action === "Approved"
        ? "Request approved successfully."
        : "Request has been rejected.",
      action === "Approved" ? "approve" : "reject"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 font-sans relative">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 text-white text-sm px-4 py-3 rounded-xl shadow-xl ${
            toast.type === "approve" ? "bg-green-600" : "bg-red-500"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">
            Transaction Queue
          </p>
          <h1 className="text-3xl font-black text-gray-900 leading-tight">
            Review Withdrawal Requests
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-sm leading-relaxed">
            Manage pending payouts and maintain the platform's financial
            integrity with precision.
          </p>
        </div>

        {/* Pending Total */}
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm self-start">
          <div className="w-10 h-10 bg-green-50 border border-green-200 rounded-xl flex items-center justify-center">
            <TrendingUp size={18} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Pending Total
            </p>
            <p className="text-xl font-black text-gray-900">$12,450.00</p>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["User", "Amount", "Method", "Request Date", "Status", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-bold text-gray-400 uppercase tracking-widest px-5 py-4"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {requests.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50/60 transition-colors">
                  {/* User */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {r.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{r.name}</p>
                        <p className="text-xs text-gray-400">{r.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-5 py-4 font-bold text-gray-900">
                    {r.amount}
                  </td>

                  {/* Method */}
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <Landmark size={14} className="text-gray-400" />
                      {r.method}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4 text-gray-600">
                    <p>{r.date}</p>
                    <p className="text-xs text-gray-400">{r.time}</p>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        r.status === "Pending"
                          ? "bg-yellow-50 text-yellow-700"
                          : r.status === "Approved"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          r.status === "Pending"
                            ? "bg-yellow-500"
                            : r.status === "Approved"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                      {r.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    {r.status === "Pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAction(r.id, "Approved")}
                          className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(r.id, "Rejected")}
                          className="bg-red-100 hover:bg-red-200 text-red-600 text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`text-xs font-semibold ${
                          r.status === "Approved"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {r.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden divide-y divide-gray-100">
          {requests.map((r) => (
            <div key={r.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                    {r.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.email}</p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    r.status === "Pending"
                      ? "bg-yellow-50 text-yellow-700"
                      : r.status === "Approved"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      r.status === "Pending"
                        ? "bg-yellow-500"
                        : r.status === "Approved"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />
                  {r.status}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-gray-900">{r.amount}</span>
                <span className="text-gray-500 flex items-center gap-1">
                  <Landmark size={12} /> {r.method}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                {r.date} • {r.time}
              </p>
              {r.status === "Pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(r.id, "Approved")}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(r.id, "Rejected")}
                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 text-xs font-semibold py-2 rounded-lg transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-700">5</span> of{" "}
            <span className="font-semibold text-gray-700">42</span> pending requests
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500"
            >
              <ChevronLeft size={14} />
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                  currentPage === p
                    ? "bg-blue-600 text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Info Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Compliance Review Guidelines */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <h3 className="text-base font-bold text-gray-900 mb-2">
            Compliance Review Guidelines
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Always cross-verify Crypto addresses and high-value Bank transfers
            ($10,000+) against the user's documented KYC profile before
            approving a withdrawal.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-green-700">
              <ShieldCheck size={14} className="text-green-600" />
              KYC Level 2 Required
            </span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-red-600">
              <AlertTriangle size={14} />
              Risk Score Threshold
            </span>
          </div>
        </div>

        {/* System Efficiency */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">
            System Efficiency
          </p>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-4xl font-black text-gray-900">4.2h</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">Avg. Approval Time</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Approvals are trending{" "}
            <span className="font-bold text-gray-900">12% faster</span> than
            last week.
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-green-700 font-semibold">
            <Clock size={13} />
            Live metric
          </div>
        </div>
      </div>
    </div>
  );
}