import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { toggleLike } from "@/features/wishlist/wishList";
import StarIcon from "../StarIcon";
import { ProductCardProps } from "./model";

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const dispatch = useDispatch();
  const likedPerfumes = useSelector(
    (state: RootState) => state.wishlist.likedPerfumes
  );
  const handleToggleLike = (perfumeId: string) => {
    dispatch(toggleLike(perfumeId));
  };
  return (
    <>
      {data.map((item) => (
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
    </>
  );
};

export default ProductCard;
