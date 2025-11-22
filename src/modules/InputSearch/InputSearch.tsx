import React, { useState, useRef, useEffect } from "react";
import InputForm from "@/components/InputForm/InputForm";

import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "@tanstack/react-router";

import { searchCoins } from "../CoinTableTop/api/marketApi";
import { useDebounce } from "./hooks/useDebounce";
import { IconLoader2, IconX } from "@tabler/icons-react";

export default function InputSearch() {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 1. "Тормозим" ввод пользователя (ждем 500мс)
  const debouncedSearch = useDebounce(inputValue, 500);

  // 2. Делаем запрос, когда debouncedSearch меняется
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", debouncedSearch],
    queryFn: () => searchCoins(debouncedSearch),
    enabled: debouncedSearch.length > 2, // Ищем только если введено > 2 символов
  });

  // Обработчики
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
    setIsOpen(true);
  };

  const handleSelectCoin = (coinId: string) => {
    navigate({ to: `/coin/${coinId}` });
    setInputValue(""); // Очищаем поле
    setIsOpen(false); // Закрываем список
  };

  // Закрытие при клике вне компонента
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
    <div className="relative w-full sm:w-80" ref={dropdownRef}>
    
      <div className="relative">
        <InputForm
          value={inputValue}
          onChange={handleInputChange}
          placeholder={"Search coins (e.g. Doge)" }
          onFocus={() => setIsOpen(true)}
        />
        {/* Кнопка очистки (появляется, если есть текст) */}
        {inputValue && (
          <button
            onClick={() => setInputValue("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <IconX size={16} />
          </button>
        )}
      </div>

      {/* Выпадающий список результатов */}
      {isOpen && inputValue.length > 0 && (
        <div className="absolute top-full mt-2 left-0 w-full bg-white dark:bg-[#111827] rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 max-h-80 overflow-y-auto z-50">
         
          {isLoading && (
            <div className="p-4 flex justify-center text-gray-500">
              <IconLoader2 className="animate-spin" />
            </div>
          )}

          {/* Нет результатов */}
          {!isLoading && searchResults?.length === 0 && debouncedSearch.length > 2 && (
            <div className="p-4 text-center text-gray-500 text-sm">No coins found for "{inputValue}"</div>
          )}

          {/* Результаты */}
          {!isLoading &&
          // @ts-ignore
            searchResults?.map((coin) => (
              <div
                key={coin.id}
                onClick={() => handleSelectCoin(coin.id)}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
              >
                <img src={coin.thumb} alt={coin.name} className="w-6 h-6 rounded-full" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900 dark:text-white leading-none">{coin.name}</span>
                  <span className="text-xs text-gray-500 uppercase">{coin.symbol}</span>
                </div>
                {coin.market_cap_rank && (
                  <span className="ml-auto text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded">
                    #{coin.market_cap_rank}
                  </span>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
