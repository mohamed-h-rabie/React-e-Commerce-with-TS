import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCatPrefix from "./act/actGetProductsByCatPrefix";

import { isString, TLoading, TProduct } from "@types";

interface IProductsState {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
}
// type TCategoriesState= {
//   records: { id: number; prefix: string; title: string; img: string }[];
//   loading: "idle" | "pending" | "succeeded" | "failed";
//   error: string | null;
// }

const initialState: IProductsState = {
  records: [],
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    productsCleanUp(state) {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByCatPrefix.pending, function (state) {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(
      actGetProductsByCatPrefix.fulfilled,
      function (state, action) {
        state.loading = "succeeded";
        state.records = action.payload;
      }
    );

    builder.addCase(
      actGetProductsByCatPrefix.rejected,
      function (state, action) {
        state.loading = "failed";
        // state.error = action.payload as string;
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      }
    );
  },
});
export const { productsCleanUp } = productsSlice.actions;
export { actGetProductsByCatPrefix };
export default productsSlice.reducer;
