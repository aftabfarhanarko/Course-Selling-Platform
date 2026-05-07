"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CreditCard,
  Wallet,
  Bitcoin,
  ShieldCheck,
  CalendarCheck,
  Users,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProductStore } from "../../../components/shop/shopArchitecComponets/essensialTolkit";

const cardSchema = z.object({
  cardNumber: z.string().min(19, "Card number must be 16 digits"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date"),
  cvv: z.string().min(3, "CVV must be 3 digits").max(4),
  cardName: z.string().min(2, "Name is required"),
});

type CardFormData = z.infer<typeof cardSchema>;

function PaymentPageContent() {
  const [method, setMethod] = useState<"card" | "paypal" | "crypto">(
    "card",
  );

  const product = useProductStore((state: any) => state.selectProduct);

  const searchParams = useSearchParams();

  const title =
    product?.title ||
    searchParams.get("title") ||
    "SaaS Interface Architect Masterclass";

  const finalPrice =
    product?.price || searchParams.get("price") || "$499.00";

  const originalPrice = 999.0;
  const discount = 500.0;
  const route = useRouter();

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
    console.log(data);
    alert("Payment submitted successfully!");
    route.push("/shop/shopArchitect");

  };

  return (
    <div className="min-h-screen bg-[#f6f6fb] px-4 py-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <h2 className="text-2xl font-bold">Payment Method</h2>

          <div className="grid gap-4 sm:grid-cols-3">
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

          {method === "card" && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 rounded-3xl bg-white p-6 shadow-sm"
            >
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Card Number
                </label>

                <input
                  {...register("cardNumber")}
                  onChange={(e) =>
                    setValue(
                      "cardNumber",
                      formatCardNumber(e.target.value),
                    )
                  }
                  placeholder="4242 4242 4242 4242"
                  className="w-full rounded-xl border px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Expiry
                  </label>

                  <input
                    {...register("expiry")}
                    onChange={(e) =>
                      setValue("expiry", formatExpiry(e.target.value))
                    }
                    placeholder="MM/YY"
                    className="w-full rounded-xl border px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    CVV
                  </label>

                  <input
                    {...register("cvv")}
                    placeholder="123"
                    className="w-full rounded-xl border px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Name on Card
                </label>

                <input
                  {...register("cardName")}
                  placeholder="John Doe"
                  className="w-full rounded-xl border px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button className="w-full rounded-full bg-blue-700 py-4 font-semibold text-white transition hover:bg-blue-800">
                Complete Enrollment
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-bold">Order Summary</h3>

            <h4 className="text-lg font-bold text-gray-900">{title}</h4>

            <div className="mt-6 flex items-center justify-between">
              <span>Total</span>

              <span className="text-2xl font-bold">{finalPrice}</span>
            </div>

            <div className="mt-3 flex items-center justify-between text-green-600">
              <span>Discount</span>

              <span>-${discount.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
            <Info
              icon={<ShieldCheck className="h-5 w-5 text-green-600" />}
              title="SSL Secure Checkout"
              text="256-bit AES encryption"
            />

            <Info
              icon={<CalendarCheck className="h-5 w-5 text-green-600" />}
              title="30-Day Guarantee"
              text="No-questions-asked refund"
            />

            <Info
              icon={<Users className="h-5 w-5 text-green-600" />}
              title="Trusted by 15,000+ students"
              text="Top-rated architect program"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ icon, title, text }: any) {
  return (
    <div className="flex items-center gap-3">
      {icon}

      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>

        <p className="text-xs text-gray-500">{text}</p>
      </div>
    </div>
  );
}

function MethodButton({ active, onClick, icon, title }: any) {
  return (
    <button
      type="button"

      onClick={onClick}
      className={`flex flex-col items-center gap-3 rounded-2xl border p-6 transition ${
        active
          ? "border-blue-600 bg-white shadow-sm"
          : "bg-gray-50 hover:bg-gray-100"
      }`}
    >
      {icon}

      <span className="text-sm font-medium">{title}</span>
    </button>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <PaymentPageContent />
    </Suspense>
  );
}