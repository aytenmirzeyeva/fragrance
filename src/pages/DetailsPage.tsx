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
import SectionTitle from "@/components/SectionTitle";
import NotesSection from "@/components/NotesSection";
const DetailsPage = () => {
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
      } finally {
        setLoading(false);
      }
    };
    fetchPerfumes();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const toggleLike = () => setLiked(!isLiked);

  const colors = [
    "bg-yellow-200",
    "bg-lime-200",
    "bg-blue-200",
    "bg-red-200",
    "bg-purple-200",
  ];

  return (
    <div className="container">
      <div className="flex flex-col border rounded-lg shadow-lg my-10 p-8">
        <h2 className="text-3xl text-pink-400">
          {perfume?.title.replace(perfume.brandName, "").trim()}
        </h2>
        <h1 className="text-xl text-pink-300">{perfume?.brandName}</h1>
        <p>{perfume?.gender}</p>
        <div className="flex justify-center md:justify-evenly items-center flex-wrap md:flex-nowrap gap-10 my-10">
          {/* Card */}
          <div className="relative rounded-lg shadow-lg p-8 w-full md:w-1/2">
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
          {/* Main accords container */}
          <div className="flex flex-col justify-center items-center w-full md:w-1/2 mb-5">
            <p className="text-pink-300 mb-2">Main accords:</p>
            <div className="flex flex-col justify-center w-full">
              {perfume?.mainAccords.map((accord, index) => {
                const colorClass = colors[index % colors.length];
                return (
                  <div className="flex mb-1 gap-2 items-center flex-wrap md:flex-nowrap">
                    <div className="w-32">{accord.name}</div>

                    {/* Accord Bar */}
                    <div
                      key={accord.id}
                      className={`flex items-center rounded-lg overflow-hidden`}
                      style={{ width: "100%", height: "24px" }}
                    >
                      <div
                        className={`h-full ${colorClass}`}
                        style={{
                          width: `${Math.min(accord.percentage, 100)}%`,
                          maxWidth: "100%",
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <div>
            <SectionTitle title="Perfume description" />
            <p
              className="italic"
              dangerouslySetInnerHTML={{ __html: perfume?.description || "" }}
            ></p>
          </div>
          <div className="flex items-baseline">
            <SectionTitle title="Rating" />
            <div className="flex items-center">
              <StarIcon />
            </div>
          </div>
          <div>
            <SectionTitle title="Comments" />
            <Link to="" className="hover:underline italic text-lg">
              {perfume?.commentCount}
            </Link>
          </div>
          <div>
            <SectionTitle title="Reviews" />
            <Link to="" className="italic hover:underline">
              {perfume?.reviewCount}
            </Link>
          </div>

          {perfume?.topNotes && perfume?.topNotes.length > 0 ? (
            <NotesSection title="Top Notes" items={perfume?.topNotes} />
          ) : perfume?.baseNotes && perfume?.baseNotes.length > 0 ? (
            <NotesSection title="Base Notes" items={perfume?.baseNotes} />
          ) : perfume?.ingredients && perfume?.ingredients.length > 0 ? (
            <NotesSection title="Ingredients" items={perfume?.ingredients} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
