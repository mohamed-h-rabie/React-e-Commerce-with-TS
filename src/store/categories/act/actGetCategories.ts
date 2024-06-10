import { TCategories } from "@types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosErrorHandler } from "@utils";
import axios from "axios";
type TResponse = TCategories[];
const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async function (_, thunkAPI) {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TResponse>("/category", {
        signal: thunkAPI.signal,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);
export default actGetCategories;
