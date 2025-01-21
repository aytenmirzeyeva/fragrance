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
    {
      id: 4,
      stars: 2,
    },
  ];

  const handleSelect = (id: number) => {
    setSelected((prevSelected) => (prevSelected === id ? null : id));
  };

  return (
    <div className="py-4">
      <Heading headingText="Rating" className="text-lg" />
      <div className="flex flex-col justify-center items-center gap-2">
        {ratingData.map((rating) => (
          <div
            key={rating.id}
            className={`
               p-3 flex justify-center items-center rounded-lg bg-pink-50 border transition-all duration-300 hover:shadow-md hover:scale-[102%] cursor-pointer
              ${
                selected === rating.id
                  ? "border-pink-400 shadow-md shadow-pink-100/50 bg-pink-100"
                  : "border-gray-100"
              }
            `}
            onClick={() => handleSelect(rating.id)}
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
