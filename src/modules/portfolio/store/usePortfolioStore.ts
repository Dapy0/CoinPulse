import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PortfolioItem {
  id: string;
  amount: number;
}

interface PortfolioState {
  items: PortfolioItem[];
  addCoin: (id: string, amount: number) => void;
  removeCoin: (id: string) => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      items: [],

      addCoin: (id, amount) =>
        set((state) => {

          const existingItem = state.items.find((item) => item.id === id);

          if (existingItem) {

            return {
              items: state.items.map((item) =>
                item.id === id ? { ...item, amount: item.amount + amount } : item
              ),
            };
          }


          return {
            items: [...state.items, { id, amount }],
          };
        }),

      removeCoin: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
    }),
    {
      name: 'coinpulse-portfolio',
    }
  )
);