import { type ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className,
  padding = 'md',
  hover = false,
  onClick,
}: CardProps) {
  const baseStyles = 'bg-white rounded-lg shadow-card';

  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  const interactiveStyles = onClick
    ? 'cursor-pointer transition-shadow hover:shadow-lg'
    : '';

  return (
    <div
      className={clsx(
        baseStyles,
        paddingStyles[padding],
        hover && 'hover:shadow-lg transition-shadow',
        interactiveStyles,
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
