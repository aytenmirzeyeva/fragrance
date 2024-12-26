import axios from "axios";
import { useEffect, useState } from "react";
import { GeneralResponse } from "@/types/response/general-response";
import { Brand } from "@/types/response/brand";
import { BASE_URL } from "@/services/baseURL";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import StyledHeading from "@/components/Heading";
import FilterCard from "@/components/FilterCard/index";
import Input from "@/components/Input";
const Brands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const response = await axios.get<GeneralResponse<Brand[]>>(
          `${BASE_URL}/public/search/brands?page=0&query=a&size=10`
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
      <div className="container">
        <StyledHeading headingText="Brands" className="text-3xl text-center" />
        <div className="flex flex-col">
          <Input
            icon={faSearch}
            type="text"
            placeholder="Search brands..."
            width="w-3/4"
          />
          <div className="flex flex-wrap justify-center gap-3 py-7">
            {brands.map((brand) => (
              <FilterCard
                key={brand.id}
                text={brand.title}
                image={brand.image}
                className="w-64"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
