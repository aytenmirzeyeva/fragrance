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
    <div className="relative py-20 bg-[url('@/assets/images/blue-and-pink-flowers-perfume-bottle.jpg')] bg-center bg-cover bg-fixed">
      {/* Overlay */}
      <div className="absolute inset-0 bg-pink-100 opacity-70"></div>

      {/* Content*/}
      <div className="container relative z-10">
        <StyledHeading headingText="Brands" className="text-2xl md:text-4xl"/>
        <div className="flex flex-col">
          <Input
            icon={faSearch}
            type="text"
            placeholder="Search brands..."
            width="w-1/2"
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
