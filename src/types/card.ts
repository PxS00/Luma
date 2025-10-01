/**
 * Types e interfaces para componentes de card
 * Define props para diferentes tipos de cards da aplicação
 */

/**
 * Props para cards de acesso rápido
 */
export interface AcessoCardProps {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
  href: string;
  external?: boolean;
}