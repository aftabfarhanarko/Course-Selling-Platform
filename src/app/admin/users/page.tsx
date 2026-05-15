"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Search,
  Shield,
  ShieldOff,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";
import {
  useAdminBanUserMutation,
  useAdminCreateUserMutation,
  useAdminDeleteUserMutation,
  useAdminRestoreUserMutation,
  useAdminUnbanUserMutation,
  useAdminUsersQuery,
} from "@/lib/api/admin/user";

type Role = "Student" | "Instructor" | "Admin";
type Status = "Active" | "Suspended" | "Deleted";

type UiUser = {
  id: number | string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  joinDate: string;
  phone?: string;
  avatar: string;
  avatarBg: string;
  avatarColor: string;
};

const PAGE_SIZE = 8;

const bgPalette = [
  { bg: "#FEE2E2", color: "#EF4444" },
  { bg: "#FEF3C7", color: "#D97706" },
  { bg: "#D1FAE5", color: "#059669" },
  { bg: "#EDE9FE", color: "#7C3AED" },
  { bg: "#DBEAFE", color: "#2563EB" },
  { bg: "#FCE7F3", color: "#DB2777" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function pickPalette(name: string) {
  const first = name.trim().charCodeAt(0) || 0;
  return bgPalette[first % bgPalette.length];
}

function formatDate(value: unknown) {
  if (!value) return "—";
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function normalizeRole(value: unknown): Role {
  const v = String(value ?? "")
    .trim()
    .toLowerCase();
  if (v === "admin" || v === "superadmin" || v === "super_admin")
    return "Admin";
  if (v === "instructor" || v === "teacher") return "Instructor";
  return "Student";
}

function normalizeStatus(user: any): Status {
  const deleted =
    Boolean(user?.isDeleted) ||
    Boolean(user?.deletedAt) ||
    user?.status === "deleted";
  if (deleted) return "Deleted";
  const banned =
    Boolean(user?.isBanned) ||
    Boolean(user?.banned) ||
    Boolean(user?.isSuspended) ||
    user?.status === "banned" ||
    user?.status === "suspended";
  if (banned) return "Suspended";
  return "Active";
}

function extractUsers(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.users)) return payload.users;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.users)) return payload.data.users;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data?.data?.users)) return payload.data.data.users;
  return [];
}

function toUiUser(raw: any): UiUser | null {
  const id = raw?.id ?? raw?._id ?? raw?.userId ?? null;
  const name = String(raw?.name ?? raw?.fullName ?? raw?.username ?? "").trim();
  const email = String(raw?.email ?? "").trim();
  if (!id || !name || !email) return null;

  const role = normalizeRole(raw?.role);
  const status = normalizeStatus(raw);
  const joinDate = formatDate(
    raw?.createdAt ?? raw?.created_at ?? raw?.joinDate,
  );
  const phone =
    typeof raw?.phone === "string" && raw.phone.trim().length > 0
      ? raw.phone.trim()
      : undefined;

  const avatar = initials(name);
  const palette = pickPalette(name);

  return {
    id,
    name,
    email,
    role,
    status,
    joinDate,
    phone,
    avatar,
    avatarBg: palette.bg,
    avatarColor: palette.color,
  };
}

