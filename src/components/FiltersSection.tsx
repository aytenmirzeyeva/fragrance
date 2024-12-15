import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button/index";
import StyledHeading from "./Heading/index";
import GenderFilter from "./GenderFilter";
import BrandsFilter from "./BrandsFilter";
import NotesFilter from "./NotesFilter";
import RatingFilter from "./RatingFilter";

interface FiltersProps {
  className?: string;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
}
const Filters: React.FC<FiltersProps> = ({ className, setShowFilters }) => {
  return (
    <div className={`p-4 ${className}`}>
      <div className="flex flex-wrap justify-between items-center">
        <Button
          btnText="Clear all filters"
          className="border-pink-300 bg-transparent text-pink-300 px-2 py-1"
        />
        <Button
          icon={faXmark}
          onClick={() => setShowFilters(false)}
          className="md:hidden border-pink-300 bg-transparent text-pink-300 px-2 py-1"
        />
      </div>
      <hr className="my-6" />
      <div className="year-filter-section">
        <StyledHeading headingText="Release year" className="text-lg" />
      </div>
      <hr className="my-6" />
      <GenderFilter />
      <BrandsFilter />
      <NotesFilter />
      <RatingFilter />
    </div>
  );
};

export default Filters;
