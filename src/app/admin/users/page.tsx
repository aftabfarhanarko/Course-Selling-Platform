"use client";

import React, { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  MoreHorizontal,
  X,
  Edit2,
  Trash2,
  Shield,
  ShieldOff,
  Eye,
  Check,
  AlertTriangle,
  Users,
  GraduationCap,
  BookOpen,
  Mail,
  Calendar,
  Lock,
} from "lucide-react";

/* ──────────────────────────── types ──────────────────────────── */
type Role = "Instructor" | "Student" | "Admin";
type Status = "Active" | "Suspended";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  avatarBg: string;
  avatarColor: string;
  role: Role;
  joinDate: string;
  status: Status;
  phone?: string;
}

/* ──────────────────────────── seed data ───────────────────────── */
const seed: User[] = [
  {
    id: 1,
    name: "Marcus Sterling",
    email: "marcus@incomeflow.com",
    avatar: "MS",
    avatarBg: "#FEE2E2",
    avatarColor: "#EF4444",
    role: "Instructor",
    joinDate: "Oct 12, 2023",
    status: "Active",
    phone: "+1 555-0101",
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    email: "elena.rod@gmail.com",
    avatar: "ER",
    avatarBg: "#FEF3C7",
    avatarColor: "#D97706",
    role: "Student",
    joinDate: "Nov 05, 2023",
    status: "Active",
    phone: "+1 555-0102",
  },
  {
    id: 3,
    name: "David Chen",
    email: "d.chen@enterprise.co",
    avatar: "DC",
    avatarBg: "#F3F4F6",
    avatarColor: "#6B7280",
    role: "Student",
    joinDate: "Jan 14, 2024",
    status: "Suspended",
    phone: "+1 555-0103",
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    email: "s.jenkins@academy.io",
    avatar: "SJ",
    avatarBg: "#FEE2E2",
    avatarColor: "#EF4444",
    role: "Instructor",
    joinDate: "Dec 20, 2023",
    status: "Active",
    phone: "+1 555-0104",
  },
  {
    id: 5,
    name: "Omar Hussain",
    email: "omar.h@platform.net",
    avatar: "OH",
    avatarBg: "#EDE9FE",
    avatarColor: "#7C3AED",
    role: "Admin",
    joinDate: "Feb 01, 2024",
    status: "Active",
    phone: "+1 555-0105",
  },
  {
    id: 6,
    name: "Priya Nair",
    email: "priya.n@learnhub.io",
    avatar: "PN",
    avatarBg: "#D1FAE5",
    avatarColor: "#059669",
    role: "Student",
    joinDate: "Mar 08, 2024",
    status: "Active",
    phone: "+1 555-0106",
  },
];

const roleStyles: Record<Role, string> = {
  Instructor: "text-blue-700 bg-blue-50 border border-blue-200",
  Student: "text-purple-700 bg-purple-50 border border-purple-200",
  Admin: "text-orange-700 bg-orange-50 border border-orange-200",
};

const filterOptions = [
  "All Members",
  "Instructors",
  "Students",
  "Admins",
  "Suspended",
];

/* ──────────────────────── helper: initials bg ─────────────────── */
const bgPalette = [
  { bg: "#FEE2E2", color: "#EF4444" },
  { bg: "#FEF3C7", color: "#D97706" },
  { bg: "#D1FAE5", color: "#059669" },
  { bg: "#EDE9FE", color: "#7C3AED" },
  { bg: "#DBEAFE", color: "#2563EB" },
  { bg: "#FCE7F3", color: "#DB2777" },
];
const pickPalette = (name: string) =>
  bgPalette[name.charCodeAt(0) % bgPalette.length];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/* ═══════════════════════ MODAL: Add / Edit Member ══════════════════ */
