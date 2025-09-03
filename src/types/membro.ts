/**
 * Dados de um membro da equipe
 * Usado para exibir informações da equipe na página de integrantes
 */
export type Membro = {
  /** Nome completo do membro */
  nome: string;
  /** Registro de matrícula */
  rm: string;
  /** Caminho para foto do membro */
  img: string;
  /** Turma/classe do membro */
  turma: string;
  /** Breve descrição sobre o membro */
  descricao: string;
  /** URL do perfil no LinkedIn (opcional) */
  linkedin?: string;
  /** URL do perfil no GitHub (opcional) */
  github?: string;
};
