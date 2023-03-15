import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { firebaseApp } from "../configs/firebase";
import DLayout from "../pages/dashboard/d-layout";

const AuthGuard = () => {
  const auth = getAuth(firebaseApp);
  const [account, setAccount] = useState<any>(null);

  useEffect(() => {
    //ดูว่า state user เปลี่ยนจังมั้ย
    const unsubscribe = onAuthStateChanged(auth, (user) => {
			if(user){
				//login
				setAccount(user)
			}else{
				//logout
				setAccount(null)
			}
    });
		return () => unsubscribe();
  }, []);

  if (account == null) {
    return <Navigate to={"/login"} />;
  }

  return <DLayout />;
};

export default AuthGuard;