/**
 * Estrutura de dados para informações de contato
 * Usado na página de contatos para exibir informações da instituição
 */
export type Contato = {
  /** Título/nome do contato */
  title: string;
  /** Endereço para atendimento presencial (opcional) */
  presencial?: string;
  /** Email de contato (opcional) */
  email?: string;
  /** Telefone de contato (opcional) */
  tel?: string;
  /** Horário de funcionamento (opcional) */
  funcionamento?: string;
  /** Link externo com rótulo personalizado (opcional) */
  linkExterno?: { href: string; rotulo: string };
};
