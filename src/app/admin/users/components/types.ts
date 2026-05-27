// types.ts
export type Role = "Student" | "Instructor" | "Admin" | "Affiliate" | "Buyer" | "student" | "instructor" | "admin" | "affiliate" | "buyer";
export type Status = "Active" | "Suspended" | "Deleted";

export interface UiUser {
  id: number | string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  joinDate: string;
  phone?: string;
  country?: string;
  isActive: boolean;
  isBanned: boolean;
  deletedAt: string | null;
  banReason?: string;
  referCode?: string;
  telegram?: string;
  whatsapp?: string;
  nidFrontSide?: string;
  nidBackSide?: string;
  photoUrl?: string;
  avatar: string;
  avatarBg: string;
  avatarColor: string;
}

export const PAGE_SIZE = 8;

export const bgPalette = [
  { bg: "#FEE2E2", color: "#EF4444" },
  { bg: "#FEF3C7", color: "#D97706" },
  { bg: "#D1FAE5", color: "#059669" },
  { bg: "#EDE9FE", color: "#7C3AED" },
  { bg: "#DBEAFE", color: "#2563EB" },
  { bg: "#FCE7F3", color: "#DB2777" },
];