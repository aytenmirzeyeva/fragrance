import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Introduction = () => {
  const scrollToDown = () => {
    const productsSection = document.getElementById("productsSection");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };
  return (
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
  );
};

export default Introduction;
