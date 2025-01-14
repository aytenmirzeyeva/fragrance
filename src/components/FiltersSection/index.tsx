import React, { useState, ChangeEvent } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/index";
import StyledHeading from "../Heading/index";
import GenderFilter from "../GenderFilter";
import BrandsFilter from "../BrandsFilter";
import NotesFilter from "../NotesFilter";
import RatingFilter from "../RatingFilter";
import { FiltersProps } from "./model";


const Filters: React.FC<FiltersProps> = ({
  className,
  setShowFilters,
  startYear,
  endYear,
  setStartYear,
  setEndYear,
}) => {
  const [searchRequest, setSearchRequest] = useState({
    startYear: undefined,
    endYear: undefined,
  });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "startYear") setStartYear(value ? parseInt(value) : undefined);
    if (name === "endYear") setEndYear(value ? parseInt(value) : undefined);

    // setSearchRequest((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };

  const years: number[] = [];
  for (let year = 1900; year <= 2025; year++) {
    years.push(year);
  }

  return (
    <div className={`p-4 ${className}`}>
      <div className="flex flex-wrap justify-between items-center">
        {/* Clear Filters Button */}
        <Button
          btnText="Clear all filters"
          className="border border-pink-200 bg-transparent text-gray-400 px-2 py-1"
          onClick={() => {
            setStartYear(undefined);
            setEndYear(undefined);
          }}
        />
        {/* Filters Close Button */}
        <Button
          icon={faXmark}
          onClick={() => setShowFilters(false)}
          className="md:hidden border border-pink-200 bg-transparent text-gray-400 px-2 py-1"
        />
      </div>
      <hr className="my-6" />

      <div className="year-filter-section">
        <StyledHeading headingText="Release year" className="text-lg" />
        <div className="flex items-center justify-around">
          {/* Start Year */}
          <select
            className={`py-1 px-2 text-sm rounded-lg border my-5 border-pink-200 shadow-inner-lg focus:border-pink-300 focus:outline-none focus:shadow-lg transition-all duration-500 cursor-pointer
            ${!startYear?'text-gray-400':'text-black'}`}

            value={startYear || ""}
            onChange={handleChange}
            name="startYear"
          >
            <option value="" disabled>
              Start year
            </option>
            {years.map((year, index) => (
              <option value={year} key={index}>
                {year}
              </option>
            ))}
          </select>

          <span className="text-pink-300 font-medium">—</span>

          {/* End Year */}
          <select
              className={`py-1 px-2 text-sm rounded-lg border my-5 border-pink-200 shadow-inner-lg focus:border-pink-300 focus:outline-none focus:shadow-lg transition-all duration-500 cursor-pointer
            ${!endYear?'text-gray-400':'text-black'}`}
            value={endYear || ""}
            onChange={handleChange}
            name="endYear"
          >
            <option value="" disabled>
              End year
            </option>
            {years.map((year, index) => (
              <option value={year} key={index}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <hr className="my-6" />
      <GenderFilter />
      <BrandsFilter />
      <NotesFilter />
      <RatingFilter />
    </div>
  );
};

export default Filters;
