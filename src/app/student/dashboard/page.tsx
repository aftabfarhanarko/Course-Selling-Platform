"use client";

import {
  Bell,
  LogOut,
  Pencil,
  Shield,
  TrendingUp,
  UserRound,
} from "lucide-react";

export default function ProfileDashboard() {
  return (
    <div className="min-h-screen bg-[#f5f5fb] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        {/* TOP PROFILE */}
        <div className="mb-8 flex flex-col gap-8 lg:mb-10 lg:flex-row lg:items-start">
          {/* IMAGE */}
          <div className="relative mx-auto lg:mx-0">
            <div className="h-32 w-32 rounded-[28px] border-4 border-white bg-[#f7f7fb] shadow-sm sm:h-36 sm:w-36 lg:h-40 lg:w-40" />

            <button className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white shadow-lg transition hover:scale-105 sm:h-11 sm:w-11 lg:h-12 lg:w-12">
              <Pencil className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* TEXT */}
          <div className="flex-1 pt-0 text-center lg:pt-4 lg:text-left">
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:flex-wrap lg:items-center">
              <h1 className="text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
                Alex Rivera
              </h1>

              <span className="rounded-full bg-[#4ade80] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-black sm:px-5 sm:text-xs">
                Pro Architect
              </span>
            </div>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg lg:mx-0 lg:text-2xl">
              Mastering the art of digital wealth creation since 2022.
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* LEFT COLUMN */}
          <div className="space-y-6 lg:col-span-2">
            {/* PERSONAL INFO */}
            <div className="rounded-[24px] border border-[#ececf5] bg-[#f7f7fc] p-5 shadow-sm sm:rounded-[28px] sm:p-6 lg:rounded-[32px] lg:p-8">
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:mb-10">
                <h2 className="text-2xl font-bold text-[#111827] sm:text-3xl">
                  Personal Information
                </h2>

                <button className="w-fit text-sm font-semibold text-blue-700 hover:underline">
                  Edit All
                </button>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
                <Info label="FULL NAME" value="Alex Rivera" />

                <Info
                  label="EMAIL ADDRESS"
                  value="alex.rivera@architect.io"
                />

                <Info
                  label="PHONE NUMBER"
                  value="+1 (555) 234-8890"
                />

                <Info
                  label="LOCATION"
                  value="San Francisco, CA"
                />
              </div>
            </div>

            {/* BOTTOM GRID */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* SECURITY */}
              <div className="rounded-[24px] border border-[#ececf5] bg-[#f7f7fc] p-5 shadow-sm sm:rounded-[28px] sm:p-6 lg:rounded-[32px] lg:p-8">
                <div className="mb-6 flex items-center gap-4 lg:mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700 sm:h-14 sm:w-14">
                    <Shield className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <h3 className="text-xl font-bold text-[#111827] sm:text-2xl">
                    Account Security
                  </h3>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  <ToggleCard
                    title="Biometric Login"
                    active
                  />

                  <ToggleCard
                    title="Two-Factor Auth"
                    active
                    badge="ACTIVE"
                  />
                </div>
              </div>

              {/* NOTIFICATIONS */}
              <div className="rounded-[24px] border border-[#ececf5] bg-[#f7f7fc] p-5 shadow-sm sm:rounded-[28px] sm:p-6 lg:rounded-[32px] lg:p-8">
                <div className="mb-6 flex items-center gap-4 lg:mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 sm:h-14 sm:w-14">
                    <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <h3 className="text-xl font-bold text-[#111827] sm:text-2xl">
                    Notifications
                  </h3>
                </div>

                <div className="space-y-5 sm:space-y-6">
                  <Notification
                    title="Earnings Alerts"
                    active={false}
                  />

                  <Notification
                    title="Course Updates"
                    active
                  />

                  <Notification
                    title="Network Messages"
                    active
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* INCOME */}
            <div className="rounded-[24px] bg-gradient-to-br from-[#eef2ff] to-[#e6eaff] p-5 shadow-sm sm:rounded-[28px] sm:p-6 lg:rounded-[32px] lg:p-8">
              <TrendingUp className="mb-6 h-7 w-7 text-blue-700 sm:mb-8 sm:h-8 sm:w-8" />

              <h3 className="text-xl font-bold text-[#111827] sm:text-2xl">
                Income Pulse
              </h3>

              <div className="mt-4 break-words text-3xl font-bold text-blue-700 sm:text-4xl lg:text-5xl">
                $12,450.00
              </div>

              <p className="mt-3 text-sm font-semibold text-green-600 sm:text-base">
                +12% this month
              </p>

              <button className="mt-8 w-full rounded-2xl bg-blue-700 py-4 text-base font-semibold text-white transition hover:bg-blue-800 sm:mt-10 sm:py-5 sm:text-lg">
                View Portfolio
              </button>
            </div>

            {/* LOGOUT */}
            <div className="rounded-[24px] border border-[#f4dede] bg-[#fff5f5] p-5 text-center shadow-sm sm:rounded-[28px] sm:p-6 lg:rounded-[32px] lg:p-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe3e3] text-red-600 sm:h-20 sm:w-20">
                <LogOut className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-[#111827] sm:mt-8 sm:text-3xl">
                End Session
              </h3>

              <p className="mt-3 text-base text-gray-500 sm:text-lg">
                Safely exit your workspace
              </p>

              <button className="mt-6 w-full rounded-2xl border border-[#f3caca] bg-white py-4 text-base font-semibold text-red-600 transition hover:bg-red-50 sm:mt-8 sm:py-5 sm:text-lg">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="overflow-hidden">
      <p className="mb-3 text-[10px] font-bold tracking-[0.2em] text-gray-400 sm:text-xs">
        {label}
      </p>

      <p className="break-words text-xl font-medium text-[#111827] sm:text-2xl lg:text-3xl">
        {value}
      </p>
    </div>
  );
}

function ToggleCard({
  title,
  active,
  badge,
}: {
  title: string;
  active?: boolean;
  badge?: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-5">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:h-11 sm:w-11">
          <UserRound className="h-5 w-5 text-gray-500" />
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-sm font-semibold text-[#111827] sm:text-base">
            {title}
          </span>

          {badge && (
            <span className="text-[10px] font-bold tracking-wider text-green-600 sm:text-xs">
              {badge}
            </span>
          )}
        </div>
      </div>

      <div
        className={`relative h-7 w-14 rounded-full transition ${
          active ? "bg-green-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            active ? "right-1" : "left-1"
          }`}
        />
      </div>
    </div>
  );
}

function Notification({
  title,
  active,
}: {
  title: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-gray-600 sm:text-base lg:text-lg">
        {title}
      </span>

      <div
        className={`relative h-7 w-14 flex-shrink-0 rounded-full transition ${
          active ? "bg-green-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            active ? "right-1" : "left-1"
          }`}
        />
      </div>
    </div>
  );
}