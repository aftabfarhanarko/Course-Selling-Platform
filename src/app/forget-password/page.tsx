"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";
import ForgetLotti from "@/components/homepage/forget-password/ForgetLotti";

type ForgotPasswordFormData = {
  email: string;
};

export default function ForgetPasswordPage(): React.JSX.Element {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    defaultValues: { email: "" },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async () => {
    const toastId = toast.loading("Sending reset link...");
    try {
      await new Promise((r) => setTimeout(r, 700));
      setSuccess(true);
      toast.success("Reset link sent!", { id: toastId });
    } catch {
      toast.error("Failed to send reset link", { id: toastId });
    }
  };

  const inputBase =
    "w-full bg-[#F1F5F9] border border-[#E2E8F0] focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 rounded-xl px-4 py-3 text-[13px] outline-none transition-all placeholder:text-slate-400 font-medium text-slate-700";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="flex w-full max-w-[900px] items-center justify-center gap-8">
        {/* ── LEFT: Lottie animation — desktop/laptop only ── */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <ForgetLotti />
        </div>

        {/* ── RIGHT: Form card ── */}
        <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-sm shadow-blue-100 border border-slate-100 p-8 flex-shrink-0">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] flex items-center justify-center">
              <Mail className="w-6 h-6 text-[#2563EB]" />
            </div>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-[20px] font-black text-slate-900">
              Forgot Password
            </h1>
            <p className="text-slate-500 text-[13px] font-medium mt-1 leading-relaxed">
              Enter your email address and we'll send you a reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                })}
                type="email"
                placeholder="john@example.com"
                className={`${inputBase} ${errors.email ? "border-red-400" : ""}`}
              />
              {errors.email && (
                <p className="text-[11px] text-red-500 font-bold ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || success}
              className="w-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-black py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none text-[13px] flex items-center justify-center gap-2 mt-1"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : success ? (
                <>
                  <Check className="w-4 h-4" />
                  Sent!
                </>
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 text-center">
            <Link
              href="/login"
              className="text-[12px] text-[#2563EB] font-black hover:underline"
            >
              Back to Login
            </Link>
          </div>

          <p className="text-center text-[11px] text-slate-300 mt-4">
            © 2026 Developed by Aftab Farhan ARKO . All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
