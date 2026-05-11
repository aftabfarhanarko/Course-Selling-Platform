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
  Zap,
  Star,
  Users,
  Award
} from "lucide-react";

type SignupFormData = {
  fullName: string;
  email: string;
  password: string;
  referralCode: string;
  agreeTerms: boolean;
};

export default function SignupPage(): React.JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    defaultValues: { fullName: "", email: "", password: "", referralCode: "", agreeTerms: false },
  });

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    // Simulate API call
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));
    console.log("Signup data:", data);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      window.location.href = "/login";
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-[1100px] bg-white rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT SIDE: Benefits/Testimonial */}
        <div className="hidden lg:flex lg:w-[40%] bg-slate-900 p-10 flex-col justify-between relative overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2.5 text-white mb-12">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Zap className="w-5 h-5 fill-white text-white" />
              </div>
              <span className="text-[17px] font-black tracking-tight">SkillPay</span>
            </Link>

            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-6">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">Trustpilot 4.9/5</span>
            </div>

            <h2 className="text-[32px] font-black text-white leading-[1.15] mb-6">
              Start Your <br/> 
              <span className="text-primary">Wealth Journey.</span>
            </h2>
            
            <p className="text-slate-400 text-[13.5px] leading-relaxed max-w-[300px]">
              Join the world's most advanced platform for digital income generation and financial architecture.
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-white font-bold text-[13px]">15,000+ Students</p>
                <p className="text-slate-500 text-[11px]">Growing daily worldwide</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-white font-bold text-[13px]">Expert Curriculum</p>
                <p className="text-slate-500 text-[11px]">Designed by industry leaders</p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <img 
                      key={i}
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} 
                      className="w-8 h-8 rounded-full border-2 border-slate-900"
                      alt="Student"
                    />
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Already making <span className="text-white font-bold">$2k+/mo</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Signup Form */}
        <div className="flex-1 p-6 sm:p-10 lg:p-12">
          <div className="max-w-[420px] mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-black text-slate-900 mb-2">Create Account</h1>
              <p className="text-[13px] text-slate-500 font-medium">
                Enter your details to start your 7-day free trial.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <input
                    {...register("fullName", { required: "Name is required" })}
                    type="text"
                    placeholder="John Doe"
                    className={`w-full bg-slate-50 border ${errors.fullName ? 'border-red-500' : 'border-slate-200'} focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-xl px-4 py-3 text-[13px] outline-none transition-all placeholder:text-slate-400 font-medium`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-500 font-bold ml-1">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Email
                  </label>
                  <input
                    {...register("email", { 
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                    })}
                    type="email"
                    placeholder="john@example.com"
                    className={`w-full bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-200'} focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-xl px-4 py-3 text-[13px] outline-none transition-all placeholder:text-slate-400 font-medium`}
                  />
                  {errors.email && <p className="text-[11px] text-red-500 font-bold ml-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-1.5 relative">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Create Password
                </label>
                <div className="relative">
                  <input
                    {...register("password", { 
                      required: "Password is required",
                      minLength: { value: 8, message: "Min 8 characters" }
                    })}
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

              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Referral Code (Optional)
                </label>
                <input
                  {...register("referralCode")}
                  type="text"
                  placeholder="e.g. WEALTH2024"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-xl px-4 py-3 text-[13px] outline-none transition-all placeholder:text-slate-400 font-medium"
                />
              </div>

              <div className="flex items-start gap-2 py-2">
                <input
                  {...register("agreeTerms", { required: true })}
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <label htmlFor="terms" className="text-[11px] text-slate-500 font-medium leading-relaxed select-none cursor-pointer">
                  I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
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
                    Account Created
                  </>
                ) : (
                  <>
                    Create My Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-[13px] text-slate-500 font-medium">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-black hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
