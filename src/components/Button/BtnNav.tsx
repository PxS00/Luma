import type { BtnNavProps } from '@/types/button';
import { NavLink } from 'react-router-dom';

/**
 * Botão de navegação com estado ativo
 * Usado para links internos da aplicação
 */
export default function BtnNav({ to, children, className = '' }: BtnNavProps) {
  const base =
    'inline-block px-4 py-2 bg-white rounded-xl text-clikColor font-bold ' +
    'transition-colors transition-transform duration-300 ease-in-out ' +
    ' hover:scale-105';

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${base} ${className} ${isActive ? 'ring-2 ring-white/40' : ''}`}
    >
      {children}
    </NavLink>
  );
}
