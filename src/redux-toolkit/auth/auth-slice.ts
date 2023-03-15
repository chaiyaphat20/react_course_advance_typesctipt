import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";
import { Account } from "../../app-types/account.type";

type AuthState = {
  isAuthLoading: boolean;
  account: Account | null;
};

const initialState: AuthState = {
  isAuthLoading: true,
  account: {
    userId: "1",
    firstName: "chaiyaphat",
    lastName: "supharak",
    photoUrl: "",
    role: "admin",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
});

export const selectAuthState = (state: RootState) => state.authState; //AuthState ถ้าอยากใช้ isAuthLoading , account ให้ใช้ selectAuthState

export default authSlice.reducer;
