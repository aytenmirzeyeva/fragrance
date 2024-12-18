import axios from "axios";
import { useEffect, useState } from "react";
import { GeneralResponse } from "@/types/general-response";
import { Note } from "@/types/note-response";
import { BASE_URL } from "@/services/baseURL";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import StyledHeading from "@/components/Heading";
import FilterCard from "@/components/FilterCard/index";
import Input from "@/components/ProductCard/Input";
const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const response = await axios.get<GeneralResponse<Note[]>>(
          `${BASE_URL}/public/search/notes?page=0&query=&size=10`
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
      <div className="container">
        <StyledHeading headingText="Notes" className="text-3xl text-center" />
        <div className="flex flex-col">
          <Input
            icon={faSearch}
            type="text"
            placeholder="Search notes..."
            width="w-3/4"
          />

          <div className="flex flex-wrap justify-center gap-3 py-7">
            {notes.map((note) => (
              <FilterCard key={note.id} text={note.title} image={note.image} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
