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

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const response = await axios.get<GeneralResponse<Brand[]>>(
          `${BASE_URL}/public/search/brands?page=0&query=a&size=5`
        );
        setBrands(response.data.result.data);
      } catch (err) {
        console.log("Failed to fetch data");
      }
    };
    fetchPerfumes();
  }, []);
  return (
    <div className="py-4">
      <Heading headingText="Brands" className="text-lg" />
      <div className="flex flex-col">
        <Input icon={faSearch} type="text" placeholder="Search brands..." />
        <div className="flex flex-wrap justify-center">
          {brands.map((brand) => (
            <FilterCard key={brand.id} text={brand.title} image={brand.image} />
          ))}
        </div>
      </div>
      <hr className="my-6" />
    </div>
  );
};

export default BrandsFilter;
