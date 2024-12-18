import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/services/baseURL";
import { GeneralResponse } from "@/types/general-response";

export interface ProductState {
  favorites: string[];
}

const initialState: ProductState = {
  favorites: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const authToken = localStorage.getItem("Authorization");

      axios
        .post<GeneralResponse<any>>(
          `${BASE_URL}/private/wish-list/add/${productId}`,
          {},
          {
            headers: {
              Authorization: authToken,
            },
          }
        )
        .then((res) => console.log(res.data));
    },
  },
});

export const { addToFavorites } = productSlice.actions;

export default productSlice.reducer;

// export const wishListSlice= createSlice({
//   name: "wishList",
//   initialState: {
//     da
//   }
// })
