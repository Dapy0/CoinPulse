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
      <div className="flex justify-center items-center h-64">
        <IconLoader className="animate-spin text-primary size-40 " />
      </div>
    );
  }
  if (isError) {
    return <div className="text-center text-red-500 p-10">Error getting coins (API Error)</div>;
  }

  return <CoinTable data={data} page={page} />;
}
