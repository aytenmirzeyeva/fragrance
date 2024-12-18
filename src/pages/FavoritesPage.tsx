import axios from "axios";
import { useEffect, useState } from "react";
// import ProductCard from "@/components/ProductCard/ProductCard";
import { BASE_URL } from "@/services/baseURL";
import { GeneralResponse } from "@/types/general-response";
import { WishlistResponse } from "@/types/wishlist-response";
import { Perfume } from "@/types/product-response";
import ProductCard from "@/components/ProductCard/ProductCard";

const FavoritesPage: React.FC = () => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const authToken = localStorage.getItem("Authorization");
        if (!authToken) {
          console.error("Authorization token not found!");
          return;
        }

        const response = await axios.get<GeneralResponse<WishlistResponse>>(
          `${BASE_URL}/private/wish-list/list?page=0&size=30`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );

        setPerfumes(response.data.result.data.products);
        console.log("Fetched perfumes:", response.data);
      } catch (error) {
        console.error("Error fetching wishlist.");
      }
    };

    fetchWishList();
  }, []);

  if (perfumes.length === 0) {
    return (
      <div className="container py-10">
        <p className="italic text-gray-600">No liked perfumes yet :/</p>
      </div>
    );
  }
  return (
    <div className="container my-10">
      <h1 className="text-center text-2xl md:text-4xl font-medium text-gray-600">
        Favorite perfumes
      </h1>
      <div className="flex flex-row flex-wrap gap-5 justify-center py-10">
        <ProductCard data={perfumes} />
      </div>
    </div>
  );
};

export default FavoritesPage;
