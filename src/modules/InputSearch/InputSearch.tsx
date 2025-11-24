import React, { useState, useRef, useEffect } from "react";
import InputForm from "@/components/InputForm/InputForm";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { searchCoins } from "../CoinTableTop/api/marketApi";
import { IconLoader2 } from "@tabler/icons-react";

export default function InputSearch() {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", inputValue],
    queryFn: () => searchCoins(inputValue),
    enabled: inputValue.length > 1,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
    setIsOpen(true);
  };

  const handleSelectCoin = (coinId: string) => {
    navigate({ to: `/coin/${coinId}` });
    setInputValue("");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full sm:w-70" ref={dropdownRef}>
      <InputForm
        value={inputValue}
        onChange={handleInputChange}
        placeholder={"Search coins (e.g. Doge)"}
        onFocus={() => setIsOpen(true)}
        onClose={() => setInputValue("")}
      />

      {isOpen && inputValue.length > 0 && (
        <div className="absolute top-full mt-2 left-0 w-full bg-foreground rounded-xl shadow-xl border border-gray-300 dark:border-gray-700 max-h-80 overflow-y-auto z-50">
          {isLoading && (
            <div className="p-4 flex justify-center text-gray-500">
              <IconLoader2 className="animate-spin" />
            </div>
          )}

          {!isLoading && searchResults?.length === 0 && inputValue.length > 2 && (
            <div className="p-4 text-center text-gray-500 text-sm wrap-break-word">
              No coins found for "{inputValue}"
            </div>
          )}

          {!isLoading &&
            searchResults?.length > 1 &&
            searchResults.map(
              (coin: { id: string; thumb: string; name: string; symbol: string; market_cap_rank: number }) => (
                <div
                  key={coin.id}
                  onClick={() => handleSelectCoin(coin.id)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0 "
                >
                  <img src={coin.thumb} alt={coin.name} className="w-6 h-6 rounded-full" />
                  <div className="flex flex-col gap-1 min-w-0 ">
                    <span className="text-sm font-bold text-gray-900 dark:text-white leading-none truncate">
                      {coin.name}
                    </span>
                    <span className="text-xs text-gray-500 uppercase">{coin.symbol}</span>
                  </div>
                  {coin.market_cap_rank && (
                    <span className="ml-auto text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded">
                      #{coin.market_cap_rank}
                    </span>
                  )}
                </div>
              ),
            )}
        </div>
      )}
    </div>
  );
}
