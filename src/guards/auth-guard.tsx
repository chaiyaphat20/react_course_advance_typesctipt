import CircularProgress from '@mui/material/CircularProgress';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { firebaseApp } from "../configs/firebase";
import DLayout from "../pages/dashboard/d-layout";
import { selectAuthState } from "../redux-toolkit/auth/auth-slice";
import { getCurrentAccountThunk } from "../redux-toolkit/auth/auth-thunk";
import { useAppDispatch, useAppSelector } from "../redux-toolkit/hooks";

const AuthGuard = () => {
  const auth = getAuth(firebaseApp);
  // const [account, setAccount] = useState<any>(null);

  const { account, isAuthLoading } = useAppSelector(selectAuthState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    //ดูว่า state user เปลี่ยนจังมั้ย
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //login
        dispatch(getCurrentAccountThunk(user.uid));
      } else {
        //logout
      }
    });
    return () => unsubscribe();
  }, []);

  if (isAuthLoading) {
    return <CircularProgress />;
  }

  if (account == null) {
    return <Navigate to={"/login"} />;
  }

  return <DLayout />;
};

export default AuthGuard;
