import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "@/features/product/productSlice";
import StarIcon from "../StarIcon";
import { ProductCardProps } from "./model";
import { RootState } from "@/app/store";
import { Perfume } from "@/types/response/product";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.product.favorites);

  const handleLike = (perfume: Perfume) => {
    dispatch(addToFavorites(perfume));
  };

  return (
    <>
      <div
        className="flex flex-col shadow-lg hover:shadow-xl p-2 
       rounded-lg w-[150px] hover:scale-[102%] transition-all duration-200 bg-pink-50 relative pt-10"
      >
        {/* Like Button */}
        <div
          className="heart-icon-wrapper absolute top-3 right-3 hover:scale-[102%] cursor-pointer transition-transform duration-300"
          onClick={() => {
            handleLike(product);
          }}
        >
          <FontAwesomeIcon
            icon={
              (favorites.includes(product.id)
                ? faHeartSolid
                : faHeartRegular) as IconProp
            }
            className={`text-lg transition-all duration-300 ${
              favorites.includes(product.id)
                ? "text-pink-400"
                : "text-pink-200 hover:text-pink-400"
            }`}
          />
        </div>
        <Link
          to={`/detailsPage/${product.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col justify-between h-full"
        >
          {/* Card top */}
          <div className="card-top w-full h-[150px] mb-1">
            <img
              src={product.imageUrl}
              alt={
                product
                  ? product.brandName + " " + product.title
                  : "perfume-image"
              }
              className="w-full h-full object-contain"
            />
          </div>

          {/* Card bottom */}
          <div className="card-bottom flex-grow flex flex-col justify-between text-center p-2">
            <h2 className="font-semibold text-gray-800 text-sm">
              {product.title.replace(product.brandName, "").trim()}
            </h2>
            <p className="text-gray-600 text-xs">{product.brandName}</p>
            {product.rating !== null ? (
              <span className="flex justify-center items-center text-gray-400 text-xs">
                Rating:
                <StarIcon />
                {product.rating === 0 ? 0 : product.rating?.toFixed(1)}
              </span>
            ) : null}
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
