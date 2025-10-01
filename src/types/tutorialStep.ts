import type { NavItem } from './navigation';
import type { CarouselOptions } from './navigation';
import type { ReactNode } from 'react';

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
  /** Botão de ação opcional que reutiliza o tipo NavItem */
  actionButton?: Pick<NavItem, 'href' | 'label' | 'external'>;
};

/**
 * Props para componentes de tutorial
 */
export interface TutorialSectionProps {
  title: string;
  description: string;
  actionButton?: { href: string; label: string; external?: boolean };
  customActionButton?: ReactNode;
  tutorialTitle: string;
  steps: TutorialStepData[];
  carouselOptions?: CarouselOptions;
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
 * Props para seção de introdução
 */
export interface IntroSectionProps {
  type: 'Cadastro' | 'Teleconsulta';
  description?: string;
}
