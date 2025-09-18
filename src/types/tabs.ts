/**
 * Tipos e interfaces para controle de tabs acessíveis.
 */

/**
 * Tipo que representa os modos/tabs disponíveis.
 * 'app' para aplicativo, 'nav' para navegador.
 */
export type Modo = 'app' | 'nav';
/**
 * Propriedades aceitas pelo hook useTabs.
 * @property defaultMode - modo/tab inicial selecionado ('app' ou 'nav').
 * @property idBase - base para geração dos ids de acessibilidade.
 */
export interface UseTabsProps {
  defaultMode?: Modo;
  idBase?: string;
}

/**
 * Tipagem explícita do objeto retornado pelo hook useTabs.
 */
import type { KeyboardEvent, RefObject } from 'react';

export interface UseTabsReturn {
  activeTab: Modo;
  setActiveTab: (m: Modo) => void;
  listRef: RefObject<HTMLDivElement | null>;
  tabId: (mode: Modo) => string;
  panelId: (mode: Modo) => string;
  isActive: (mode: Modo) => boolean;
  onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
}
