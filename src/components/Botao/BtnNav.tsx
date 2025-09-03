import { NavLink } from 'react-router-dom';

type BtnNavProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Botão de navegação com estado ativo
 * Usado para links internos da aplicação
 */
export default function BtnNav({ to, children, className = '' }: BtnNavProps) {
  const base =
    'inline-block px-4 py-2 bg-navBtn rounded-xl text-clikColor font-bold text-base no-underline ' +
    'transition-colors transition-transform duration-300 ease-in-out ' +
    'hover:bg-navHoverBtn hover:text-white hover:scale-105';

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${base} ${className} ${isActive ? 'ring-2 ring-white/40' : ''}`}
    >
      {children}
    </NavLink>
  );
}
