import { useState } from "react";
import Heading from "./Heading/index";
import StarIcon from "./StarIcon";
const RatingFilter = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const ratingData = [
    {
      id: 1,
      stars: 5,
    },
    {
      id: 2,
      stars: 4,
    },
    {
      id: 3,
      stars: 3,
    },
  ];

  return (
    <div className="py-4">
      <Heading headingText="Rating" className="text-lg" />
      <div className="flex flex-col justify-center items-center gap-2">
        {ratingData.map((rating) => (
          <div
            key={rating.id}
            className={`
               p-4 flex justify-center items-center rounded-xl bg-white border-2 transition-all duration-200 hover:shadow-md hover:scale-[102%] cursor-pointer
              ${
                selected === rating.id
                  ? "border-pink-400 shadow-lg shadow-pink-100/50 bg-pink-50"
                  : "border-gray-100"
              }
            `}
            onClick={() => setSelected(rating.id)}
          >
            <div className="stars-container flex gap-1">
              {[...Array(rating.stars)].map((_, index) => (
                <StarIcon key={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;
