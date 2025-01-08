import { Brand } from "../response/brand";

export class SearchRequest {
  brands?: Brand[];
  startYear?: number;
  endYear?: number;
  genderId?: number;
  noteIds?: number[];
  rating?: number;
  title?: string;
}
