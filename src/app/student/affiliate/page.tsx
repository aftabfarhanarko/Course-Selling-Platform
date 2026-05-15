"use client";

import {
  Copy,
  Share2,
  TrendingUp,
  Users,
  Check,
  ChevronRight,
  Gift,
  LinkIcon,
  Twitter,
  Facebook,
  Mail,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

const REFERRAL_LINK = "https://course-platform.com/ref/alex-rivera-123";

const STATS = [
  { label: "Total Referrals", value: "45", icon: Users, change: "+5 this month", color: "text-blue-500" },
  { label: "Commission Earned", value: "$1,250", icon: TrendingUp, change: "+$200 this month", color: "text-emerald-500" },
  { label: "Conversion Rate", value: "32%", icon: Share2, change: "+4% this month", color: "text-violet-500" },
];

const TIERS = [
  { label: "Bronze", min: 0, max: 10, rate: "10%", color: "bg-amber-600" },
  { label: "Silver", min: 10, max: 30, rate: "15%", color: "bg-zinc-400" },
  { label: "Gold", min: 30, max: 999, rate: "20%", color: "bg-yellow-400" },
];

const REFERRAL_DATA = [
  { name: "Sarah Johnson", joined: "2 days ago", commission: "$50", status: "Active", avatar: "SJ", gradient: "from-pink-400 to-rose-500" },
  { name: "Marcus Lee", joined: "4 days ago", commission: "$50", status: "Active", avatar: "ML", gradient: "from-blue-400 to-indigo-500" },
  { name: "Priya Patel", joined: "5 days ago", commission: "$50", status: "Pending", avatar: "PP", gradient: "from-emerald-400 to-teal-500" },
  { name: "Tom Wilson", joined: "7 days ago", commission: "$50", status: "Active", avatar: "TW", gradient: "from-orange-400 to-amber-500" },
  { name: "Lena Koch", joined: "9 days ago", commission: "$50", status: "Paid", avatar: "LK", gradient: "from-violet-400 to-purple-500" },
];

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Paid: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

type Tab = "overview" | "referrals" | "tiers";

export default function AffiliatePage() {
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  function handleCopy() {
    navigator.clipboard.writeText(REFERRAL_LINK).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleShare(platform: string) {
    const encodedLink = encodeURIComponent(REFERRAL_LINK);
    const encodedMsg = encodeURIComponent("Join this amazing course platform and get started today!");
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedMsg}&url=${encodedLink}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`,
      email: `mailto:?subject=Join%20Course%20Platform&body=${encodedMsg}%20${encodedLink}`,
    };
    window.open(urls[platform], "_blank");
    setShareOpen(false);
  }

  const currentTier = TIERS.find((t) => 45 >= t.min && 45 < t.max) ?? TIERS[2];
  const nextTier = TIERS[TIERS.indexOf(currentTier) + 1];

  const TABS: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "referrals", label: "Referrals" },
    { id: "tiers", label: "Commission Tiers" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">
          Affiliate Program
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Earn commissions by referring friends and colleagues.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <Icon size={14} className={stat.color} />
              </div>
              <p className="text-xl font-bold text-zinc-900 dark:text-white leading-none mb-1">
                {stat.value}
              </p>
              <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide leading-tight">
                {stat.label}
              </p>
              <p className="text-[10px] text-emerald-500 mt-1">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Referral Link */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <LinkIcon size={13} className="text-blue-500" />
          <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wide">
            Your Referral Link
          </h3>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 overflow-hidden">
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
              {REFERRAL_LINK}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
              copied
                ? "bg-emerald-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Share Buttons */}
        <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <p className="text-[10px] text-zinc-400 uppercase tracking-wide mb-2">
            Share via
          </p>
          <div className="flex gap-2">
            {[
              { id: "twitter", Icon: Twitter, label: "Twitter", bg: "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800" },
              { id: "facebook", Icon: Facebook, label: "Facebook", bg: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800" },
              { id: "email", Icon: Mail, label: "Email", bg: "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700" },
            ].map(({ id, Icon, label, bg }) => (
              <button
                key={id}
                onClick={() => handleShare(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-colors ${bg}`}
              >
                <Icon size={12} />
                {label}
              </button>
            ))}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: "Join Course Platform", url: REFERRAL_LINK });
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium border bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800 transition-colors ml-auto"
            >
              <ExternalLink size={12} />
              More
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {activeTab === "overview" && (
        <div className="space-y-3">
          {/* Current Tier */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Gift size={14} className="text-yellow-500" />
                <p className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wide">
                  Current Tier
                </p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${currentTier.color}`}>
                {currentTier.label}
              </span>
            </div>
            <div className="flex items-end justify-between mb-2">
              <div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {currentTier.rate}
                </p>
                <p className="text-[11px] text-zinc-400">commission rate</p>
              </div>
              {nextTier && (
                <div className="text-right">
                  <p className="text-[11px] text-zinc-500">
                    Next: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{nextTier.label} ({nextTier.rate})</span>
                  </p>
                  <p className="text-[10px] text-zinc-400">
                    {nextTier.min - 45} more referrals needed
                  </p>
                </div>
              )}
            </div>
            {nextTier && (
              <>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 mt-2">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-700"
                    style={{ width: `${Math.min(((45 - currentTier.min) / (nextTier.min - currentTier.min)) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-[10px] text-zinc-400 mt-1">
                  {45 - currentTier.min} / {nextTier.min - currentTier.min} referrals to {nextTier.label}
                </p>
              </>
            )}
          </div>

          {/* How it works */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <p className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wide mb-3">
              How It Works
            </p>
            <div className="space-y-3">
              {[
                { step: "1", title: "Share your link", desc: "Copy and share your unique referral link" },
                { step: "2", title: "Friend signs up", desc: "They register using your link" },
                { step: "3", title: "Earn commission", desc: "Get paid when they make a purchase" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.step}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">{item.title}</p>
                    <p className="text-[11px] text-zinc-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Referrals */}
      {activeTab === "referrals" && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            <p className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wide">
              Recent Referrals
            </p>
            <span className="text-[10px] text-zinc-400">{REFERRAL_DATA.length} total</span>
          </div>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {REFERRAL_DATA.map((ref, i) => (
              <div
                key={i}
                className="px-4 py-3 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${ref.gradient} flex items-center justify-center text-white font-bold text-[10px]`}
                  >
                    {ref.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-900 dark:text-white">
                      {ref.name}
                    </p>
                    <p className="text-[10px] text-zinc-400">{ref.joined}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${STATUS_STYLES[ref.status]}`}>
                    {ref.status}
                  </span>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {ref.commission}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-zinc-100 dark:border-zinc-800">
            <button className="w-full flex items-center justify-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              View All Referrals <ChevronRight size={12} />
            </button>
          </div>
        </div>
      )}

      {/* Tab: Tiers */}
      {activeTab === "tiers" && (
        <div className="space-y-3">
          {TIERS.map((tier) => {
            const isActive = currentTier.label === tier.label;
            return (
              <div
                key={tier.label}
                className={`bg-white dark:bg-zinc-900 rounded-xl border-2 p-4 transition-all ${
                  isActive
                    ? "border-blue-400 dark:border-blue-600"
                    : "border-zinc-200 dark:border-zinc-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${tier.color}`} />
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">
                      {tier.label}
                    </p>
                    {isActive && (
                      <span className="text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-semibold">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-lg font-bold text-zinc-900 dark:text-white">
                    {tier.rate}
                  </p>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">
                  {tier.max === 999
                    ? `${tier.min}+ referrals`
                    : `${tier.min}–${tier.max} referrals`}
                </p>
              </div>
            );
          })}
          <p className="text-[11px] text-zinc-400 text-center pt-1">
            Commission rates apply to all purchases made by referred users.
          </p>
        </div>
      )}
    </div>
  );
}