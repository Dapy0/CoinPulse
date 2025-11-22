import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, type TooltipProps } from "recharts";
import { usePortfolioAssets } from "../hooks/usePortfolioAssets";

const COLORS = [
  "#3b82f6", // blue
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#6366f1", // indigo
  "#14b8a6", // teal
];
//@ts-ignore
const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white  dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-90">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.fill }}></div>
          <p className="font-bold text-gray-900 dark:text-white">{data.name}</p>
          <span className="text-xs text-gray-500 uppercase">{data.symbol}</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ${data.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs text-gray-400">{data.percent < 0.01 ? "< 0.01" : data.percent.toFixed(2)}%</p>
      </div>
    );
  }
  return null;
};

export const AllocationChart = () => {
  const { assets, totalBalance } = usePortfolioAssets();

  if (!assets || assets.length === 0 || totalBalance <= 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-gray-400">
        <div className="w-16 h-16 rounded-full border-4 border-gray-200 dark:border-gray-700 mb-2"></div>
        <p className="text-xs">No assets</p>
      </div>
    );
  }

  // 2. Подготовка данных: Берем ВСЕ монеты с ценой > 0
  const chartData = assets
    .filter((asset: { totalValue: number; }) => asset.totalValue > 0)
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    .map((asset: { name: any; symbol: any; totalValue: number; }) => ({
      name: asset.name,
      symbol: asset.symbol,
      value: asset.totalValue,
      percent: (asset.totalValue / totalBalance) * 100,
    }))
    .sort((a: { value: number; }, b: { value: number; }) => b.value - a.value); // Сортируем от большего к меньшему

  // Топовый актив для центра (по желанию)
  const topAsset = chartData[0];

  return (
    <div className="h-64 w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={1}
            dataKey="value"
            stroke="none"
            minAngle={5}
          >
            {/** biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
            {chartData.map((entry: { symbol: any; }, index: number) => (
              <Cell key={`cell-${entry.symbol}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip wrapperStyle={{ zIndex: 100 }} content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-1">
        <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">Top Asset</span>
        <div className="flex items-center gap-1">
          <span className="text-gray-900 dark:text-white font-bold text-lg">{topAsset.symbol.toUpperCase()}</span>
          <span className="text-xs text-gray-400 font-medium">{topAsset?.percent.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
};
