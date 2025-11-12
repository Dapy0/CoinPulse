import { useParams } from "@tanstack/react-router";

export const CoinDetailPage = () => {
  const { coinId } = useParams({ from: "/coin/$coinId" });

  return <h1 className="text-2xl font-bold">Coin Details: {coinId}</h1>;
};
