import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/services/baseURL";
import { GeneralResponse } from "@/types/response/general-response";
import { WishlistResponse } from "@/types/response/wishlist";
import { Perfume } from "@/types/response/product";
import ProductCard from "@/components/ProductCard/index";
import StyledHeading from "@/components/Heading";

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
    <>
      <div className="relative py-20 bg-[url('@/assets/images/blue-and-pink-flowers-perfume-bottle.jpg')] bg-center bg-cover bg-fixed">
        {/* Overlay */}
        <div className="absolute inset-0 bg-pink-100 opacity-70"></div>

        {/* Content */}
        <div className="container relative z-10">
          <StyledHeading headingText="Favorite perfumes" className="text-2xl md:text-4xl"/>
          <div className="flex flex-row flex-wrap gap-5 justify-center py-10">
            {perfumes.map((item) => (
              <ProductCard product={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;
