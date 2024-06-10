import { createSlice } from "@reduxjs/toolkit";
import { TLoading, isString } from "@types";
import actAuthRegister from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";
type TAuthProps = {
  loading: TLoading;
  error: string | null;
  accessToken: string | null;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
  } | null;
};
const initialState: TAuthProps = {
  loading: "idle",
  error: null,
  accessToken: null,
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUi(state) {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actAuthRegister.pending, function (state) {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthRegister.fulfilled, function (state) {
      state.loading = "succeeded";
    });
    builder.addCase(actAuthRegister.rejected, function (state, action) {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    builder.addCase(actAuthLogin.pending, function (state) {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, function (state, action) {
      state.loading = "succeeded";
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    });
    builder.addCase(actAuthLogin.rejected, function (state, action) {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});
export const { resetUi } = authSlice.actions;
export { actAuthRegister, actAuthLogin };
export default authSlice.reducer;
