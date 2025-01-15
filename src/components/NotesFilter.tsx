import axios from "axios";
import { useEffect, useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { GeneralResponse } from "@/types/response/general-response";
import { Note } from "@/types/response/note";
import { BASE_URL } from "@/services/baseURL";
import FilterCard from "./FilterCard";
import Heading from "./Heading/index";
import Input from "./Input/index";
const NotesFilter = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get<GeneralResponse<Note[]>>(
          `${BASE_URL}/public/search/notes?page=0&query=&size=20`,
        );
        setNotes(response.data.result.data);
      } catch (err) {
        console.log("Failed to fetch data");
      }
    };
    fetchNotes();
  }, []);
  return (
    <div className="py-4">
      <Heading headingText="Notes" className="text-lg" />
      <div className="flex flex-col">
        <Input icon={faSearch} type="text" placeholder="Search notes..." />
        <div className="flex flex-wrap justify-center h-72 overflow-y-auto">
          {notes.map((note) =>
            note.image && note.title ? (
              <FilterCard key={note.id} text={note.title} image={note.image} />
            ) : null,
          )}
        </div>
      </div>
      <hr className="my-6" />
    </div>
  );
};

export default NotesFilter;
