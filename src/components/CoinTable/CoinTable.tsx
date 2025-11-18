import { IconArrowsSort } from "@tabler/icons-react";
import type { CoinsMarkets, ICoinTableItemProps } from "./types";
import { useNavigate } from "@tanstack/react-router";

function CoinTableItem({ coin, index }: ICoinTableItemProps) {
  const navigate = useNavigate();
  return (
    <tr
      onClick={() => {
        navigate({ to: `/coin/${coin.id}` });
      }}
      className="text-sm font-normal leading-normal text-right hover:bg-gray-200/70 dark:hover:bg-white/5 transition-colors duration-200 cursor-pointer even:bg-white/1 *:h-[68px] *:px-4 *:py-2"
    >
      <td className=" text-gray-500 dark:text-gray-400 text-center">{index}</td>
      <td className="">
        <div className="flex gap-3 items-center text-left">
          <img src={coin.image} className="size-8 aspect-square rounded-full" />
          <div className="">
            <p className="font-medium">{coin.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">{coin.symbol}</p>
          </div>
        </div>
      </td>
      <td className="">${coin.current_price.toLocaleString()}</td>
      {/* text-red-400 */}
      <td
        className={`${
          coin.price_change_percentage_24h >= 0
            ? "text-green-500  dark:text-green-400"
            : "text-red-500  dark:text-red-400"
        }`}
      >
        {coin.price_change_percentage_24h >= 0 ? "+" : "-"}2.54%
      </td>
      <td className="">${coin.market_cap.toLocaleString()}</td>
      <td className="">${coin.total_volume.toLocaleString()}</td>
    </tr>
  );
}

function CoinTable({ data }: { data: CoinsMarkets[] }) {
  return (
    <div className="relative inline-block min-w-full align-middle ">
      <div className="overflow-hidden rounded-xl border bg-foreground border-gray-300 dark:border-gray-800 ">
        <table className="min-w-full">
          <thead className="text-right ">
            <tr className="bg-background/20   uppercase text-gray-500 dark:text-gray-400 text-xs font-semibold tracking-wider text-right *:px-4 *:py-3 *:w-12 *:text-center">
              <th className="">#</th>
              <th className="">
                <div className="flex gap-2 items-center cursor-pointer text-left justify-start hover:text-black dark:hover:text-white text-xs">
                  Name
                  <IconArrowsSort className="size-[1.5em]" />
                </div>
              </th>
              <th className="">
                <div className="flex gap-2 items-center cursor-pointer justify-end dark:hover:text-white">
                  Price
                  <IconArrowsSort className="size-[1.5em]" />
                </div>
              </th>
              <th className="">
                <div className="flex gap-2 items-center cursor-pointer justify-end dark:hover:text-white">
                  24hr %<IconArrowsSort className="size-[1.5em]" />
                </div>
              </th>
              <th className="">
                <div className="flex gap-2 items-center cursor-pointer justify-end dark:hover:text-white">
                  Capitalization
                  <IconArrowsSort className="size-[1.5em]" />
                </div>
              </th>
              <th className="">
                <div className="flex gap-2 items-center cursor-pointer justify-end dark:hover:text-white">
                  Value(24hr)
                  <IconArrowsSort className="size-[1.5em]" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300 dark:divide-gray-800">
            {data.map((coin, index: number) => {
              return <CoinTableItem key={coin.id} index={index} coin={coin} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CoinTable;
