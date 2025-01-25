export interface ProductCardsSectionProps {
  startYear: number | undefined;
  endYear: number | undefined;
  genderId: number | null | undefined;
  searchTitle: string;
  setSearchTitle: (searchTitle: string) => void;
}
