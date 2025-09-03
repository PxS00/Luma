import { useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';

import BtnAcao from '@/components/Botao/BtnAcao';

type Modo = 'app' | 'nav';

type EscolhaModoTabsProps = {
  app: React.ReactNode; // conteúdo do painel "App"
  nav: React.ReactNode; // conteúdo do painel "Navegador"
  labelApp?: string; // rótulo do botão App
  labelNav?: string; // rótulo do botão Navegador
  defaultMode?: Modo; // modo inicial (default: 'app')
  idBase?: string; // base para ids/aria (default: 'modo')
  className?: string; // classes extras no wrapper
  unmountInactive?: boolean; // se true, desmonta o painel inativo
};

/**
 * Componente de abas para escolha entre App e Navegador
 * Sistema completo de tabs com acessibilidade (WAI-ARIA)
 * Suporta navegação por teclado e controle de foco
 * Usado nas páginas de tutorial para alternar entre modos
 */
export default function EscolhaModoTabs({
  app,
  nav,
  labelApp = 'Usar App',
  labelNav = 'Usar Navegador',
  defaultMode = 'app',
  idBase = 'modo',
  className,
  unmountInactive = false,
}: EscolhaModoTabsProps) {
  const [mode, setMode] = useState<Modo>(defaultMode);
  const listRef = useRef<HTMLDivElement | null>(null);

  const tabId = (m: Modo) => `${idBase}-tab-${m}`;
  const panelId = (m: Modo) => `${idBase}-panel-${m}`;
  const isActive = (m: Modo) => mode === m;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const el = listRef.current;
    if (!el) return;
    const tabs = Array.from(el.querySelectorAll<HTMLElement>('[role="tab"]'));
    const current = document.activeElement as HTMLElement | null;
    const idx = tabs.findIndex((t) => t === current);
    if (idx === -1) return;

    const go = (i: number) => {
      const btn = tabs[i];
      const nextIsApp = btn?.id.endsWith('-app');
      setMode(nextIsApp ? 'app' : 'nav');
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

  return (
    <div className={className}>
      {/* TABLIST */}
      <div
        ref={listRef}
        role='tablist'
        aria-label='Escolha como quer cadastrar'
        onKeyDown={onKeyDown}
        className='flex flex-wrap justify-center gap-3'
      >
        <BtnAcao
          variant='primary'
          role='tab'
          id={tabId('app')}
          aria-selected={isActive('app')}
          aria-controls={panelId('app')}
          tabIndex={isActive('app') ? 0 : -1}
          onClick={() => setMode('app')}
          className={`rounded-xl border border-borderColor ${
            isActive('app')
              ? 'bg-backBtn text-white hover:bg-hoverBtn'
              : 'bg-navBtn text-fontTertiary hover:bg-navHoverBtn hover:text-white'
          }`}
        >
          {labelApp}
        </BtnAcao>

        <BtnAcao
          variant='primary'
          role='tab'
          id={tabId('nav')}
          aria-selected={isActive('nav')}
          aria-controls={panelId('nav')}
          tabIndex={isActive('nav') ? 0 : -1}
          onClick={() => setMode('nav')}
          className={`rounded-xl border border-borderColor ${
            isActive('nav')
              ? 'bg-backBtn text-white hover:bg-hoverBtn'
              : 'bg-navBtn text-fontTertiary hover:bg-navHoverBtn hover:text-white'
          }`}
        >
          {labelNav}
        </BtnAcao>
      </div>

      {/* PAINÉIS */}
      {unmountInactive ? (
        <>
          {isActive('app') && (
            <section
              id={panelId('app')}
              role='tabpanel'
              aria-labelledby={tabId('app')}
              className='w-full mt-2'
            >
              {app}
            </section>
          )}
          {isActive('nav') && (
            <section
              id={panelId('nav')}
              role='tabpanel'
              aria-labelledby={tabId('nav')}
              className='w-full mt-2'
            >
              {nav}
            </section>
          )}
        </>
      ) : (
        <>
          <section
            id={panelId('app')}
            role='tabpanel'
            aria-labelledby={tabId('app')}
            hidden={!isActive('app')}
            className='w-full mt-2'
          >
            {app}
          </section>

          <section
            id={panelId('nav')}
            role='tabpanel'
            aria-labelledby={tabId('nav')}
            hidden={!isActive('nav')}
            className='w-full mt-2'
          >
            {nav}
          </section>
        </>
      )}
    </div>
  );
}
