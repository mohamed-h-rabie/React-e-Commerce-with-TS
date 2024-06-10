import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { TProduct } from "@types";
import { isAxiosErrorHandler } from "@utils";
type TResponse = TProduct[];
const actGetProductsByitems = createAsyncThunk(
  "cart/actGetProductsByitems",
  async function (_, thunkAPI) {
    const { rejectWithValue, fulfillWithValue, getState } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);

    if (!itemsId.length) {
      return fulfillWithValue([]);
    }
    try {
      const concatingItemsId = itemsId.map((el) => `id=${el}`).join("&");
      const response = await axios.get<TResponse>(
        `/products?${concatingItemsId}`,
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

export default actGetProductsByitems;
