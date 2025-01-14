import { useState } from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Filters from "@/components/FiltersSection/index";
import Button from "@/components/Button";
import ProductCardsSection from "@/components/ProductCardsSection/index";

const Home = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [startYear, setStartYear] = useState<number | undefined>();
  const [endYear, setEndYear] = useState<number | undefined>();

  const scrollToDown = () => {
    const productsSection = document.getElementById("productsSection");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      {/* Introduction */}
      <div className="relative min-h-screen bg-[url('@/assets/images/pink-perfume.jpg')] bg-center bg-cover bg-fixed">
        {/* Overlay */}
        <div className="absolute inset-0 bg-pink-100 opacity-70"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="container flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-pink-950 text-center">
              Discover Your Signature Scent
            </h1>
            <h3 className="text-2xl md:text-4xl my-6 text-pink-950 text-center">
              Explore our curated collection of fine fragrances
            </h3>
            <button
              onClick={scrollToDown}
              className="mt-8 py-4 px-8 bg-pink-200 text-gray-500 font-medium rounded-full hover:bg-pink-300 hover:text-white  transition-all hover:translate-y-1 hover:shadow-lg duration-500 flex items-center gap-2"
            >
              Get Started
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <Button
        btnText="Filters"
        icon={faFilter}
        className="fixed bottom-4 right-4 shadow-lg z-50 md:hidden bg-pink-50 border-pink-300 px-2 py-1"
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
                className="bg-white rounded-lg shadow-lg w-[90%] max-w-lg p-4 h-screen overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <Filters
                  setShowFilters={setShowFilters}
                  startYear={startYear}
                  endYear={endYear}
                  setStartYear={setStartYear}
                  setEndYear={setEndYear}
                />
              </div>
            </div>
          )}
          <div className="hidden md:block md:w-[30%]">
            <Filters
              setShowFilters={setShowFilters}
              startYear={startYear}
              endYear={endYear}
              setStartYear={setStartYear}
              setEndYear={setEndYear}
            />
          </div>

          {/* Product Cards Section */}
          <ProductCardsSection startYear={startYear} endYear={endYear} />
        </div>
      </div>
    </div>
  );
};

export default Home;
