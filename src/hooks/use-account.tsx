import { selectAuthState } from "../redux-toolkit/auth/auth-slice";
import { useAppSelector } from "../redux-toolkit/hooks";

export const useAccount = () => {
  const { account, isAuthLoading } = useAppSelector(selectAuthState);

  return { account, isAuthLoading };
};
