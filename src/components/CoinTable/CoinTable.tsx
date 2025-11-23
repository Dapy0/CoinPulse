import { IconArrowsSort } from "@tabler/icons-react";
import type { CoinsMarkets, ICoinTableItemProps } from "./types";
import { useNavigate } from "@tanstack/react-router";


function CoinTableItem({ coin, index }: ICoinTableItemProps) {
  const navigate = useNavigate();
  return (
    <tr
      onClick={() => navigate({ to: `/coin/${coin.id}` })}
      className="text-sm font-normal leading-normal hover:bg-gray-200/70 dark:hover:bg-white/5 transition-colors duration-200 cursor-pointer odd:bg-white/1 h-[60px] sm:h-[68px] *:px-5 sm:*:px-4 *:py-2 sm:*:py-4"
    >
      <td className="text-gray-500 dark:text-gray-400 text-center w-[30px]">{index}</td>

      <td className="min-w-0 sm:max-w-50 ">
        <div className="flex items-center gap-2 sm:gap-3 text-left min-w-0">
          <img src={coin.image} className="size-6 sm:size-8 rounded-full" />
          <div className="min-w-0">
            <p className="font-medium truncate max-w-[120px] sm:max-w-none">{coin.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
              {coin.symbol}
            </p>
          </div>
        </div>
      </td>
      <td className="hidden sm:table-cell text-left">${coin.current_price}</td>
      <td className={`text-center sm:text-left w-[60px] sm:w-auto  ${coin.price_change_percentage_24h >= 0
          ? "text-green-500  dark:text-green-400"
          : "text-red-500  dark:text-red-400"
          }`}>
        {coin.price_change_percentage_24h > 0 && "+"}{coin.price_change_percentage_24h || 0}%
      </td>
      <td className="hidden sm:table-cell sm:text-left">${coin.market_cap.toLocaleString()}</td>
      <td className="hidden sm:table-cell sm:text-left">${coin.total_volume.toLocaleString()}</td>
    </tr>
  );
}
function CoinTable({ data, page }: { data: CoinsMarkets[]; page: number }) {
  const ITEMS_PER_PAGE = data.length;
  return (
    <div className="relative inline-block flex-1 align-middle w-auto">
      <div className="rounded-xl border bg-foreground  border-gray-300 dark:border-gray-800 ">
        <table className="w-full ">
          <thead className="sticky top-0 z-20 text-right w-full">
            <tr className="rounded-lg  bg-foreground  uppercase text-gray-500 dark:text-gray-400 text-xs font-semibold tracking-wider text-right *:px-5 sm:*:px-4 *:py-2 sm:*:py-4 *:text-center ">
              <th className="rounded-tl-lg">#</th>
              <th className="w-[20%] sm:max-w-[10%]">
                <div className="flex gap-2 items-center cursor-pointer   sm:justify-start hover:text-black dark:hover:text-white text-xs">
                  Name
                  <IconArrowsSort className="size-[1.5em]" />
                </div>
              </th>
              <th className="hidden sm:table-cell">
                <div className="flex gap-2 items-center cursor-pointer justify-start dark:hover:text-white">
                  Price
                  <IconArrowsSort className="size-[1.5em]" />
                </div>
              </th>
              <th className="">
                <div className="flex gap-2 items-center cursor-pointer justify-center sm:justify-start dark:hover:text-white">
                  24hr %<IconArrowsSort className="size-[1.5em]" />
                </div>
              </th>
              <th className="hidden sm:table-cell">
                <div className="flex gap-2 items-center cursor-pointer justify-start dark:hover:text-white">
                  Capitalization
                  <IconArrowsSort className="size-[1.5em]" />
                </div>
              </th>
              <th className="rounded-tr-lg hidden sm:table-cell">
                <div className="flex gap-2 items-center cursor-pointer justify-start dark:hover:text-white">
                  Value(24hr)
                  <IconArrowsSort className="size-[1.5em]" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300 dark:divide-gray-800 ">
            {data.map((coin, index: number) => {
              const globalIndex = (page - 1) * ITEMS_PER_PAGE + index + 1;
              return <CoinTableItem key={coin.id} index={globalIndex} coin={coin} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CoinTable;
