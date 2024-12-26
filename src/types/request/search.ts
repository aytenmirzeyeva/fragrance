import { Brand } from "../response/brand";

export class SearchRequest {
  brands?: Brand[];
  endYear?: number;
  genderId?: number;
  noteIds?: number[];
  rating?: number;
  startYear?: number;
  title?: string;
}
