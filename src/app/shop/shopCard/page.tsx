"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CreditCard, Wallet, Bitcoin } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const cardSchema = z.object({
  cardNumber: z
    .string()
    .min(19, "Card number must be 16 digits"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date"),
  cvv: z
    .string()
    .min(3, "CVV must be 3 digits")
    .max(4),
  cardName: z
    .string()
    .min(2, "Name is required"),
});

type CardFormData = z.infer<typeof cardSchema>;

export default function PaymentPage() {
  const [method, setMethod] = useState<"card" | "paypal" | "crypto">("card");

  const searchParams = useSearchParams();
  const price = searchParams.get("price") || "$0.00";
  const title = searchParams.get("title") || "Course";

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
    alert("Payment submitted successfully");
  };

  return (
    <div className="min-h-screen bg-[#f6f6fb] px-4 py-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* LEFT */}
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-3xl p-6 shadow-sm space-y-6"
            >
              {/* Card Number */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Card Number
                </label>

                <input
                  {...register("cardNumber")}
                  onChange={(e) =>
                    setValue(
                      "cardNumber",
                      formatCardNumber(e.target.value)
                    )
                  }
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  className="w-full border rounded-xl px-4 py-4"
                />

                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>

              {/* Expiry + CVV */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Expiry
                  </label>

                  <input
                    {...register("expiry")}
                    onChange={(e) =>
                      setValue(
                        "expiry",
                        formatExpiry(e.target.value)
                      )
                    }
                    inputMode="numeric"
                    placeholder="MM/YY"
                    className="w-full border rounded-xl px-4 py-4"
                  />

                  {errors.expiry && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.expiry.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">
                    CVV
                  </label>

                  <input
                    {...register("cvv")}
                    onInput={(e: any) => {
                      e.target.value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 4);
                    }}
                    inputMode="numeric"
                    placeholder="123"
                    className="w-full border rounded-xl px-4 py-4"
                  />

                  {errors.cvv && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.cvv.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Name on Card
                </label>

                <input
                  {...register("cardName")}
                  placeholder="John Doe"
                  className="w-full border rounded-xl px-4 py-4"
                />

                {errors.cardName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cardName.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-4 rounded-full font-semibold"
              >
                Pay {price}
              </button>
            </form>
          )}

          {/* PAYPAL */}
          {method === "paypal" && (
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <p className="text-gray-600 mb-4">
                Continue with PayPal secure checkout
              </p>

              <button className="w-full bg-yellow-400 py-4 rounded-full font-semibold">
                Pay with PayPal
              </button>
            </div>
          )}

          {/* CRYPTO */}
          {method === "crypto" && (
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <p className="text-gray-600 mb-4">
                Pay securely using Crypto (BTC/ETH/USDT)
              </p>

              <button className="w-full bg-black text-white py-4 rounded-full font-semibold">
                Pay with Crypto
              </button>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-3xl p-6 shadow-sm h-fit">
          <h3 className="text-xl font-bold mb-6">Order Summary</h3>

          <h4 className="font-semibold">{title}</h4>

          <div className="mt-6 border-t pt-6 flex justify-between">
            <span>Total</span>
            <span className="font-bold text-2xl">{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MethodButton({
  active,
  onClick,
  icon,
  title,
}: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-6 rounded-2xl border flex flex-col items-center gap-3 ${
        active
          ? "border-blue-600 bg-white"
          : "bg-gray-50"
      }`}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
}