// pages/admin/users.tsx (or wherever you place the main component)
"use client";

import React, { useMemo, useState } from "react";
import { Users, UserPlus, Loader2 } from "lucide-react";
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
import { UserTableDesktop } from "./components/UserTableDesktop";
import { UserCardsMobile } from "./components/UserCardsMobile";
import { Pagination } from "./components/Pagination";
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
  const [page, setPage] = useState(1);
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

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

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

  const handleSearchChange = () => setPage(1);

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

      <div className="min-h-screen bg-slate-50 p-3 sm:p-5 lg:p-6">
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
                  Manage platform users, roles, access permissions and account status.
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

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="hidden lg:block overflow-x-auto">
            <UserTableDesktop
              isLoading={isLoading}
              isError={isError}
              users={paginated}
              onView={setViewUser}
              onBan={(u) => setConfirm({ type: "ban", user: u })}
              onUnban={(u) => setConfirm({ type: "unban", user: u })}
              onDelete={(u) => setConfirm({ type: "delete", user: u })}
              onRestore={(u) => setConfirm({ type: "restore", user: u })}
            />
          </div>
          <div className="lg:hidden">
            <UserCardsMobile
              isLoading={isLoading}
              isError={isError}
              users={paginated}
              onView={setViewUser}
              onBan={(u) => setConfirm({ type: "ban", user: u })}
              onUnban={(u) => setConfirm({ type: "unban", user: u })}
              onDelete={(u) => setConfirm({ type: "delete", user: u })}
              onRestore={(u) => setConfirm({ type: "restore", user: u })}
            />
          </div>
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            totalItems={filtered.length}
            onPageChange={setPage}
          />
        </div>
      </div>
    </>
  );
}
