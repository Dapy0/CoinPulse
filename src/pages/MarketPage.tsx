import CoinTable from "@/components/CoinTable/CoinTable";
import InputForm from "@/components/InputForm/InputForm";
import Pagination from "@/components/Pagination/Pagination";
import { useSearch } from "@tanstack/react-router";



export const MarketPage = () => {
  const { page = 1 } = useSearch({from:'/'})

  console.log(page)
  return (
    <div className="dark:text-white mx-auto max-w-6xl flex flex-col justify-between">
      <header className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <p className="text-3xl font-bold leading-tight tracking-[-0.03em]">Market Overview</p>
          <p className="text-gray-400 text-sm font-normal">Top-100 coins based on market capitalization</p>
        </div>
        <div className="w-full sm:w-auto">
          <InputForm />
        </div>

      </header>
      <main className="overflow-x-auto">
        <CoinTable />
      </main>
      <Pagination currentPage={page} totalPages={20} search={(prev) => ({ page: prev })} />
    </div>
  );
};
