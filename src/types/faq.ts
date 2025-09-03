/**
 * Estrutura de dados para itens do FAQ
 * Usado para questões e respostas da página de perguntas frequentes
 */
export type FaqDados = {
  /** Pergunta do usuário */
  pergunta: string;
  /** Resposta da equipe */
  resposta: string;
  /** Link opcional para mais informações */
  link?: string;
};
