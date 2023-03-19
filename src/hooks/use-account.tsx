import { useNavigate } from 'react-router-dom';
import { selectAuthState } from "../redux-toolkit/auth/auth-slice";
import { useAppSelector } from "../redux-toolkit/hooks";
import { logout } from '../services/auth.service';

export const useAccount = () => {
	const navigate = useNavigate();
  const { account, isAuthLoading } = useAppSelector(selectAuthState);

	const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return { account, isAuthLoading,handleLogout };
};
