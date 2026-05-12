"use client";

import React, { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import SignupLotti from "@/components/signup/Lotti";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  Loader2,
  Zap,
  Star,
  Users,
  Award,
  Camera,
  Upload,
} from "lucide-react";

type SignupFormData = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  photo: FileList;
};

export default function SignupPage(): React.JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [countries, setCountries] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
    },
  });

  useEffect(() => {
    let active = true;

    fetch("/cuntrey.json")
      .then((res) => res.json())
      .then((data: Array<{ name?: unknown }>) => {
        if (!active) return;
        const names = data
          .map((x) => (typeof x?.name === "string" ? x.name : null))
          .filter((x): x is string => !!x);
        const withOther = names.includes("Other") ? names : [...names, "Other"];
        setCountries(withOther);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));
    console.log("Signup data:", data);
    setSuccess(true);
    
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full  md:max-w-9/12 mx-auto">
        <div className="flex flex-col lg:flex-row bg-white/80 backdrop-blur rounded-3xl  overflow-hidden border border-slate-100">
          <div className="lg:w-1/2 p-8 sm:p-10 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900 flex items-center justify-center">
            <SignupLotti />
          </div>

          <div className="flex-1 p-6 sm:p-10 lg:p-10 overflow-y-auto">
            <div className="max-w-[420px] mx-auto">
              <div className="mb-6">
                <h1 className="text-2xl font-black text-slate-900 mb-1.5">
                  Create Account
                </h1>
                <p className="text-[13px] text-slate-500 font-medium">
                  Enter your details to start your 7-day free trial.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Photo Upload */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Profile Photo
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-slate-50 border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 rounded-xl px-4 py-4 cursor-pointer transition-all flex items-center gap-4 group"
                  >
                    {/* Preview or placeholder */}
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 border-2 border-white shadow-md shrink-0 flex items-center justify-center">
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                        {photoName ? photoName : "Click to upload photo"}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        JPG, PNG or GIF · Max 5MB
                      </p>
                    </div>
                    <Upload className="w-4 h-4 text-slate-300 group-hover:text-blue-400 transition-colors shrink-0" />
                  </div>
                  {/* Hidden real file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </div>

                {/* Full Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Full Name
                    </label>
                    <input
                      {...register("fullName", {
                        required: "Name is required",
                      })}
                      type="text"
                      placeholder="John Doe"
                      className={`w-full bg-slate-50 border ${errors.fullName ? "border-red-500" : "border-slate-200"} focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-xl px-4 py-3 text-[13px] outline-none transition-all placeholder:text-slate-400 font-medium`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-red-500 font-bold ml-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Email
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
                      className={`w-full bg-slate-50 border ${errors.email ? "border-red-500" : "border-slate-200"} focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-xl px-4 py-3 text-[13px] outline-none transition-all placeholder:text-slate-400 font-medium`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-500 font-bold ml-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone + Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Phone Number
                    </label>
                    <input
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: {
                          value: /^[+]?[\d\s\-()]{7,15}$/,
                          message: "Invalid phone",
                        },
                      })}
                      type="tel"
                      placeholder="+880 1700 000000"
                      className={`w-full bg-slate-50 border ${errors.phone ? "border-red-500" : "border-slate-200"} focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-xl px-4 py-3 text-[13px] outline-none transition-all placeholder:text-slate-400 font-medium`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-500 font-bold ml-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Country
                    </label>
                    <Controller
                      control={control}
                      name="country"
                      rules={{ required: "Country is required" }}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            className={`w-full bg-slate-50 border ${errors.country ? "border-red-500" : "border-slate-200"} focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-xl px-4 py-3 text-[13px] outline-none transition-all text-slate-700 font-medium cursor-pointer`}
                          >
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.country && (
                      <p className="text-[11px] text-red-500 font-bold ml-1">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || success}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none text-[13px] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : success ? (
                    <>
                      <Check className="w-4 h-4" />
                      Account Created!
                    </>
                  ) : (
                    <>
                      Create My Account
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-[13px] text-slate-500 font-medium">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-blue-600 font-black hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
