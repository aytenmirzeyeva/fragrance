import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "@/services/baseURL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { GeneralResponse } from "@/types/general-response";
import { Perfume } from "@/types/product-response";
import StarIcon from "@/components/StarIcon";
import FilterCard from "@/components/FilterCard";
const PerfumePage = () => {
  const [perfume, setPerfume] = useState<Perfume>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setLiked] = useState(false);
  const { perfumeId } = useParams();
  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const response = await axios.get<GeneralResponse<Perfume>>(
          `${BASE_URL}/public/product/${perfumeId}`
        );
        setPerfume(response.data.result.data);
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
  const toggleLike = () => {
    setLiked(!isLiked);
  };
  return (
    <div className="container">
      <div className="flex flex-col border rounded-lg shadow-lg my-10 p-8">
        <h2 className="text-3xl text-pink-400">
          {perfume?.title.replace(perfume.brandName, "").trim()}
        </h2>
        <h1 className="text-xl text-pink-300">{perfume?.brandName}</h1>
        <p>{perfume?.gender}</p>
        <div className="flex justify-center md:justify-evenly items-center flex-wrap gap-2">
          <div className="relative rounded-lg shadow-lg my-10 p-8 w-1/3">
            <img
              src={perfume?.imageUrl}
              alt={`${perfume?.brandName}+${perfume?.title}`}
              className="w-[200px] md:w-[250px]"
            />
            <div
              className="absolute top-8 right-8 hover:scale-[102%] cursor-pointer transition-transform duration-300"
              onClick={(e) => {
                e.preventDefault();
                toggleLike();
              }}
            >
              <FontAwesomeIcon
                icon={(isLiked ? faHeartSolid : faHeartRegular) as IconProp}
                className={`text-4xl transition-all duration-300 ${
                  isLiked
                    ? "text-pink-400"
                    : "text-pink-200 hover:text-pink-400"
                }`}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <p className="text-pink-300">Main accords:</p>
            <ul className="flex flex-col p-2 justify-center">
              {perfume?.mainAccords.map((accord) => (
                <div
                  className={`w-[${accord.percentage}]% italic`}
                  key={accord.id}
                >
                  {accord.name}
                </div>
              ))}
            </ul>
          </div>
        </div>
        <span className="text-pink-300">Perfume description:</span>
        <p
          className="italic"
          dangerouslySetInnerHTML={{ __html: perfume?.description || "" }}
        ></p>
        <div className="rating flex items-center">
          <span className="mr-1 text-pink-300">Rating: </span>
          <span className="italic">
            {perfume?.rating === 0 ? 0 : perfume?.rating.toFixed(1)}
          </span>
          <StarIcon />
        </div>
        <div className="comments">
          <span className="text-pink-300">Comments: </span>
          <Link to="" className="hover:underline italic">
            {perfume?.commentCount}
          </Link>
        </div>
        <div className="reviews">
          <span className="text-pink-300 mr-1">Reviews:</span>
          <Link to="" className="italic hover:underline">
            {perfume?.reviewCount}
          </Link>
        </div>

        {perfume?.topNotes && perfume?.topNotes.length > 0 ? (
          <div className="notes">
            <p className="text-pink-300">Top Notes:</p>
            <div className="flex">
              {perfume?.topNotes.map((item) => (
                <FilterCard
                  key={item.id}
                  text={item.title}
                  image={item.imageUrl}
                />
              ))}
            </div>
          </div>
        ) : perfume?.baseNotes && perfume?.baseNotes.length > 0 ? (
          <div className="notes">
            <p className="text-pink-300">Base Notes:</p>
            <div className="flex">
              {perfume?.baseNotes.map((item) => (
                <FilterCard
                  key={item.id}
                  text={item.title}
                  image={item.imageUrl}
                />
              ))}
            </div>
          </div>
        ) : perfume?.ingredients && perfume?.ingredients.length > 0 ? (
          <div className="ingredients">
            <p className="text-pink-300">Ingredients:</p>
            <div className="flex">
              {perfume?.ingredients.map((item) => (
                <FilterCard
                  key={item.id}
                  text={item.title}
                  image={item.imageUrl}
                />
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PerfumePage;
