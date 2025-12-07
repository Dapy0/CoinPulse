import { IconLoader } from "@tabler/icons-react";
import { useState } from "react";
import { fetchCoinMarketChart } from "../api/coinDetailsApi";
import type { CoinFullInfo } from "coingecko-api-v3";
import { useQuery } from "@tanstack/react-query";
import Graph from "./Graph";

const periods = [
  { label: "7d", value: 7, textValue: "7 days" },
  { label: "1m", value: 30, textValue: "30 days" },
  { label: "1y", value: 365, textValue: "1 year" },
];

export default function CoinDetailGraph({ id }: CoinFullInfo) {
  const [days, setDays] = useState<number>(30);
  const { data: chartData, isLoading: isLoadingChart } = useQuery({
    queryKey: ["coinChart", id, days],
    queryFn: () => fetchCoinMarketChart(id!, days),
  });

  if (isLoadingChart) {
    return (
      <div className="flex flex-1 justify-center items-center min-h-120">
        <IconLoader className="animate-spin text-primary size-20 " />
      </div>
    );
  }
  if (!id) {
    return <div className="text-center text-red-500 ">Error getting coin {id} (API Error)</div>;
  }

  return (
    <main className="bg-foreground p-4 sm:p-6 rounded-xl border border-gray-300 dark:border-gray-600 mb-4 sm:mb-8 sm:min-w-sm ">
      <div className="flex items-center justify-between mb-4 gap-4 ">
        <h2 className="text-xl font-bold flex flex-wrap gap-x-1 items-center">
          Price Graph
          <span className="sm:block not-sm:hidden  text-gray-600 dark:text-gray-400">
            ({periods.find((el) => el.value === days)?.textValue})
          </span>
        </h2>
        <div className="flex items-center gap-2 p-0.5 sm:p-1 bg-background/80 rounded-lg text-sm border border-gray-300 dark:border-gray-600 font-medium text-gray-600 dark:text-gray-400 *:px-3 sm:*:py-1  *:py-1.5 *:rounded-md *:uppercase">
          {periods.map((period) => {
            return (
              <button
                onClick={() => setDays(period.value as number)}
                className={`uppercase transition-colors text-xs font-bold sm:text-sm ${days === period.value ? "text-white bg-primary" : "hover:bg-gray-200 dark:hover:bg-white/10"}`}
              >
                {period.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="h-100 flex items-center justify-center mx-auto ">
        {!chartData ? (
          <h1 className="text-center text-3xl dark:text-gray-400 text-gray-600 ">No data</h1>
        ) : (
          <Graph chartData={chartData} />
        )}
      </div>
    </main>
  );
}
