import { Brand } from "./Brand";

export class SearchRequest {
  brands?: Brand[];
  endYear?: number;
  genderId?: number;
  noteIds?: number[];
  rating?: number;
  startYear?: number;
  title?: string;
}
