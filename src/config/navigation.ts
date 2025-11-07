/**
 * Configuração dos itens de navegação do header e footer
 * Define os menus principais e links externos da aplicação
 */
import type { NavItem } from '@/types/navigation';
import { MdAccountCircle } from 'react-icons/md';

export const HEADER_MENU: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Auxílio Teleconsulta', href: '/auxilio/teleconsulta' },
  { label: 'Auxílio Cadastro', href: '/auxilio/cadastro' },
  { label: 'Integrantes', href: '/integrantes' },
  { label: 'Contato', href: '/contato' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Lembrete', href: '/lembrete' },
  { label: 'Perfil', href: '/perfil', Icon: MdAccountCircle },
];

export const FOOTER_MENU: NavItem[] = [
  {
    label: 'Site Oficial IMREA',
    href: 'https://redelucymontoro.org.br/site/',
    external: true,
  },
];
