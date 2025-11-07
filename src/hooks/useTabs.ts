import type { Modo, UseTabsProps, UseTabsReturn } from '@/types/tabs';
import type { KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

/**
 * Fornece estado, refs, navegação por teclado e utilitários para tabs acessíveis.
 * Ideal para componentes de navegação por abas (tabs) com foco em acessibilidade.
 *
 * @param {UseTabsProps} props - Propriedades opcionais para configuração do hook.
 *   - defaultMode: modo/tab inicial selecionado ('app' ou 'nav').
 *   - idBase: base para geração dos ids de acessibilidade.
 * @returns {UseTabsReturn} - Estado e handlers para tabs acessíveis:
 *   - setActiveTab: função para trocar a tab ativa
 *   - listRef: ref para o container da lista de tabs
 *   - tabId: função utilitária para gerar id da tab
 *   - panelId: função utilitária para gerar id do painel
 *   - isActive: função para verificar se a tab está ativa
 *   - onKeyDown: handler para navegação por teclado
 *
 * @example
 * // Exemplo de uso:
 * const tabs = useTabs({ defaultMode: 'app', idBase: 'tutorial' });
 * <div ref={tabs.listRef} role="tablist" onKeyDown={tabs.onKeyDown}>
 *   <button id={tabs.tabId('app')} role="tab" aria-selected={tabs.isActive('app')}>App</button>
 *   <button id={tabs.tabId('nav')} role="tab" aria-selected={tabs.isActive('nav')}>Navegador</button>
 * </div>
 * <div id={tabs.panelId('app')} role="tabpanel" hidden={!tabs.isActive('app')}>Conteúdo App</div>
 * <div id={tabs.panelId('nav')} role="tabpanel" hidden={!tabs.isActive('nav')}>Conteúdo Navegador</div>
 *
 * // Observação: sempre utilize roles e atributos ARIA para garantir acessibilidade total.
 */
export function useTabs({
  defaultMode = 'app',
  idBase = 'modo',
  autoDetect = false,
}: UseTabsProps = {}): UseTabsReturn {
  // Estado da tab ativa
  const [activeTab, setActiveTab] = useState<Modo>(defaultMode);

  // Efeito opcional para detectar mobile/desktop e ajustar o modo automaticamente
  useEffect(() => {
    if (!autoDetect) return; // respeita defaultMode quando autoDetect=false

    const isMobile = () => window.innerWidth <= 991;
    const handleResize = () => {
      setActiveTab(isMobile() ? 'app' : 'nav');
    };

    // Define modo inicial apenas quando autoDetect está ativo
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [autoDetect]);
  // Ref para o container da lista de tabs (usado para navegação por teclado)
  const listRef = useRef<HTMLDivElement>(null);

  // Gera o id do botão da tab para acessibilidade
  const tabId = (mode: Modo) => `${idBase}-tab-${mode}`;
  // Gera o id do painel da tab para acessibilidade
  const panelId = (mode: Modo) => `${idBase}-panel-${mode}`;
  // Retorna se a tab está ativa
  const isActive = (mode: Modo) => activeTab === mode;

  // Handler para navegação por teclado entre tabs (setas, Home, End)
  // Mantém acessibilidade e usabilidade
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

  // Retorno do hook
  return {
    setActiveTab,
    listRef,
    tabId,
    panelId,
    isActive,
    onKeyDown,
  };
}
