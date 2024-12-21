import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/services/baseURL";
import { GeneralResponse } from "@/types/general-response";
import { Perfume } from "@/types/product-response";

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
    addToFavorites: (state, action: PayloadAction<Perfume>) => {
      const perfume = action.payload;
      const authToken = localStorage.getItem("Authorization");

      const inWishList = state.favorites.includes(perfume.id);

      if (inWishList) {
        state.favorites = state.favorites.filter((id) => id !== perfume.id);
      } else {
        state.favorites.push(perfume.id);
      }
      axios
        .post<GeneralResponse<any>>(
          `${BASE_URL}/private/wish-list/add/${perfume.id}`,
          {},
          {
            headers: {
              Authorization: authToken,
            },
          }
        )
        .then((res) => {
          console.log("Wishlist status updated:", res.data);
        })
        .catch((err) => {
          console.error("Wishlist update failed:", err);
          perfume.inWishList = !perfume.inWishList;
        });
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
