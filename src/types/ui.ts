/**
 * Types e interfaces para componentes de UI genéricos
 * Elementos de interface reutilizáveis
 */

import type { ReactNode } from 'react';

/**
 * Props para componentes de seção expansível
 */
export interface ToggleSectionProps {
  title: string;
  children: ReactNode;
}