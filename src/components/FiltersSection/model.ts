export interface FiltersProps {
  startYear: number | undefined;
  endYear: number | undefined;
  setStartYear: React.Dispatch<React.SetStateAction<number | undefined>>;
  setEndYear: React.Dispatch<React.SetStateAction<number | undefined>>;
  className?: string;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  genderId?: number | null;
  setGenderId: React.Dispatch<React.SetStateAction<number | null | undefined>>;
  resetSearch: () => void;
}
