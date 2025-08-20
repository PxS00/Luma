export interface MenuItem {
  label: string;
  href: string; // aqui é a rota
  external?: boolean; // true = link externo
}

export const MAIN_MENU: MenuItem[] = [
  { label: 'Auxílio Teleconsulta', href: '/teleconsulta' },
  { label: 'Auxílio Cadastro', href: '/cadastro' },
  { label: 'Integrantes', href: '/integrantes' },
  { label: 'Contato', href: '/contato' },
  { label: 'FAQ', href: '/faq' },
];

export const FOOTER_MENU: MenuItem[] = [
  { label: 'Contato', href: '/contato' },
  { label: 'FAQ', href: '/faq' },
  {
    label: 'Site Oficial IMREA',
    href: 'https://redelucymontoro.org.br/site/',
    external: true,
  },
];
