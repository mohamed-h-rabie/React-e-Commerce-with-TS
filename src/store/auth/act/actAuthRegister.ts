import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import isAxiosErrorHandler from "@utils/isAxiosErrorHandler";

type TFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (formData: TFormData, thunk) => {
    const { rejectWithValue } = thunk;
    console.log(formData);

    try {
      const res = await axios.post("/register", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);
export default actAuthRegister;
