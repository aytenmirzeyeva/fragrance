import { useState, useEffect } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CircularProgress from "@mui/material/CircularProgress";
import { SearchRequest } from "@/types/request/search";
import { Perfume } from "@/types/response/product";
import Input from "@/components/Input";
import ProductCard from "./ProductCard/index";
import { fetchPerfumes } from "../utils/product.api";

const ProductCardsSection: React.FC = () => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPerfumes = async () => {
      setLoading(true);
      setError(null);

      const searchRequest = new SearchRequest();
      searchRequest.endYear = 2012;
      searchRequest.startYear = 2010;
      searchRequest.title = "dol";

      try {
        const perfumes = await fetchPerfumes(searchRequest);
        setPerfumes(perfumes);
      } catch (err: any) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    loadPerfumes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full">
        <CircularProgress sx={{ color: "#f472b6" }} />
      </div>
    );
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="py-4">
      <div className="flex flex-col">
        <Input
          icon={faSearch}
          type="text"
          placeholder="Search perfumes, brands, notes..."
        />
        <div className="flex flex-row flex-wrap gap-5 justify-center py-10">
          {perfumes.map((item) => (
            <ProductCard product={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCardsSection;
