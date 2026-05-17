export type EarningTier = string;

export type SortKey =
  | "potential"
  | "price_asc"
  | "price_desc"
  | "rating"
  | "commission";

export interface Course {
  id: number | string;
  title: string;
  desc: string;
  image: string;
  price: number;
  category: string;
  potential: string;
  potentialVal: number;
  commission: string;
  commissionVal: number;
  earnings: string;
  rating: number;
  reviews: string;
}