import BtnAcao from '@/components/Button/BtnAcao';
import { useTabs } from '@/hooks/useTabs';
import type { Modo } from '@/types/tabs';
import type { ReactNode } from 'react'; // <- IMPORTA O TIPO

type ChooseModeTabsProps = {
  app: ReactNode;                   // (usa ReactNode importado)
  nav: ReactNode;
  labelApp?: string;
  labelNav?: string;
  defaultMode?: Modo;
  idBase?: string;
  className?: string;
  unmountInactive?: boolean;
  onChangeMode?: (mode: Modo) => void; // <- tipado aqui
};

/**
 * Componente de tabs para escolher entre App e Navegador
 * Implementa padrão ARIA para acessibilidade com navegação por teclado
 */

export default function ChooseModeTabs({
  app,
  nav,
  labelApp = 'Use App',
  labelNav = 'Use Browser',
  defaultMode = 'app',
  idBase = 'mode',
  className = '',
  unmountInactive = false,
  onChangeMode, // <- PEGANDO A PROP AQUI
}: ChooseModeTabsProps) {
  const {
    setActiveTab,
    listRef,
    tabId,
    panelId,
    isActive,
    onKeyDown,
  } = useTabs({ defaultMode, idBase });

  return (
    <div className={className}>
      <div
        ref={listRef}
        role="tablist"
        aria-label="Escolha como quer cadastrar"
        onKeyDown={onKeyDown}
        className="flex flex-wrap justify-center gap-3"
      >
        {/* App */}
        <BtnAcao
          variant="primary"
          role="tab"
          id={tabId('app')}
          aria-selected={isActive('app')}
          aria-controls={panelId('app')}
          tabIndex={isActive('app') ? 0 : -1}
          onClick={() => {
            setActiveTab('app');
            onChangeMode?.('app'); // <- usa a prop daqui
          }}
          className={`rounded-xl border border-borderColor ${
            isActive('app')
              ? 'bg-backBtn text-white hover:bg-hoverBtn'
              : 'bg-navBtn text-fontTertiary hover:bg-navHoverBtn hover:text-white'
          }`}
        >
          {labelApp}
        </BtnAcao>

        {/* Navegador */}
        <BtnAcao
          variant="primary"
          role="tab"
          id={tabId('nav')}
          aria-selected={isActive('nav')}
          aria-controls={panelId('nav')}
          tabIndex={isActive('nav') ? 0 : -1}
          onClick={() => {
            setActiveTab('nav');
            onChangeMode?.('nav');
          }}
          className={`rounded-xl border border-borderColor ${
            isActive('nav')
              ? 'bg-backBtn text-white hover:bg-hoverBtn'
              : 'bg-navBtn text-fontTertiary hover:bg-navHoverBtn hover:text-white'
          }`}
        >
          {labelNav}
        </BtnAcao>
      </div>

      {unmountInactive ? (
        <>
          {isActive('app') && (
            <section
              id={panelId('app')}
              role="tabpanel"
              aria-labelledby={tabId('app')}
              className="w-full mt-2"
            >
              {app}
            </section>
          )}
          {isActive('nav') && (
            <section
              id={panelId('nav')}
              role="tabpanel"
              aria-labelledby={tabId('nav')}
              className="w-full mt-2"
            >
              {nav}
            </section>
          )}
        </>
      ) : (
        <>
          <section
            id={panelId('app')}
            role="tabpanel"
            aria-labelledby={tabId('app')}
            hidden={!isActive('app')}
            className="w-full mt-2"
          >
            {app}
          </section>

          <section
            id={panelId('nav')}
            role="tabpanel"
            aria-labelledby={tabId('nav')}
            hidden={!isActive('nav')}
            className="w-full mt-2"
          >
            {nav}
          </section>
        </>
      )}
    </div>
  );
}
