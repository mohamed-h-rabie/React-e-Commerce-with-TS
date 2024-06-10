import { TProduct } from "@types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosErrorHandler } from "@utils";
import axios from "axios";
type TResponse = TProduct[];
const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async function (_, thunkAPI) {
    const { rejectWithValue, fulfillWithValue } = thunkAPI;
    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        "/wishlist?userId=1",
        {
          signal: thunkAPI.signal,
        }
      );
      console.log(userWishlist);

      if (!userWishlist.data.length) {
        return fulfillWithValue([]);
      }

      const concatenatedItemsId = userWishlist.data
        .map((el) => {
          return `id=${el.productId}`;
        })
        .join("&");

      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);
export default actGetWishlist;
