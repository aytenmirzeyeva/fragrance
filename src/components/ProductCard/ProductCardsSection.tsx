import axios from "axios";
import { useState, useEffect } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { BASE_URL } from "@/services/baseURL";
import { GeneralResponse } from "@/types/general-response";
import { SearchRequest } from "@/types/search-request";
import { Perfume } from "@/types/product-response";
import Input from "@/components/ProductCard/Input";
import ProductCard from "./ProductCard";

const ProductCardsSection: React.FC = () => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerfumes = async () => {
      setLoading(true);
      setError(null);
      let searchRequest = new SearchRequest();
      searchRequest.endYear = 2012;
      searchRequest.startYear = 2010;
      searchRequest.title = "dol";
      try {
        const response = await axios.post<GeneralResponse<Perfume[]>>(
          `${BASE_URL}/public/search/?page=0&size=100`,
          searchRequest
        );
        setPerfumes(response.data.result.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
      }
    };
    fetchPerfumes();
    console.log(perfumes);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
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
          <ProductCard data={perfumes} />
        </div>
      </div>
    </div>
  );
};

export default ProductCardsSection;
