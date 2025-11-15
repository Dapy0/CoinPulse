import type { LinkProps } from "@tanstack/react-router"
import type { ReactNode } from "react"

export interface ICustomButtonProps extends LinkProps {
  children: ReactNode
  // variant?: 'primary' | 'secondary'
}