import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";
const Introduction = () => {
  return (
    <div className="relative min-h-screen bg-[url('@/assets/images/pink-perfume.jpg')] bg-center bg-cover bg-fixed">
      {/* Overlay */}
      <div className="absolute inset-0 bg-pink-100 opacity-70 "></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="container">
          <h1 className="text-5xl md:text-7xl font-bold text-pink-950">
            Discover Your Signature Scent
          </h1>
          <h3 className="text-2xl md:text-4xl my-6 text-pink-950">
            Explore our curated collection of fine fragrances
          </h3>
          <Input
            icon={faSearch}
            type="text"
            placeholder="Search perfumes, brands, notes..."
          />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
