import { Link } from "@tanstack/react-router"
import type { ICustomButtonProps } from "./types"

export const SideBarBtn = ({ ...props }: ICustomButtonProps) => {

  return (
    <Link {...props}>
      <button></button>
    </Link>
  )
}