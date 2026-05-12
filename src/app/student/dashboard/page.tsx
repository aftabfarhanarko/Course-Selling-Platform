"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Pencil, Save, Shield, UserRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { uploadImageToImgBB } from "@/lib/images.upload";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "@/lib/api/usersApi";
import { useChangePasswordMutation } from "@/lib/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { setUser } from "@/store/slices/authSlice";

function normalizeProfile(payload: any): any {
  return payload?.user ?? payload?.data?.user ?? payload?.data ?? payload ?? null;
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
      const token = updated?.token ?? parsed?.token ?? parsed?.user?.token ?? null;
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
    <div className="min-h-screen bg-[#f5f5fb] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111827]">
              Profile
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Update your name, photo, and password
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            Refresh
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="rounded-[24px] border border-[#ececf5] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#111827]">Photo</h2>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline"
                >
                  <Pencil className="h-4 w-4" />
                  Change
                </button>
              </div>

              <div className="mt-5 flex items-center justify-center">
                <div className="h-32 w-32 rounded-[28px] border-4 border-white bg-[#f7f7fb] shadow-sm overflow-hidden flex items-center justify-center">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound className="h-12 w-12 text-zinc-400" />
                  )}
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setSelectedPhoto(file);
                }}
              />

              <div className="mt-6">
                <label className="text-xs font-bold tracking-wider text-zinc-500">
                  FULL NAME
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2"
                  placeholder="Your name"
                />
              </div>

              <Button
                onClick={onSaveProfile}
                disabled={isUpdating}
                className="mt-5 w-full"
              >
                <Save className="mr-2 h-4 w-4" />
                {isUpdating ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-[24px] border border-[#ececf5] bg-[#f7f7fc] p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#111827]">
                Personal Information
              </h2>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <Info label="FULL NAME" value={String(profile?.name ?? "-")} />
                <Info label="EMAIL" value={email || "-"} />
                <Info label="PHONE" value={phone || "-"} />
                <Info label="COUNTRY" value={country || "-"} />
              </div>
            </div>

            <div className="rounded-[24px] border border-[#ececf5] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <Shield className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-[#111827]">
                  Change Password
                </h2>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold tracking-wider text-zinc-500">
                    CURRENT PASSWORD
                  </label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="mt-2"
                    placeholder="Current password"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold tracking-wider text-zinc-500">
                    NEW PASSWORD
                  </label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-2"
                    placeholder="New password"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold tracking-wider text-zinc-500">
                    CONFIRM PASSWORD
                  </label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-2"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <Button
                onClick={onChangePassword}
                disabled={isChangingPassword}
                className="mt-5"
              >
                {isChangingPassword ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-2 text-[10px] font-bold tracking-[0.2em] text-gray-400">
        {label}
      </p>
      <p className="break-words text-lg font-semibold text-[#111827]">{value}</p>
    </div>
  );
}
