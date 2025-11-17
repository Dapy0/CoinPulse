import { api } from "@/api/config";

export const fetchTopCoins = async () => {
  const response = await api.get("/coins/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 100,
      page: 1,
      sparkline: true,
      price_change_percentage: "24h",
    },
  });
  return response.data;
};
