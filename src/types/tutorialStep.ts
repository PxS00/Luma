/**
 * Representa um passo no tutorial step-by-step
 * Usado nos carrosseis de tutorial de cadastro e teleconsulta
 */
export type TutorialStepData = {
  /** Caminho da imagem do passo */
  img: string;
  /** Texto alternativo da imagem */
  alt: string;
  /** Título do passo (opcional) */
  title?: string;
  /** Descrição detalhada do passo (opcional) */
  description?: string;
 actionButton?: {
    href: string;
    label: string;
    external?: boolean;
  };
};
