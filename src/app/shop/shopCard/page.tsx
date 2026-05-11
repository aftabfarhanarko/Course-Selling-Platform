"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProductStore } from "../../../components/shop/shopArchitecComponets/essensialTolkit";

const cardSchema = z.object({
  cardNumber: z.string().min(19, "Card number must be 16 digits"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date"),
  cvv: z.string().min(3, "CVV must be 3 digits").max(4),
  cardName: z.string().min(2, "Name is required"),
});

type CardFormData = z.infer<typeof cardSchema>;

function PaymentPageContent() {
  const [method, setMethod] = useState<"card" | "paypal" | "crypto">("card");

  const product = useProductStore((state: any) => state.selectProduct);
  const searchParams = useSearchParams();

  const title =
    product?.title ||
    searchParams.get("title") ||
    "SaaS Interface Architect Masterclass";

  const finalPrice = product?.price || searchParams.get("price") || "$499.00";

  const originalPrice = 999.0;
  const discount = 500.0;
  const route = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CardFormData>({ resolver: zodResolver(cardSchema) });

  const formatCardNumber = (value: string) =>
    value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    return cleaned.length >= 3
      ? `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`
      : cleaned;
  };

  const onSubmit = (data: CardFormData) => {
    console.log(data);
    route.push("/shop/shopArchitect");
  };

  return (
    <div className="min-h-screen bg-[#f0f2f8] px-4 pt-22 md:pt-30 py-10 font-sans">
      <div className="mx-auto grid max-w-[960px] gap-6 lg:grid-cols-[1fr_340px]">
        {/* ── LEFT ── */}
        <div className="flex flex-col gap-5">
          {/* Step label + title */}
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#e8eaf6] px-3 py-1 text-[0.65rem] font-semibold tracking-widest text-[#3d52d5] uppercase">
              Step 1
            </span>
            <h2 className="text-xl font-semibold text-[#0f1629]">
              Payment Method
            </h2>
          </div>

          {/* Method selector */}
          <div className="grid grid-cols-3 gap-3">
            {(["card", "paypal", "crypto"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMethod(m)}
                className={`flex flex-col items-center gap-2.5 rounded-2xl border py-5 transition-all duration-150 ${
                  method === m
                    ? "border-blue-600 bg-white shadow-[0_0_0_1px_#2563eb]"
                    : "border-[#e2e5f0] bg-white hover:bg-blue-50/40"
                }`}
              >
                {m === "card" && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={method === "card" ? "#2563eb" : "#64748b"}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="1" y="4" width="22" height="16" rx="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                )}
                {m === "paypal" && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={method === "paypal" ? "#2563eb" : "#64748b"}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 10h20" />
                    <path d="M6 15h4" />
                    <path d="M14 15h.01" />
                  </svg>
                )}
                {m === "crypto" && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={method === "crypto" ? "#2563eb" : "#64748b"}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L10.5 19.25m1.267-.161L10.5 19.25m1.267-.161 1.6-9.084M10.5 19.25l-1.267-7.178M12.367 9.005c4.924.868 6.14-6.025 1.217-6.894L12.367 9.005zm0 0-1.6 9.084M11.1 2.111 9.833 9.289" />
                    <path d="M9.833 9.289 8.566 16.467" />
                  </svg>
                )}
                <span
                  className={`text-xs font-semibold capitalize ${method === m ? "text-blue-600" : "text-[#64748b]"}`}
                >
                  {m === "card" ? "Card" : m === "paypal" ? "PayPal" : "Crypto"}
                </span>
              </button>
            ))}
          </div>

          {/* Card Form */}
          {method === "card" && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl bg-white border border-[#e8eaf0] p-6 flex flex-col gap-5"
            >
              {/* Card Number */}
              <div>
                <label className="mb-1.5 block text-[0.7rem] font-semibold tracking-widest text-[#9aa3b5] uppercase">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    {...register("cardNumber")}
                    onChange={(e) =>
                      setValue("cardNumber", formatCardNumber(e.target.value))
                    }
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    className="w-full rounded-xl border border-[#e2e5f0] bg-[#f8f9fc] px-4 py-3.5 text-sm text-[#0f1629] placeholder:text-[#c5cad8] focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2">
                    <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                      <rect width="22" height="16" rx="3" fill="#e8eaf6" />
                      <rect x="1" y="4" width="20" height="3" fill="#bfc6e0" />
                    </svg>
                  </span>
                </div>
                {errors.cardNumber && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>

              {/* Expiry + CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-[0.7rem] font-semibold tracking-widest text-[#9aa3b5] uppercase">
                    Expiry Date
                  </label>
                  <input
                    {...register("expiry")}
                    onChange={(e) =>
                      setValue("expiry", formatExpiry(e.target.value))
                    }
                    placeholder="MM / YY"
                    maxLength={5}
                    className="w-full rounded-xl border border-[#e2e5f0] bg-[#f8f9fc] px-4 py-3.5 text-sm text-[#0f1629] placeholder:text-[#c5cad8] focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                  />
                  {errors.expiry && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.expiry.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-[0.7rem] font-semibold tracking-widest text-[#9aa3b5] uppercase">
                    CVV
                  </label>
                  <input
                    {...register("cvv")}
                    placeholder="• • •"
                    maxLength={4}
                    type="password"
                    className="w-full rounded-xl border border-[#e2e5f0] bg-[#f8f9fc] px-4 py-3.5 text-sm text-[#0f1629] placeholder:text-[#c5cad8] focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                  />
                  {errors.cvv && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.cvv.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Name on Card */}
              <div>
                <label className="mb-1.5 block text-[0.7rem] font-semibold tracking-widest text-[#9aa3b5] uppercase">
                  Name on Card
                </label>
                <input
                  {...register("cardName")}
                  placeholder="Full name as it appears"
                  className="w-full rounded-xl border border-[#e2e5f0] bg-[#f8f9fc] px-4 py-3.5 text-sm text-[#0f1629] placeholder:text-[#c5cad8] focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                />
                {errors.cardName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.cardName.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-full bg-[#1a3bd4] py-4 text-sm font-semibold text-white hover:bg-blue-800 active:scale-[0.99] transition-all duration-150 shadow-[0_4px_20px_rgba(26,59,212,0.3)]"
              >
                Complete Enrollment
              </button>

              <p className="text-center text-[0.68rem] text-[#aab0c0]">
                By clicking above, you agree to our{" "}
                <span className="underline cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="underline cursor-pointer">Refund Policy</span>.
              </p>
            </form>
          )}

          {/* PayPal placeholder */}
          {method === "paypal" && (
            <div className="rounded-2xl bg-white border border-[#e8eaf0] p-10 flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </div>
              <p className="text-sm text-[#7a839a] text-center">
                You will be redirected to PayPal to complete your payment
                securely.
              </p>
              <button
                onClick={onSubmit as any}
                className="px-8 py-3 rounded-full bg-[#0070ba] text-white text-sm font-semibold hover:bg-[#005ea6] transition"
              >
                Continue with PayPal
              </button>
            </div>
          )}

          {/* Crypto placeholder */}
          {method === "crypto" && (
            <div className="rounded-2xl bg-white border border-[#e8eaf0] p-10 flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L10.5 19.25m1.267-.161 1.6-9.084M12.367 9.005c4.924.868 6.14-6.025 1.217-6.894L12.367 9.005z" />
                </svg>
              </div>
              <p className="text-sm text-[#7a839a] text-center">
                Pay with Bitcoin, Ethereum, or other cryptocurrencies via
                Coinbase Commerce.
              </p>
              <button
                onClick={onSubmit as any}
                className="px-8 py-3 rounded-full bg-[#0052ff] text-white text-sm font-semibold hover:bg-blue-700 transition"
              >
                Pay with Crypto
              </button>
            </div>
          )}
        </div>

        {/* ── RIGHT ── */}
        <div className="flex flex-col gap-4">
          {/* Order Summary Card */}
          <div className="rounded-2xl bg-white border border-[#e8eaf0] p-5">
            <h3 className="text-base font-semibold text-[#0f1629] mb-4">
              Order Summary
            </h3>

            {/* Course row */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-[60px] h-[60px] rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-[#0f1629] to-[#1a3bd4] flex items-center justify-center">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div>
                <p className="text-[0.82rem] font-semibold text-[#0f1629] leading-snug">
                  {title}
                </p>
                <p className="text-[0.7rem] text-[#7a839a] mt-0.5">
                  Lifetime Access • Expert Certification
                </p>
              </div>
            </div>

            {/* Price rows */}
            <div className="border-t border-[#f0f2f8] pt-4 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-[0.78rem] text-[#7a839a]">
                  Course Price
                </span>
                <span className="text-[0.82rem] font-medium text-[#0f1629]">
                  ${originalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[0.78rem] font-medium text-green-600">
                  Special Architect Discount
                </span>
                <span className="text-[0.82rem] font-medium text-green-600">
                  -${discount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-[#f0f2f8] mt-4 pt-4 flex justify-between items-center">
              <span className="text-sm font-semibold text-[#0f1629]">
                Total
              </span>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{finalPrice}</p>
                <p className="text-[0.6rem] tracking-widest text-[#aab0c0] uppercase">
                  USD (One-Time Payment)
                </p>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="rounded-2xl bg-white border border-[#e8eaf0] p-5 flex flex-col gap-4">
            <TrustItem
              color="green"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              }
              title="SSL Secure Checkout"
              text="256-bit AES encryption"
            />
            <TrustItem
              color="amber"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <polyline points="9 16 11 18 15 14" />
                </svg>
              }
              title="30-Day Guarantee"
              text="No-questions-asked refund"
            />
            <TrustItem
              color="blue"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
              title="Trusted by 15,000+ students"
              text="Top-rated architect program"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustItem({
  icon,
  title,
  text,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  color: "green" | "amber" | "blue";
}) {
  const bgMap = {
    green: "bg-green-50",
    amber: "bg-amber-50",
    blue: "bg-blue-50",
  };
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-9 h-9 rounded-xl ${bgMap[color]} flex items-center justify-center shrink-0`}
      >
        {icon}
      </div>
      <div>
        <p className="text-[0.8rem] font-semibold text-[#0f1629]">{title}</p>
        <p className="text-[0.7rem] text-[#7a839a]">{text}</p>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-[#7a839a]">
          Loading...
        </div>
      }
    >
      <PaymentPageContent />
    </Suspense>
  );
}
