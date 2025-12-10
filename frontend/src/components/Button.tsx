'use client'

import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const variantStyles = {
  primary: 'bg-primary hover:bg-secondary text-white',
  secondary: 'bg-accent hover:bg-primary text-dark',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        rounded-lg font-semibold transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:shadow-lg active:scale-95
        ${className}
      `}
    >
      {children}
    </button>
  )
}
