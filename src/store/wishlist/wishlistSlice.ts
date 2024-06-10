import { createSlice } from "@reduxjs/toolkit";
import actLikeToogle from "./act/actLikeToogle";
import actGetWishlist from "./act/actGetWishlist";
import { TLoading, TProduct, isString } from "@types";

interface IWishlist {
  itemsId: number[];
  error: null | string;
  loading: TLoading;
  productsFullInfo: TProduct[];
}

const initialState: IWishlist = {
  itemsId: [],
  error: null,
  loading: "idle",
  productsFullInfo: [],
};
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    productsFullInfoCleanUp(state) {
      state.productsFullInfo = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(actLikeToogle.pending, function (state) {
      state.error = null;
    });
    builder.addCase(actLikeToogle.fulfilled, function (state, action) {
      if (action.payload.type === "add") {
        state.itemsId.push(action.payload.id);
      } else {
        state.itemsId = state.itemsId.filter((el) => el !== action.payload.id);
        state.productsFullInfo = state.productsFullInfo.filter(
          (el) => el.id !== action.payload.id
        );
      }
    });
    builder.addCase(actLikeToogle.rejected, function (state, action) {
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    //////////////////////////////////////////////////////////////////////////
    builder.addCase(actGetWishlist.pending, function (state) {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWishlist.fulfilled, function (state, action) {
      state.loading = "succeeded";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetWishlist.rejected, function (state, action) {
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});
export const { productsFullInfoCleanUp } = wishlistSlice.actions;
export { actLikeToogle, actGetWishlist };
export default wishlistSlice.reducer;
