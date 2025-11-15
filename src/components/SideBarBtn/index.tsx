import { Link } from "@tanstack/react-router"
import type { ICustomButtonProps } from "./types"

export const SideBarBtn = ({ children, ...props }: ICustomButtonProps) => {

  return (
    <Link className={`flex flex-row gap-3 w-full px-3 py-2  hover:bg-primary/20 hover:text-primary rounded-lg items-center transition-colors text-gray-800 dark:text-gray-200 data-[status='active']:bg-primary/20 data-[status='active']:text-primary data-[status='active']:dark:text-primary" `} {...props} >
      {children}
    </Link>
  )
}