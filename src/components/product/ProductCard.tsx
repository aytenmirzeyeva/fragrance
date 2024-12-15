import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/services/baseURL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { toggleLike } from "@/features/wishlist/wishList";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import StarIcon from "../StarIcon";
import { GeneralResponse } from "@/types/general-response";
import { SearchRequest } from "@/types/search-request";
import { Perfume } from "@/types/product-response";

const ProductCard: React.FC = () => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const likedPerfumes = useSelector(
    (state: RootState) => state.wishlist.likedPerfumes
  );
  const handleToggleLike = (perfumeId: string) => {
    dispatch(toggleLike(perfumeId));
  };
  useEffect(() => {
    const fetchPerfumes = async () => {
      setLoading(true);
      setError(null);
      let searchRequest = new SearchRequest();
      searchRequest.endYear = 2012;
      searchRequest.startYear = 2010;
      searchRequest.title = "dol";
      try {
        const response = await axios.post<GeneralResponse<Perfume[]>>(
          `${BASE_URL}/public/search/?page=0&size=100`,
          searchRequest
        );
        setPerfumes(response.data.result.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
      }
    };
    fetchPerfumes();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-row flex-wrap gap-5 md:gap-10 justify-center py-10">
      {perfumes.map((item) => (
        <div
          key={item.id}
          className="flex flex-col shadow-lg hover:shadow-xl p-2 
          rounded-lg w-[150px]  hover:scale-[102%] transition-all duration-200 bg-pink-50 relative pt-10"
        >
          {/* Like Button */}
          <div
            className="heart-icon-wrapper absolute top-3 right-3 hover:scale-[102%] cursor-pointer transition-transform duration-300"
            onClick={() => {
              handleToggleLike(item.id);
            }}
          >
            <FontAwesomeIcon
              icon={
                (likedPerfumes[item.id]
                  ? faHeartSolid
                  : faHeartRegular) as IconProp
              }
              className={`text-lg transition-all duration-300 ${
                likedPerfumes[item.id]
                  ? "text-pink-400"
                  : "text-pink-200 hover:text-pink-400"
              }`}
            />
          </div>
          <Link
            to={`/perfumePage/${item.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-between h-full"
          >
            {/* Card top */}
            <div className="card-top w-full h-[150px] mb-1">
              <img
                src={item.imageUrl}
                alt={item.brandName + " " + item.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Card bottom */}
            <div className="card-bottom flex-grow flex flex-col justify-between text-center p-2">
              <h2 className="font-semibold text-gray-800 text-sm">
                {item.title.replace(item.brandName, "").trim()}
              </h2>
              <p className="text-gray-600 text-xs">{item.brandName}</p>
              <span className="flex justify-center items-center text-gray-400 text-xs">
                Rating:
                <StarIcon />
                {item.rating.toFixed(1)}
              </span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
