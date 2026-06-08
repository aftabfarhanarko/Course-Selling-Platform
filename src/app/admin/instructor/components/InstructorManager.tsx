// InstructorManagerPage.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  Eye,
  Loader2,
  RefreshCw,
  Search,
  Trash2,
  UserPlus,
} from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import {
  useAdminCreateInstructorMutation,
  useAdminDeleteInstructorMutation,
  useAdminInstructorsQuery,
  useAdminRestoreInstructorMutation,
} from "@/lib/api/admin/instructor";

import {
  DataTable,
  DataTableColumnHeader,
} from "@/components/share/Table-Share";

import { Status, UiInstructor, PAGE_SIZE } from "./types";
import { extractInstructors, extractTotal, toUiInstructor } from "./utils";
import { Avatar } from "./Avatar";
import { StatusBadge } from "./StatusBadge";
import { SkillTags } from "./SkillTags";
import { CreateInstructorModal } from "./CreateInstructorModal";
import { ConfirmModal } from "./ConfirmModal";
import { DetailsModal } from "./DetailsModal";
import { InstructorCard } from "./InstructorCard";
import { Pagination } from "./Pagination";

export default function InstructorManager(): React.JSX.Element {
  const router = useRouter();
  const authUser = useSelector((state: RootState) => state.auth.user);

  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const tokenFromState =
      authUser?.token ??
      authUser?.accessToken ??
      authUser?.access_token ??
      null;
    const roleFromState = authUser?.role ?? null;

    let token: string | null =
      typeof tokenFromState === "string" ? tokenFromState : null;
    let role: string | null =
      typeof roleFromState === "string" ? roleFromState : null;

    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("course_platform_auth");
        if (raw) {
          const parsed = JSON.parse(raw) as any;
          const tokenFromStorage =
            parsed?.user?.token ??
            parsed?.user?.accessToken ??
            parsed?.user?.access_token ??
            parsed?.token ??
            parsed?.accessToken ??
            parsed?.access_token ??
            null;

          if (!token && typeof tokenFromStorage === "string") {
            token = tokenFromStorage;
          }

          const roleFromStorage = parsed?.user?.role ?? parsed?.role ?? null;
          if (!role && typeof roleFromStorage === "string") {
            role = roleFromStorage;
          }
        }
      } catch {}
    }

    const roleNorm = String(role ?? "")
      .trim()
      .toLowerCase();
    const allowed =
      !!token &&
      (roleNorm === "admin" ||
        roleNorm === "superadmin" ||
        roleNorm === "super_admin");

    setIsAdmin(allowed);
    setAuthChecked(true);

    if (!allowed) {
      router.replace("/login");
    }
  }, [authUser, router]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | Status>("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useAdminInstructorsQuery(
    {
      search: search || undefined,
      page,
      limit: PAGE_SIZE,
    },
    { skip: !isAdmin },
  );

  const [createInstructor, { isLoading: isCreating }] =
    useAdminCreateInstructorMutation();
  const [deleteInstructor, { isLoading: isDeleting }] =
    useAdminDeleteInstructorMutation();
  const [restoreInstructor, { isLoading: isRestoring }] =
    useAdminRestoreInstructorMutation();

  const instructors = useMemo<UiInstructor[]>(() => {
    const list = extractInstructors(data);
    return list
      .map(toUiInstructor)
      .filter((x): x is UiInstructor => Boolean(x));
  }, [data]);

  const filteredInstructors = useMemo(() => {
    if (!statusFilter) return instructors;
    return instructors.filter((i) => i.status === statusFilter);
  }, [instructors, statusFilter]);

  const stats = useMemo(() => {
    const total = instructors.length;
    const active = instructors.filter((u) => u.status === "Active").length;
    const inactive = instructors.filter((u) => u.status === "Inactive").length;
    const deleted = instructors.filter((u) => u.status === "Deleted").length;
    return { total, active, inactive, deleted };
  }, [instructors]);

  const totalFromApi = extractTotal(data);
  const totalPages = Math.max(
    1,
    totalFromApi !== null ? Math.ceil(totalFromApi / PAGE_SIZE) : 1,
  );

  const [createOpen, setCreateOpen] = useState(false);
  const [detailsId, setDetailsId] = useState<number | string | null>(null);
  const [restoreTarget, setRestoreTarget] = useState<UiInstructor | null>(null);
  const [removeTarget, setRemoveTarget] = useState<UiInstructor | null>(null);

  const busy = isCreating || isDeleting || isRestoring;

  const statCards = [
    {
      label: "Total",
      value: stats.total,
      cls: "bg-indigo-600",
      valCls: "text-white",
      labelCls: "text-indigo-200",
    },
    {
      label: "Active",
      value: stats.active,
      cls: "bg-white border border-emerald-200",
      valCls: "text-emerald-600",
      labelCls: "text-gray-400",
    },
    {
      label: "Inactive",
      value: stats.inactive,
      cls: "bg-white border border-amber-200",
      valCls: "text-amber-600",
      labelCls: "text-gray-400",
    },
    {
      label: "Deleted",
      value: stats.deleted,
      cls: "bg-white border border-red-200",
      valCls: "text-red-500",
      labelCls: "text-gray-400",
    },
  ];

  const columns = useMemo<ColumnDef<UiInstructor, unknown>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Instructor" />
        ),
        cell: ({ row }) => {
          const u = row.original;
          return (
            <div className="flex items-center gap-2.5">
              <Avatar name={u.name} photo={u.photo} />
              <div className="min-w-0">
                <p className="text-[12px] font-bold text-gray-900 whitespace-nowrap">
                  {u.name}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5 truncate max-w-[220px]">
                  {u.email}
                </p>
              </div>
            </div>
          );
        },
        enableHiding: false,
      },
      {
        accessorKey: "designation",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Designation" />
        ),
        cell: ({ row }) => (
          <span className="whitespace-nowrap">
            {row.original.designation ?? "—"}
          </span>
        ),
      },
      {
        accessorKey: "experience",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Experience" />
        ),
        cell: ({ row }) => (
          <span className="whitespace-nowrap">
            {row.original.experience ?? "—"}
          </span>
        ),
      },
      {
        id: "skills",
        accessorFn: (u) => (u.skills ?? []).join(", "),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Skills" />
        ),
        cell: ({ row }) => {
          const u = row.original;
          return u.skills.length > 0 ? (
            <SkillTags skills={u.skills} max={2} />
          ) : (
            <span className="text-gray-400 text-[12px]">—</span>
          );
        },
      },
      {
        accessorKey: "phone",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Phone" />
        ),
        cell: ({ row }) => (
          <span className="whitespace-nowrap">{row.original.phone ?? "—"}</span>
        ),
      },
      {
        accessorKey: "country",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Country" />
        ),
        cell: ({ row }) => (
          <span className="whitespace-nowrap">
            {row.original.country ?? "—"}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "joinDate",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Joined" />
        ),
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-gray-500">
            {row.original.joinDate}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => {
          const u = row.original;
          return (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDetailsId(u.id)}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
              >
                <Eye size={14} />
              </button>
              {u.status === "Deleted" ? (
                <button
                  onClick={() => setRestoreTarget(u)}
                  disabled={busy || !isAdmin}
                  className="px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold flex items-center gap-1 transition-colors disabled:opacity-60"
                >
                  <RefreshCw size={11} /> Restore
                </button>
              ) : (
                <button
                  onClick={() => setRemoveTarget(u)}
                  disabled={busy || !isAdmin}
                  className="p-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          );
        },
      },
    ],
    [busy, isAdmin],
  );
  const renderTableBody = () => {
    if (!authChecked)
      return (
        <div className="flex items-center justify-center gap-2 py-16 text-[12px] text-gray-500 font-semibold">
          <Loader2 className="h-4 w-4 animate-spin" /> Checking session...
        </div>
      );

    if (!isAdmin)
      return (
        <div className="text-center py-16 text-[12px] text-red-500 font-semibold">
          Unauthorized.
        </div>
      );

    if (isLoading)
      return (
        <div className="flex items-center justify-center gap-2 py-16 text-[12px] text-gray-500 font-semibold">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading instructors...
        </div>
      );
    if (isError)
      return (
        <div className="text-center py-16 text-[12px] text-red-500 font-semibold">
          Failed to load instructors.
        </div>
      );
    if (!filteredInstructors.length)
      return (
        <div className="text-center py-16 text-[12px] text-gray-400">
          No instructors found.
        </div>
      );
    return null;
  };

  return (
    <>
      {/* Modals */}
      {createOpen && (
        <CreateInstructorModal
          loading={isCreating}
          onClose={() => setCreateOpen(false)}
          onSubmit={async (payload) => {
            await createInstructor(payload as any).unwrap();
            setCreateOpen(false);
          }}
        />
      )}
      {detailsId !== null && (
        <DetailsModal id={detailsId} onClose={() => setDetailsId(null)} />
      )}
      {restoreTarget && (
        <ConfirmModal
          title="Restore instructor?"
          description={
            <>
              Restore{" "}
              <span className="font-semibold text-gray-800">
                {restoreTarget.name}
              </span>{" "}
            
            </>
          }
          confirmText="Restore"
          confirmTone="primary"
          loading={busy}
          onClose={() => setRestoreTarget(null)}
          onConfirm={async () => {
            await restoreInstructor(restoreTarget.id).unwrap();
            setRestoreTarget(null);
          }}
        />
      )}
      {removeTarget && (
        <ConfirmModal
          title="Delete instructor?"
          description={
            <>
              Delete{" "}
              <span className="font-semibold text-gray-800">
                {removeTarget.name}
              </span>{" "}
             
            </>
          }
          confirmText="Delete"
          confirmTone="danger"
          loading={busy}
          onClose={() => setRemoveTarget(null)}
          onConfirm={async () => {
            await deleteInstructor(removeTarget.id).unwrap();
            setRemoveTarget(null);
          }}
        />
      )}

      <div className="min-h-screen  p-3 sm:p-4 lg:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-5 gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 flex-shrink-0">
              <UserPlus size={17} className="text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-[16px] sm:text-[18px] font-extrabold text-gray-900 tracking-tight">
                Instructor Management
              </h1>
              <p className="text-[11px] text-gray-400 mt-0.5 font-medium hidden sm:block">
                Manage platform instructors, roles, and account status.
              </p>
            </div>
          </div>
          <button
            onClick={() => (isAdmin ? setCreateOpen(true) : null)}
            disabled={isCreating || !isAdmin}
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-[12px] sm:text-[13px] font-semibold px-3 sm:px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:pointer-events-none flex-shrink-0"
          >
            <UserPlus size={14} />
            <span className="hidden sm:inline">Add Instructor</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-4 sm:mb-5">
          {statCards.map((s) => (
            <div
              key={s.label}
              className={`rounded-xl p-3.5 sm:p-4 shadow-sm ${s.cls}`}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-widest ${s.labelCls}`}
              >
                {s.label}
              </p>
              <p
                className={`mt-1 text-[22px] sm:text-[24px] font-extrabold ${s.valCls}`}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Search / filter */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 sm:p-3.5 mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-2 flex-1 min-w-0 bg-gray-50 sm:bg-transparent rounded-xl px-3 py-2 sm:px-0 sm:py-0">
              <Search size={14} className="text-gray-400 flex-shrink-0" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search name, email, designation..."
                className="w-full min-w-0 text-[12px] font-semibold text-gray-700 placeholder:text-gray-400 outline-none bg-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setPage(1);
              }}
              className="text-[12px] font-semibold text-gray-600 border border-gray-200 rounded-xl px-3 h-9 outline-none bg-white focus:ring-2 focus:ring-indigo-300 cursor-pointer flex-shrink-0 w-full sm:w-auto"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Deleted">Deleted</option>
            </select>
          </div>
        </div>

        {/* Empty / loading state */}
        {renderTableBody()}

        {/* Mobile cards */}
        {!isLoading && !isError && filteredInstructors.length > 0 && (
          <div className="flex flex-col gap-3 md:hidden">
            {filteredInstructors.map((u) => (
              <InstructorCard
                key={String(u.id)}
                u={u}
                busy={busy}
                onDetails={() => setDetailsId(u.id)}
                onDelete={() => setRemoveTarget(u)}
                onRestore={() => setRestoreTarget(u)}
              />
            ))}
            {totalPages > 1 && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-4 py-3 mt-1">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onChange={setPage}
                />
              </div>
            )}
          </div>
        )}

        {/* Desktop table */}
        {!isLoading && !isError && filteredInstructors.length > 0 && (
          <div className="hidden md:block">
            <DataTable
              columns={columns}
              data={filteredInstructors}
              showColumnsToggle={false}
              pageSize={PAGE_SIZE}
            />

            {totalPages > 1 && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-4 py-3 mt-3">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onChange={setPage}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
