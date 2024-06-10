import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import isAxiosErrorHandler from "@utils/isAxiosErrorHandler";

type TFormData = {
  email: string;
  password: string;
};
type TResponse = {
  accessToken: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
  };
};
const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: TFormData, thunk) => {
    const { rejectWithValue } = thunk;
    console.log(formData);

    try {
      const res = await axios.post<TResponse>("/login", formData);
      console.log(res);

      return res.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);
export default actAuthLogin;