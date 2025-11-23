import CoinDetailWidget from "./CoinDetailWidget";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinDetails, fetchCoinMarketChart } from "../api/coinDetailsApi";
import { IconLoader } from "@tabler/icons-react";
import { formatNumber } from "../utils/formatNumbers";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format } from "date-fns";
import { useState } from "react";
export default function CoinDetailBlock({ coinId }: { coinId: string }) {
  const [days, setDays] = useState<number>(7);
  const periods = [
    { label: "7d", value: 7 },
    { label: "1m", value: 30 },
    { label: "1y", value: 365 },
  ];
  const { data: coin, isLoading: isLoadingCoin } = useQuery({
    queryKey: ["coinDetails", coinId],
    queryFn: () => fetchCoinDetails(coinId),
  });

  const { data: chartData, isLoading: isLoadingChart } = useQuery({
    queryKey: ["coinChart", coinId, days],
    queryFn: () => fetchCoinMarketChart(coinId, days),
  });

  if (isLoadingCoin || isLoadingChart) {
    return (
      <div className="flex justify-center items-center h-full">
        <IconLoader className="animate-spin text-primary size-40 " />
      </div>
    );
  }

  if (!coin) {
    return <div className="text-center text-red-500 p-10">Error getting coin details (API Error)</div>;
  }
  const marketData = coin.market_data;
  const priceChange = marketData.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  return (
    <>
      <header className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <div className="flex gap-4 items-center">
          <img src={coin.image.large} className="aspect-square rounded-full w-12 h-12" />
          <div className="flex flex-col">
            <h1 className="flex gap-1 text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">
              {coin.name}
              <span className="uppercase text-gray-500 dark:text-gray-400"> {coin.symbol}</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
              Rank #{coin.market_cap_rank}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold">${formatNumber(marketData.current_price.usd)}</h1>
          <div className="flex gap-2 items-center">
            <p
              className={`text-lg  font-medium ${isPositive ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}
            >
              {priceChange.toFixed(2)}%
            </p>
            <span className="text-gray-500 dark:text-gray-400 text-sm">(24hr)</span>
          </div>
        </div>
      </header>
      <main className="bg-foreground p-4 sm:p-6 rounded-xl border border-gray-300 dark:border-gray-600 mb-8 min-w-sm">
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          <h2 className="text-xl font-bold">Price Graph (7 days)</h2>
          <div className="flex items-center gap-2 p-1 bg-background/80 rounded-lg text-sm border border-gray-300 dark:border-gray-600 font-medium text-gray-600dark:text-gray-400 *:px-3 *:py-1  *:rounded-md *:hover:bg-white/10 *:uppercase">
            {periods.map((period) => {
              const isActive = days === period.value;
              return (
                <button
                  key={period.label}
                  onClick={() => setDays(period.value as number)}
                  className={`uppercase transition-colors ${isActive ? "text-white bg-primary" : ""}`}
                >
                  {period.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="h-100 flex items-center justify-center ">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(ts) => format(new Date(ts), "dd.MM")}
                stroke="var(--color-gray-500)"
                dy={4}
              />
              <YAxis
                domain={["auto", "auto"]}
                tickFormatter={(price) => `$${formatNumber(price)}`}
                orientation="right"
                stroke="var(--color-gray-500)"
                dx={4}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgb(var(--foreground))",
                  borderColor: "rgb(var(--primary) / 0.5)",
                  borderRadius: "8px",
                }}
                labelFormatter={(ts) => format(new Date(ts), "MMM d, yyyy")}
                formatter={(value: number) => [`$${value.toFixed(4)}`, "Price"]}
              />
              <Line type="bump" dataKey="price" stroke="rgb(var(--primary))" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CoinDetailWidget name="Market Cap" value={`$${formatNumber(marketData.market_cap.usd)}`} />
        <CoinDetailWidget name="Volume (24h)" value={`$${formatNumber(marketData.total_volume.usd)}`} />
        <CoinDetailWidget
          name="Circulating Supply"
          value={`${formatNumber(marketData.circulating_supply)} ${coin.symbol?.toUpperCase()}`}
        />
        <CoinDetailWidget
          name="Total Supply"
          value={`${marketData.total_supply ? formatNumber(marketData.total_supply) : "∞"}`}
        />
      </div>
    </>
  );
}
