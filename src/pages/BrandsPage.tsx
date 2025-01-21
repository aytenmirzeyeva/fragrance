import axios from "axios";
import { useEffect, useState } from "react";
import { GeneralResponse } from "@/types/response/general-response";
import { Brand } from "@/types/response/brand";
import { BASE_URL } from "@/services/baseURL";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import StyledHeading from "@/components/Heading";
import FilterCard from "@/components/FilterCard/index";
import Input from "@/components/Input";
import { CircularProgress } from "@mui/material";
import { fallbackImage } from "@/utils/contants";

const BrandsPage = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const loadBrands = async () => {
    if (!hasMore) return;

    setError(null);
    setLoading(true);

    try {
      const response = await axios.get<GeneralResponse<Brand[]>>(
        `${BASE_URL}/public/search/brands?page=${page}&query=&size=50`,
      );
      const newBrands = response.data.result.data;

      setBrands((prev) => [...prev, ...newBrands]);
      if (response.data.result.data.length < 20) {
        setHasMore(false);
      }
    } catch (err: any) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrands();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100;

      if (bottom && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="relative py-20 bg-[url('@/assets/images/blue-and-pink-flowers-perfume-bottle.jpg')] bg-center bg-cover bg-fixed">
      {/* Overlay */}
      <div className="absolute inset-0 bg-pink-100 opacity-70"></div>

      {/* Content */}
      <div className="container relative z-10">
        <StyledHeading headingText="Brands" className="text-2xl md:text-4xl" />
        <div className="flex flex-col items-center">
          <Input
            icon={faSearch}
            type="text"
            placeholder="Search brands..."
            width="w-1/2"
            // value={}
            // onChange={(e) => {}}
          />
          <div className="flex flex-wrap gap-3 py-7 mx-auto justify-center">
            {brands.map((brand) =>
              brand.image && brand.title ? (
                <FilterCard
                  key={brand.id}
                  text={brand.title}
                  image={brand.image ? brand.image : fallbackImage}
                  className="w-64"
                />
              ) : null,
            )}
            {loading && (
              <div className="flex justify-center items-center w-full">
                <CircularProgress sx={{ color: "#f472b6" }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;
