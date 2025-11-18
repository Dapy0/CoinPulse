import { Link, type LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";

export interface ICustomButtonProps extends LinkProps {
  children: ReactNode;
  expanded: boolean
}

export const SideBarBtn = ({ children, expanded, ...props }: ICustomButtonProps) => {
  return (
    <Link
      className={`flex flex-row gap-3 w-full px-3 py-2  hover:bg-primary/20 hover:text-primary rounded-lg items-center transition-colors text-gray-800 dark:text-gray-200 data-[status='active']:bg-primary/20 data-[status='active']:text-primary data-[status='active']:dark:text-primary" `}
      {...props}
    >
      {expanded ? children : ((children as string).length > 1 && children[0])}
    </Link>
  );
};
