export interface NavItem {
  label: string;
  href: string; //* aqui é a rota
  external?: boolean; //* true = link externo
}

export interface HomeCard extends NavItem {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
}

export const HEADER_MENU: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Auxílio Teleconsulta', href: '/teleconsulta' },
  { label: 'Auxílio Cadastro', href: '/cadastro' },
  { label: 'Integrantes', href: '/integrantes' },
  { label: 'Contato', href: '/contato' },
  { label: 'FAQ', href: '/faq' },
];

export const FOOTER_MENU: NavItem[] = [
  { label: 'Contato', href: '/contato' },
  { label: 'FAQ', href: '/faq' },
  {
    label: 'Site Oficial IMREA',
    href: 'https://redelucymontoro.org.br/site/',
    external: true,
  },
];
