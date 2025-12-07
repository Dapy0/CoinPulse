import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatNumber } from "../utils/formatNumbers";
import { format } from "date-fns";
import { useMemo } from "react";
import { CustomReferenceLabel } from "./CustomReferenceLabel";

export type ChartDataPoint = {
  timestamp: number;
  price: number;
};
interface GraphProps {
  chartData: ChartDataPoint[];
}

export default function Graph({ chartData }: GraphProps) {
  const color = useMemo<string>(() => {
    if (!chartData || chartData.length < 2) return "rgb(var(--primary))";
    const firstPrice = chartData[0].price;
    const lastPrice = chartData[chartData.length - 1].price;
    return lastPrice >= firstPrice ? "var(--color-green-400)" : "var(--color-red-400)";
  }, [chartData]);

  const [min, max] = useMemo(() => {
    if (!chartData || chartData.length == 0) return [0, 0];

    return [Math.min(...chartData.map((d) => d.price)), Math.max(...chartData.map((d) => d.price))];
  }, [chartData]);

  return (
    <ResponsiveContainer
      className={
        "outline-none *:outline-none focus:outline-none *:focus:outline-none focus-within:outline-none [&_.recharts-surface]:outline-none *:[&_.recharts-surface]:outline-none "
      }
    >
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(ts) => format(new Date(ts), "dd.MM")}
          stroke="var(--color-gray-500)"
          
          dy={4}
          axisLine={false}
          tickLine={false}
          fontSize={12}
        />

        <YAxis
          domain={[(dataMin) => dataMin * 0.988, (dataMax) => dataMax * 1.01]}
          tickFormatter={(price) => `${formatNumber(price)}`}
          orientation="right"
          stroke="var(--color-gray-500)"
          dx={8}
          fontSize={12}
          axisLine={false}
          tickLine={false}
          mirror={true}
        />
        <ReferenceLine
          y={max}
          stroke={"gray"}
          strokeOpacity={0.6}
          strokeDasharray="4 4"
          label={<CustomReferenceLabel value={max} title="HIGH" color="#10b981" position="top" />}
        />
        <ReferenceLine
          y={min}
          stroke={"gray"}
          strokeOpacity={0.6}
          strokeDasharray="4 4"
          label={<CustomReferenceLabel value={min} title="LOW" color="#f43f5e" position="bottom" />}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgb(var(--foreground))",
            borderColor: "rgb(var(--border))",
            borderRadius: "12px",
          }}
          itemStyle={{ color: color }}
          labelFormatter={(ts) => format(new Date(ts), "MMM d, yyyy")}
          formatter={(value: number) => [`$${formatNumber(value)}`, "Price"]}
        />
        <Area type="linear" dataKey="price" stroke={color} strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
