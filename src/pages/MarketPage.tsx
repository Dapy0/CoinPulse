import Pagination from "@/components/Pagination/Pagination";
import CoinTableTop from "@/modules/CoinTableTop";
import InputSearch from "@/modules/InputSearch/InputSearch";
import { useSearch } from "@tanstack/react-router";

export const MarketPage = () => {
  const { page = 1 } = useSearch({ from: "/" });

  return (
    <div className="dark:text-white  flex-1 flex flex-col  h-full mx-auto max-w-6xl ">
      <header className="flex justify-between items-start mb-6 gap-4 flex-wrap shrink-0">
        <div className="flex flex-col gap-1">
          <p className="text-2xl sm:text-4xl font-black leading-tight tracking-[-0.03em]">Market Overview</p>
          <p className="text-gray-400 text-xs sm:text-base font-normal">Top-100 coins based on market capitalization</p>
        </div>
        <div className="w-[60%] sm:w-auto">
          <InputSearch />
        </div>
      </header>
      <main className="flex overflow-y-auto overflow-x-auto flex-1  justify-center pb-2 w-full">
        <CoinTableTop page={page} />
      </main>
      <footer className="pt-4 shrink-0 ">
        <Pagination currentPage={page} totalPages={100} search={(prev) => ({ page: prev })} />
      </footer>
    </div>
  );
};
