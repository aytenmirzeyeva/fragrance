import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Input from "./ProductCard/Input";
const Introduction = () => {
  return (
    <div className="introduction min-h-screen bg-[url('@/assets/images/pink-perfume.jpg')] bg-center bg-cover bg-fixed relative">
      <div className="overlay bg-pink-100 opacity-60 absolute w-full h-full top-0 left-0"></div>
      <div className="intro-content w-full absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] z-30 ">
        <div className="container">
          <h1 className="text-5xl md:text-7xl font-bold">
            Discover Your Signature Scent
          </h1>
          <h3 className="text-2xl md:text-4xl my-6">
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
