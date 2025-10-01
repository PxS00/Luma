/**
 * Types e interfaces para componentes de carrossel
 * Define APIs e props para carrosseis e seus controles
 */

import type { ReactNode } from 'react';
import type { TutorialStepData } from './tutorialStep';

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
 * Props para carrossel de tutorial
 */
export interface TutorialCarouselProps {
  steps: TutorialStepData[];
  title?: string;
  autoMs?: number | null;
  className?: string;
  /** classes aplicadas ao viewport (área do slide, relative) */
  contentClassName?: string;
  /** classes extras para a <img> do TutorialStep */
  imgClassName?: string;
  /** mostra/oculta setas e indicadores */
  showControls?: boolean;
  showIndicators?: boolean;
}