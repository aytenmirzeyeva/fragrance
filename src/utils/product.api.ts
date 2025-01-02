import axios from "axios";
import { BASE_URL } from "@/services/baseURL";
import { GeneralResponse } from "@/types/response/general-response";
import { SearchRequest } from "@/types/request/search";
import { Perfume } from "@/types/response/product";

export const fetchPerfumes = async (
  searchRequest: SearchRequest,
  page: number,
  size: number
): Promise<Perfume[]> => {
  try {
    const authToken = localStorage.getItem("Authorization");
    if (!authToken) {
      console.error("Authorization token not found!");
    }
    const response = await axios.post<GeneralResponse<Perfume[]>>(
      `${BASE_URL}/public/search/?page=${page}&size=${size}`,
      searchRequest,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    return response.data.result.data;
  } catch (error: any) {
    console.error("Error fetching perfumes:", error);
    throw new Error(error.message || "Failed to fetch perfumes");
  }
};
