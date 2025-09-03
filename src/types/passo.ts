/**
 * Representa um passo no tutorial step-by-step
 * Usado nos carrosseis de tutorial de cadastro e teleconsulta
 */
export type Passo = {
  /** Caminho da imagem do passo */
  img: string;
  /** Texto alternativo da imagem */
  alt: string;
  /** Título do passo (opcional) */
  titulo?: string;
  /** Descrição detalhada do passo (opcional) */
  descricao?: string;
};
