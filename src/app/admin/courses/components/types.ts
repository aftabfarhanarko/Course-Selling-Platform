export type Status = "Active" | "Deleted";

export type UiCourse = {
  id: number | string;
  name: string;
  description?: string;
  categoryId: number | string;
  categoryName: string;
  status: Status;
  createdAt?: string;
  slug?: string;
  price?: string | number;
  discountPrice?: string | number;
  enrollmentCount?: number;
  isPublished?: boolean;
  isActive?: boolean;
  instructorName?: string;
  thumbnail?: string;
};
