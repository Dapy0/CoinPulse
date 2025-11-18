import { Link } from "@tanstack/react-router";
import { usePortfolioStore } from "../store/usePortfolioStore";
import { IconArrowDown, IconArrowUp, IconLoader2, IconTrash } from "@tabler/icons-react";

// 1. Определяем интерфейс для пропсов
interface PortfolioTableProps {
  assets: any[];
  isLoading: boolean;
}

// 2. Компонент теперь принимает данные снаружи, а не запрашивает сам
export const PortfolioTable = ({ assets, isLoading }: PortfolioTableProps) => {
  const removeCoin = usePortfolioStore(state => state.removeCoin);

  // 3. Логика загрузки на основе пропса
  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <IconLoader2 className="animate-spin text-primary" />
      </div>
    );
  }

  // 4. Логика пустого состояния (если фильтр ничего не нашел или портфель пуст)
  if (assets.length === 0) {
    return (
      <div className="p-10 text-center border border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
        <p className="text-gray-500">No coins found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white dark:bg-foreground rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
          <tr>
            <th className="p-4 text-sm font-semibold text-gray-500">Asset</th>
            <th className="p-4 text-sm font-semibold text-gray-500 text-right">Price</th>
            <th className="p-4 text-sm font-semibold text-gray-500 text-right">Balance</th>
            <th className="p-4 text-sm font-semibold text-gray-500 text-right">Value</th>
            <th className="p-4 text-sm font-semibold text-gray-500 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {assets.map((coin: any) => (
            <tr key={coin.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">

              <td className="p-4">
                <Link to={`/coin/${coin.id}`} className="flex items-center gap-3 hover:opacity-80">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{coin.name}</div>
                    <div className="text-xs text-gray-500 uppercase">{coin.symbol}</div>
                  </div>
                </Link>
              </td>

              <td className="p-4 text-right font-medium dark:text-gray-200">
                ${coin.current_price.toLocaleString()}
                <div className={`text-xs flex justify-end items-center ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                  {coin.price_change_percentage_24h >= 0 ? <IconArrowUp size={10} /> : <IconArrowDown size={10} />}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </div>
              </td>

              <td className="p-4 text-right">
                <div className="font-bold dark:text-white">{coin.amount} {coin.symbol.toUpperCase()}</div>
              </td>

              <td className="p-4 text-right font-bold dark:text-white">
                ${coin.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>

              <td className="p-4 text-right">
                <button
                  onClick={() => removeCoin(coin.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all"
                  title="Remove from portfolio"
                >
                  <IconTrash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};