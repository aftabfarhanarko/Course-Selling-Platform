"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  Users,
  Layers,
  GraduationCap,
  Wallet,
  Banknote,
  ClipboardList,
  CreditCard,
  ShoppingBag,
  BarChart,
  LogOut,
  X,
  ChevronDown,
  Sparkles,
  PieChart,
  BookOpen,
  Search,
  User,
  Shield,
  Briefcase,
  UserPlus,
  Wrench,
  Package,
  Globe,
  Receipt,
  Mail,
  Ticket,
  MessageSquare,
  Bot,
  Truck,
  Zap,
  Coins,
  Heart,
  HelpCircle,
  Building2,
  Trash2,
  PlusCircle,
  MapPin,
  UserCheck,
} from "lucide-react";
import { LiaCloudShowersHeavySolid } from "react-icons/lia";
import { useLogoutMutation } from "@/lib/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { baseApi } from "@/lib/api/baseApi";
import { toast } from "sonner";
import type { RootState } from "@/store";
import { motion, AnimatePresence } from "framer-motion";

const navGroups = [
  {
    label: "Overview",
    icon: PieChart,
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Enrollments", href: "/admin/enrollments", icon: ClipboardList },
    ],
  },
  {
    label: "People",
    icon: Users,
    items: [
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Instructors", href: "/admin/instructor", icon: GraduationCap },
    ],
  },
  {
    label: "Finance",
    icon: Wallet,
    items: [
      { label: "Wallet", href: "/admin/wallet", icon: Wallet },
      {
        label: "Payment Methods",
        href: "/admin/paymentMethods",
        icon: CreditCard,
      },
      { label: "Withdrawals", href: "/admin/withdraw", icon: Banknote },
    ],
  },
  {
    label: "Content",
    icon: BookOpen,
    items: [
      { label: "Products", href: "/admin/products", icon: ShoppingBag },
      { label: "Shop", href: "/admin/shop", icon: ShoppingBag },
      { label: "Category", href: "/admin/category", icon: Layers },
      {
        label: "Courses",
        href: "/admin/courses",
        icon: LiaCloudShowersHeavySolid,
      },
      { label: "Percentage", href: "/admin/percentage", icon: BarChart },
    ],
  },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [openGroups, setOpenGroups] = useState<string[]>(["Overview"]);

  const authUser = useSelector((state: RootState) => state.auth.user);

  const displayName =
    String(
      authUser?.name ?? authUser?.fullName ?? authUser?.username ?? "",
    ).trim() || "Admin";
  const email = String(authUser?.email ?? "").trim();
  const country = String(authUser?.country ?? "").trim();

  const avatarUrlRaw =
    authUser?.photo ??
    authUser?.avatar ??
    authUser?.image ??
    authUser?.profileImage ??
    null;
  const avatarUrl =
    typeof avatarUrlRaw === "string" && avatarUrlRaw.trim().length > 0
      ? avatarUrlRaw.trim()
      : null;

  const handleLogout = async () => {
    if (isLoggingOut) return;
    const toastId = toast.loading("Signing out...");
    try {
      await logoutApi().unwrap();
    } catch {
    } finally {
      dispatch(logout());
      dispatch(baseApi.util.resetApiState());
      toast.success("Signed out", { id: toastId });
      onClose?.();
      router.replace("/");
    }
  };

  // Multi-word search matching
  const isSearchMatch = (text: string, query: string) => {
    if (!query.trim()) return true;
    const cleanText = text.toLowerCase();
    const queryTokens = query.toLowerCase().trim().split(/\s+/);
    return queryTokens.every((token) => cleanText.includes(token));
  };

  // Filter menu items by search query
  const filteredNavGroups = useMemo(() => {
    if (!searchQuery.trim()) return navGroups;

    return navGroups
      .map((group) => {
        const matchedItems = group.items.filter(
          (item) =>
            isSearchMatch(item.label, searchQuery) ||
            isSearchMatch(item.href, searchQuery),
        );
        if (matchedItems.length > 0 || isSearchMatch(group.label, searchQuery)) {
          return {
            ...group,
            items: matchedItems.length > 0 ? matchedItems : group.items,
          };
        }
        return null;
      })
      .filter((g): g is typeof navGroups[0] => g !== null);
  }, [searchQuery]);

  // Keep active group open without closing previously opened groups
  useEffect(() => {
    if (searchQuery.trim()) {
      const matched = navGroups.find(
        (g) =>
          isSearchMatch(g.label, searchQuery) ||
          g.items.some(
            (i) =>
              isSearchMatch(i.label, searchQuery) ||
              isSearchMatch(i.href, searchQuery),
          ),
      );
      if (matched && !openGroups.includes(matched.label)) {
        setOpenGroups((prev) => [...prev, matched.label]);
      }
    } else {
      const activeGroup = navGroups.find((g) =>
        g.items.some(
          (item) =>
            pathname === item.href || pathname?.startsWith(item.href + "/"),
        ),
      );
      if (activeGroup && !openGroups.includes(activeGroup.label)) {
        setOpenGroups((prev) => [...prev, activeGroup.label]);
      }
    }
  }, [pathname, searchQuery]);

  return (
    <aside
      className="
        relative z-50 flex h-full w-[260px] flex-col
        border-r-[2px] border-[#5B50E6]/15 bg-slate-50/40 shadow-[6px_0_24px_rgba(0,0,0,0.015)]
      "
    >
      {/* ─── BRAND LOGO & SUPER ADMIN BADGE HEADER ─── */}
      <div className="p-5 pb-3 flex flex-col items-start gap-2.5 relative z-10 border-b border-slate-100/80">
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative text-[#5B50E6] group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="w-8 h-8 text-[#5B50E6] stroke-[2.2]" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#111827]">
              Edu<span className="text-[#5B50E6]">Nova</span>
            </span>
          </Link>

          {/* Close button – mobile only */}
          {onClose && (
            <button
              onClick={onClose}
              className="flex cursor-pointer items-center justify-center rounded-xl bg-slate-100 p-1.5 text-slate-400 transition-all hover:bg-slate-200 hover:text-slate-600 lg:hidden"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Super Admin Badge Pill */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50/80 border border-[#5B50E6]/30 shadow-2xs">
          <span className="text-[10px] font-black text-[#5B50E6] tracking-widest uppercase">
            SUPER ADMIN
          </span>
        </div>
      </div>

      {/* ─── SEARCH MENU BAR ─── */}
      <div className="px-4 pt-4 pb-2 relative z-10">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200/80 rounded-2xl py-2.5 pl-10 pr-4 text-xs font-bold text-slate-700 placeholder:text-slate-400/80 outline-none focus:border-[#5B50E6] focus:ring-4 focus:ring-[#5B50E6]/10 transition-all shadow-sm focus:shadow-[0_0_20px_-3px_rgba(91,80,230,0.15)]"
          />
        </div>
      </div>

      {/* ─── ACCORDION TREE NAVIGATION MENU ─── */}
      <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto custom-sidebar-scrollbar relative z-10">
        {/* 1. Home Page Item */}
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group border border-transparent text-slate-600 hover:bg-[#5B50E6]/5 hover:text-[#5B50E6] hover:translate-x-1 font-semibold text-[14px]"
        >
          <Home size={18} className="text-slate-400 group-hover:text-[#5B50E6] transition-colors" />
          <span>Home Page</span>
        </Link>
        {filteredNavGroups.map((group, index) => {
          const isExpanded = openGroups.includes(group.label);
          const containsActive = group.items.some(
            (item) =>
              pathname === item.href || pathname?.startsWith(item.href + "/"),
          );

          const handleToggle = () => {
            setOpenGroups((prev) =>
              prev.includes(group.label)
                ? prev.filter((g) => g !== group.label)
                : [...prev, group.label],
            );
          };

          return (
            <div key={index} className="space-y-1">
              {/* Group Header Button */}
              <button
                onClick={handleToggle}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group border relative ${
                  containsActive
                    ? isExpanded
                      ? "bg-[#5B50E6]/5 border-[#5B50E6]/15 text-[#5B50E6] font-extrabold shadow-sm"
                      : "bg-gradient-to-r from-[#5B50E6] to-[#4D42DB] text-white font-extrabold shadow-md shadow-[#5B50E6]/20 scale-[1.01] border-transparent"
                    : "border-transparent text-slate-600 hover:bg-[#5B50E6]/5 hover:text-[#5B50E6] hover:translate-x-1 font-semibold"
                }`}
              >
                {containsActive && isExpanded && (
                  <div className="absolute left-1.5 w-1 h-5 bg-[#5B50E6] rounded-full" />
                )}
                {containsActive && !isExpanded && (
                  <div className="absolute left-1.5 w-1 h-5 bg-white rounded-full" />
                )}
                <div className="flex items-center gap-3">
                  <group.icon
                    size={18}
                    className={
                      containsActive
                        ? isExpanded
                          ? "text-[#5B50E6]"
                          : "text-white"
                        : "text-slate-400 group-hover:text-slate-600 transition-colors"
                    }
                  />
                  <span className="text-[14px]">{group.label}</span>
                </div>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    containsActive
                      ? isExpanded
                        ? "text-[#5B50E6]/70"
                        : "text-white/70"
                      : "text-slate-400"
                  } ${isExpanded ? "rotate-180" : ""}`}
                />
              </button>

              {/* Collapsible Sub-menu Tree */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="relative pl-6 space-y-1 overflow-hidden"
                  >
                    {/* Trunk Line */}
                    <div className="absolute left-[27px] top-0 bottom-4 w-[1.5px] bg-[#5B50E6]/25" />

                    {group.items.map((item, cIdx) => {
                      const isChildActive =
                        pathname === item.href ||
                        pathname?.startsWith(item.href + "/");
                      const ItemIcon = item.icon;

                      return (
                        <Link
                          key={cIdx}
                          href={item.href}
                          onClick={onClose}
                          className={`flex items-center gap-2.5 pl-9 pr-3 py-2.5 rounded-xl text-[13px] font-bold transition-all relative group border ${
                            isChildActive
                              ? "bg-gradient-to-r from-[#5B50E6] to-[#4D42DB] text-white shadow-md shadow-[#5B50E6]/15 border-transparent scale-[1.01]"
                              : "border-transparent text-slate-600 hover:bg-[#5B50E6]/5 hover:text-[#5B50E6] hover:translate-x-1.5"
                          }`}
                        >
                          {/* Branch Connector Hook */}
                          <div className="absolute left-[27px] top-0 w-3.5 h-[20px] border-l-[1.5px] border-b-[1.5px] border-[#5B50E6]/30 rounded-bl-lg pointer-events-none" />

                          {isChildActive && (
                            <div className="absolute left-[25px] top-[14px] w-1.5 h-1.5 bg-white rounded-full ring-2 ring-[#5B50E6] z-10" />
                          )}

                          <ItemIcon
                            size={16}
                            className={
                              isChildActive
                                ? "text-white shrink-0"
                                : "text-slate-400 group-hover:text-slate-600 transition-colors shrink-0"
                            }
                          />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* ─── BOTTOM LOGOUT & VERSION CONTROLS ─── */}
      <div className="p-3 border-t border-slate-100 bg-gradient-to-b from-white/40 to-slate-50/60 relative z-10 space-y-1.5">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-3 px-3.5 py-2.5 text-slate-600 hover:text-rose-600 w-full rounded-2xl bg-white border border-slate-200/70 hover:border-rose-200 hover:bg-rose-50/50 transition-all duration-200 shadow-xs cursor-pointer group disabled:opacity-50"
        >
          <div className="p-1.5 rounded-xl bg-slate-100 group-hover:bg-rose-100/80 text-slate-500 group-hover:text-rose-600 transition-colors shrink-0">
            <LogOut size={16} />
          </div>
          <span className="text-xs font-black text-slate-700 group-hover:text-rose-600 transition-colors">
            {isLoggingOut ? "Signing Out..." : "Sign Out"}
          </span>
        </button>

        <div className="mt-1 text-center">
          <span className="text-[10px] font-bold tracking-wider text-slate-300 uppercase">
            ADMIN PANEL · V2.0
          </span>
        </div>
      </div>
    </aside>
  );
}
