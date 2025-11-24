import { api } from "@/api/config";

export const fetchCoinDetails = async (coinId: string) => {
  const response = await api.get(`/coins/${coinId}`, {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false,
    },
  });
  return response.data;
};
export const fetchCoinMarketChart = async (coinId: string, days: number = 7) => {
  const response = await api.get(`/coins/${coinId}/market_chart`, {
    params: {
      vs_currency: "usd",
      days: days,
      interval: "daily",
      precision: 6
    },
  });
  return response.data.prices.map((price: number[]) => ({
    timestamp: price[0],
    price: price[1],
  }));
};
