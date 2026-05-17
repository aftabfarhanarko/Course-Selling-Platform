// types.ts
export type Status = "Active" | "Inactive" | "Deleted";

export interface UiInstructor {
  id: number | string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  photo?: string;
  role?: string;
  designation?: string;
  experience?: string;
  bio?: string;
  skills: string[];
  website?: string;
  github?: string;
  linkedin?: string;
  isActive: boolean;
  status: Status;
  joinDate: string;
  raw: any;
}

export interface CreatePayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  country?: string;
  designation?: string;
  experience?: string;
  bio?: string;
  metadata?: {
    website?: string;
    skills?: string[];
    social_links?: {
      github?: string;
      linkedin?: string;
    };
  };
}

export const PAGE_SIZE = 8;
