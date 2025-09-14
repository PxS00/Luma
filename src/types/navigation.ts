/**
 * Item de navegação base
 * Usado em menus, links e componentes de navegação
 */
export interface NavItem {
  /** Texto exibido no link */
  label: string;
  /** URL ou rota de destino */
  href: string;
  /** Se true, abre em nova aba/janela */
  external?: boolean;
}

/**
 * Card da página inicial que estende NavItem
 * Usado para exibir cartões clicáveis com imagem e descrição
 */
export interface HomeCard extends NavItem {
  /** Caminho da imagem */
  imgSrc: string;
  /** Texto alternativo da imagem */
  imgAlt: string;
  /** Título do card */
  title: string;
  /** Descrição do card */
  description: string;
}

/**
 * Opções de configuração para carrosseis
 * Controla comportamento de autoplay e loop
 */
export type CarouselOptions = {
  /** Intervalo de autoplay em milissegundos. 0 = desabilitado */
  autoMs?: number;
  /** Se deve fazer loop infinito dos itens */
  loop?: boolean;
};
