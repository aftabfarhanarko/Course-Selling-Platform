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
  Trash2,
  UserPlus,
  X,
} from "lucide-react";
import {
  useAdminCreateInstructorMutation,
  useAdminDeleteInstructorMutation,
  useAdminInstructorsQuery,
  useAdminRestoreInstructorMutation,
  useLazyAdminInstructorQuery,
} from "@/lib/api/admin/instructor";

type Status = "Active" | "Deleted";

type UiInstructor = {
  id: number | string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  status: Status;
  joinDate: string;
};

const PAGE_SIZE = 8;

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

function normalizeStatus(raw: any): Status {
  const deleted =
    Boolean(raw?.isDeleted) ||
    Boolean(raw?.deletedAt) ||
    String(raw?.status ?? "").toLowerCase() === "deleted";
  return deleted ? "Deleted" : "Active";
}

function extractInstructors(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.instructors)) return payload.instructors;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.instructors))
    return payload.data.instructors;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data?.data?.instructors))
    return payload.data.data.instructors;
  return [];
}

function extractTotal(payload: any): number | null {
  const candidates = [
    payload?.meta?.total,
    payload?.data?.meta?.total,
    payload?.pagination?.total,
    payload?.data?.pagination?.total,
    payload?.total,
    payload?.data?.total,
  ];
  for (const v of candidates) {
    const n = Number(v);
    if (Number.isFinite(n) && n >= 0) return n;
  }
  return null;
}

function toUiInstructor(raw: any): UiInstructor | null {
  const id = raw?.id ?? raw?._id ?? raw?.instructorId ?? raw?.userId ?? null;
  const name = String(raw?.name ?? raw?.fullName ?? raw?.username ?? "").trim();
  const email = String(raw?.email ?? "").trim();
  if (!id || !name || !email) return null;

  const phone =
    typeof raw?.phone === "string" && raw.phone.trim().length > 0
      ? raw.phone.trim()
      : undefined;

  const country =
    typeof raw?.country === "string" && raw.country.trim().length > 0
      ? raw.country.trim()
      : undefined;

  return {
    id,
    name,
    email,
    phone,
    country,
    status: normalizeStatus(raw),
    joinDate: formatDate(raw?.createdAt ?? raw?.created_at ?? raw?.joinDate),
  };
}

