import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import { TLoading, isString, TCategories } from "@types";

interface ICategoriesState {
  records: TCategories[];
  loading: TLoading;
  error: string | null;
}
// type TCategoriesState= {
//   records: { id: number; prefix: string; title: string; img: string }[];
//   loading: "idle" | "pending" | "succeeded" | "failed";
//   error: string | null;
// }

const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    cleanupCategories(state) {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, function (state) {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actGetCategories.fulfilled, function (state, action) {
      state.loading = "succeeded";
      state.records = action.payload;
    });

    builder.addCase(actGetCategories.rejected, function (state, action) {
      state.loading = "failed";
      // state.error = action.payload as string;
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});
export { actGetCategories };
export const { cleanupCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
