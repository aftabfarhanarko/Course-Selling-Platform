"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import {
  TrendingUp,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  Loader2,
  ShieldCheck,
  Zap
} from "lucide-react";

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

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

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    // Simulate API call
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));
    console.log("Login data:", data);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      // In a real app, you would redirect here
      window.location.href = "/student";
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-[1000px] bg-white rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT SIDE: Information/Hero */}
        <div className="hidden lg:flex lg:w-[45%] bg-primary p-10 flex-col justify-between relative overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2.5 text-white mb-12">
              <div className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                <Zap className="w-5 h-5 fill-white text-white" />
              </div>
              <span className="text-[17px] font-black tracking-tight">SkillPay</span>
            </Link>

            <h2 className="text-[32px] font-black text-white leading-[1.15] mb-6">
              Empowering the <br/> 
              <span className="text-blue-200">Architects of Wealth.</span>
            </h2>
            
            <p className="text-blue-100/80 text-[13.5px] leading-relaxed max-w-[300px]">
              Join over 15,000+ students mastering the art of digital income through our precision-engineered curriculum.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-transform hover:translate-x-1 duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/20 flex items-center justify-center border border-emerald-400/20">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-white font-bold text-[13px]">Real-time Analytics</p>
                <p className="text-blue-100/60 text-[11px]">Track your growth instantly</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-transform hover:translate-x-1 duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-400/20 flex items-center justify-center border border-blue-400/20">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-bold text-[13px]">Enterprise Security</p>
                <p className="text-blue-100/60 text-[11px]">Your data is bank-grade encrypted</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Login Form */}
        <div className="flex-1 p-6 sm:p-10 lg:p-14">
          <div className="max-w-[360px] mx-auto">
            <div className="mb-10">
              <h1 className="text-2xl font-black text-slate-900 mb-2">Welcome Back</h1>
              <p className="text-[13px] text-slate-500 font-medium">
                Enter your credentials to access your dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <input
                  {...register("email", { 
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                  })}
                  type="email"
                  placeholder="name@company.com"
                  className={`w-full bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-200'} focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-xl px-4 py-3 text-[13px] outline-none transition-all placeholder:text-slate-400 font-medium`}
                />
                {errors.email && <p className="text-[11px] text-red-500 font-bold ml-1">{errors.email.message}</p>}
              </div>

              <div className="space-y-1.5 relative">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Password
                  </label>
                  <button type="button" className="text-[11px] font-bold text-primary hover:underline">
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <input
                    {...register("password", { required: "Password is required" })}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full bg-slate-50 border ${errors.password ? 'border-red-500' : 'border-slate-200'} focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-xl px-4 py-3 text-[13px] outline-none transition-all placeholder:text-slate-400 font-medium`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-[11px] text-red-500 font-bold ml-1">{errors.password.message}</p>}
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  {...register("rememberMe")}
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <label htmlFor="remember" className="text-[12px] text-slate-500 font-medium select-none cursor-pointer">
                  Keep me logged in
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || success}
                className="w-full bg-primary hover:bg-primary/90 text-white font-black py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none text-[13px] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : success ? (
                  <>
                    <Check className="w-4 h-4" />
                    Success
                  </>
                ) : (
                  <>
                    Sign In to Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-[13px] text-slate-500 font-medium">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary font-black hover:underline">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
