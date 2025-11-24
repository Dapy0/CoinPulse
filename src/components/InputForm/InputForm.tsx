import { IconSearch, IconX, type ReactNode } from "@tabler/icons-react";
interface IInputForm {
  value: string;
  children?: ReactNode;
  placeholder?: string;
  onFocus?: () => void;
  onClose?: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputForm({ value, onChange, onClose, ...props }: IInputForm) {
  return (
    <form className="group flex relative min-h-11 flex-1 bg-foreground rounded-lg border border-gray-400 dark:border-gray-800 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
      <div className="text-gray-400 flex items-center justify-center px-3 peer-focus:text-red-400! ">
        <IconSearch className="size-5" />
      </div>
      <input
        key={"searchInput"}
        className="form-input w-full border-none outline-none focus:outline-none focus:ring-0 placeholder:text-gray-500 pl-0 pr-10 text-sm font-normal leading-normal "
        type="text"
        placeholder="Input coin name..."
        value={value}
        onChange={onChange}
        {...props}
      />
      {value && (
        <button
          onClick={onClose}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <IconX size={18} />
        </button>
      )}
    </form>
  );
}
