import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, type TooltipContentProps } from "recharts";
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

const CustomTooltip = ({ active, payload }: TooltipContentProps<number, string>) => {
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

  const chartData = assets
    .filter((asset: { totalValue: number }) => asset.totalValue > 0)

    .map((asset: { name: string; symbol: string; totalValue: number }) => ({
      name: asset.name,
      symbol: asset.symbol,
      value: asset.totalValue,
      percent: (asset.totalValue / totalBalance) * 100,
    }))
    .sort((a: { value: number }, b: { value: number }) => b.value - a.value); // Сортируем от большего к меньшему

  const topAsset = chartData[0];

  return (
    <div className=" h-40 sm:h-54 w-full relative">
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
            {chartData.map((entry: { symbol: string }, index: number) => (
              <Cell key={`cell-${entry.symbol}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            wrapperStyle={{ zIndex: 100 }}
            content={
              <CustomTooltip
                active={false}
                payload={[]}
                coordinate={undefined}
                accessibilityLayer={false}
                activeIndex={undefined}
              />
            }
          />
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
