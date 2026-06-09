// pages/admin/users.tsx (or wherever you place the main component)
"use client";

import React, { useMemo, useState } from "react";
import {
  Users,
  UserPlus,
  Loader2,
  Eye,
  Shield,
  ShieldOff,
  Trash2,
  Phone,
  Globe,
} from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  DataTable,
  DataTableColumnHeader,
} from "@/components/share/Table-Share";
import {
  useAdminBanUserMutation,
  useAdminCreateUserMutation,
  useAdminDeleteUserMutation,
  useAdminRestoreUserMutation,
  useAdminUnbanUserMutation,
  useAdminUsersQuery,
} from "@/lib/api/admin/user";

import { UiUser, Role, Status, PAGE_SIZE } from "./components/types";
// import { CreateModal } from "./components/CreateModal";
import { extractUsers, toUiUser } from "./components/utils";
import { StatCards } from "./components/StatCards";
import { SearchFilters } from "./components/SearchFilters";
import { Avatar } from "./components/Avatar";
import { RoleBadge } from "./components/RoleBadge";
import { StatusBadge } from "./components/StatusBadge";
import { UserCardsMobile } from "./components/UserCardsMobile";
import { CreateModal } from "./components/CreateModal";
import { ViewModal } from "./components/ViewModal";
import { ConfirmModal } from "./components/ConfirmModal";

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
  const [createOpen, setCreateOpen] = useState(false);
  const [viewUser, setViewUser] = useState<UiUser | null>(null);
  const [confirm, setConfirm] = useState<null | {
    type: "delete" | "ban" | "unban" | "restore";
    user: UiUser;
  }>(null);

  const uiUsers = useMemo(
    () => extractUsers(data).map(toUiUser).filter(Boolean) as UiUser[],
    [data],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return uiUsers.filter((u) => {
      if (roleFilter !== "All" && u.role !== roleFilter) return false;
      if (statusFilter !== "All" && u.status !== statusFilter) return false;
      if (!q) return true;
      return [u.name, u.email, u.role, u.phone ?? "", u.country ?? ""].some(
        (v) => v.toLowerCase().includes(q),
      );
    });
  }, [uiUsers, roleFilter, statusFilter, search]);
  const stats = useMemo(
    () => ({
      total: uiUsers.length,
      active: uiUsers.filter((u) => u.status === "Active").length,
      suspended: uiUsers.filter((u) => u.status === "Suspended").length,
      deleted: uiUsers.filter((u) => u.status === "Deleted").length,
    }),
    [uiUsers],
  );

  const busy =
    isCreating || isDeleting || isBanning || isUnbanning || isRestoring;

  const handleSearchChange = () => {};

  const confirmMeta = {
    delete: { title: "Delete User?", text: "Delete", tone: "danger" as const },
    ban: { title: "Ban User?", text: "Ban User", tone: "warning" as const },
    unban: { title: "Unban User?", text: "Unban", tone: "primary" as const },
    restore: {
      title: "Restore User?",
      text: "Restore",
      tone: "primary" as const,
    },
  };

  const columns = useMemo<ColumnDef<UiUser, unknown>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="User" />
        ),
        cell: ({ row }) => {
          const u = row.original;
          return (
            <div className="flex items-center gap-2.5">
              <Avatar user={u} size="sm" />
              <div className="min-w-0">
                <p className="text-[12px] font-bold text-gray-900 whitespace-nowrap">
                  {u.name}
                </p>
                <p className="text-[11px] text-gray-400 truncate max-w-[160px]">
                  {u.email}
                </p>
              </div>
            </div>
          );
        },
        enableHiding: false,
      },
      {
        accessorKey: "role",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Role" />
        ),
        cell: ({ row }) => <RoleBadge role={row.original.role} />,
      },
      {
        accessorKey: "phone",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Phone" />
        ),
        cell: ({ row }) =>
          row.original.phone ? (
            <span className="flex items-center gap-1 whitespace-nowrap text-[12px] text-gray-600">
              <Phone size={10} className="text-gray-400" />
              {row.original.phone}
            </span>
          ) : (
            <span className="text-gray-300">—</span>
          ),
      },
      {
        accessorKey: "country",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Country" />
        ),
        cell: ({ row }) =>
          row.original.country ? (
            <span className="flex items-center gap-1 whitespace-nowrap text-[12px] text-gray-600">
              <Globe size={10} className="text-gray-400" />
              {row.original.country}
            </span>
          ) : (
            <span className="text-gray-300">—</span>
          ),
      },
      {
        accessorKey: "joinDate",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Joined" />
        ),
        cell: ({ row }) => (
          <span className="text-[12px] text-gray-500 whitespace-nowrap">
            {row.original.joinDate}
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
        id: "actions",
        header: "Actions",
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => {
          const u = row.original;
          return (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setViewUser(u)}
                title="View"
                className="p-2 rounded-lg border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200 text-gray-500 hover:text-indigo-600 transition-all"
              >
                <Eye size={13} />
              </button>
              {u.status === "Deleted" ? (
                <button
                  onClick={() => setConfirm({ type: "restore", user: u })}
                  title="Restore"
                  disabled={busy}
                  className="p-2 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors disabled:opacity-60"
                >
                  <Shield size={13} />
                </button>
              ) : u.status === "Active" ? (
                <button
                  onClick={() => setConfirm({ type: "ban", user: u })}
                  title="Ban"
                  disabled={busy}
                  className="p-2 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors disabled:opacity-60"
                >
                  <ShieldOff size={13} />
                </button>
              ) : (
                <button
                  onClick={() => setConfirm({ type: "unban", user: u })}
                  title="Unban"
                  disabled={busy}
                  className="p-2 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors disabled:opacity-60"
                >
                  <Shield size={13} />
                </button>
              )}
              <button
                onClick={() => setConfirm({ type: "delete", user: u })}
                title="Delete"
                disabled={busy}
                className="p-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 transition-colors disabled:opacity-60"
              >
                <Trash2 size={13} />
              </button>
            </div>
          );
        },
      },
    ],
    [busy],
  );
  return (
    <>
      {createOpen && (
        <CreateModal
          loading={isCreating}
          onClose={() => setCreateOpen(false)}
          onCreate={async (p) => {
            await createUser(p).unwrap();
            setCreateOpen(false);
          }}
        />
      )}
      {viewUser && (
        <ViewModal user={viewUser} onClose={() => setViewUser(null)} />
      )}
      {confirm && (
        <ConfirmModal
          title={confirmMeta[confirm.type].title}
          description={
            <>
              You are about to{" "}
              <span className="font-bold text-gray-900">{confirm.type}</span>{" "}
              <span className="font-bold text-gray-900">
                {confirm.user.name}
              </span>
              .
            </>
          }
          confirmText={confirmMeta[confirm.type].text}
          confirmTone={confirmMeta[confirm.type].tone}
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
      )}

      <div className="min-h-screen bg-white p-3 sm:p-5 lg:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 flex-shrink-0">
              <Users size={20} className="text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-[17px] sm:text-[20px] font-extrabold text-gray-900 tracking-tight leading-none">
                User Management
              </h1>
              <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5 font-medium truncate hidden sm:block">
                Manage platform users, roles, access permissions and account
                status.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            disabled={isCreating}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-[12px] sm:text-[13px] font-bold px-3 sm:px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-200 disabled:opacity-60 flex-shrink-0 whitespace-nowrap"
          >
            <UserPlus size={15} />
            <span className="hidden sm:inline">Add User</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
        <StatCards
          total={stats.total}
          active={stats.active}
          suspended={stats.suspended}
          deleted={stats.deleted}
        />
        <SearchFilters
          search={search}
          setSearch={setSearch}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onSearchChange={handleSearchChange}
        />
        <div className="hidden lg:block">
          {isLoading ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="py-16 text-center">
                <div className="flex items-center justify-center gap-2 text-[13px] text-gray-400 font-semibold">
                  <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />{" "}
                  Loading users...
                </div>
              </div>
            </div>
          ) : isError ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="py-16 text-center text-[13px] text-red-500 font-semibold">
                Failed to load users.
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="py-16 text-center text-[13px] text-gray-400">
                No users found.
              </div>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={filtered}
              showColumnsToggle={false}
              showFooter={false}
              pageSize={filtered.length || PAGE_SIZE}
            />
          )}
        </div>
        <div className="lg:hidden bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <UserCardsMobile
            isLoading={isLoading}
            isError={isError}
            users={filtered}
            onView={setViewUser}
            onBan={(u) => setConfirm({ type: "ban", user: u })}
            onUnban={(u) => setConfirm({ type: "unban", user: u })}
            onDelete={(u) => setConfirm({ type: "delete", user: u })}
            onRestore={(u) => setConfirm({ type: "restore", user: u })}
          />
        </div>
      </div>
    </>
  );
}