function MemberModal({
  user,
  onClose,
  onSave,
}: {
  user?: User;
  onClose: () => void;
  onSave: (u: User) => void;
}) {
  const isEdit = !!user;
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [role, setRole] = useState<Role>(user?.role ?? "Student");
  const [status, setStatus] = useState<Status>(user?.status ?? "Active");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim() || !email.includes("@")) e.email = "Valid email required";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    const pal = pickPalette(name);
    onSave({
      id: user?.id ?? Date.now(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      avatar: initials(name),
      avatarBg: pal.bg,
      avatarColor: pal.color,
      role,
      status,
      joinDate:
        user?.joinDate ??
        new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-50 to-white border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200">
              <UserPlus size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-[14px] font-bold text-gray-900">
                {isEdit ? "Edit Member" : "Add New Member"}
              </h2>
              <p className="text-[11px] text-gray-400">
                {isEdit ? "Update member details" : "Fill in the details below"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <Users
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Smith"
                className={`w-full h-9 pl-8 pr-3 text-[12px] border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200"}`}
              />
            </div>
            {errors.name && (
              <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. john@example.com"
                className={`w-full h-9 pl-8 pr-3 text-[12px] border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200"}`}
              />
            </div>
            {errors.email && (
              <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Phone{" "}
              <span className="text-gray-300 normal-case font-normal">
                (optional)
              </span>
            </label>
            <div className="relative">
              <Lock
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555-0000"
                className="w-full h-9 pl-8 pr-3 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>

          {/* Role + Status row */}
          <div className="grid grid-cols-2 gap-3">
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
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
                className="w-full h-9 px-3 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
              >
                <option>Active</option>
                <option>Suspended</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2.5 pt-1">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-[12px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-200 transition-colors"
            >
              <Check size={13} /> {isEdit ? "Save Changes" : "Add Member"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════ MODAL: View Member ════════════════════════ */
function ViewModal({
  user,
  onClose,
  onEdit,
}: {
  user: User;
  onClose: () => void;
  onEdit: () => void;
}) {
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
              { icon: <Shield size={13} />, label: "Role", value: user.role },
              {
                icon: <Calendar size={13} />,
                label: "Joined",
                value: user.joinDate,
              },
              { icon: <Lock size={13} />, label: "Status", value: user.status },
              ...(user.phone
                ? [
                    {
                      icon: <Mail size={13} />,
                      label: "Phone",
                      value: user.phone,
                    },
                  ]
                : []),
            ].map((r, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-2 border-b border-gray-50"
              >
                <span className="text-gray-400">{r.icon}</span>
                <span className="text-[11px] text-gray-400 w-12 flex-shrink-0">
                  {r.label}
                </span>
                <span className="text-[12px] font-semibold text-gray-800">
                  {r.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-5">
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-xl border border-gray-200 text-[12px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={onEdit}
              className="flex-1 py-2 rounded-xl bg-indigo-600 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
            >
              <Edit2 size={12} /> Edit Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════ MODAL: Delete Confirm ═════════════════════ */
function DeleteModal({
  user,
  onClose,
  onConfirm,
}: {
  user: User;
  onClose: () => void;
  onConfirm: () => void;
}) {
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
          Remove Member?
        </h3>
        <p className="text-[12px] text-gray-500 leading-relaxed">
          You're about to permanently remove{" "}
          <span className="font-semibold text-gray-800">{user.name}</span>. This
          action cannot be undone.
        </p>
        <div className="flex gap-2.5 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-[12px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-red-200 transition-colors"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════ ROW ACTION DROPDOWN ═══════════════════════ */
function ActionMenu({
  user,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
}: {
  user: User;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
}) {
  const [open, setOpen] = useState(false);

  const actions = [
    {
      icon: <Eye size={13} />,
      label: "View Profile",
      color: "text-gray-700",
      fn: onView,
    },
    {
      icon: <Edit2 size={13} />,
      label: "Edit Member",
      color: "text-indigo-600",
      fn: onEdit,
    },
    {
      icon:
        user.status === "Active" ? (
          <ShieldOff size={13} />
        ) : (
          <Shield size={13} />
        ),
      label: user.status === "Active" ? "Suspend User" : "Reactivate",
      color: user.status === "Active" ? "text-amber-600" : "text-green-600",
      fn: onToggleStatus,
    },
    {
      icon: <Trash2 size={13} />,
      label: "Delete Member",
      color: "text-red-500",
      fn: onDelete,
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-700"
      >
        <MoreHorizontal size={16} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden py-1">
            {actions.map((a, i) => (
              <button
                key={i}
                onClick={() => {
                  a.fn();
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-[12px] font-medium hover:bg-gray-50 transition-colors ${a.color}`}
              >
                {a.icon} {a.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════ MAIN PAGE ═════════════════════════════ */
const PAGE_SIZE = 5;

export default function UserPage() {
  const [users, setUsers] = useState<User[]>(seed);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Members");
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);

  // modals
  const [addOpen, setAddOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  /* filtered list */
  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch =
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q);
    const matchFilter =
      filter === "All Members" ||
      (filter === "Instructors" && u.role === "Instructor") ||
      (filter === "Students" && u.role === "Student") ||
      (filter === "Admins" && u.role === "Admin") ||
      (filter === "Suspended" && u.status === "Suspended");
    return matchSearch && matchFilter;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  /* actions */
  const handleSave = (u: User) => {
    setUsers((prev) =>
      prev.find((x) => x.id === u.id)
        ? prev.map((x) => (x.id === u.id ? u : x))
        : [u, ...prev],
    );
    setAddOpen(false);
    setEditUser(null);
  };
  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((x) => x.id !== id));
    setDeleteUser(null);
  };
  const handleToggle = (id: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" }
          : u,
      ),
    );
  };

  /* stats */
  const totalUsers = users.length;
  const instructors = users.filter(
    (u) => u.role === "Instructor" && u.status === "Active",
  ).length;
  const newStudents = users.filter((u) => u.role === "Student").length;

  return (
    <>
      {addOpen && (
        <MemberModal onClose={() => setAddOpen(false)} onSave={handleSave} />
      )}
      {editUser && (
        <MemberModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={handleSave}
        />
      )}
      {viewUser && (
        <ViewModal
          user={viewUser}
          onClose={() => setViewUser(null)}
          onEdit={() => {
            setEditUser(viewUser);
            setViewUser(null);
          }}
        />
      )}
      {deleteUser && (
        <DeleteModal
          user={deleteUser}
          onClose={() => setDeleteUser(null)}
          onConfirm={() => handleDelete(deleteUser.id)}
        />
      )}

      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-5">
        {/* ── Page Header ── */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-[18px] font-extrabold text-gray-900 tracking-tight">
              User Management
            </h1>
            <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
              Manage members, roles & access levels
            </p>
          </div>
          <button
            onClick={() => setAddOpen(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-[12px] font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-200"
          >
            <UserPlus size={14} /> Add Member
          </button>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          <div className="bg-indigo-600 rounded-xl p-4 text-white shadow-lg shadow-indigo-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <Users size={14} className="text-white" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">
                Total Users
              </p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[26px] font-extrabold">
                {totalUsers.toLocaleString()}
              </span>
              <span className="text-[11px] font-bold text-indigo-200 bg-indigo-500 px-2 py-0.5 rounded-full">
                +12%
              </span>
            </div>
          </div>

          <div className="bg-white border border-emerald-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                <GraduationCap size={14} className="text-emerald-600" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                Active Instructors
              </p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[26px] font-extrabold text-gray-900">
                {instructors}
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Top 2%
              </span>
            </div>
          </div>

          <div className="bg-white border border-indigo-100 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
                <BookOpen size={14} className="text-indigo-500" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                Total Students
              </p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[26px] font-extrabold text-gray-900">
                {newStudents}
              </span>
              <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                Steady
              </span>
            </div>
          </div>
        </div>

        {/* ── Search + Filter ── */}
        <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
          <div className="relative flex-1">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name, email or role…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full h-9 pl-8 pr-4 text-[12px] bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 shadow-sm"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 h-9 text-[12px] font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal size={13} className="text-gray-500" />
              <span className="hidden sm:inline text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Filter
              </span>
              <span className="font-semibold text-gray-800">{filter}</span>
              <ChevronDown size={13} className="text-gray-400" />
            </button>
            {filterOpen && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white border border-gray-200 rounded-xl shadow-xl z-10 overflow-hidden py-1">
                {filterOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setFilter(opt);
                      setFilterOpen(false);
                      setPage(1);
                    }}
                    className={`w-full text-left px-3 py-2 text-[12px] font-medium transition-colors ${filter === opt ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-50"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Table ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Desktop */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  {[
                    "User Profile",
                    "Access Level",
                    "Join Date",
                    "Status",
                    "Actions",
                  ].map((h) => (
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
                {paginated.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-[12px] text-gray-400"
                    >
                      No members found.
                    </td>
                  </tr>
                ) : (
                  paginated.map((u) => (
                    <tr
                      key={u.id}
                      className="hover:bg-indigo-50/20 transition-colors group"
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
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${roleStyles[u.role]}`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[12px] text-gray-500">
                        {u.joinDate}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`flex items-center gap-1.5 text-[12px] font-semibold ${u.status === "Active" ? "text-emerald-600" : "text-red-500"}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${u.status === "Active" ? "bg-emerald-500" : "bg-red-500"}`}
                          />
                          {u.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <ActionMenu
                          user={u}
                          onView={() => setViewUser(u)}
                          onEdit={() => setEditUser(u)}
                          onDelete={() => setDeleteUser(u)}
                          onToggleStatus={() => handleToggle(u.id)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="sm:hidden divide-y divide-gray-100">
            {paginated.map((u) => (
              <div key={u.id} className="p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-[12px] font-extrabold"
                      style={{ background: u.avatarBg, color: u.avatarColor }}
                    >
                      {u.avatar}
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-gray-900">
                        {u.name}
                      </p>
                      <p className="text-[10px] text-gray-400">{u.email}</p>
                    </div>
                  </div>
                  <ActionMenu
                    user={u}
                    onView={() => setViewUser(u)}
                    onEdit={() => setEditUser(u)}
                    onDelete={() => setDeleteUser(u)}
                    onToggleStatus={() => handleToggle(u.id)}
                  />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${roleStyles[u.role]}`}
                  >
                    {u.role}
                  </span>
                  <span
                    className={`flex items-center gap-1 text-[11px] font-semibold ${u.status === "Active" ? "text-emerald-600" : "text-red-500"}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${u.status === "Active" ? "bg-emerald-500" : "bg-red-500"}`}
                    />
                    {u.status}
                  </span>
                  <span className="text-[10px] text-gray-400 ml-auto">
                    {u.joinDate}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3.5 border-t border-gray-100">
            <p className="text-[11px] text-gray-500">
              Showing{" "}
              <span className="font-bold text-gray-700">
                {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–
                {Math.min(page * PAGE_SIZE, filtered.length)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-gray-700">{filtered.length}</span>{" "}
              members
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={13} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg text-[11px] font-bold transition-colors ${
                    page === p
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
