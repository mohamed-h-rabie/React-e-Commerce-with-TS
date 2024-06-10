import { TProduct } from "@types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosErrorHandler } from "@utils";
import axios from "axios";

type TResponse = TProduct[];

const actGetProductsByCatPrefix = createAsyncThunk(
  "products/actGetProductsByCatPrefix",
  async function (prefix: string, thunkAPI) {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        `/products?cat_prefix=${prefix}`,
        {
          signal: thunkAPI.signal,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);
export default actGetProductsByCatPrefix;
