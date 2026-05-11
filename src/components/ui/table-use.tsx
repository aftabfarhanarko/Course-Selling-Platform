// "use client";

// import { DataTable, ColumnDef, RowAction } from "@/components/ui/DataTable";

// // ── 1. Define your data type ──────────────────────────────────────────────────

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: "Admin" | "Editor" | "Viewer";
//   status: "Active" | "Inactive";
//   joined: string;
// }

// // ── 2. Sample data ────────────────────────────────────────────────────────────

// const USERS: User[] = [
//   {
//     id: 1,
//     name: "Alice Rahman",
//     email: "alice@acme.com",
//     role: "Admin",
//     status: "Active",
//     joined: "2023-01-15",
//   },
//   {
//     id: 2,
//     name: "Bob Hossain",
//     email: "bob@acme.com",
//     role: "Editor",
//     status: "Active",
//     joined: "2023-03-22",
//   },
//   {
//     id: 3,
//     name: "Carol Islam",
//     email: "carol@acme.com",
//     role: "Viewer",
//     status: "Inactive",
//     joined: "2023-05-10",
//   },
//   {
//     id: 4,
//     name: "David Chowdhury",
//     email: "david@acme.com",
//     role: "Editor",
//     status: "Active",
//     joined: "2023-07-08",
//   },
//   {
//     id: 5,
//     name: "Eva Begum",
//     email: "eva@acme.com",
//     role: "Viewer",
//     status: "Active",
//     joined: "2023-09-19",
//   },
//   {
//     id: 6,
//     name: "Frank Ahmed",
//     email: "frank@acme.com",
//     role: "Admin",
//     status: "Inactive",
//     joined: "2024-01-03",
//   },
//   {
//     id: 7,
//     name: "Grace Khan",
//     email: "grace@acme.com",
//     role: "Viewer",
//     status: "Active",
//     joined: "2024-02-14",
//   },
//   {
//     id: 8,
//     name: "Henry Mia",
//     email: "henry@acme.com",
//     role: "Editor",
//     status: "Active",
//     joined: "2024-04-01",
//   },
//   {
//     id: 9,
//     name: "Ivy Sultana",
//     email: "ivy@acme.com",
//     role: "Viewer",
//     status: "Inactive",
//     joined: "2024-05-20",
//   },
//   {
//     id: 10,
//     name: "Jack Rahim",
//     email: "jack@acme.com",
//     role: "Admin",
//     status: "Active",
//     joined: "2024-06-11",
//   },
//   {
//     id: 11,
//     name: "Kate Haque",
//     email: "kate@acme.com",
//     role: "Editor",
//     status: "Active",
//     joined: "2024-07-30",
//   },
//   {
//     id: 12,
//     name: "Leo Sarker",
//     email: "leo@acme.com",
//     role: "Viewer",
//     status: "Inactive",
//     joined: "2024-09-05",
//   },
// ];

// // ── 3. Column definitions ─────────────────────────────────────────────────────

// const columns: ColumnDef<User>[] = [
//   {
//     id: "name",
//     header: "Name",
//     sortable: true,
//     searchable: true,
//     cell: (row) => (
//       <span className="font-medium text-foreground">{row.name}</span>
//     ),
//   },
//   {
//     id: "email",
//     header: "Email",
//     sortable: true,
//     searchable: true,
//   },
//   {
//     id: "role",
//     header: "Role",
//     sortable: true,
//     cell: (row) => {
//       const colors: Record<User["role"], string> = {
//         Admin:
//           "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
//         Editor:
//           "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
//         Viewer: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
//       };
//       return (
//         <span
//           className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${colors[row.role]}`}
//         >
//           {row.role}
//         </span>
//       );
//     },
//   },
//   {
//     id: "status",
//     header: "Status",
//     sortable: true,
//     cell: (row) => (
//       <span
//         className={`inline-flex items-center gap-1.5 text-xs font-medium ${
//           row.status === "Active" ? "text-green-600" : "text-muted-foreground"
//         }`}
//       >
//         <span
//           className={`h-1.5 w-1.5 rounded-full ${
//             row.status === "Active" ? "bg-green-500" : "bg-gray-400"
//           }`}
//         />
//         {row.status}
//       </span>
//     ),
//   },
//   {
//     id: "joined",
//     header: "Joined",
//     sortable: true,
//     cell: (row) => (
//       <span className="text-muted-foreground">
//         {new Date(row.joined).toLocaleDateString("en-GB", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//         })}
//       </span>
//     ),
//   },
// ];

// // ── 4. Row actions ────────────────────────────────────────────────────────────

// const rowActions: RowAction<User>[] = [
//   {
//     label: "View",
//     onClick: (row) => console.log("View", row),
//   },
//   {
//     label: "Edit",
//     onClick: (row) => console.log("Edit", row),
//   },
//   {
//     label: "Delete",
//     variant: "destructive",
//     onClick: (row) => console.log("Delete", row),
//     hidden: (row) => row.role === "Admin", // Admins can't be deleted
//   },
// ];

// // ── 5. Page component ─────────────────────────────────────────────────────────

// export default function UsersPage() {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-6">Users</h1>
//       <DataTable
//         columns={columns}
//         data={USERS}
//         rowActions={rowActions}
//         defaultPageSize={10}
//         pageSizeOptions={[5, 10, 20]}
//         searchPlaceholder="Search by name or email…"
//         onSelectionChange={(rows) => console.log("Selected:", rows)}
//         caption="All registered users"
//       />
//     </div>
//   );
// }
