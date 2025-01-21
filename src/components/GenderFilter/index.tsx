import React, { useState } from "react";
import Heading from "../Heading/index.tsx";
import { GenderFilterProps } from "@/components/GenderFilter/model.ts";
import { gendersData } from "./genders.ts";

const GenderFilter: React.FC<GenderFilterProps> = ({
  genderId,
  setGenderId,
}) => {
  const [selected, setSelected] = useState<number | null>(genderId);

  const handleSelect = (id: number) => {
    const newSelected = selected === id ? null : id;
    setSelected(newSelected);
    setGenderId(newSelected);
  };

  return (
    <div className="py-4">
      <Heading headingText="Gender" className="text-lg" />
      <div className="flex flex-wrap justify-center">
        {gendersData.map((gender) => (
          <div
            key={gender.id}
            className={`w-32 md:w-48 p-2 flex justify-center items-center gap-1 m-1 rounded-lg border transition-all duration-300 hover:shadow-md hover:scale-[102%] cursor-pointer bg-pink-50 
      ${
        selected === gender.id
          ? "border-pink-400 shadow-md shadow-pink-100/50 bg-pink-100"
          : "border-gray-100"
      }
    `}
            onClick={() => handleSelect(gender.id)}
          >
            <div className="w-10 h-10 md:w-8 md:h-8 rounded-full overflow-hidden">
              <img
                alt={gender.name}
                src={gender.image}
                className="w-full h-full object-contain"
              />
            </div>
            <p
              className={`text-xs text-center flex justify-center items-center flex-wrap ${
                selected ? "text-gray-800 font-medium" : "text-gray-600"
              }
      `}
            >
              {gender.name}
            </p>
          </div>
        ))}
      </div>
      <hr className="my-6" />
    </div>
  );
};

export default GenderFilter;
