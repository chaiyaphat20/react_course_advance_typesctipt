import CircularProgress from "@mui/material/CircularProgress";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { firebaseApp } from "../configs/firebase";
import { selectAuthState } from "../redux-toolkit/auth/auth-slice";
import { getCurrentAccountThunk } from "../redux-toolkit/auth/auth-thunk";
import { useAppDispatch, useAppSelector } from "../redux-toolkit/hooks";

type AdminGuardPropType = {
  children: React.ReactNode;
};

const AdminGuard = ({ children }: AdminGuardPropType) => {
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();
  // const [account, setAccount] = useState<any>(null);

  const { account, isAuthLoading } = useAppSelector(selectAuthState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    //ดูว่า state user เปลี่ยนจังมั้ย  จะเรียกครั้งแรก แต่ไม่ observe ถ้า data user เปลี่ยน
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged");
      console.log(user);
      if (user) {
        //login
        dispatch(getCurrentAccountThunk(user.uid));
      } else {
        //ไม่ได้ login
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  if (isAuthLoading) {
    return <CircularProgress />;
  }

  if (account?.role !=='admin') {
    return <Navigate to="../permission-denied" />;  //../permission-denied ออกมาอีกระดับ ไม่อยู่ใน dashboard
  }

  return <>{ children }</>;
};

export default AdminGuard;
