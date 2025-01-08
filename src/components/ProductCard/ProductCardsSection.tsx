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
  const [searchTitle, setSearchTitle] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState(searchTitle);
  const [page, setPage] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);

  const loadPerfumes = async () => {
    if (!hasMore) return;

    setLoading(true);
    setError(null);

    const searchRequest = new SearchRequest();

    searchRequest.title = initialLoad ? "" : debouncedTitle;

    try {
      const newPerfumes = await fetchPerfumes(searchRequest, page, 20);

      setPerfumes((prev) =>
        page === 0 ? newPerfumes : [...prev, ...newPerfumes]
      );

      setHasMore(newPerfumes.length > 0);
      setLoading(false);
      setInitialLoad(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTitle(searchTitle);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTitle]);

  useEffect(() => {
    loadPerfumes();
  }, [debouncedTitle, page]);

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

  console.log(perfumes);

  return (
    <div className="py-4 flex flex-col" id="productsSection">
      <Input
        icon={faSearch}
        type="text"
        placeholder="Search perfumes, brands, notes..."
        onChange={(e) => setSearchTitle(e.target.value)}
        value={searchTitle}
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
    </div>
  );
};

export default ProductCardsSection;
