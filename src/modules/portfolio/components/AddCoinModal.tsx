import React, { useState } from "react";
import { usePortfolioStore } from "../store/usePortfolioStore";
import Button from "@/components/Button/Button";
import { IconX } from "@tabler/icons-react";

interface AddCoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCoinModal = ({ isOpen, onClose }: AddCoinModalProps) => {
  const [coinId, setCoinId] = useState("");
  const [amount, setAmount] = useState("");
  const addCoin = usePortfolioStore((state) => state.addCoin);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coinId || !amount) return;

    addCoin(coinId.toLowerCase().trim(), parseFloat(amount));

    setCoinId("");
    setAmount("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#111827] w-full max-w-md rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Transaction</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <IconX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Coin ID (e.g. bitcoin)
            </label>
            <input
              type="text"
              value={coinId}
              onChange={(e) => setCoinId(e.target.value)}
              placeholder="bitcoin"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.5"
              step="any"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <Button>Add Coin</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
