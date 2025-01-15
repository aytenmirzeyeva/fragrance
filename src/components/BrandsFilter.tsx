import { BASE_URL } from "@/services/baseURL";
import { useState, useEffect } from "react";
import axios from "axios";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { GeneralResponse } from "@/types/response/general-response";
import { Brand } from "../types/response/brand";
import Heading from "./Heading/index";
import FilterCard from "./FilterCard";
import Input from "./Input/index";

const BrandsFilter = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get<GeneralResponse<Brand[]>>(
          `${BASE_URL}/public/search/brands?page=0&query=&size=20`,
        );
        setBrands(response.data.result.data);
      } catch (err) {
        console.log("Error occurred while fetching brands:", err);
      }
    };
    fetchBrands();
  }, []);

  return (
    <div className="py-4">
      <Heading headingText="Brands" className="text-lg" />
      <div className="flex flex-col">
        <Input icon={faSearch} type="text" placeholder="Search brands..." />
        <div className="flex flex-wrap justify-center h-72 overflow-y-auto">
          {brands.map((brand) =>
            brand.image && brand.title ? (
              <FilterCard
                key={brand.id}
                text={brand.title}
                image={brand.image}
              />
            ) : null,
          )}
        </div>
      </div>
      <hr className="my-6" />
    </div>
  );
};

export default BrandsFilter;
