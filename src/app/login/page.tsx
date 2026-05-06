"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Login submitted:", data);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-12"
      style={{
        background:
          "radial-gradient(ellipse at 15% 50%, rgba(99,149,237,0.1) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(154,200,230,0.08) 0%, transparent 50%), #eef0f8",
      }}
    >
      <div
        className="w-full max-w-5xl flex flex-col lg:flex-row rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.0)",
          gap: "24px",
        }}
      >
        {/* ── LEFT PANEL ── */}
        <div
          className="flex-1 flex flex-col justify-between p-8 sm:p-10 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.55)",
            border: "1px solid rgba(226,228,241,0.7)",
            backdropFilter: "blur(12px)",
            minHeight: "480px",
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563eb"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11" />
            </svg>
            <span
              className="text-base font-semibold"
              style={{ color: "#2563eb", fontFamily: "'Sora', sans-serif" }}
            >
              Logo
            </span>
          </div>

          {/* Heading */}
          <div className="mt-16 mb-auto">
            <h1
              className="text-3xl sm:text-4xl font-extrabold leading-tight"
              style={{ color: "#0d1117", fontFamily: "'Sora', sans-serif" }}
            >
              The Blueprint for{" "}
              <span style={{ color: "#2563eb", display: "block" }}>
                Precision
              </span>
              <span style={{ color: "#2563eb" }}>Prosperity.</span>
            </h1>
            <p
              className="mt-4 text-sm leading-relaxed max-w-xs"
              style={{ color: "#6b7280" }}
            >
              Access your premium wealth-management suite and continue your
              journey toward total income transformation.
            </p>
          </div>

          {/* Feature Badge */}
          <div
            className="mt-12 flex items-center gap-3 p-4 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(226,228,241,0.8)",
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "#22c55e" }}
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="white"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "#0d1117", fontFamily: "'Sora', sans-serif" }}
              >
                Live Market Data
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
                Real-time architecture for your earnings.
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div
          className="flex-1 flex flex-col justify-center p-8 sm:p-10 rounded-2xl"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(226,228,241,0.6)",
            boxShadow:
              "0 20px 60px rgba(59,91,255,0.07), 0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          {/* Header */}
          <div className="mb-8">
            <h2
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: "#0d1117", fontFamily: "'Sora', sans-serif" }}
            >
              Welcome Back
            </h2>
            <p className="text-sm mt-1.5" style={{ color: "#9ca3af" }}>
              Enter your credentials to access your dashboard.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: "#6b7280" }}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "#f7f8fc",
                  border: `1.5px solid ${errors.email ? "#ef4444" : "#e2e5f1"}`,
                  color: "#0d1117",
                }}
                onFocus={(e) => {
                  if (!errors.email) e.target.style.borderColor = "#2563eb";
                  e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                  e.target.style.background = "#fff";
                }}
                onBlur={(e) => {
                  if (!errors.email) e.target.style.borderColor = "#e2e5f1";
                  e.target.style.boxShadow = "none";
                  e.target.style.background = "#f7f8fc";
                }}
              />
              {errors.email && (
                <p className="text-xs mt-1" style={{ color: "#ef4444" }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#6b7280" }}
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-semibold transition-colors"
                  style={{ color: "#2563eb" }}
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "#f7f8fc",
                    border: `1.5px solid ${errors.password ? "#ef4444" : "#e2e5f1"}`,
                    color: "#0d1117",
                  }}
                  onFocus={(e) => {
                    if (!errors.password)
                      e.target.style.borderColor = "#2563eb";
                    e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                    e.target.style.background = "#fff";
                  }}
                  onBlur={(e) => {
                    if (!errors.password)
                      e.target.style.borderColor = "#e2e5f1";
                    e.target.style.boxShadow = "none";
                    e.target.style.background = "#f7f8fc";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  style={{ color: "#9ca3af" }}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs mt-1" style={{ color: "#ef4444" }}>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2.5">
              <input
                id="rememberMe"
                type="checkbox"
                {...register("rememberMe")}
                className="w-4 h-4 rounded"
                style={{
                  accentColor: "#2563eb",
                  border: "1.5px solid #e2e5f1",
                  cursor: "pointer",
                }}
              />
              <label
                htmlFor="rememberMe"
                className="text-sm cursor-pointer select-none"
                style={{ color: "#6b7280" }}
              >
                Keep me signed in for 30 days
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide text-white transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: isSubmitting
                  ? "#93c5fd"
                  : "linear-gradient(135deg, #2563eb, #1d4ed8)",
                boxShadow: isSubmitting
                  ? "none"
                  : "0 4px 16px rgba(37,99,235,0.35)",
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(37,99,235,0.5)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(37,99,235,0.35)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="white"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                "Login to Dashboard →"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-sm mt-6" style={{ color: "#9ca3af" }}>
            New to the architecture?{" "}
            <a
              href="#"
              className="font-semibold transition-colors"
              style={{ color: "#2563eb" }}
            >
              Create an Account
            </a>
          </p>

          {/* Trust Text */}
          <p
            className="text-center text-xs mt-8 uppercase tracking-widest"
            style={{ color: "#d1d5db" }}
          >
            Trusted by Enterprise Leaders
          </p>
        </div>
      </div>
    </div>
  );
}
