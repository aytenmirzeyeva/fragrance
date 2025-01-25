import { Brand } from "../response/brand";

export class SearchRequest {
  brands?: Brand[];
  startYear?: number;
  endYear?: number;
  genderId?: number | null | undefined;
  noteIds?: number[];
  rating?: number;
  title?: string;
}
