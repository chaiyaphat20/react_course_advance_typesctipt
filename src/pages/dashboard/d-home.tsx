import { useAccount } from "../../hooks/use-account";

const DHome = () => {
  const { account, isAuthLoading } = useAccount();
  return (
    <div>
      ยินดีต้อนรับ: {account?.firstName} {account?.lastName} Role:{" "}
      {account?.role}
    </div>
  );
};

export default DHome;
