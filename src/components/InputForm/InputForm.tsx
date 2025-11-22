import { IconSearch, type ReactNode } from "@tabler/icons-react";
interface IInputForm  {
  value: string;
  children?: ReactNode;
  placeholder?:string;
  onFocus?: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputForm({ value, onChange, ...props }: IInputForm) {
  return (
    <form className="flex min-w-40 min-h-11 w-full max-w-sm flex-1 bg-foreground rounded-lg border border-gray-400 dark:border-gray-800 ">
      <div className=" text-gray-400 flex items-center justify-center px-3 peer-focus:text-red-400! ">
        <IconSearch className="size-5" />
      </div>
      <input
        key={"searchInput"}
        className="peer form-input resize-none overflow-hidden focus:outline-0 focus:ring-2 focus:ring-primary border-none placeholder:text-gray-500 px-4 text-sm font-normal leading-normal focus:rounded-r-lg "
        type="text"
        placeholder="Input coin name..."
        value={value}
        onChange={onChange}
        {...props}
      />
    </form>
  );
}
