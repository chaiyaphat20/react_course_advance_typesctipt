import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";
import { Account } from "../../app-types/account.type";
import { getCurrentAccountThunk } from "./auth-thunk";

type AuthState = {
  isAuthLoading: boolean;
  account: Account | null;
};

const initialState: AuthState = {
  isAuthLoading: true,
  account: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    //fulfilled คือ case สำเร็จไม่ error
    //rejected คือ case เข้า case error
    //pending คือ ระหว่าง เรียก api จะให้ทำอะไร ?
    builder.addCase(getCurrentAccountThunk.pending,(state,action)=>{
			state.isAuthLoading = true
		})
		builder.addCase(getCurrentAccountThunk.fulfilled, (state, action) => {
      //fulfilledถ ถ้ามีข้อมูลออกมา
			state.isAuthLoading = false
      state.account = action.payload; //payload คือ ข้อมูลที่ return มาจาก thunk
			//ทุกครั้งที่ มีการ เรียก getCurrentAccount มันจะอีพเดต state account
    }

		);
  },
});

export const selectAuthState = (state: RootState) => state.authState; //AuthState ถ้าอยากใช้ isAuthLoading , account ให้ใช้ selectAuthState

export default authSlice.reducer;
