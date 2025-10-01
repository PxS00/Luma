/**
 * Dados de um membro da equipe
 * Usado para exibir informações da equipe na página de integrantes
 */
export type Member = {
  /** Nome completo do membro */
  name: string;
  /** Registro de matrícula */
  rm: string;
  /** Caminho para foto do membro */
  img: string;
  /** Turma/classe do membro */
  class: string;
  /** Breve descrição sobre o membro */
  description: string;
  /** URL do perfil no LinkedIn (opcional) */
  linkedin?: string;
  /** URL do perfil no GitHub (opcional) */
  github?: string;
};

/**
 * Props para carrossel de integrantes (versão flexível)
 */
export interface CarrosselIntegrantesProps {
  members: Array<{
    name: string;
    rm: string;
    class?: string;
    img: string;
    description?: string;
    linkedin?: string;
    github?: string;
  }>;
  title?: string;
  showControls?: boolean;
  showIndicators?: boolean;
  className?: string;
  autoMs?: number;
}

/**
 * Props para cards de membro (versão flexível)
 */
export interface MembroCardProps {
  member: {
    name: string;
    rm: string;
    class?: string;
    img: string;
    description?: string;
    linkedin?: string;
    github?: string;
  };
  className?: string;
}

/**
 * Props para avatar de membro
 */
export interface MembroAvatarProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Props para componentes de redes sociais
 */
export interface MembrosSocialProps {
  socials: Array<{
    href: string;
    alt: string;
    icon: string;
  }>;
}
