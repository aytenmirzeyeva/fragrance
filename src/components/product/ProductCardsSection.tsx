import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Input from "@/components/Input";
import ProductCard from "./ProductCard";

const ProductCardsSection: React.FC = () => {
  return (
    <div className="py-4">
      <div className="flex flex-col">
        <Input
          icon={faSearch}
          type="text"
          placeholder="Search perfumes, brands, notes..."
        />
        <ProductCard />
      </div>
    </div>
  );
};

export default ProductCardsSection;
