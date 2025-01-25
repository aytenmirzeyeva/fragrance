import React, { useState, useEffect } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CircularProgress from "@mui/material/CircularProgress";
import { SearchRequest } from "@/types/request/search";
import { Perfume } from "@/types/response/product";
import Input from "@/components/Input";
import ProductCard from "../ProductCard/index";
import { fetchPerfumes } from "@/utils/product.api.ts";
import { ProductCardsSectionProps } from "./model";

const ProductCardsSection: React.FC<ProductCardsSectionProps> = ({
  startYear,
  endYear,
  genderId,
  searchTitle,
  setSearchTitle,
}) => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [debouncedTitle, setDebouncedTitle] = useState(searchTitle);
  const [page, setPage] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);

  const loadPerfumes = async () => {
    if (!hasMore) return;

    setLoading(true);
    setError(null);

    const searchRequest = new SearchRequest();
    searchRequest.title = initialLoad ? "" : debouncedTitle;
    searchRequest.startYear = startYear;
    searchRequest.endYear = endYear;
    searchRequest.genderId = genderId;

    try {
      const newPerfumes = await fetchPerfumes(searchRequest, page, 20);

      setPerfumes((prev) =>
        page === 0 ? newPerfumes : [...prev, ...newPerfumes],
      );

      setHasMore(newPerfumes.length > 0);
      setInitialLoad(false);
    } catch (err: any) {
      setError(err.message);
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
    setPage(0);
    setPerfumes([]);
    setHasMore(true);
    loadPerfumes();
  }, [debouncedTitle, startYear, endYear, genderId]);

  useEffect(() => {
    loadPerfumes();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1;

      if (isBottom && hasMore && !loading) {
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
        <div className="flex justify-center items-center w-full py-4">
          <CircularProgress sx={{ color: "#f472b6" }} />
        </div>
      )}
      {!loading && perfumes.length === 0 && (
        <p className="text-gray-500 text-center">No perfumes found.</p>
      )}
      {error && (
        <div className="text-red-500 text-center">
          <p>Failed to load perfumes. Please try again later.</p>
        </div>
      )}
    </div>
  );
};

export default ProductCardsSection;
