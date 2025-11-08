import BtnAcao from '@/components/Button/BtnAcao';
import { useTabs } from '@/hooks/useTabs';
import type { ChooseModeTabsProps } from '@/types/tabs';

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
  onChangeMode,
  autoDetect = true,
  hideControls = false,
}: ChooseModeTabsProps) {
  const { setActiveTab, listRef, tabId, panelId, isActive, onKeyDown } = useTabs({
    defaultMode,
    idBase,
    autoDetect,
  });

  return (
    <div className={className}>
      {!hideControls && (
        <div
          ref={listRef}
          role='tablist'
          aria-label='Escolha como quer cadastrar'
          onKeyDown={onKeyDown}
          className='flex flex-wrap justify-center gap-3 mb-4'
        >
          {/* App */}
          <BtnAcao
            variant='primary'
            role='tab'
            id={tabId('app')}
            aria-selected={isActive('app')}
            aria-controls={panelId('app')}
            tabIndex={isActive('app') ? 0 : -1}
            onClick={() => {
              setActiveTab('app');
              onChangeMode?.('app');
            }}
            className={`rounded-xl border-2 font-bold ${
              isActive('app')
                ? 'bg-backBtn text-white border-backBtn hover:bg-hoverBtn'
                : 'bg-gray-200 text-gray-700 border-gray-400 hover:bg-gray-300'
            }`}
          >
            {labelApp}
          </BtnAcao>

          {/* Navegador */}
          <BtnAcao
            variant='primary'
            role='tab'
            id={tabId('nav')}
            aria-selected={isActive('nav')}
            aria-controls={panelId('nav')}
            tabIndex={isActive('nav') ? 0 : -1}
            onClick={() => {
              setActiveTab('nav');
              onChangeMode?.('nav');
            }}
            className={`rounded-xl border-2 font-bold ${
              isActive('nav')
                ? 'bg-backBtn text-white border-backBtn hover:bg-hoverBtn'
                : 'bg-gray-200 text-gray-700 border-gray-400 hover:bg-gray-300'
            }`}
          >
            {labelNav}
          </BtnAcao>
        </div>
      )}

      {unmountInactive ? (
        <>
          {isActive('app') && (
            <section
              id={panelId('app')}
              role='tabpanel'
              aria-labelledby={tabId('app')}
              className='w-full'
            >
              {app}
            </section>
          )}
          {isActive('nav') && (
            <section
              id={panelId('nav')}
              role='tabpanel'
              aria-labelledby={tabId('nav')}
              className='w-full'
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
            className='w-full'
          >
            {app}
          </section>

          <section
            id={panelId('nav')}
            role='tabpanel'
            aria-labelledby={tabId('nav')}
            hidden={!isActive('nav')}
            className='w-full'
          >
            {nav}
          </section>
        </>
      )}
    </div>
  );
}
