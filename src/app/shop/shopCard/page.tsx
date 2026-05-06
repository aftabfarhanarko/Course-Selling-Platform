"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CreditCard, Wallet, Bitcoin, ShieldCheck, CalendarCheck, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const cardSchema = z.object({
  cardNumber: z.string().min(19, "Card number must be 16 digits"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date"),
  cvv: z.string().min(3, "CVV must be 3 digits").max(4),
  cardName: z.string().min(2, "Name is required"),
});

type CardFormData = z.infer<typeof cardSchema>;

export default function PaymentPage() {
  const [method, setMethod] = useState<"card" | "paypal" | "crypto">("card");

  const searchParams = useSearchParams();
  const price = searchParams.get("price") || "$499.00";
  const title = searchParams.get("title") || "SaaS Interface Architect Masterclass";

  // ডিসকাউন্ট ক্যালকুলেশন
  const originalPrice = 999.00;
  const discount = 500.00;
  const finalPrice = 499.00;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
  });

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return cleaned;
  };

  const onSubmit = (data: CardFormData) => {
    console.log("Payment Data:", data);
    alert("Payment submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-[#f6f6fb] px-4 py-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        
        {/* LEFT - Payment Section */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-bold">Payment Method</h2>

          {/* Method Selector */}
          <div className="grid sm:grid-cols-3 gap-4">
            <MethodButton
              active={method === "card"}
              onClick={() => setMethod("card")}
              icon={<CreditCard />}
              title="Card"
            />
            <MethodButton
              active={method === "paypal"}
              onClick={() => setMethod("paypal")}
              icon={<Wallet />}
              title="PayPal"
            />
            <MethodButton
              active={method === "crypto"}
              onClick={() => setMethod("crypto")}
              icon={<Bitcoin />}
              title="Crypto"
            />
          </div>

          {/* CARD FORM */}
          {method === "card" && (
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-6 shadow-sm space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium">Card Number</label>
                <input
                  {...register("cardNumber")}
                  onChange={(e) => setValue("cardNumber", formatCardNumber(e.target.value))}
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  className="w-full border rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Expiry</label>
                  <input
                    {...register("expiry")}
                    onChange={(e) => setValue("expiry", formatExpiry(e.target.value))}
                    inputMode="numeric"
                    placeholder="MM/YY"
                    className="w-full border rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.expiry && (
                    <p className="text-red-500 text-sm mt-1">{errors.expiry.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">CVV</label>
                  <input
                    {...register("cvv")}
                    onInput={(e: any) => {
                      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
                    }}
                    inputMode="numeric"
                    placeholder="123"
                    className="w-full border rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Name on Card</label>
                <input
                  {...register("cardName")}
                  placeholder="John Doe"
                  className="w-full border rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.cardName && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardName.message}</p>
                )}
              </div>

              <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-full font-semibold transition">
                Complete Enrollment
              </button>

              {/* Terms & Conditions */}
              <p className="text-xs text-gray-500 text-center">
                By clicking above, you agree to our Terms of Service and Refund Policy.
              </p>
            </form>
          )}

          {/* PAYPAL */}
          {method === "paypal" && (
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <p className="text-gray-600 mb-4">Continue with PayPal secure checkout</p>
              <button className="w-full bg-[#0070ba] hover:bg-[#003087] text-white py-4 rounded-full font-semibold transition">
                Pay with PayPal
              </button>
            </div>
          )}

          {/* CRYPTO */}
          {method === "crypto" && (
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <p className="text-gray-600 mb-4">Pay securely using Crypto (BTC/ETH/USDT)</p>
              <button className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-full font-semibold transition">
                Pay with Crypto
              </button>
            </div>
          )}
        </div>

        {/* RIGHT - Order Summary (ইমেজের মতো ডিজাইন) */}
        <div className="space-y-6">
          {/* Order Summary Card - সম্পূর্ণ রিডিজাইন */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            
            {/* Course Title */}
            <div className="mb-4">
              <h4 className="font-bold text-gray-900 text-lg">{title}</h4>
              <p className="text-sm text-gray-500">Ultimate Access • Expert Certification</p>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 border-b pb-4">
              <div className="flex justify-between text-gray-600">
                <span>Course Price</span>
                <span>${originalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Special Architect Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="mt-4 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-900">Total</span>
                <div className="text-right">
                  <span className="font-bold text-2xl text-gray-900">${finalPrice.toFixed(2)}</span>
                  <p className="text-xs text-gray-400">(USD | ONE-TIME PAYMENT)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges - ইমেজের মতো সিম্পল ডিজাইন */}
          <div className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
            {/* SSL Secure Checkout */}
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-semibold text-sm text-gray-900">SSL Secure Checkout</p>
                <p className="text-xs text-gray-500">256-bit AES encryption</p>
              </div>
            </div>

            {/* 30-Day Guarantee */}
            <div className="flex items-center gap-3">
              <CalendarCheck className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-semibold text-sm text-gray-900">30-Day Guarantee</p>
                <p className="text-xs text-gray-500">No-questions-asked refund</p>
              </div>
            </div>

            {/* Trusted by Students */}
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-semibold text-sm text-gray-900">Trusted by 15,000+ students</p>
                <p className="text-xs text-gray-500">Top-rated architect program</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MethodButton({ active, onClick, icon, title }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-6 rounded-2xl border flex flex-col items-center gap-3 transition cursor-pointer ${
        active ? "border-blue-600 bg-white shadow-sm" : "bg-gray-50 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{title}</span>
    </button>
  );
}