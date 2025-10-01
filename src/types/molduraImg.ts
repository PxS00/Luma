/**
 * Propriedades do componente MolduraImg
 * Define os parâmetros para exibir imagens com moldura responsiva
 */
export type MolduraImgProps = {
  /** Caminho da imagem principal */
  src: string;
  /** Texto alternativo da imagem (opcional) */
  alt?: string;
  /** Caminho da moldura para dispositivos móveis */
  frameSrcMobile: string;
  /** Caminho da moldura para desktop */
  frameSrcDesktop: string;
  /** Classes CSS adicionais (opcional) */
  className?: string;
  /** Proporção da imagem, ex: "aspect-video" ou "aspect-[9/16]" (opcional) */
  aspect?: string;
};
