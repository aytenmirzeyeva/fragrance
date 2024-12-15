import { useState } from "react";
import { FilterCardProps } from "./model";

const FilterCard: React.FC<FilterCardProps> = ({ image, text, className }) => {
  const [selected, setSelected] = useState(false);

  const selectCard = () => {
    setSelected(!selected);
  };
  return (
    <div
      className={`w-32 md:w-48 p-2 flex justify-center items-center gap-1 m-1 rounded-lg border transition-all duration-300 hover:shadow-md hover:scale-[102%] cursor-pointer ${className}
      ${
        selected
          ? "border-pink-400 shadow-lg shadow-pink-100/50 bg-pink-100"
          : "border-gray-100"
      }
    `}
      onClick={selectCard}
    >
      <div className="w-10 h-10 md:w-8 md:h-8 rounded-full overflow-hidden">
        <img src={image} className="w-full h-full object-contain" />
      </div>
      <p
        className={`text-xs text-center flex justify-center items-center flex-wrap ${
          selected ? "text-gray-800 font-medium" : "text-gray-600"
        }
      `}
      >
        {text}
        {/* <span className="bg-pink-100 rounded-2xl py-1 px-2 m-1 text-xs text-pink-400">
          {count}
        </span> */}
      </p>
    </div>
  );
};

export default FilterCard;
