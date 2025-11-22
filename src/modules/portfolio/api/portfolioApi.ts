import { api } from "@/api/config";

export const fetchPortfolioCoins = async (coinIds: string[]) => {
  if (coinIds.length === 0) return [];

  const response = await api.get("/coins/markets", {
    params: {
      vs_currency: "usd",
      ids: coinIds.join(","),
      order: "market_cap_desc",
      per_page: 100,
      page: 1,
      sparkline: false,
      price_change_percentage: "24h",
    },
  });

  return response.data;
};
