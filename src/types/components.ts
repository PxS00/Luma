/**
 * Types e interfaces para componentes da aplicação
 * Centraliza definições de props para componentes reutilizáveis
 */

import type { ReactNode } from 'react';

/**
 * Props base para botões da aplicação
 */
export interface ButtonBaseProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  'aria-label'?: string;
}

/**
 * Props para botões externos
 */
export interface BtnExternoProps extends ButtonBaseProps {
  href: string;
  target?: '_blank' | '_self';
}

/**
 * Props para botões internos (React Router)
 */
export interface BtnInternoProps extends ButtonBaseProps {
  to: string;
}

/**
 * Props para botões de ação
 */
export interface BtnAcaoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'icon' | 'dot';
  'aria-label'?: string;
}

/**
 * Props para componentes de seção expansível
 */
export interface ToggleSectionProps {
  title: string;
  children: ReactNode;
}

/**
 * Props para carrossel base
 */
export interface CarrosselBaseProps {
  total: number;
  startIndex?: number;
  autoMs?: number | null;
  className?: string;
  viewportClassName?: string;
  onChangeIndex?: (index: number) => void;
  renderItem: (index: number) => ReactNode;
  renderControls?: (api: ControlsAPI) => ReactNode;
  renderIndicators?: (api: IndicatorsAPI) => ReactNode;
}

/**
 * API de controles para carrossel
 */
export interface ControlsAPI {
  prev: () => void;
  next: () => void;
  index: number;
  total: number;
}

/**
 * API de indicadores para carrossel
 */
export interface IndicatorsAPI {
  goTo: (index: number) => void;
  index: number;
  total: number;
}

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
 * Props para componentes de tutorial
 */
export interface TutorialSectionProps {
  title: string;
  description: string;
  actionButton?: {
    href: string;
    label: string;
    external?: boolean;
  };
  customActionButton?: ReactNode;
  tutorialTitle: string;
  steps: Array<{
    img: string;
    alt: string;
    title?: string;
    actionButton?: {
      href: string;
      label: string;
      external?: boolean;
    };
  }>;
  className?: string;
  imgClassName?: string;
}

/**
 * Props para passos de tutorial
 */
export interface TutorialStepProps {
  step: {
    img: string;
    alt: string;
    title?: string;
    actionButton?: {
      href: string;
      label: string;
      external?: boolean;
    };
  };
  stepNumber: number;
  imgClassName?: string;
}

/**
 * Props para carrossel de tutorial
 */
export interface TutorialCarouselProps {
  steps: Array<{
    img: string;
    alt: string;
    title?: string;
  }>;
  title?: string;
  autoMs?: number | null;
  className?: string;
  contentClassName?: string;
  imgClassName?: string;
  showControls?: boolean;
  showIndicators?: boolean;
}

/**
 * Props para seção de introdução
 */
export interface IntroSectionProps {
  type: 'Cadastro' | 'Teleconsulta';
  description?: string;
}

/**
 * Props para componentes de menu
 */
export interface MainMenuProps {
  filter?: string;
}

/**
 * Props para componentes de tabs
 */
export interface ChooseModeTabsProps {
  app: ReactNode;
  nav: ReactNode;
  labelApp?: string;
  labelNav?: string;
  defaultMode?: 'app' | 'nav';
  idBase?: string;
  className?: string;
  unmountInactive?: boolean;
  onChangeMode?: (mode: 'app' | 'nav') => void;
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
