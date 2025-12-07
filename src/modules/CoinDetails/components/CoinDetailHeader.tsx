import type { CoinFullInfo } from "coingecko-api-v3";
import { formatNumber } from "../utils/formatNumbers";

export default function CoinHeader({ image, name, symbol, market_cap_rank, market_data }: CoinFullInfo) {
  const isPositive = (market_data?.price_change_percentage_24h || 0) >= 0;

  return (
    <header className="flex justify-between items-start md:items-center mb-6 gap-4 ">
      <div className="flex gap-4 items-center">
        <img src={image?.large} className="aspect-square rounded-full w-12 h-12" />
        <div className="flex flex-col">
          <h1 className="flex flex-col  sm:flex-row sm:gap-2.5 text-3xl sm:text-4xl font-black leading-none sm:leading-tight tracking-[-0.033em]">
            {name}
            <span className="uppercase self-start text-xl sm:text-2xl sm:self-end text-gray-500 dark:text-gray-400">
              {symbol}
            </span>
          </h1>
          <p className="hidden sm:block text-gray-500 dark:text-gray-400 text-base font-normal sm:leading-normal ">
            Rank #{market_cap_rank}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end md:gap-2">
        <h1 className="text-3xl sm:text-4xl font-bold">{formatNumber(market_data?.current_price?.usd || 0)}</h1>
        <div className="flex gap-0.5 md:gap-2 text-center items-center sm:flex-row">
          <p
            className={`text-sm sm:text-lg  font-medium ${isPositive ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}
          >
            {isPositive && "+"}
            {(market_data?.price_change_percentage_24h || 0).toFixed(2)}%
          </p>
          <span className="text-gray-500 dark:text-gray-400 text-xs text-right sm:text-sm">(24hr)</span>
        </div>
      </div>
    </header>
  );
}
