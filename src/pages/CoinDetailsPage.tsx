import { CoinDetails } from "@/modules/CoinDetails";
import { useParams } from "@tanstack/react-router";

export const CoinDetailPage = () => {
  const { coinId } = useParams({ from: "/coin/$coinId" });

  return (
    <div className="dark:text-white mx-auto max-w-6xl flex flex-col justify-between h-full ">
      <CoinDetails coinId={coinId} />
    </div>
  );
};
