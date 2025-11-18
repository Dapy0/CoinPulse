import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Устанавливаем таймер обновления
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Очищаем таймер, если value изменилось до истечения времени
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}