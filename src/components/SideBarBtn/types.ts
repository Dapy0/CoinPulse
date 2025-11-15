import type { LinkProps } from "@tanstack/react-router"

export interface ICustomButtonProps extends LinkProps {
  // children: ReactNode
  variant?: 'primary' | 'secondary' 
}