import { TProduct } from "@types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosErrorHandler } from "@utils";
import axios from "axios";
import { RootState } from "@store/index";
type TResponse = TProduct[];
type TDataTypes = "productsFullInfo" | "productIds";
const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async function (dataType: TDataTypes, thunkAPI) {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${auth.user?.id}`,
        {
          signal: thunkAPI.signal,
        }
      );

      if (!userWishlist.data.length) {
        return { data: [], dataType: "empty" };
      }
      if (dataType === "productIds") {
        const concatenatedItemsId = userWishlist.data.map((el) => {
          return el.productId;
        });
        return { data: concatenatedItemsId, dataType: "productIds" };
      } else {
        const concatenatedItemsId = userWishlist.data
          .map((el) => {
            return `id=${el.productId}`;
          })
          .join("&");

        const response = await axios.get<TResponse>(
          `/products?${concatenatedItemsId}`
        );
        return { data: response.data, dataType: "productsFullInfo" };
      }
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);
export default actGetWishlist;
