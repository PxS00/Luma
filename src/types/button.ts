/**
 * Types e interfaces para componentes de botão
 * Define props para todos os tipos de botões da aplicação
 */

import type { ReactNode } from 'react';

/**
 * Props base para botões da aplicação
 */
export interface ButtonBaseProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  'aria-label'?: string;
}

/**
 * Props para botões externos
 */
export interface BtnExternoProps extends ButtonBaseProps {
  href: string;
  target?: '_blank' | '_self';
}

/**
 * Props para botões internos (React Router)
 */
export interface BtnInternoProps extends ButtonBaseProps {
  to: string;
}

/**
 * Props para botões de ação
 */
export interface BtnAcaoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'icon' | 'dot';
  'aria-label'?: string;
}

/**
 * Props para botão de menu hambúrguer
 */
export interface BtnMenuProps {
  open: boolean;
  onClick: () => void;
}

/**
 * Props para botão de navegação
 */
export interface BtnNavProps {
  to: string;
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
  variant?: 'pill' | 'icon';
}

/**
 * Props para botão de pesquisa
 */
export interface BtnSearchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}
