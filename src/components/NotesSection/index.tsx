import React from "react";
import { NotesSectionProps } from "./model";
import FilterCard from "../FilterCard";

const NotesSection: React.FC<NotesSectionProps> = ({ title, items }) => (
  <div className="notes">
    <p className="text-pink-300 text-lg">{title}:</p>
    <div className="flex p-3">
      {items.map((item) => (
        <FilterCard key={item.id} text={item.title} image={item.imageUrl} />
      ))}
    </div>
  </div>
);
export default NotesSection;
