import type { Modo, UseTabsProps, UseTabsReturn } from '@/types/tabs';
import type { KeyboardEvent } from 'react';
import { useRef, useState } from 'react';

/**
 * Hook React para controle de tabs acessíveis (SPA).
 * Fornece estado, refs, navegação por teclado e utilitários para tabs.
 *
 * @param {UseTabsProps} props - Propriedades opcionais para configuração do hook.
 * @returns {UseTabsReturn} - Estado e handlers para tabs acessíveis.
 */
export function useTabs({
  defaultMode = 'app',
  idBase = 'modo',
}: UseTabsProps = {}): UseTabsReturn {
  // Estado da tab ativa
  const [activeTab, setActiveTab] = useState<Modo>(defaultMode);
  // Ref para o container da lista de tabs (usado para navegação por teclado)
  const listRef = useRef<HTMLDivElement>(null);

  /**
   * Gera o id do botão da tab para acessibilidade.
   */
  const tabId = (mode: Modo) => `${idBase}-tab-${mode}`;
  /**
   * Gera o id do painel da tab para acessibilidade.
   */
  const panelId = (mode: Modo) => `${idBase}-panel-${mode}`;
  /**
   * Retorna se a tab está ativa.
   */
  const isActive = (mode: Modo) => activeTab === mode;

  /**
   * Handler para navegação por teclado entre tabs (setas, Home, End).
   * Mantém acessibilidade e usabilidade.
   */
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const el = listRef.current;
    if (!el) return;
    const tabs = Array.from(el.querySelectorAll<HTMLElement>('[role="tab"]'));
    const current = document.activeElement as HTMLElement | null;
    const idx = tabs.findIndex((t) => t === current);
    if (idx === -1) return;

    // Função auxiliar para ativar e focar a tab pelo índice
    const go = (i: number) => {
      const btn = tabs[i];
      // Determina o modo/tab pelo id do botão
      if (btn?.id.endsWith('-app')) {
        setActiveTab('app');
      } else {
        setActiveTab('nav');
      }
      btn?.focus();
    };

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      go((idx + 1) % tabs.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      go((idx - 1 + tabs.length) % tabs.length);
    } else if (e.key === 'Home') {
      e.preventDefault();
      go(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      go(tabs.length - 1);
    }
  };

  // Tipagem explícita do retorno do hook
  return {
    activeTab,
    setActiveTab,
    listRef,
    tabId,
    panelId,
    isActive,
    onKeyDown,
  };
}
