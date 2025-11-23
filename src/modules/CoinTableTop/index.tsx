import {  useQuery } from "@tanstack/react-query";
import { fetchTopCoins } from "./api/marketApi";
import CoinTable from "@/components/CoinTable/CoinTable";
import { IconLoader } from "@tabler/icons-react";

export default function CoinTableTop({ page }: { page: number }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["topCoins", page],
    queryFn: () => fetchTopCoins(page),
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="flex flex-1 justify-center items-center ">
        <IconLoader className="animate-spin text-primary size-20 " />
      </div>
    );
  }
  if (isError) {
    return <div className="text-center text-red-500 ">Error getting coins (API Error)</div>;
  }

  return <CoinTable data={data} page={page} />;
}
