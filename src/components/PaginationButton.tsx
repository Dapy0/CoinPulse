import { Link, type LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";

type PaginationButtonProps = LinkProps & {
  children: ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
};

export function PaginationButton({ isActive, isDisabled, ...props }: PaginationButtonProps) {
  return (
    <Link
      {...props}
      disabled={isDisabled}
      className={`flex items-center justify-center size-9 rounded-lg text-sm font-medium transition-colors
        ${isActive ? "bg-primary text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700"}
        ${isDisabled ? "pointer-events-none text-gray-400" : "text-gray-700 dark:text-gray-300"}`}
    />
  );
}
