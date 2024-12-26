import { PerfumeNote } from "./perfume-note";
import { Accord } from "./accord";

export interface Perfume {
  id: string;
  title: string;
  brandName: string;
  rating: number;
  reviewCount: number;
  ratingCount: number;
  imageUrl: string;
  topNotes: PerfumeNote[];
  middleNotes: PerfumeNote[];
  baseNotes: PerfumeNote[];
  ingredients: PerfumeNote[];
  mainAccords: Accord[];
  genders: string | null;
  inWishList: boolean;
  gender: number;
  commentCount: number;
  description: string;
}
