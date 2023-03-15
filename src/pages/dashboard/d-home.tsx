import { selectAuthState } from "../../redux-toolkit/auth/auth-slice";
import { useAppSelector } from "../../redux-toolkit/hooks";

const DHome = () => {
  const { account, isAuthLoading } = useAppSelector(selectAuthState);
  return (
    <div>
      ยินดีต้อนรับ: {account?.firstName} {account?.lastName}
    </div>
  );
};

export default DHome;
