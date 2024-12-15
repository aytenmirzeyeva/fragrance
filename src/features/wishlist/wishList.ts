import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WishlistState {
  likedPerfumes: {
    [key: string]: boolean;
  };
}

// const initialState: WishlistState = {
//   likedPerfumes: {},
// };

const localStorageKey = "likedPerfumes";

const loadInitialState = (): WishlistState => {
  const savedLikes = localStorage.getItem(localStorageKey);
  return {
    likedPerfumes: savedLikes ? JSON.parse(savedLikes) : {},
  };
};

const initialState: WishlistState = loadInitialState();

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const perfumeId = action.payload;
      state.likedPerfumes[perfumeId] = !state.likedPerfumes[perfumeId];
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(state.likedPerfumes)
      );
    },
  },
});
export const { toggleLike } = wishlistSlice.actions;

export default wishlistSlice.reducer;
