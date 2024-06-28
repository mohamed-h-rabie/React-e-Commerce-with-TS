import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { isAxiosErrorHandler } from "@utils";
import axios from "axios";

const actLikeToogle = createAsyncThunk(
  "wishlist/actLikeToogle",
  async function (id: number, thunkAPI) {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const isRecordedItem = await axios.get(
        `/wishlist?userId=${auth.user?.id}&productId=${id}`
      );
      if (isRecordedItem.data.length > 0) {
        await axios.delete(`/wishlist/${isRecordedItem.data[0].id}`);
        return { type: "remove", id };
      } else {
        await axios.post("/wishlist", { userId: auth.user?.id, productId: id });
        return { type: "add", id };
      }
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);
export default actLikeToogle;
