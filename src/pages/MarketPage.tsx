import CoinTable from "@/components/CoinTable/CoinTable";
import Pagination from "@/components/Pagination/Pagination";
import InputSearch from "@/modules/InputSearch/InputSearch";
import { useSearch } from "@tanstack/react-router";

export const MarketPage = () => {
  const { page = 1 } = useSearch({ from: "/" });

  return (
    <div className="dark:text-white mx-auto max-w-6xl flex flex-col justify-between ">
      <header className="flex justify-between items-start mb-14 gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <p className="text-3xl sm:text-4xl font-black leading-tight tracking-[-0.03em]">Market Overview</p>
          <p className="text-gray-400 text-sm sm:text-base font-normal">Top-100 coins based on market capitalization</p>
        </div>
        <div className="w-full sm:w-auto">
          <InputSearch />
        </div>
      </header>
      <main className="overflow-x-auto">
        <CoinTable />
      </main>
      <Pagination currentPage={page} totalPages={20} search={(prev) => ({ page: prev })} />
    </div>
  );
};
