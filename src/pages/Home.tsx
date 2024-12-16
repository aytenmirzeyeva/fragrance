import { useState } from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Introduction from "../components/Introduction";
import Filters from "@/components/FiltersSection";
import Button from "@/components/Button";
import ProductCardsSection from "@/components/ProductCard/ProductCardsSection";
const Home = () => {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div>
      <Introduction />
      {/* Mobile Filter Button */}
      <Button
        btnText="Filters"
        icon={faFilter}
        className="fixed bottom-4 right-4 shadow-lg z-50 md:hidden bg-pink-50 border border-pink-300 px-2 py-1"
        onClick={() => setShowFilters(!showFilters)}
      />

      <div className="container">
        <div className="flex relative min-h-screen gap-2">
          {/* Filters Modal */}
          {showFilters && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
              onClick={() => setShowFilters(false)}
            >
              <div
                className="bg-white rounded-lg shadow-lg w-[90%] max-w-lg p-4  h-screen overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <Filters setShowFilters={setShowFilters} />
              </div>
            </div>
          )}
          <div className="hidden md:block md:w-[30%]">
            <Filters setShowFilters={setShowFilters} />
          </div>

          {/* Product Cards Section */}
          <ProductCardsSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
