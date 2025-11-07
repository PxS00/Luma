/**
 * Types e interfaces para componentes de card
 * Define props para diferentes tipos de cards da aplicação
 */

/**
 * Props para cards de acesso rápido
 */
import type { IconType } from 'react-icons';

export interface AcessoCardProps {
  Icon: IconType;
  title: string;
  description: string;
  href: string;
  external?: boolean;
  ctaLabel?: string;
}
