import axios from "axios";
import React, { useEffect, useState } from "react";
import { GeneralResponse } from "@/types/response/general-response";
import { Note } from "@/types/response/note";
import { BASE_URL } from "@/services/baseURL";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import StyledHeading from "@/components/Heading";
import FilterCard from "@/components/FilterCard/index";
import Input from "@/components/Input";
import { CircularProgress } from "@mui/material";

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const loadNotes = async () => {
    if (!hasMore) return;

    setError(null);
    setLoading(true);

    try {
      const response = await axios.get<GeneralResponse<Note[]>>(
        `${BASE_URL}/public/search/notes?page=${page}&query=&size=50`,
      );
      const newNotes = response.data.result.data;

      setNotes((prev) => [...prev, ...newNotes]);
      if (response.data.result.data.length < 20) {
        setHasMore(false);
      }
    } catch (err: any) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadNotes();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100;

      if (bottom && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="relative py-20 bg-[url('@/assets/images/blue-and-pink-flowers-perfume-bottle.jpg')] bg-center bg-cover bg-fixed">
      {/* Overlay */}
      <div className="absolute inset-0 bg-pink-100 opacity-70"></div>

      {/* Content */}
      <div className="container relative z-10">
        <StyledHeading headingText="Notes" className="text-2xl md:text-4xl" />
        <div className="flex flex-col">
          <Input
            icon={faSearch}
            type="text"
            placeholder="Search notes..."
            width="w-1/2"
          />

          <div className="flex flex-wrap justify-center gap-3 py-7">
            {notes.map((note) => (
              <FilterCard key={note.id} text={note.title} image={note.image} />
            ))}
            {loading && (
              <div className="flex justify-center items-center w-full">
                <CircularProgress sx={{ color: "#f472b6" }} />
              </div>
            )}
            {!hasMore && notes.length >= 100 && (
              <p className="text-center text-gray-500">
                You have reached the end!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
