import { useState, useEffect } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CircularProgress from "@mui/material/CircularProgress";
import { SearchRequest } from "@/types/request/search";
import { Perfume } from "@/types/response/product";
import Input from "@/components/Input";
import ProductCard from "./index";
import { fetchPerfumes } from "../../utils/product.api";

const ProductCardsSection: React.FC = () => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const loadPerfumes = async () => {
    if (!hasMore) return;

    setLoading(true);
    setError(null);

    const searchRequest = new SearchRequest();
    searchRequest.endYear = 2025;
    searchRequest.startYear = 1901;
    searchRequest.title = "dol";

    try {
      const newPerfumes = await fetchPerfumes(searchRequest, page, 20);

      setPerfumes((prev) => [...prev, ...newPerfumes]);
      if (newPerfumes.length < 20) {
        setHasMore(false);
      }
    } catch (err: any) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPerfumes();
  }, [page]);

  const handleScroll = () => {
    const bottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1;

    if (bottom && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

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
        {loading && (
          <div className="flex justify-center items-center w-full">
            <CircularProgress sx={{ color: "#f472b6" }} />
          </div>
        )}
        {!hasMore && perfumes.length >= 100 && (
          <p className="text-center text-gray-500">You have reached the end!</p>
        )}
      </div>
    </div>
  );
};

export default ProductCardsSection;
