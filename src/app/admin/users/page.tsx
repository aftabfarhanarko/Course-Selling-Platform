"use client";

import React, { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  MoreHorizontal,
} from "lucide-react";

const users = [
  {
    id: 1,
    name: "Marcus Sterling",
    email: "marcus.sterling@incomeflow.com",
    avatar: "MS",
    avatarBg: "#FEE2E2",
    avatarColor: "#EF4444",
    role: "Instructor",
    roleColor: "text-blue-700 bg-blue-50",
    joinDate: "Oct 12, 2023",
    status: "Active",
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    email: "elena.rod@gmail.com",
    avatar: "ER",
    avatarBg: "#FEF3C7",
    avatarColor: "#D97706",
    role: "Student",
    roleColor: "text-purple-700 bg-purple-50",
    joinDate: "Nov 05, 2023",
    status: "Active",
  },
  {
    id: 3,
    name: "David Chen",
    email: "d.chen@enterprise.co",
    avatar: "DC",
    avatarBg: "#F3F4F6",
    avatarColor: "#6B7280",
    role: "Student",
    roleColor: "text-purple-700 bg-purple-50",
    joinDate: "Jan 14, 2024",
    status: "Suspended",
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    email: "s.jenkins@academy.io",
    avatar: "SJ",
    avatarBg: "#FEE2E2",
    avatarColor: "#EF4444",
    role: "Instructor",
    roleColor: "text-blue-700 bg-blue-50",
    joinDate: "Dec 20, 2023",
    status: "Active",
  },
];

const filterOptions = ["All Members", "Instructors", "Students", "Suspended"];

export default function Userpage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Members");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "All Members" ||
      (filter === "Instructors" && u.role === "Instructor") ||
      (filter === "Students" && u.role === "Student") ||
      (filter === "Suspended" && u.status === "Suspended");
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 font-sans">
      {/* Search + Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by name, email or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 shadow-sm"
          />
        </div>

        {/* Filter dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal size={14} className="text-gray-500" />
            <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold hidden sm:inline">
              Filter Access
            </span>
            <span className="text-gray-800 font-medium">{filter}</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
              {filterOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setFilter(opt);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    filter === opt
                      ? "bg-indigo-50 text-indigo-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Total Users */}
        <div className="bg-indigo-600 rounded-2xl p-5 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-200 mb-2">
            Total Users
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">12,842</span>
            <span className="text-sm font-semibold text-indigo-200 bg-indigo-500 px-2 py-0.5 rounded-full">
              +12%
            </span>
          </div>
        </div>

        {/* Active Instructors */}
        <div className="bg-white border border-green-200 rounded-2xl p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-2">
            Active Instructors
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">412</span>
            <span className="text-sm font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
              Top 2%
            </span>
          </div>
        </div>

        {/* New Students */}
        <div className="bg-white border border-indigo-100 rounded-2xl p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">
            New Students (24h)
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">84</span>
            <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              Steady
            </span>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-4">
                  User Profile
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">
                  Access Level
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">
                  Join Date
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{ background: u.avatarBg, color: u.avatarColor }}
                      >
                        {u.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {u.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${u.roleColor}`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {u.joinDate}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`flex items-center gap-1.5 text-sm font-medium ${
                        u.status === "Active"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          u.status === "Active" ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden divide-y divide-gray-100">
          {filtered.map((u) => (
            <div key={u.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                    style={{ background: u.avatarBg, color: u.avatarColor }}
                  >
                    {u.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {u.name}
                    </p>
                    <p className="text-xs text-gray-400">{u.email}</p>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${u.roleColor}`}
                >
                  {u.role}
                </span>
                <span
                  className={`flex items-center gap-1 text-xs font-medium ${
                    u.status === "Active" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      u.status === "Active" ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  {u.status}
                </span>
                <span className="text-xs text-gray-400 ml-auto">
                  {u.joinDate}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-700">1 - 10</span> of{" "}
            <span className="font-medium text-gray-700">12,842</span> users
          </p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500 disabled:opacity-40">
              <ChevronLeft size={15} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500">
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors">
        <UserPlus size={20} />
      </button>
    </div>
  );
}