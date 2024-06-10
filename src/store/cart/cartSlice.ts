import { TProduct, isString, TLoading } from "@types";
import { createSlice } from "@reduxjs/toolkit";
import { getTotalQuantity } from "./selectors";
import actGetProductsByitems from "./actGetProductsByItems/actGetProductsByitems";

interface ICartState {
  items: { [key: string]: number };
  productsFullInfo: TProduct[];
  loading: TLoading;
  error: null | string;
}

const initialState: ICartState = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart(state, action) {
      if (state.items[action.payload]) {
        state.items[action.payload]++;
      } else {
        state.items[action.payload] = 1;
      }
    },
    cartItemChangeQuantity(state, action) {
      state.items[action.payload.id] = action.payload.quantity;
    },
    cartItemRemove(state, action) {
      delete state.items[action.payload];
      state.productsFullInfo = state.productsFullInfo.filter(
        (el) => el.id !== action.payload
      );
    },
    cleanupOfCartItems(state) {
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByitems.pending, function (state) {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByitems.fulfilled, function (state, action) {
      state.loading = "succeeded";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetProductsByitems.rejected, function (state, action) {
      state.loading = "failed";
      // state.error = action.payload as string;
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { getTotalQuantity, actGetProductsByitems };
export const {
  addTocart,
  cartItemChangeQuantity,
  cartItemRemove,
  cleanupOfCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
