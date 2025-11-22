import { useQuery } from "@tanstack/react-query";
import { usePortfolioStore } from "../store/usePortfolioStore";
import { fetchPortfolioCoins } from "../api/portfolioApi";

export const usePortfolioAssets = () => {
  const items = usePortfolioStore((state) => state.items);

  const coinIds = items.map((item) => item.id);

  const {
    data: marketData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["portfolioCoins", coinIds],
    queryFn: () => fetchPortfolioCoins(coinIds),
    enabled: coinIds.length > 0,
    refetchInterval: 30000,
  });

  const assets =
    marketData?.map((coin: any) => {
      const userItem = items.find((i) => i.id === coin.id);
      const amount = userItem?.amount || 0;
      const value = amount * coin.current_price;

      return {
        ...coin,
        amount,
        totalValue: value,
      };
    }) || [];

  const totalBalance = assets.reduce((acc: number, asset: any) => acc + asset.totalValue, 0);

  const totalChange24hValue = assets.reduce((acc: number, asset: any) => {
    const priceChangeAmount = asset.current_price * (asset.price_change_percentage_24h / 100);
    return acc + priceChangeAmount * asset.amount;
  }, 0);

  const totalChange24hPercent =
    totalBalance > 0 ? (totalChange24hValue / (totalBalance - totalChange24hValue)) * 100 : 0;

  return {
    assets,
    totalBalance,
    totalChange24hValue,
    totalChange24hPercent,
    isLoading,
    isError,
    isEmpty: items.length === 0,
  };
};
