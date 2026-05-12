"use client";

import { AlertCircle, Building2, CreditCard, HandCoins, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

const BALANCE = 12450.5;

const METHODS = [
  {
    id: "bank",
    icon: CreditCard,
    title: "Bank Transfer",
    desc: "Direct bank account transfer",
    fee: "Free",
    duration: "1-3 business days",
  },
  {
    id: "wallet",
    icon: Building2,
    title: "Wallet Payment",
    desc: "Digital wallet transfer",
    fee: "0.5%",
    duration: "Instant",
  },
];

const QUICK_AMOUNTS = [100, 500, 1000, 5000];

type Step = "form" | "loading" | "success";

export default function WithdrawPage() {
  const [selectedMethod, setSelectedMethod] = useState<string>("bank");
  const [amount, setAmount] = useState<string>("");
  const [step, setStep] = useState<Step>("form");
  const [error, setError] = useState<string>("");

  const numericAmount = parseFloat(amount) || 0;
  const isValid = numericAmount >= 10 && numericAmount <= BALANCE;

  const selectedMethodData = METHODS.find((m) => m.id === selectedMethod);
  const fee =
    selectedMethod === "wallet" ? numericAmount * 0.005 : 0;
  const youReceive = numericAmount - fee;

  function handleAmountChange(val: string) {
    setError("");
    setAmount(val);
    const num = parseFloat(val);
    if (val && num < 10) setError("Minimum withdrawal is $10.00");
    else if (val && num > BALANCE)
      setError(`Maximum is $${BALANCE.toLocaleString()}`);
  }

  function handleSubmit() {
    if (!isValid) return;
    setStep("loading");
    setTimeout(() => setStep("success"), 2200);
  }

  function handleReset() {
    setAmount("");
    setError("");
    setSelectedMethod("bank");
    setStep("form");
  }

  /* ── SUCCESS SCREEN ── */
  if (step === "success") {
    return (
      <div className="w-full max-w-lg mx-auto px-4 py-12 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mb-6 animate-bounce-once">
          <CheckCircle2 size={44} className="text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          Withdrawal Requested!
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mb-1">
          <span className="font-semibold text-zinc-800 dark:text-zinc-100">
            ${youReceive.toFixed(2)}
          </span>{" "}
          will be sent via{" "}
          <span className="font-semibold text-zinc-800 dark:text-zinc-100">
            {selectedMethodData?.title}
          </span>
        </p>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-8">
          Est. arrival: {selectedMethodData?.duration}
        </p>

        <div className="w-full bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 text-left mb-8 space-y-3 text-sm">
          {[
            ["Amount Requested", `$${numericAmount.toFixed(2)}`],
            ["Processing Fee", fee > 0 ? `-$${fee.toFixed(2)}` : "Free"],
            ["You Receive", `$${youReceive.toFixed(2)}`],
            ["Method", selectedMethodData?.title ?? ""],
            ["Status", "Pending"],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <span className="text-zinc-500 dark:text-zinc-400">{label}</span>
              <span
                className={`font-semibold ${
                  label === "You Receive"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-zinc-800 dark:text-zinc-100"
                }`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={handleReset}
          className="w-full py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          Make Another Withdrawal
        </button>
      </div>
    );
  }

  /* ── LOADING SCREEN ── */
  if (step === "loading") {
    return (
      <div className="w-full max-w-lg mx-auto px-4 py-24 flex flex-col items-center text-center">
        <Loader2 size={48} className="text-blue-500 animate-spin mb-4" />
        <p className="text-zinc-600 dark:text-zinc-400 font-medium">
          Processing your withdrawal…
        </p>
      </div>
    );
  }

  /* ── MAIN FORM ── */
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">
          Withdraw Funds
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Request a withdrawal from your account balance.
        </p>
      </div>

      {/* Balance Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 mb-8 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30">
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -right-2 w-24 h-24 rounded-full bg-white/5" />
        <div className="flex items-center gap-2 mb-1 relative z-10">
          <HandCoins size={18} className="opacity-80" />
          <p className="text-xs font-semibold tracking-widest uppercase opacity-80">
            Available Balance
          </p>
        </div>
        <p className="text-4xl font-bold relative z-10">
          ${BALANCE.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs opacity-60 mt-1 relative z-10">Updated just now</p>
      </div>

      {/* Method Selection */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
          Withdrawal Method
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {METHODS.map((method) => {
            const Icon = method.icon;
            const active = selectedMethod === method.id;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`relative text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  active
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950/40 shadow-sm"
                    : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 bg-white dark:bg-zinc-900"
                }`}
              >
                {active && (
                  <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-blue-500" />
                )}
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      active
                        ? "bg-blue-500 text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                      {method.title}
                    </p>
                    <p className="text-xs text-zinc-400">{method.desc}</p>
                  </div>
                </div>
                <div className="flex gap-4 mt-1 text-xs">
                  <span className="text-zinc-500">
                    Fee:{" "}
                    <span
                      className={
                        method.fee === "Free"
                          ? "text-emerald-500 font-medium"
                          : "text-zinc-700 dark:text-zinc-300 font-medium"
                      }
                    >
                      {method.fee}
                    </span>
                  </span>
                  <span className="text-zinc-500">
                    Time:{" "}
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                      {method.duration}
                    </span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Amount Input */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
          Amount
        </h3>

        {/* Quick amounts */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {QUICK_AMOUNTS.map((q) => (
            <button
              key={q}
              onClick={() => handleAmountChange(String(q))}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                numericAmount === q
                  ? "bg-blue-500 text-white border-blue-500"
                  : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-blue-300 dark:hover:border-blue-600"
              }`}
            >
              ${q.toLocaleString()}
            </button>
          ))}
          <button
            onClick={() => handleAmountChange(String(BALANCE))}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              numericAmount === BALANCE
                ? "bg-blue-500 text-white border-blue-500"
                : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-blue-300 dark:hover:border-blue-600"
            }`}
          >
            Max
          </button>
        </div>

        {/* Input field */}
        <div
          className={`flex items-center gap-2 bg-white dark:bg-zinc-900 border-2 rounded-xl px-4 py-3 transition-colors ${
            error
              ? "border-red-400 dark:border-red-500"
              : amount && isValid
              ? "border-emerald-400 dark:border-emerald-500"
              : "border-zinc-200 dark:border-zinc-700 focus-within:border-blue-400 dark:focus-within:border-blue-500"
          }`}
        >
          <span className="text-2xl font-bold text-zinc-400">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="0.00"
            min={10}
            max={BALANCE}
            className="flex-1 bg-transparent text-2xl font-bold text-zinc-900 dark:text-white placeholder-zinc-300 focus:outline-none"
          />
          {amount && isValid && (
            <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
          )}
        </div>

        {error ? (
          <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
            <AlertCircle size={12} /> {error}
          </p>
        ) : (
          <p className="text-xs text-zinc-400 mt-1.5">
            Min $10 · Max ${BALANCE.toLocaleString()}
          </p>
        )}
      </div>

      {/* Summary */}
      {numericAmount > 0 && isValid && (
        <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 mb-6 text-sm space-y-2">
          <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
            <span>Withdrawal Amount</span>
            <span className="text-zinc-800 dark:text-zinc-100 font-medium">
              ${numericAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
            <span>Processing Fee</span>
            <span className="text-zinc-800 dark:text-zinc-100 font-medium">
              {fee > 0 ? `-$${fee.toFixed(2)}` : "Free"}
            </span>
          </div>
          <div className="h-px bg-zinc-200 dark:bg-zinc-700" />
          <div className="flex justify-between font-semibold">
            <span className="text-zinc-700 dark:text-zinc-200">You Receive</span>
            <span className="text-emerald-600 dark:text-emerald-400">
              ${youReceive.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="flex gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-3 mb-6">
        <AlertCircle size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-600 dark:text-blue-300">
          Withdrawals are processed within {selectedMethodData?.duration}.{" "}
          {fee > 0 ? `A ${selectedMethodData?.fee} processing fee applies.` : "No processing fee."}
        </p>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-600 text-white py-3.5 rounded-xl font-semibold transition-all duration-200 text-sm disabled:cursor-not-allowed"
      >
        Request Withdrawal
        <ArrowRight size={16} />
      </button>
    </div>
  );
}