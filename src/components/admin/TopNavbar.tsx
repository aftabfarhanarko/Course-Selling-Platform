"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  Menu,
  Search,
  Maximize,
  Minimize,
  LogOut,
  User,
  ChevronDown,
  CheckCheck,
  Clock,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "@/lib/api/authApi";
import { logout } from "@/store/slices/authSlice";
import { baseApi } from "@/lib/api/baseApi";
import { RootState } from "@/store";
import { toast } from "sonner";
import {
  useGetNotificationsQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from "@/lib/api/notificationApi";

export default function TopNavbar({
  onMenuClick,
  onClose,
}: {
  onMenuClick?: () => void;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();
  const { data: notifData, isLoading: isNotifLoading } = useGetNotificationsQuery();
  const [markAllRead] = useMarkAllNotificationsReadMutation();
  const [markRead] = useMarkNotificationReadMutation();

  const notifications = notifData?.data || [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const authUser = useSelector((state: RootState) => state.auth.user);

  const displayName =
    String(
      authUser?.name ?? authUser?.fullName ?? authUser?.username ?? "",
    ).trim() || "Aftab Farhan";
  const email = String(authUser?.email ?? "").trim();
  const country = String(authUser?.country ?? "").trim();
  const roleName = String(authUser?.role ?? "SUPER ADMIN")
    .replace(/_/g, " ")
    .toUpperCase();

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

  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFsChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        notifRef.current &&
        !notifRef.current.contains(e.target as Node)
      ) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

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
      setDropdownOpen(false);
      onClose?.();
      router.replace("/");
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200/70 bg-white/95 backdrop-blur-md px-4 sm:px-8 shadow-2xs">
      {/* ── Left: Mobile Hamburger & Search Bar ── */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          onClick={onMenuClick}
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl hover:bg-slate-100 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5 text-slate-700" />
        </button>

        {/* Global Navbar Search Bar matching reference image */}
        <div className="relative w-full max-w-sm hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search booking ID, service, client..."
            className="w-full bg-slate-50/70 border border-slate-200/80 rounded-2xl py-2 pl-10 pr-4 text-xs font-semibold text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#5B50E6] focus:bg-white focus:ring-4 focus:ring-[#5B50E6]/10 transition-all"
          />
        </div>
      </div>

      {/* ── Right: Notification & Profile Controls ── */}
      <div className="flex items-center gap-3.5">

        {/* Notification Bell Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((prev) => !prev)}
            className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100/80 text-slate-600 transition-all cursor-pointer group"
          >
            <Bell className="w-5 h-5 text-slate-600 group-hover:text-[#5B50E6] transition-colors" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-rose-600 px-1 text-[10px] font-black text-white shadow-xs border-2 border-white animate-pulse">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Popover Menu */}
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/60">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                    Notifications
                  </h4>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={() => markAllRead()}
                    className="text-[11px] font-bold text-[#5B50E6] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCheck size={14} /> Mark all read
                  </button>
                )}
              </div>

              {/* Notification List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {isNotifLoading ? (
                  <div className="p-6 text-center text-slate-400 flex items-center justify-center gap-2">
                    <Loader2 size={18} className="animate-spin text-[#5B50E6]" />
                    <span className="text-xs font-semibold">Loading notifications...</span>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-xs font-medium">
                    No notifications right now.
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => markRead(item.id)}
                      className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-3 ${
                        !item.isRead ? "bg-indigo-50/30" : ""
                      }`}
                    >
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[#5B50E6]">
                        <Bell size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {item.title}
                          </p>
                          {!item.isRead && (
                            <span className="h-2 w-2 rounded-full bg-[#5B50E6] shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">
                          {item.message}
                        </p>
                        <p className="text-[9px] text-slate-400 mt-1 flex items-center gap-1">
                          <Clock size={10} />
                          {new Date(item.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Info pill matching reference image */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl bg-white hover:bg-slate-50 transition-all border-none cursor-pointer group"
          >
            {/* User Name & Role Pill (Matching image right side) */}
            <div className="hidden md:flex flex-col items-end text-right">
              <span className="text-xs font-bold text-slate-800 leading-tight">
                {displayName}
              </span>
              <span className="text-[9px] font-black text-[#5B50E6] tracking-wider uppercase bg-indigo-50 border border-indigo-100/80 px-2 py-0.5 rounded-full mt-0.5">
                {roleName}
              </span>
            </div>

            {/* Avatar image with ring & online status dot */}
            <div className="relative h-9 w-9 flex-shrink-0">
              <div className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-[#5B50E6] shadow-2xs">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#5B50E6] flex items-center justify-center text-white text-xs font-extrabold">
                    {initials}
                  </div>
                )}
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full" />
            </div>
          </button>

          {/* User Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {displayName}
                </p>
                {email && (
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {email}
                  </p>
                )}
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    router.push("/admin/dashboard");
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  My Profile
                </button>
              </div>

              <div className="border-t border-slate-100 py-1">
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4" />
                  {isLoggingOut ? "Signing out…" : "Sign out"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}