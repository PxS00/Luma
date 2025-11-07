import type { IconType } from 'react-icons';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  Icon?: IconType;
}

export interface HomeCard extends NavItem {
  Icon: IconType;
  title: string;
  description: string;
  ctaLabel?: string;
}

export type CarouselOptions = {
  autoMs?: number;
  loop?: boolean;
};

export interface MainMenuProps {
  filter?: string;
  excludeHrefs?: string[]; // opcional: remover itens por href (ex.: esconder Perfil no mobile)
}
