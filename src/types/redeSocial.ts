/**
 * Estrutura para links de redes sociais
 * Usado para exibir ícones clicáveis de LinkedIn, GitHub, etc.
 */
export type RedeSocial = {
  /** URL da rede social */
  href: string;
  /** Caminho do ícone */
  icon: string;
  /** Texto alternativo da imagem */
  alt: string;
};
