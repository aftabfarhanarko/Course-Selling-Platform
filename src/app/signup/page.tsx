"use client";
import React, { useState } from "react";

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    referralCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-4 sm:p-6 lg:p-12 gap-8 lg:gap-16"
      style={{
        background:
          "radial-gradient(ellipse at 15% 50%, rgba(99,179,237,0.15) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(154,230,180,0.12) 0%, transparent 50%), #eef0f8",
      }}
    >
      {/* ── Left Section ── */}
      <div className="w-full max-w-md lg:max-w-lg space-y-6 sm:space-y-8 flex-shrink-0">
        {/* Tag */}
        <div className="text-center lg:text-left">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase"
            style={{ background: "#d1fae5", color: "#065f46" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#065f46" }}
            />
            Precision Prosperity
          </span>

          {/* Heading */}
          <h1
            className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight"
            style={{ color: "#0d1117", fontFamily: "'Sora', sans-serif" }}
          >
            Start Your{" "}
            <span style={{ color: "#2563eb", display: "block" }}>
              Transformation
            </span>
          </h1>

          <p
            className="mt-4 text-sm sm:text-base max-w-sm mx-auto lg:mx-0 leading-relaxed"
            style={{ color: "#6b7280" }}
          >
            Join the elite network of architects building sustainable, scalable
            income streams with professional-grade financial tools.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="hidden sm:flex flex-col gap-3">
          {[
            {
              icon: "📈",
              title: "Accelerated Growth",
              desc: "Proprietary wealth-building strategies engineered for the modern economy.",
              iconBg: "rgba(37,99,235,0.08)",
            },
            {
              icon: "🔒",
              title: "Institutional Security",
              desc: "Bank-grade encryption protecting your architectural blueprints and earnings.",
              iconBg: "rgba(37,99,235,0.08)",
            },
          ].map(({ icon, title, desc, iconBg }) => (
            <div
              key={title}
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(226,228,241,0.8)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="w-9 h-9 flex items-center justify-center rounded-lg text-lg flex-shrink-0"
                style={{ background: iconBg }}
              >
                {icon}
              </div>
              <div>
                <h3
                  className="text-sm font-semibold"
                  style={{ color: "#0d1117", fontFamily: "'Sora', sans-serif" }}
                >
                  {title}
                </h3>
                <p
                  className="text-xs mt-0.5 leading-relaxed"
                  style={{ color: "#9ca3af" }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div
          className="flex items-center gap-3 pt-5"
          style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
        >
          {/* Avatars */}
          <div className="flex">
            {["A", "B", "C"].map((l, i) => (
              <div
                key={l}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{
                  marginLeft: i === 0 ? 0 : -8,
                  border: "2px solid white",
                  background:
                    i === 0
                      ? "linear-gradient(135deg,#f093fb,#f5576c)"
                      : i === 1
                        ? "linear-gradient(135deg,#4facfe,#00f2fe)"
                        : "linear-gradient(135deg,#43e97b,#38f9d7)",
                }}
              >
                {l}
              </div>
            ))}
          </div>
          <p
            className="text-xs font-medium uppercase tracking-widest"
            style={{ color: "#9ca3af" }}
          >
            Trusted by the Top 1%
          </p>
        </div>
      </div>

      {/* ── Right Section — Form Card ── */}
      <div
        className="w-full max-w-md rounded-2xl p-7 sm:p-9"
        style={{
          background: "#ffffff",
          boxShadow:
            "0 20px 60px rgba(59,91,255,0.08), 0 4px 20px rgba(0,0,0,0.06)",
          border: "1px solid rgba(226,228,241,0.6)",
        }}
      >
        {/* Card Header */}
        <div className="mb-7">
          <h2
            className="text-2xl font-bold"
            style={{ color: "#0d1117", fontFamily: "'Sora', sans-serif" }}
          >
            Create your account
          </h2>
          <p className="text-sm mt-1" style={{ color: "#9ca3af" }}>
            Join 15,000+ income architects worldwide.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
              style={{ color: "#6b7280" }}
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Architect"
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                background: "#f7f8fc",
                border: "1.5px solid #e2e5f1",
                color: "#0d1117",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2563eb";
                e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                e.target.style.background = "#fff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e5f1";
                e.target.style.boxShadow = "none";
                e.target.style.background = "#f7f8fc";
              }}
            />
          </div>

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
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                background: "#f7f8fc",
                border: "1.5px solid #e2e5f1",
                color: "#0d1117",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2563eb";
                e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                e.target.style.background = "#fff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e5f1";
                e.target.style.boxShadow = "none";
                e.target.style.background = "#f7f8fc";
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
              style={{ color: "#6b7280" }}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "#f7f8fc",
                  border: "1.5px solid #e2e5f1",
                  color: "#0d1117",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#2563eb";
                  e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                  e.target.style.background = "#fff";
                }}
                onBlur={(e) => {
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
                    className="w-5 h-5"
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
                    className="w-5 h-5"
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
          </div>

          {/* Referral Code */}
          <div>
            <label
              htmlFor="referralCode"
              className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
              style={{ color: "#6b7280" }}
            >
              Referral Code (Optional)
            </label>
            <input
              type="text"
              id="referralCode"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleChange}
              placeholder="Enter code if you have one"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                background: "#f7f8fc",
                border: "1.5px solid #e2e5f1",
                color: "#0d1117",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2563eb";
                e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                e.target.style.background = "#fff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e5f1";
                e.target.style.boxShadow = "none";
                e.target.style.background = "#f7f8fc";
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide text-white transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.boxShadow =
                "0 6px 20px rgba(37,99,235,0.5)";
              (e.target as HTMLButtonElement).style.transform =
                "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.boxShadow =
                "0 4px 16px rgba(37,99,235,0.35)";
              (e.target as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            Create Account →
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div
              className="w-full"
              style={{ borderTop: "1px solid #e5e7eb" }}
            />
          </div>
          <div className="relative flex justify-center">
            <span
              className="px-3 text-xs uppercase tracking-wider"
              style={{ background: "#fff", color: "#9ca3af" }}
            >
              or
            </span>
          </div>
        </div>

        {/* Google */}
        <button
          type="button"
          className="w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2.5 transition-all"
          style={{
            background: "#fff",
            border: "1.5px solid #e5e7eb",
            color: "#0d1117",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "#d1d5db";
            (e.currentTarget as HTMLButtonElement).style.background = "#fafafa";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "#e5e7eb";
            (e.currentTarget as HTMLButtonElement).style.background = "#fff";
          }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign up with Google
        </button>

        {/* Login Link */}
        <p className="text-center text-xs mt-5" style={{ color: "#9ca3af" }}>
          Already have an account?{" "}
          <a
            href="#"
            className="font-semibold transition-colors"
            style={{ color: "#2563eb" }}
          >
            Log in here
          </a>
        </p>

        {/* Mobile Trust */}
        <div className="text-center mt-4 sm:hidden">
          <p
            className="text-[10px] tracking-widest uppercase"
            style={{ color: "#d1d5db" }}
          >
            Trusted by the Top 1%
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
