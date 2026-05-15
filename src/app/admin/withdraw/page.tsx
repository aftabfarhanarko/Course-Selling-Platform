"use client";

import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  Landmark,
  Clock,
  TrendingUp,
  Eye,
  X,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  RefreshCw,
  User,
  Mail,
  Calendar,
  DollarSign,
  Hash,
} from "lucide-react";

type Status = "Pending" | "Approved" | "Rejected";
type Method = "Bank Transfer" | "Crypto" | "PayPal" | "Wire Transfer";

interface Request {
  id: number;
  name: string;
  email: string;
  initials: string;
  amount: string;
  amountRaw: number;
  method: Method;
  date: string;
  time: string;
  status: Status;
  accountNo: string;
  bankName: string;
  kycLevel: number;
  riskScore: "Low" | "Medium" | "High";
  txRef: string;
  note?: string;
}

const generateRequests = (): Request[] => {
  const names = [
    { name: "Jordan Smith", initials: "JS", email: "jordan@example.com" },
    { name: "Aisha Rahman", initials: "AR", email: "aisha.r@gmail.com" },
    { name: "Carlos Vega", initials: "CV", email: "cvega@outlook.com" },
    { name: "Priya Nair", initials: "PN", email: "priya.nair@work.io" },
    { name: "Liam O'Brien", initials: "LO", email: "liamob@yahoo.com" },
    { name: "Sofia Martins", initials: "SM", email: "sofia.m@example.com" },
    { name: "Yusuf Khan", initials: "YK", email: "yusuf.k@domain.com" },
    { name: "Emma Johnson", initials: "EJ", email: "emmaj@webmail.com" },
    { name: "Ravi Patel", initials: "RP", email: "ravi.p@company.co" },
    { name: "Nina Schulz", initials: "NS", email: "nina.s@eumail.de" },
    { name: "James Lee", initials: "JL", email: "jameslee@corp.net" },
    { name: "Fatima Al-Zahra", initials: "FZ", email: "fatima.z@mail.ae" },
  ];
  const methods: Method[] = [
    "Bank Transfer",
    "Crypto",
    "PayPal",
    "Wire Transfer",
  ];
  const risks: ("Low" | "Medium" | "High")[] = ["Low", "Medium", "High"];
  const banks = [
    "Chase Bank",
    "HSBC",
    "Citibank",
    "Wells Fargo",
    "Barclays",
    "Deutsche Bank",
  ];
  const statuses: Status[] = [
    "Pending",
    "Pending",
    "Pending",
    "Approved",
    "Rejected",
  ];
  const amounts = [
    2400, 5800, 1200, 9900, 3400, 750, 12000, 4300, 670, 8100, 2900, 6500,
  ];
  const dates = [
    { date: "Oct 24, 2023", time: "14:22 PM" },
    { date: "Oct 25, 2023", time: "09:10 AM" },
    { date: "Oct 25, 2023", time: "11:45 AM" },
    { date: "Oct 26, 2023", time: "16:33 PM" },
    { date: "Oct 26, 2023", time: "08:05 AM" },
    { date: "Oct 27, 2023", time: "13:50 PM" },
    { date: "Oct 27, 2023", time: "17:22 PM" },
    { date: "Oct 28, 2023", time: "10:18 AM" },
    { date: "Oct 28, 2023", time: "15:40 PM" },
    { date: "Oct 29, 2023", time: "07:55 AM" },
    { date: "Oct 29, 2023", time: "12:30 PM" },
    { date: "Oct 30, 2023", time: "18:00 PM" },
  ];

  return names.map((n, i) => ({
    id: i + 1,
    name: n.name,
    email: n.email,
    initials: n.initials,
    amount: `$${amounts[i].toLocaleString()}.00`,
    amountRaw: amounts[i],
    method: methods[i % methods.length],
    date: dates[i].date,
    time: dates[i].time,
    status: statuses[i % statuses.length],
    accountNo: `****${Math.floor(1000 + Math.random() * 9000)}`,
    bankName: banks[i % banks.length],
    kycLevel: Math.floor(1 + Math.random() * 3),
    riskScore: risks[i % risks.length],
    txRef: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    note:
      i % 4 === 0
        ? "High-value transaction — manual review required."
        : undefined,
  }));
};

const ITEMS_PER_PAGE = 6;

const avatarColors = [
  "bg-indigo-100 text-indigo-700",
  "bg-violet-100 text-violet-700",
  "bg-sky-100 text-sky-700",
  "bg-emerald-100 text-emerald-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
];

function StatusBadge({ status }: { status: Status }) {
  const cfg = {
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Rejected: "bg-red-50 text-red-600 border-red-200",
  };
  const dot = {
    Pending: "bg-amber-500",
    Approved: "bg-emerald-500",
    Rejected: "bg-red-500",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg[status]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot[status]}`} />
      {status}
    </span>
  );
}

function RiskBadge({ risk }: { risk: "Low" | "Medium" | "High" }) {
  const cfg = {
    Low: "bg-emerald-50 text-emerald-700",
    Medium: "bg-amber-50 text-amber-700",
    High: "bg-red-50 text-red-600",
  };
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg[risk]}`}
    >
      {risk}
    </span>
  );
}

