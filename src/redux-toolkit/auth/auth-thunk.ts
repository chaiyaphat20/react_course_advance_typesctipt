import { Account } from './../../app-types/account.type';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentAccount, updateAccount } from "../../services/auth.service";

//auth/getCurrentAccountThunk คือ ชื่อเล่น
export const getCurrentAccountThunk = createAsyncThunk(
  "auth/getCurrentAccountThunk",
  async (userId: string) => {
    try {
      const account = await getCurrentAccount(userId);
      return account;
    } catch (error) {
      throw error;
    }
  }
);

export type argsUpdateAccountType = {  //เพราะ redux thunk รับตัวแปร ได้แค่ 1 ตัว
  userId?:string
  acc:Account
}

export const updateAccountThunk = createAsyncThunk(
  "auth/updateAccountThunk",
  async (args: argsUpdateAccountType) => {
    try {
      const {acc,userId} = args
      await updateAccount(userId!,acc);
    } catch (error) {
      throw error;
    }
  }
);
