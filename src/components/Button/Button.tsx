import type { ReactNode } from "react";

interface IButton {
  children: ReactNode;
}

export default function Button({ children, ...props }: IButton) {
  return (
    <button
      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary gap-2 text-sm font-bold leading-normal text-gray-800 dark:text-gray-100 tracking-[0.015em] hover:bg-primary/80 transition-colors "
      {...props}
    >
      {children}
    </button>
  );
}
