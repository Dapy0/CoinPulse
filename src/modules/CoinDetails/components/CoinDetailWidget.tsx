import { formatNumber } from "../utils/formatNumbers";

export default function CoinDetailWidget({ name, value }: { name: string; value: string }) {
  return (
    <div className="bg-foreground p-6 rounded-xl border border-gray-300 dark:border-gray-600">
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">{name}</p>
      <p className=" text-2xl font-bold">{value}</p>
    </div>
  );
}
