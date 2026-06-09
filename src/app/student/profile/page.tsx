"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Camera,
  Lock,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Save,
  Shield,
  User,
  UserRound,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { uploadImageToImgBB } from "@/lib/images.upload";
import { useProfileQuery, useUpdateProfileMutation } from "@/lib/api/usersApi";
import { useChangePasswordMutation } from "@/lib/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { setUser } from "@/store/slices/authSlice";

function normalizeProfile(payload: any): any {
  return (
    payload?.user ?? payload?.data?.user ?? payload?.data ?? payload ?? null
  );
}

const AUTH_STORAGE_KEY = "course_platform_auth";

export default function StudentProfilePage(): React.JSX.Element {
  const dispatch = useDispatch();
  const authUser = useSelector((s: RootState) => s.auth.user);

  const { data, isFetching, refetch } = useProfileQuery();
  const profile = useMemo(() => normalizeProfile(data), [data]);

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState<string>("");
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  useEffect(() => {
    if (!profile) return;
    setName(String(profile?.name ?? ""));
    const p =
      profile?.photo ??
      profile?.avatar ??
      profile?.image ??
      profile?.profileImage ??
      null;
    setPhotoPreview(typeof p === "string" && p.length > 0 ? p : null);
  }, [profile]);

  useEffect(() => {
    if (!selectedPhoto) return;
    const url = URL.createObjectURL(selectedPhoto);
    setPhotoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedPhoto]);

  function persistUser(updated: any) {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as any) : {};
      const token =
        updated?.token ?? parsed?.token ?? parsed?.user?.token ?? null;
      const userToStore = token ? { ...updated, token } : updated;
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ ...parsed, token, user: userToStore }),
      );
    } catch {
      return;
    }
  }

  async function onSaveProfile() {
    const toastId = toast.loading("Updating profile...");

    try {
      let photoUrl: string | undefined;
      if (selectedPhoto) {
        photoUrl = await uploadImageToImgBB(selectedPhoto);
      }

      const payload: { name?: string; photo?: string } = {};
      if (name.trim().length > 0) payload.name = name.trim();
      if (photoUrl) payload.photo = photoUrl;

      const res = await updateProfile(payload).unwrap();
      const updatedProfile = normalizeProfile(res) ?? profile;

      await refetch();

      const token = authUser?.token ?? authUser?.accessToken ?? null;
      const merged = token
        ? { ...authUser, ...updatedProfile, token }
        : { ...authUser, ...updatedProfile };

      dispatch(setUser(merged));
      persistUser(merged);

      setSelectedPhoto(null);
      toast.success("Profile updated", { id: toastId });
    } catch {
      toast.error("Profile update failed", { id: toastId });
    }
  }

  async function onChangePassword() {
    if (!currentPassword || !newPassword) {
      toast.error("Fill current and new password");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password not match");
      return;
    }

    const toastId = toast.loading("Changing password...");

    try {
      await changePassword({ currentPassword, newPassword }).unwrap();
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password changed", { id: toastId });
    } catch {
      toast.error("Password change failed", { id: toastId });
    }
  }

  const email = String(profile?.email ?? "");
  const phone = String(profile?.phone ?? "");
  const country = String(profile?.country ?? "");

  return (
    <div className="min-h-screen bg-white dark:bg-white px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
              Profile
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Manage your name, photo, and security
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            Refresh
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column - Photo & Name */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-gray-100 dark:border-gray-100 bg-white dark:bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-900">
                  Profile picture
                </h2>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-600 hover:text-blue-700"
                >
                  <Camera className="h-3.5 w-3.5" />
                  Change
                </button>
              </div>

              <div className="mt-4 flex justify-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white dark:border-white bg-gray-50 dark:bg-gray-50 shadow-sm">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <UserRound className="h-10 w-10 text-gray-400 dark:text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setSelectedPhoto(e.target.files?.[0] ?? null)}
              />

              <div className="mt-5">
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-500">
                  Full name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 text-sm"
                  placeholder="Your name"
                />
              </div>

              <Button
                onClick={onSaveProfile}
                disabled={isUpdating}
                className="mt-5 w-full text-sm"
              >
                <Save className="mr-2 h-3.5 w-3.5" />
                {isUpdating ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </div>

          {/* Right column - Info & Password */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="rounded-2xl border border-gray-100 dark:border-gray-100 bg-gray-50/40 dark:bg-gray-50/40 p-5 shadow-sm">
              <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-gray-900">
                <User className="h-4 w-4 text-blue-500 dark:text-blue-500" />
                Personal Information
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <InfoField
                  icon={User}
                  label="Full name"
                  value={String(profile?.name ?? "-")}
                />
                <InfoField icon={Mail} label="Email" value={email || "-"} />
                <InfoField icon={Phone} label="Phone" value={phone || "-"} />
                <InfoField
                  icon={MapPin}
                  label="Country"
                  value={country || "-"}
                />
              </div>
            </div>

            {/* Change Password */}
            <div className="rounded-2xl border border-gray-100 dark:border-gray-100 bg-white dark:bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-50 text-blue-600 dark:text-blue-600">
                  <Shield className="h-4 w-4" />
                </div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-gray-900">
                  Change password
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-500">
                    Current password
                  </label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="mt-1 text-sm"
                    placeholder="••••••••"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-500">
                      New password
                    </label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1 text-sm"
                      placeholder="New password"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-500">
                      Confirm password
                    </label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 text-sm"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={onChangePassword}
                disabled={isChangingPassword}
                variant="outline"
                className="mt-5 text-sm"
              >
                <Lock className="mr-2 h-3.5 w-3.5" />
                {isChangingPassword ? "Updating..." : "Update password"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component with icon for each info row
function InfoField({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-gray-50 dark:border-gray-50 bg-white dark:bg-white p-3">
      <div className="mt-0.5">
        <Icon className="h-4 w-4 text-gray-500 dark:text-gray-500" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-400">
          {label}
        </p>
        <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-800">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}