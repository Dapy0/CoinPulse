import Button from "@/components/Button/Button";
import InputForm from "@/components/InputForm/InputForm";

import { AddCoinModal } from "@/modules/portfolio";
import { AllocationChart } from "@/modules/portfolio/components/AllocationChart";
import { PortfolioTable } from "@/modules/portfolio/components/PortfolioTable";
import { usePortfolioAssets } from "@/modules/portfolio/hooks/usePortfolioAssets";
import { IconPlus } from "@tabler/icons-react";
import { useState, type Key } from "react";

export const PortfolioPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const items = usePortfolioStore((state) => state.items);
  const [filterQuery, setFilterQuery] = useState("");
  const { totalBalance, totalChange24hValue, totalChange24hPercent, assets, isLoading } = usePortfolioAssets();
  const isPositive = totalChange24hValue >= 0;


  const filteredAssets = assets.filter(
    (asset: { name: string; symbol: string; }) =>
      asset.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(filterQuery.toLowerCase()),
  );
  return (
    <div className="dark:text-white mx-auto max-w-6xl flex flex-col justify-between ">
      <AddCoinModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <header className="flex justify-between items-start  mb-14 gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <p className="text-3xl sm:text-4xl font-black leading-tight tracking-[-0.03em]">Portfolio</p>
          <p className="text-gray-400 text-sm sm:text-base font-normal">Review all your coins</p>
        </div>
        <div className="w-full sm:w-auto flex flex-col lg:flex-row h-full gap-4 ">
          <InputForm value={filterQuery} onChange={(e) => { e.preventDefault(); setFilterQuery(e.target.value) }} onClose={() => setFilterQuery("")} />
          <Button {...({ onClick: () => setIsModalOpen(true) })}>
            <IconPlus />
            Add New Coin
          </Button>
        </div>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="flex flex-col gap-2 rounded-lg p-6 border border-gray-300 dark:border-gray-600 bg-foreground shadow-sm overflow-hidden">
            <p className="text-gray-600 dark:text-gray-400 text-base font-medium leading-normal">Total Balance</p>

            <p className="tracking-tight text-3xl font-bold leading-tight wrap-break-word">
              ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>

            <div className="flex items-center gap-2 ">
              <p className={`text-base font-medium leading-normal ${isPositive ? "text-green-500" : "text-red-500"} `}>
                {isPositive ? "+" : ""}
                {totalChange24hPercent.toFixed(2)}%
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-normal">
                ({isPositive ? "+" : ""}${Math.abs(totalChange24hValue).toFixed(2)}) за 24ч
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-lg p-6 border border-gray-300 dark:border-gray-600 bg-foreground shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold">Allocation</h3>

              <div className="flex gap-2">
                {assets.slice(0, 3).map((asset: { id: Key | null | undefined; symbol: string }, i: number) => (
                  <div key={asset.id} className="flex items-center gap-1 text-xs text-gray-500">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"][i],
                      }}
                    ></div>
                    {asset.symbol.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

            <AllocationChart />
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
          <PortfolioTable assets={filteredAssets} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};
