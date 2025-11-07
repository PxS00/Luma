import type { BtnNavProps } from '@/types/button';
import { NavLink } from 'react-router-dom';

/**
 * Botão de navegação com estado ativo
 * Usado para links internos da aplicação
 */
export default function BtnNav({ to, children, className = '', 'aria-label': ariaLabel, variant = 'pill' }: BtnNavProps) {
  const base =
    variant === 'icon'
      ? [
          'inline-flex items-center justify-center',
          'h-10 w-10 md:h-11 md:w-11',
          'rounded-full',
          'leading-none',
          'text-fontPrimary hover:text-red-600',
          'transition-colors duration-200',
          'hover:bg-white/10',
        ].join(' ')
      : [
          'inline-block px-4 py-2',
          'bg-white rounded-xl text-clikColor font-bold',
          'transition-colors transition-transform duration-300 ease-in-out',
          'hover:scale-105',
        ].join(' ');

  return (
    <NavLink
      to={to}
      aria-label={ariaLabel}
      className={`${base} ${className}`}
    >
      {children}
    </NavLink>
  );
}
