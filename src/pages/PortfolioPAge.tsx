import Button from "@/components/Button/Button";
import CoinTable from "@/components/CoinTable/CoinTable";

import InputSearch from "@/modules/InputSearch/InputSearch";
import { IconPlus } from "@tabler/icons-react";

export const PortfolioPage = () => {
  return (
    <div className="dark:text-white mx-auto max-w-6xl flex flex-col justify-between ">
      <header className="flex justify-between items-start  mb-14 gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <p className="text-3xl sm:text-4xl font-black leading-tight tracking-[-0.03em]">Portfolio</p>
          <p className="text-gray-400 text-sm sm:text-base font-normal">Review all your coins</p>
        </div>
        <div className="w-full sm:w-auto flex flex-col lg:flex-row h-full gap-4">
          <InputSearch />
          <Button>
            <IconPlus />
            Add New Coin
          </Button>
        </div>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="flex flex-col gap-2 rounded-lg p-6 border border-gray-300 dark:border-gray-600 bg-foreground ">
            <p className="text-gray-600 dark:text-gray-400 text-base font-medium leading-normal">Total Value</p>
            <p className="tracking-tight text-3xl font-bold leading-tight">$36,611.73</p>
            <div className="flex items-center gap-2">
              <p className="text-green-500 dark:text-green-600 text-base font-medium leading-normal">+2.19%</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-normal">(+$785.30) за 24ч</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-lg p-6 border border-gray-300 dark:border-gray-600 bg-foreground ">
            <h3 className="text-lg font-bold">Total Value</h3>

            <div className="relative flex items-center justify-center">
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" fill="none" r="54" stroke="#4a5e4f" stroke-width="12"></circle>
                <circle
                  className="transition-all duration-500"
                  cx="60"
                  cy="60"
                  fill="none"
                  r="54"
                  stroke="#FBBF24"
                  stroke-dasharray="291.56, 339.29"
                  stroke-linecap="round"
                  stroke-width="12"
                ></circle>
                <circle
                  className="transition-all duration-500"
                  cx="60"
                  cy="60"
                  fill="none"
                  r="54"
                  stroke="#60A5FA"
                  stroke-dasharray="56.98, 339.29"
                  stroke-linecap="round"
                  stroke-width="12"
                ></circle>
                <circle
                  className="transition-all duration-500"
                  cx="60"
                  cy="60"
                  fill="none"
                  r="54"
                  stroke="#A78BFA"
                  stroke-dasharray="4.14, 339.29"
                  stroke-linecap="round"
                  stroke-width="12"
                ></circle>
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-gray-600 dark:text-gray-400 text-sm">Total:</span>
                <span className=" text-2xl font-bold">$36.6k</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FBBF24]"></div>
                  <span className=" text-sm">Bitcoin</span>
                </div>
                <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">86.1%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FBBF24]"></div>
                  <span className=" text-sm">Bitcoin</span>
                </div>
                <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">86.1%</span>
              </div>
            </div>
          </div>
          <blockquote className="hidden text-center text-xl lg:block  text-gray-600 dark:text-gray-400 italic">
            The new frontier of innovation is in
            <span className="relative inline-block before:absolute before:-inset-1 before:block before:mt-1 before:-skew-y-3 before:bg-primary/80">
              <span className="relative text-gray-800 dark:text-gray-950">decentralization</span>
            </span>
            . Blockchain leads the charge.
          </blockquote>
        </div>
        <div className="lg:col-span-2 overflow-x-auto">
          <CoinTable />
          {/* <Pagination currentPage={1} totalPages={20} search={(prev) => ({ page: prev })} /> */}
        </div>
      </main>
    </div>
  );
};
