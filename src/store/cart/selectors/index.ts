import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../../index";
const getTotalQuantity = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    const totalQuantity = Object.values(items).reduce((sum, curr) => {
      return sum + curr;
    }, 0);
    return totalQuantity;
  }
);
export { getTotalQuantity };
