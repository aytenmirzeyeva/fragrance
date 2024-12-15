import axios from "axios";
import { useEffect, useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { GeneralResponse } from "@/types/general-response";
import { Note } from "@/types/note-response";
import { BASE_URL } from "@/services/baseURL";
import FilterCard from "./FilterCard";
import Heading from "./Heading/index";
import Input from "./Input/index";
const NotesFilter = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const response = await axios.get<GeneralResponse<Note[]>>(
          `${BASE_URL}/public/search/notes?page=0&query=&size=5`
        );
        setNotes(response.data.result.data);
      } catch (err) {
        console.log("Failed to fetch data");
      }
    };
    fetchPerfumes();
  }, []);
  return (
    <div className="py-4">
      <Heading headingText="Notes" className="text-lg" />
      <div className="flex flex-col">
        <Input icon={faSearch} type="text" placeholder="Search notes..." />
        <div className="flex flex-wrap justify-center">
          {notes.map((note) => (
            <FilterCard key={note.id} text={note.title} image={note.image} />
          ))}
        </div>
      </div>
      <hr className="my-6" />
    </div>
  );
};

export default NotesFilter;
