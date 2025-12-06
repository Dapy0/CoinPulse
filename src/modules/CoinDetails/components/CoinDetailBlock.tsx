import CoinDetailWidget from "./CoinDetailWidget";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinDetails } from "../api/coinDetailsApi";
import { IconLoader } from "@tabler/icons-react";
import { formatNumber } from "../utils/formatNumbers";
import CoinHeader from "./CoinHeader";

import CoinDetailGraph from "./CoinDetailGraph";
export default function CoinDetailBlock({ coinId }: { coinId: string }) {
  const { data: coin, isLoading: isLoadingCoin } = useQuery({
    queryKey: ["coinDetails", coinId],
    queryFn: () => fetchCoinDetails(coinId),
  });

  if (isLoadingCoin) {
    return (
      <div className="flex flex-1 justify-center items-center ">
        <IconLoader className="animate-spin text-primary size-20 " />
      </div>
    );
  }
  if (!coin) {
    return <div className="text-center text-red-500 ">Error getting coin details (API Error)</div>;
  }

  return (
    <>
      <CoinHeader {...coin} />

      <CoinDetailGraph {...coin} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <CoinDetailWidget name="Market Cap" value={`$${formatNumber(coin.market_data?.market_cap?.usd || 0)}`} />
        <CoinDetailWidget name="Volume (24h)" value={`$${formatNumber(coin.market_data?.total_volume?.usd || 0)}`} />
        <CoinDetailWidget
          name="Circulating Supply"
          value={`${formatNumber(coin.market_data?.circulating_supply || 0)} ${coin.symbol?.toUpperCase()}`}
        />
        <CoinDetailWidget name="Total Supply" value={formatNumber(coin.market_data?.total_supply || 0) || "∞"} />
      </div>
    </>
  );
}
