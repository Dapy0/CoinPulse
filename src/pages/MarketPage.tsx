import InputForm from "@/components/InputForm/InputForm";

export const MarketPage = () => {
  return <div className="dark:text-white mx-auto">
    <header className="flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <p className="text-3xl font-bold leading-tight tracking-[-0.03em]">Market Overview</p>
        <p className="text-gray-400 text-sm font-normal">Top-100 coins based on market capitalization</p>
      </div>
      <div className="w-full sm:w-auto">
        <InputForm />
      </div>
    </header>
  </div>;
};
