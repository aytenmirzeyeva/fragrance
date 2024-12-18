import React from "react";
import { SectionTitleProps } from "./model";
const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return <span className="text-pink-300 text-lg mr-1">{title}:</span>;
};

export default SectionTitle;
