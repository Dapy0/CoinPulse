import { api } from "@/api/config";

export const fetchTopCoins = async (page: number) => {
  const response = await api.get("/coins/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 100,
      page: page,
      sparkline: true,

      price_change_percentage: "24h",
    },
  });

  return response.data;
};

export const searchCoins = async (query: string) => {
  if (!query) return [];

  const response = await api.get("/search", {
    params: { query },
  });
  return response.data.coins;
};