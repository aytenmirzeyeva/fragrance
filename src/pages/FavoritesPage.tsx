import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Link } from "react-router-dom";
import ProductCard from "@/components/product/ProductCard";
// import { Link } from "react-router-dom";
const FavoritesPage: React.FC = () => {
  const likedPerfumes = useSelector(
    (state: RootState) => state.wishlist.likedPerfumes
  );
  const perfumes = Object.keys(likedPerfumes).filter((id) => likedPerfumes[id]);
  if (perfumes.length === 0) {
    return <p>No liked perfumes yet.</p>;
  }
  return (
    <div className="container my-10">
      <h1 className="text-center text-2xl md:text-4xl font-medium text-gray-600">
        Favorite perfumes
      </h1>
      {perfumes.map((id) => (
        <div key={id}>
          <ProductCard />
        </div>
      ))}
    </div>
  );
};

export default FavoritesPage;
