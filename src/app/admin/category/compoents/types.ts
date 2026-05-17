// types.ts
export type Status = "Active" | "Deleted";

export interface UiCategory {
  id: number | string;
  name: string;
  slug: string;
  description?: string;
  photo?: string;
  isActive: boolean;
  status: Status;
  metadata?: {
    seo_title?: string;
    icon_class?: string;
    is_featured?: boolean;
  };
  createdAt?: string;
}