function ViewModal({ user, onClose }: { user: UiUser; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-20 bg-gradient-to-br from-indigo-500 to-indigo-700" />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <X size={14} />
        </button>
        <div className="px-6 pb-6 -mt-10">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-extrabold border-4 border-white shadow-lg mb-3"
            style={{ background: user.avatarBg, color: user.avatarColor }}
          >
            {user.avatar}
          </div>
          <h3 className="text-[16px] font-extrabold text-gray-900">
            {user.name}
          </h3>
          <p className="text-[12px] text-gray-400 mt-0.5">{user.email}</p>

          <div className="mt-4 space-y-2.5">
            {[
              { label: "Role", value: user.role },
              { label: "Joined", value: user.joinDate },
              { label: "Status", value: user.status },
              ...(user.phone ? [{ label: "Phone", value: user.phone }] : []),
            ].map((r) => (
              <div
                key={r.label}
                className="flex items-center justify-between gap-3 py-2 border-b border-gray-50"
              >
                <span className="text-[11px] text-gray-400 font-semibold">
                  {r.label}
                </span>
                <span className="text-[12px] font-semibold text-gray-800">
                  {r.value}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="mt-5 w-full py-2 rounded-xl border border-gray-200 text-[12px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({
  title,
  description,
  confirmText,
  confirmTone,
  loading,
  onClose,
  onConfirm,
}: {
  title: string;
  description: React.ReactNode;
  confirmText: string;
  confirmTone: "danger" | "primary";
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const btn =
    confirmTone === "danger"
      ? "bg-red-500 hover:bg-red-600 shadow-red-200"
      : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={26} className="text-red-500" />
        </div>
        <h3 className="text-[15px] font-extrabold text-gray-900 mb-1">
          {title}
        </h3>
        <p className="text-[12px] text-gray-500 leading-relaxed">
          {description}
        </p>
        <div className="flex gap-2.5 mt-5">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-[12px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-70 disabled:pointer-events-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-2.5 rounded-xl text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-lg transition-colors disabled:opacity-70 disabled:pointer-events-none ${btn}`}
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : null}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

function CreateModal({
  loading,
  onClose,
  onCreate,
}: {
  loading: boolean;
  onClose: () => void;
  onCreate: (payload: {
    name: string;
    email: string;
    phone: string;
    country: string;
    password: string;
    photo?: string | null;
    role?: string;
  }) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [role, setRole] = useState<Role>("Student");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim() || !email.includes("@")) e.email = "Valid email required";
    if (!phone.trim()) e.phone = "Phone is required";
    if (!country.trim()) e.country = "Country is required";
    if (!password.trim() || password.trim().length < 6)
      e.password = "Min 6 characters password";
    return e;
  };

  const submit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    onCreate({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      country: country.trim(),
      password: password.trim(),
      photo: photo.trim().length > 0 ? photo.trim() : null,
      role: role.toLowerCase(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
              <UserPlus size={18} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-[14px] font-bold text-gray-900">Add User</h2>
              <p className="text-[11px] text-gray-400">
                Create a user via /auth/register
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors disabled:opacity-70 disabled:pointer-events-none"
          >
            <X size={15} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full h-9 px-3 text-[12px] border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200"}`}
              />
              {errors.name ? (
                <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>
              ) : null}
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full h-9 px-3 text-[12px] border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200"}`}
              />
              {errors.email ? (
                <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                Phone
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full h-9 px-3 text-[12px] border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200"}`}
              />
              {errors.phone ? (
                <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>
              ) : null}
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                Country
              </label>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={`w-full h-9 px-3 text-[12px] border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.country ? "border-red-400 bg-red-50" : "border-gray-200"}`}
              />
              {errors.country ? (
                <p className="text-[10px] text-red-500 mt-1">
                  {errors.country}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className={`w-full h-9 px-3 text-[12px] border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.password ? "border-red-400 bg-red-50" : "border-gray-200"}`}
              />
              {errors.password ? (
                <p className="text-[10px] text-red-500 mt-1">
                  {errors.password}
                </p>
              ) : null}
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full h-9 px-3 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
              >
                <option>Student</option>
                <option>Instructor</option>
                <option>Admin</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Photo URL{" "}
              <span className="text-gray-300 normal-case font-normal">
                (optional)
              </span>
            </label>
            <input
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="https://..."
              className="w-full h-9 px-3 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="flex gap-2.5 pt-1">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-[12px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-70 disabled:pointer-events-none"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-200 transition-colors disabled:opacity-70 disabled:pointer-events-none"
            >
              {loading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Check size={13} />
              )}
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminUsersApiPage(): React.JSX.Element {
  const { data, isLoading, isError } = useAdminUsersQuery();
  const [createUser, { isLoading: isCreating }] = useAdminCreateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useAdminDeleteUserMutation();
  const [banUser, { isLoading: isBanning }] = useAdminBanUserMutation();
  const [unbanUser, { isLoading: isUnbanning }] = useAdminUnbanUserMutation();
  const [restoreUser, { isLoading: isRestoring }] =
    useAdminRestoreUserMutation();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"All" | Role>("All");
  const [statusFilter, setStatusFilter] = useState<"All" | Status>("All");
  const [page, setPage] = useState(1);

  const [createOpen, setCreateOpen] = useState(false);
  const [viewUser, setViewUser] = useState<UiUser | null>(null);
  const [confirm, setConfirm] = useState<
    | null
    | { type: "delete"; user: UiUser }
    | { type: "ban"; user: UiUser }
    | { type: "unban"; user: UiUser }
    | { type: "restore"; user: UiUser }
  >(null);

  const uiUsers = useMemo(() => {
    const list = extractUsers(data);
    return list.map(toUiUser).filter((x): x is UiUser => Boolean(x));
  }, [data]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return uiUsers.filter((u) => {
      if (roleFilter !== "All" && u.role !== roleFilter) return false;
      if (statusFilter !== "All" && u.status !== statusFilter) return false;
      if (!q) return true;
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
      );
    });
  }, [roleFilter, search, statusFilter, uiUsers]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const stats = useMemo(() => {
    const total = uiUsers.length;
    const active = uiUsers.filter((u) => u.status === "Active").length;
    const banned = uiUsers.filter((u) => u.status === "Suspended").length;
    const deleted = uiUsers.filter((u) => u.status === "Deleted").length;
    return { total, active, banned, deleted };
  }, [uiUsers]);

  const busy =
    isCreating || isDeleting || isBanning || isUnbanning || isRestoring;

  return (
    <>
      {createOpen ? (
        <CreateModal
          loading={isCreating}
          onClose={() => setCreateOpen(false)}
          onCreate={async (payload) => {
            await createUser(payload).unwrap();
            setCreateOpen(false);
          }}
        />
      ) : null}

      {viewUser ? (
        <ViewModal user={viewUser} onClose={() => setViewUser(null)} />
      ) : null}

      {confirm ? (
        <ConfirmModal
          title={
            confirm.type === "delete"
              ? "Delete user?"
              : confirm.type === "ban"
                ? "Ban user?"
                : confirm.type === "unban"
                  ? "Unban user?"
                  : "Restore user?"
          }
          description={
            <>
              You are about to{" "}
              <span className="font-semibold text-gray-800">
                {confirm.type}
              </span>{" "}
              <span className="font-semibold text-gray-800">
                {confirm.user.name}
              </span>
              .
            </>
          }
          confirmText={
            confirm.type === "delete"
              ? "Delete"
              : confirm.type === "ban"
                ? "Ban"
                : confirm.type === "unban"
                  ? "Unban"
                  : "Restore"
          }
          confirmTone={confirm.type === "delete" ? "danger" : "primary"}
          loading={busy}
          onClose={() => setConfirm(null)}
          onConfirm={async () => {
            const u = confirm.user;
            if (confirm.type === "delete") await deleteUser(u.id).unwrap();
            if (confirm.type === "ban") await banUser(u.id).unwrap();
            if (confirm.type === "unban") await unbanUser(u.id).unwrap();
            if (confirm.type === "restore") await restoreUser(u.id).unwrap();
            setConfirm(null);
          }}
        />
      ) : null}

      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-[18px] font-extrabold text-gray-900 tracking-tight">
              User Management
            </h1>
            <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
              API connected (GET /users, GET /users/:id, DELETE /users/:id,
              /ban, /unban, /restore, POST /auth/register)
            </p>
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            disabled={isCreating}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-[12px] font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:pointer-events-none"
          >
            <UserPlus size={14} /> Add User
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-5">
          {[
            {
              label: "Total",
              value: stats.total,
              tone: "bg-indigo-600 text-white shadow-indigo-200",
            },
            {
              label: "Active",
              value: stats.active,
              tone: "bg-white border border-emerald-200 shadow-sm",
            },
            {
              label: "Banned",
              value: stats.banned,
              tone: "bg-white border border-amber-200 shadow-sm",
            },
            {
              label: "Deleted",
              value: stats.deleted,
              tone: "bg-white border border-red-200 shadow-sm",
            },
          ].map((s) => (
            <div key={s.label} className={`rounded-xl p-4 ${s.tone}`}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                {s.label}
              </p>
              <p className="mt-1 text-[22px] font-extrabold text-gray-900">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2.5 w-full lg:w-[360px]">
            <Search size={16} className="text-gray-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search name / email..."
              className="w-full text-[12px] font-semibold text-gray-700 placeholder:text-gray-400 outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value as any);
                setPage(1);
              }}
              className="h-9 px-3 text-[12px] font-semibold border border-gray-200 rounded-xl bg-white"
            >
              <option value="All">All Roles</option>
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
              <option value="Admin">Admin</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setPage(1);
              }}
              className="h-9 px-3 text-[12px] font-semibold border border-gray-200 rounded-xl bg-white"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Deleted">Deleted</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  {["User", "Role", "Joined", "Status", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 py-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10">
                      <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold">
                        <Loader2 className="h-4 w-4 animate-spin" /> Loading
                        users...
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-[12px] text-red-500 font-semibold"
                    >
                      Failed to load users
                    </td>
                  </tr>
                ) : paginated.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-[12px] text-gray-400"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  paginated.map((u) => (
                    <tr
                      key={String(u.id)}
                      className="hover:bg-indigo-50/20 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-[12px] font-extrabold flex-shrink-0"
                            style={{
                              background: u.avatarBg,
                              color: u.avatarColor,
                            }}
                          >
                            {u.avatar}
                          </div>
                          <div>
                            <p className="text-[12px] font-bold text-gray-900">
                              {u.name}
                            </p>
                            <p className="text-[11px] text-gray-400 mt-0.5">
                              {u.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-gray-200 bg-gray-50 text-gray-700">
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[12px] text-gray-500">
                        {u.joinDate}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={
                            u.status === "Active"
                              ? "inline-flex items-center gap-1.5 text-[12px] font-semibold text-emerald-600"
                              : u.status === "Suspended"
                                ? "inline-flex items-center gap-1.5 text-[12px] font-semibold text-amber-600"
                                : "inline-flex items-center gap-1.5 text-[12px] font-semibold text-red-500"
                          }
                        >
                          <span
                            className={
                              u.status === "Active"
                                ? "w-1.5 h-1.5 rounded-full bg-emerald-500"
                                : u.status === "Suspended"
                                  ? "w-1.5 h-1.5 rounded-full bg-amber-500"
                                  : "w-1.5 h-1.5 rounded-full bg-red-500"
                            }
                          />
                          {u.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setViewUser(u)}
                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600"
                            title="View"
                          >
                            <Eye size={14} />
                          </button>

                          {u.status === "Deleted" ? (
                            <button
                              onClick={() =>
                                setConfirm({ type: "restore", user: u })
                              }
                              className="p-2 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700"
                              title="Restore"
                            >
                              <Shield size={14} />
                            </button>
                          ) : u.status === "Active" ? (
                            <button
                              onClick={() =>
                                setConfirm({ type: "ban", user: u })
                              }
                              className="p-2 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700"
                              title="Ban"
                            >
                              <ShieldOff size={14} />
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                setConfirm({ type: "unban", user: u })
                              }
                              className="p-2 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
                              title="Unban"
                            >
                              <Shield size={14} />
                            </button>
                          )}

                          <button
                            onClick={() =>
                              setConfirm({ type: "delete", user: u })
                            }
                            className="p-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-[11px] text-gray-400 font-semibold">
              Page <span className="text-gray-700">{safePage}</span> of{" "}
              <span className="text-gray-700">{totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage <= 1}
                className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage >= totalPages}
                className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