function ViewModal({
  request,
  onClose,
  onApprove,
  onReject,
}: {
  request: Request;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}) {
  const colorClass = avatarColors[request.id % avatarColors.length];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Transaction Detail
            </p>
            <h2 className="text-base font-bold text-gray-900 mt-0.5">
              {request.txRef}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-500"
          >
            <X size={15} />
          </button>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-b border-gray-50">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${colorClass}`}
            >
              {request.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 text-sm">{request.name}</p>
              <p className="text-xs text-gray-400 truncate">{request.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  KYC Level {request.kycLevel}
                </span>
                <RiskBadge risk={request.riskScore} />
                <StatusBadge status={request.status} />
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="px-6 py-4 grid grid-cols-2 gap-3">
          {[
            {
              icon: <DollarSign size={14} />,
              label: "Amount",
              value: request.amount,
              bold: true,
            },
            {
              icon: <Landmark size={14} />,
              label: "Method",
              value: request.method,
            },
            {
              icon: <Hash size={14} />,
              label: "Account No.",
              value: request.accountNo,
            },
            {
              icon: <Landmark size={14} />,
              label: "Bank",
              value: request.bankName,
            },
            {
              icon: <Calendar size={14} />,
              label: "Date",
              value: `${request.date}`,
            },
            { icon: <Clock size={14} />, label: "Time", value: request.time },
          ].map((item) => (
            <div key={item.label} className="bg-gray-50 rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                {item.icon}
                <span className="text-[10px] font-semibold uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
              <p
                className={`text-sm ${item.bold ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Note */}
        {request.note && (
          <div className="mx-6 mb-4 flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5">
            <AlertTriangle
              size={14}
              className="text-amber-600 mt-0.5 flex-shrink-0"
            />
            <p className="text-xs text-amber-700 leading-relaxed">
              {request.note}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          {request.status === "Pending" ? (
            <>
              <button
                onClick={onApprove}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
              >
                <CheckCircle size={15} />
                Approve
              </button>
              <button
                onClick={onReject}
                className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold py-2.5 rounded-xl transition-colors border border-red-100"
              >
                <XCircle size={15} />
                Reject
              </button>
            </>
          ) : (
            <div
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold ${
                request.status === "Approved"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {request.status === "Approved" ? (
                <CheckCircle size={15} />
              ) : (
                <XCircle size={15} />
              )}
              This request was {request.status}
            </div>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Withdrawpage() {
  const [requests, setRequests] = useState<Request[]>(generateRequests);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [toast, setToast] = useState<{
    msg: string;
    type: "approve" | "reject" | "info";
  } | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | Status>("All");
  const [filterMethod, setFilterMethod] = useState<"All" | Method>("All");

  const showToast = (msg: string, type: "approve" | "reject" | "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAction = (id: number, action: "Approved" | "Rejected") => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r)),
    );
    if (selectedRequest?.id === id) {
      setSelectedRequest((prev) => (prev ? { ...prev, status: action } : null));
    }
    showToast(
      action === "Approved"
        ? "✓ Request approved successfully."
        : "✕ Request has been rejected.",
      action === "Approved" ? "approve" : "reject",
    );
  };

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      const matchSearch =
        search === "" ||
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase()) ||
        r.txRef.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "All" || r.status === filterStatus;
      const matchMethod = filterMethod === "All" || r.method === filterMethod;
      return matchSearch && matchStatus && matchMethod;
    });
  }, [requests, search, filterStatus, filterMethod]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const pendingTotal = requests
    .filter((r) => r.status === "Pending")
    .reduce((s, r) => s + r.amountRaw, 0);

  const stats = [
    { label: "Total Requests", value: requests.length, color: "text-gray-900" },
    {
      label: "Pending",
      value: requests.filter((r) => r.status === "Pending").length,
      color: "text-amber-600",
    },
    {
      label: "Approved",
      value: requests.filter((r) => r.status === "Approved").length,
      color: "text-emerald-600",
    },
    {
      label: "Rejected",
      value: requests.filter((r) => r.status === "Rejected").length,
      color: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 text-white text-sm px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 transition-all ${
            toast.type === "approve"
              ? "bg-emerald-600"
              : toast.type === "reject"
                ? "bg-red-500"
                : "bg-blue-600"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* View Modal */}
      {selectedRequest && (
        <ViewModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onApprove={() => handleAction(selectedRequest.id, "Approved")}
          onReject={() => handleAction(selectedRequest.id, "Rejected")}
        />
      )}

      <div className=" mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">
              Transaction Queue
            </p>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
              Review Withdrawal Requests
            </h1>
            <p className="text-sm text-gray-500 mt-1.5 max-w-sm leading-relaxed">
              Manage pending payouts and maintain platform financial integrity.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm self-start">
            <div className="w-10 h-10 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center">
              <TrendingUp size={18} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Pending Total
              </p>
              <p className="text-xl font-black text-gray-900">
                ${pendingTotal.toLocaleString()}.00
              </p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl border border-gray-100 px-4 py-3 shadow-sm"
            >
              <p className="text-xs text-gray-400 font-medium mb-1">
                {s.label}
              </p>
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3 mb-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name, email or TX ref..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-gray-50"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value as any);
                setCurrentPage(1);
              }}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 text-gray-700 cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <select
              value={filterMethod}
              onChange={(e) => {
                setFilterMethod(e.target.value as any);
                setCurrentPage(1);
              }}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 text-gray-700 cursor-pointer"
            >
              <option value="All">All Methods</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Crypto">Crypto</option>
              <option value="PayPal">PayPal</option>
              <option value="Wire Transfer">Wire Transfer</option>
            </select>
            <button
              onClick={() => {
                setSearch("");
                setFilterStatus("All");
                setFilterMethod("All");
                setCurrentPage(1);
              }}
              className="flex items-center gap-1.5 text-sm px-3 py-2 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <RefreshCw size={13} />
              Reset
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  {[
                    "User",
                    "Amount",
                    "Method",
                    "Request Date",
                    "Risk",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3.5"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-12 text-gray-400 text-sm"
                    >
                      No requests match your filters.
                    </td>
                  </tr>
                ) : (
                  paginated.map((r, idx) => {
                    const color = avatarColors[r.id % avatarColors.length];
                    return (
                      <tr
                        key={r.id}
                        className="hover:bg-gray-50/60 transition-colors group"
                      >
                        {/* User */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${color}`}
                            >
                              {r.initials}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">
                                {r.name}
                              </p>
                              <p className="text-xs text-gray-400">{r.email}</p>
                            </div>
                          </div>
                        </td>
                        {/* Amount */}
                        <td className="px-5 py-3.5 font-bold text-gray-900">
                          {r.amount}
                        </td>
                        {/* Method */}
                        <td className="px-5 py-3.5">
                          <span className="flex items-center gap-1.5 text-gray-600 text-xs">
                            <Landmark size={13} className="text-gray-400" />
                            {r.method}
                          </span>
                        </td>
                        {/* Date */}
                        <td className="px-5 py-3.5 text-gray-600 text-xs">
                          <p className="font-medium">{r.date}</p>
                          <p className="text-gray-400">{r.time}</p>
                        </td>
                        {/* Risk */}
                        <td className="px-5 py-3.5">
                          <RiskBadge risk={r.riskScore} />
                        </td>
                        {/* Status */}
                        <td className="px-5 py-3.5">
                          <StatusBadge status={r.status} />
                        </td>
                        {/* Actions */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedRequest(r)}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                              <Eye size={12} />
                              View
                            </button>
                            {r.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => handleAction(r.id, "Approved")}
                                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                                >
                                  <CheckCircle size={12} />
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleAction(r.id, "Rejected")}
                                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors border border-red-100"
                                >
                                  <XCircle size={12} />
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden divide-y divide-gray-100">
            {paginated.length === 0 ? (
              <p className="text-center py-10 text-gray-400 text-sm">
                No results found.
              </p>
            ) : (
              paginated.map((r) => {
                const color = avatarColors[r.id % avatarColors.length];
                return (
                  <div key={r.id} className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${color}`}
                        >
                          {r.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {r.name}
                          </p>
                          <p className="text-xs text-gray-400">{r.email}</p>
                        </div>
                      </div>
                      <StatusBadge status={r.status} />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-gray-900">
                        {r.amount}
                      </span>
                      <span className="text-gray-500 flex items-center gap-1 text-xs">
                        <Landmark size={12} /> {r.method}
                      </span>
                      <RiskBadge risk={r.riskScore} />
                    </div>
                    <p className="text-xs text-gray-400">
                      {r.date} • {r.time}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedRequest(r)}
                        className="flex items-center justify-center gap-1.5 flex-1 border border-gray-200 text-gray-600 text-xs font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Eye size={12} /> View
                      </button>
                      {r.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleAction(r.id, "Approved")}
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(r.id, "Rejected")}
                            className="flex-1 bg-red-50 text-red-600 text-xs font-semibold py-2 rounded-lg border border-red-100 hover:bg-red-100 transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {Math.min(
                  (currentPage - 1) * ITEMS_PER_PAGE + 1,
                  filtered.length,
                )}
                –{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700">
                {filtered.length}
              </span>{" "}
              requests
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
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
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Info Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <ShieldCheck size={14} className="text-emerald-600" />
                KYC Level 2 Required
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-red-600">
                <AlertTriangle size={14} />
                Risk Score Threshold
              </span>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">
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
            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
              <Clock size={13} />
              Live metric
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
