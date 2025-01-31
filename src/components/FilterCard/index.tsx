import React, { useState } from "react";
import { FilterCardProps } from "./model";
import { fallbackImage } from "@/utils/contants";

const FilterCard: React.FC<FilterCardProps> = ({
  image,
  text,
  className,
  id,
}) => {
  const [selected, setSelected] = useState<number | null>();

  const handleSelect = (id: number | undefined) => {
    setSelected((prevSelected) => (prevSelected === id ? null : id));
  };

  return (
    <div
      className={`w-32 md:w-48 p-2 flex justify-center items-center gap-1 m-1 rounded-lg border transition-all duration-300 hover:shadow-md hover:scale-[102%] cursor-pointer bg-pink-50 ${className}
      ${
        selected === id
          ? "border-pink-400 shadow-md shadow-pink-100/50 bg-pink-100"
          : "border-gray-100"
      }
    `}
      onClick={() => handleSelect(id)}
    >
      <div className="w-10 h-10 md:w-8 md:h-8 rounded-full overflow-hidden">
        <img
          alt={text}
          onError={(target) => {
            target.currentTarget.onerror = null;
            target.currentTarget.src = fallbackImage;
          }}
          src={image}
          className="w-full h-full object-contain"
        />
      </div>
      <p
        className={`text-xs text-center flex justify-center items-center flex-wrap ${
          selected ? "text-gray-800 font-medium" : "text-gray-600"
        }
      `}
      >
        {text}
      </p>
    </div>
  );
};

export default FilterCard;
