import { useParams } from "@tanstack/react-router";

export const CoinDetailPage = () => {
  // const { coinId } = useParams({ from: "/coin/$coinId" });

  return (
    <div className="dark:text-white mx-auto max-w-6xl flex flex-col justify-between ">
      <header className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <div className="flex gap-4 items-center">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNvq_H8N45GVkTmbD5orOE2prDz67-zj7Ho8BBqIliq4pDozE341oYay99xCrwvk0g4oN1ZGOon8i5kvNGUK153MeXQ7g43Lr97OB6O5y8efpi5bTLiMeujhemHY7qC-TCA3dEiGh5AI1UC2D93_aeOKxJsD9U8lT_unElAmbN3i_OyYt8SH4MF-eEnRdYf47slUEYRsbnAxSBeW6eVI87aTqND6vrIGbrzGooP0fmppjingbux6UUu0Qw5ugk3CSKCW4eswFuqt5m"
            className="aspect-square rounded-full w-12 h-12"
          />
          <div className="flex flex-col">
            <h1 className="flex gap-1 text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">
              Bitcoin<span className="uppercase text-gray-500 dark:text-gray-400">Btc</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Rank #1</p>
          </div>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold">$68,543.12</h1>
          <div className="flex gap-2 items-center">
            <p className="text-lg text-green-500 dark:text-green-400 font-medium">+2.54%</p>
            <span className="text-gray-500 dark:text-gray-400 text-sm">(24hr)</span>
          </div>
        </div>
      </header>
      <main className="bg-foreground p-4 sm:p-6 rounded-xl border border-gray-300 dark:border-gray-600 mb-8">
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          <h2 className="text-xl font-bold">Price Graph (7 days)</h2>
          <div className="flex items-center gap-2 p-1 bg-background/80 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400">
            <button className="px-3 py-1  rounded-md text-white bg-primary uppercase">7d</button>
            <button className="px-3 py-1 rounded-md  hover:bg-white/10 uppercase">1m</button>
            <button className="px-3 py-1 rounded-md  hover:bg-white/10 uppercase">1y</button>
            <button className="px-3 py-1 rounded-md  hover:bg-white/10 uppercase">All</button>
          </div>
        </div>
        <div className="h-100 flex items-center justify-center">..GRAPH WILL BE HERE..</div>
      </main>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-foreground p-6 rounded-xl border border-gray-300 dark:border-gray-600">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Market Cap</p>
          <p className=" text-2xl font-bold">$1.35T</p>
        </div>
        <div className="bg-foreground p-6 rounded-xl border border-gray-300 dark:border-gray-600">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Volume (24h)</p>
          <p className=" text-2xl font-bold">$45.6B</p>
        </div>
        <div className="bg-foreground p-6 rounded-xl border border-gray-300 dark:border-gray-600">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2"> Circulating Supply</p>
          <p className=" text-2xl font-bold">19.7M BTC</p>
        </div>
        <div className="bg-foreground p-6 rounded-xl border border-gray-300 dark:border-gray-600">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2"> Total Supply</p>
          <p className=" text-2xl font-bold">21M BTC</p>
        </div>
      </div>
    </div>
  );
};
