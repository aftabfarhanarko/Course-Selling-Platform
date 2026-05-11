"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TrendingUp,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  Loader2,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

// ── Component ──────────────────────────────────────────────────────────────

export default function LoginPage(): React.JSX.Element {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (_data) => {
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10">

      {/* ── Outer Card ───────────────────────────────────────────────────── */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-[0_8px_48px_rgba(0,0,0,0.09)] flex flex-col lg:flex-row overflow-hidden">

        {/* ── LEFT PANEL ─────────────────────────────────────────────────── */}
        <div className="lg:w-[44%] flex flex-col bg-[#f0f1f8] px-8 py-9 sm:px-10 sm:py-11 gap-8 min-h-[300px] lg:min-h-[580px]">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11" />
            </svg>
            <span
              className="text-[15px] font-semibold text-blue-600"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Logo
            </span>
          </div>

          {/* Hero Copy */}
          <div className="flex-1 flex flex-col justify-center">
            <h1
              className="text-[28px] sm:text-[32px] lg:text-[34px] font-bold leading-[1.22] text-gray-900 mb-4"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              The Blueprint for{" "}
              <span className="text-blue-600 block">Precision</span>
              <span className="text-blue-600">Prosperity.</span>
            </h1>
            <p className="text-[13px] sm:text-[14px] text-gray-500 leading-[1.75] max-w-[285px]">
              Access your premium wealth-management suite and continue your
              journey toward total income transformation.
            </p>
          </div>

          {/* Live Market Badge */}
          <div className="flex items-center gap-3 bg-white/75 rounded-2xl px-4 py-3.5 border border-white/60">
            <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center shrink-0">
              <TrendingUp size={16} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <p
                className="text-[13px] font-semibold text-gray-900 leading-tight"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Live Market Data
              </p>
              <p className="text-[11px] sm:text-[12px] text-gray-400 mt-0.5 leading-snug">
                Real-time architecture for your earnings.
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ────────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-10 sm:py-12">

          {/* Header */}
          <div className="mb-7">
            <h2
              className="text-[26px] sm:text-[28px] font-bold text-gray-900 leading-tight mb-1"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Welcome Back
            </h2>
            <p className="text-[13px] sm:text-[14px] text-gray-400">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          {/* ── Email ── */}
          <div className="mb-5">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`w-full px-4 py-[13px] rounded-xl border text-[14px] text-gray-900 outline-none transition-all placeholder:text-gray-300
                focus:bg-white focus:border-blue-500 focus:ring-[3px] focus:ring-blue-500/10
                ${errors.email
                  ? "border-red-400 bg-red-50/40"
                  : "border-gray-200 bg-gray-50 hover:border-gray-300"
                }`}
            />
            {errors.email && (
              <p className="text-[12px] text-red-500 mt-1.5 flex items-center gap-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* ── Password ── */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                Password
              </label>
              <a
                href="#"
                className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className={`w-full px-4 py-[13px] pr-11 rounded-xl border text-[14px] text-gray-900 outline-none transition-all placeholder:text-gray-400
                  focus:bg-white focus:border-blue-500 focus:ring-[3px] focus:ring-blue-500/10
                  ${errors.password
                    ? "border-red-400 bg-red-50/40"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300"
                  }`}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[12px] text-red-500 mt-1.5">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* ── Remember Me ── */}
          <div className="flex items-center gap-2.5 mb-6">
            <input
              id="rememberMe"
              type="checkbox"
              {...register("rememberMe")}
              className="w-[15px] h-[15px] rounded border-gray-300 accent-blue-600 cursor-pointer"
            />
            <label
              htmlFor="rememberMe"
              className="text-[13px] sm:text-[14px] text-gray-500 cursor-pointer select-none"
            >
              Keep me signed in for 30 days
            </label>
          </div>

          {/* ── Submit Button ── */}
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            style={{ fontFamily: "'Sora', sans-serif" }}
            className={`w-full flex items-center justify-center gap-2 py-[14px] rounded-full text-white text-[14px] font-semibold tracking-wide border-none transition-all duration-200
              ${success
                ? "bg-green-600 shadow-[0_4px_18px_rgba(22,163,74,0.35)]"
                : isSubmitting
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-[0_4px_18px_rgba(37,99,235,0.30)] hover:shadow-[0_6px_24px_rgba(37,99,235,0.42)] hover:-translate-y-0.5 cursor-pointer"
              }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Signing in...
              </>
            ) : success ? (
              <>
                <Check size={16} />
                Login Successful!
              </>
            ) : (
              <>
                Login to Dashboard
                <ArrowRight size={15} />
              </>
            )}
          </button>

          {/* ── Sign Up Link ── */}
          <p className="text-center text-[13px] sm:text-[14px] text-gray-400 mt-6">
            New to the architecture?{" "}
            <a
              href="#"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Create an Account
            </a>
          </p>

          {/* ── Trusted Text ── */}
          <p className="text-center text-[10px] uppercase tracking-[0.18em] text-gray-300 mt-8">
            Trusted by Enterprise Leaders
          </p>
        </div>
      </div>
    </div>
  );
}