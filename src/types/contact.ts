/**
 * Estrutura de dados para informações de contato
 * Usado na página de contatos para exibir informações da instituição
 */
export type Contact = {
  /** Título/nome do contato */
  title: string;
  /** Endereço para atendimento presencial (opcional) */
  inPerson?: string;
  /** Email de contato (opcional) */
  email?: string;
  /** Telefone de contato (opcional) */
  tel?: string;
  /** Horário de funcionamento (opcional) */
  schedule?: string;
  /** Link externo com rótulo personalizado (opcional) */
  externalLink?: { href: string; label: string };
};

/**
 * Props para item de contato
 */
export interface ContatoItemProps {
  item: Contact;
}
