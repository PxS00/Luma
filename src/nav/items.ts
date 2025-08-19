export interface MenuItemDef {
  label: string;
  href: string;
  external?: boolean;
}

export const MAIN_MENU: MenuItemDef[] = [
  { label: 'Auxílio Teleconsulta', href: '/assets/auxilio/teleconsulta.html' },
  { label: 'Auxílio Cadastro', href: '/assets/auxilio/cadastro.html' },
  { label: 'Integrantes', href: '/assets/integrantes/integrantes.html' },
  { label: 'Contato', href: '/assets/contato/contato.html' },
  { label: 'FAQ', href: '/assets/faq/faq.html' },
];

export const FOOTER_MENU: MenuItemDef[] = [
  { label: 'Contato', href: '/assets/contato/contato.html' },
  { label: 'FAQ', href: '/assets/faq/faq.html' },
  { label: 'Site Oficial IMREA', href: 'https://redelucymontoro.org.br/site/', external: true },
];