function ModalShell({
  title,
  subtitle,
  loading,
  onClose,
  children,
}: {
  title: string;
  subtitle: string;
  loading?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-[14px] font-extrabold text-gray-900">
              {title}
            </h2>
            <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            <X size={15} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

function CreateInstructorModal({
  loading,
  onClose,
  onSubmit,
}: {
  loading: boolean;
  onClose: () => void;
  onSubmit: (payload: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    country?: string;
  }) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    if (!password.trim()) e.password = "Password is required";
    return e;
  };

  const submit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    onSubmit({
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      phone: phone.trim().length > 0 ? phone.trim() : undefined,
      country: country.trim().length > 0 ? country.trim() : undefined,
    });
  };

  return (
    <ModalShell
      title="Create Instructor"
      subtitle="POST /instructor"
      loading={loading}
      onClose={onClose}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
            Name
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
            <p className="text-[10px] text-red-500 mt-1">{errors.password}</p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Phone{" "}
              <span className="text-gray-300 normal-case font-normal">
                (optional)
              </span>
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-9 px-3 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Country{" "}
              <span className="text-gray-300 normal-case font-normal">
                (optional)
              </span>
            </label>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full h-9 px-3 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>

        <div className="flex gap-2.5 pt-1">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-[12px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-200 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Check size={13} />
            )}
            Create
          </button>
        </div>
      </div>
    </ModalShell>
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
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-[12px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-2.5 rounded-xl text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-lg transition-colors disabled:opacity-60 disabled:pointer-events-none ${btn}`}
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : null}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailsModal({
  id,
  onClose,
}: {
  id: number | string;
  onClose: () => void;
}) {
  const [trigger, { data, isFetching, isError }] =
    useLazyAdminInstructorQuery();

  React.useEffect(() => {
    trigger(id);
  }, [id, trigger]);

  return (
    <ModalShell
      title="Instructor Details"
      subtitle="GET /instructor/:id"
      loading={isFetching}
      onClose={onClose}
    >
      {isFetching ? (
        <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold py-8">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading...
        </div>
      ) : isError ? (
        <div className="text-[12px] text-red-500 font-semibold py-4">
          Failed to load details
        </div>
      ) : (
        <pre className="text-[11px] text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 overflow-auto max-h-[320px]">
          {JSON.stringify(data ?? null, null, 2)}
        </pre>
      )}
    </ModalShell>
  );
}

export default function InstructorManager(): React.JSX.Element {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useAdminInstructorsQuery({
    search: search || undefined,
    page,
    limit: PAGE_SIZE,
  });

  const [createInstructor, { isLoading: isCreating }] =
    useAdminCreateInstructorMutation();
  const [deleteInstructor, { isLoading: isDeleting }] =
    useAdminDeleteInstructorMutation();
  const [restoreInstructor, { isLoading: isRestoring }] =
    useAdminRestoreInstructorMutation();

  const instructors = useMemo(() => {
    const list = extractInstructors(data);
    return list
      .map(toUiInstructor)
      .filter((x): x is UiInstructor => Boolean(x));
  }, [data]);

  const stats = useMemo(() => {
    const total = instructors.length;
    const deleted = instructors.filter((u) => u.status === "Deleted").length;
    const active = total - deleted;
    return { total, active, deleted };
  }, [instructors]);

  const totalFromApi = extractTotal(data);
  const totalPages = Math.max(
    1,
    totalFromApi !== null ? Math.ceil(totalFromApi / PAGE_SIZE) : 1,
  );

  const [createOpen, setCreateOpen] = useState(false);
  const [detailsId, setDetailsId] = useState<number | string | null>(null);
  const [restore, setRestore] = useState<UiInstructor | null>(null);
  const [remove, setRemove] = useState<UiInstructor | null>(null);

  const busy = isCreating || isDeleting || isRestoring;

  return (
    <>
      {createOpen ? (
        <CreateInstructorModal
          loading={isCreating}
          onClose={() => setCreateOpen(false)}
          onSubmit={async (payload) => {
            await createInstructor(payload as any).unwrap();
            setCreateOpen(false);
          }}
        />
      ) : null}

      {detailsId !== null ? (
        <DetailsModal id={detailsId} onClose={() => setDetailsId(null)} />
      ) : null}

      {restore ? (
        <ConfirmModal
          title="Restore instructor?"
          description={
            <>
              Restore{" "}
              <span className="font-semibold text-gray-800">
                {restore.name}
              </span>{" "}
              via{" "}
              <span className="font-semibold text-gray-800">
                /instructor/:id/restore
              </span>
            </>
          }
          confirmText="Restore"
          confirmTone="primary"
          loading={busy}
          onClose={() => setRestore(null)}
          onConfirm={async () => {
            await restoreInstructor(restore.id).unwrap();
            setRestore(null);
          }}
        />
      ) : null}

      {remove ? (
        <ConfirmModal
          title="Delete instructor?"
          description={
            <>
              Delete{" "}
              <span className="font-semibold text-gray-800">{remove.name}</span>{" "}
              via{" "}
              <span className="font-semibold text-gray-800">
                DELETE /instructor/:id
              </span>
            </>
          }
          confirmText="Delete"
          confirmTone="danger"
          loading={busy}
          onClose={() => setRemove(null)}
          onConfirm={async () => {
            await deleteInstructor(remove.id).unwrap();
            setRemove(null);
          }}
        />
      ) : null}

      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-[18px] font-extrabold text-gray-900 tracking-tight">
              Instructor Management
            </h1>
            <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
              POST /instructor · GET /instructor (search,page,limit) · GET
              /instructor/:id · DELETE /instructor/:id · PATCH
              /instructor/:id/restore
            </p>
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            disabled={isCreating}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-[12px] font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:pointer-events-none"
          >
            <UserPlus size={14} /> Add Instructor
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
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
              label: "Deleted",
              value: stats.deleted,
              tone: "bg-white border border-amber-200 shadow-sm",
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

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 w-full sm:w-[420px]">
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
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  {[
                    "Instructor",
                    "Phone",
                    "Country",
                    "Status",
                    "Joined",
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
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10">
                      <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold">
                        <Loader2 className="h-4 w-4 animate-spin" /> Loading
                        instructors...
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-[12px] text-red-500 font-semibold"
                    >
                      Failed to load instructors
                    </td>
                  </tr>
                ) : instructors.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-[12px] text-gray-400"
                    >
                      No instructors found.
                    </td>
                  </tr>
                ) : (
                  instructors.map((u) => (
                    <tr
                      key={String(u.id)}
                      className="hover:bg-indigo-50/20 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="text-[12px] font-bold text-gray-900">
                          {u.name}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {u.email}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-[12px] text-gray-700">
                        {u.phone ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-[12px] text-gray-700">
                        {u.country ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={
                            u.status === "Active"
                              ? "inline-flex items-center gap-1.5 text-[12px] font-semibold text-emerald-600"
                              : "inline-flex items-center gap-1.5 text-[12px] font-semibold text-amber-600"
                          }
                        >
                          <span
                            className={
                              u.status === "Active"
                                ? "w-1.5 h-1.5 rounded-full bg-emerald-500"
                                : "w-1.5 h-1.5 rounded-full bg-amber-500"
                            }
                          />
                          {u.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[12px] text-gray-500">
                        {u.joinDate}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDetailsId(u.id)}
                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600"
                            title="Details"
                          >
                            <Eye size={14} />
                          </button>

                          {u.status === "Deleted" ? (
                            <button
                              onClick={() => setRestore(u)}
                              className="px-3 py-2 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700 text-[12px] font-bold disabled:opacity-60 disabled:pointer-events-none"
                              disabled={busy}
                            >
                              Restore
                            </button>
                          ) : (
                            <button
                              onClick={() => setRemove(u)}
                              className="p-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 disabled:opacity-60 disabled:pointer-events-none"
                              title="Delete"
                              disabled={busy}
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
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
              Page <span className="text-gray-700">{page}</span> of{" "}
              <span className="text-gray-700">{totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
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
