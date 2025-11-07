import EscolhaModoTabs from '@/components/ChooseModeTabs/ChooseModeTabs';
import { useEffect } from 'react';
import DeskTele from '../../components/Tutorial/Teleconsulta/DeskTele';
import IntroTele from '../../components/Tutorial/Teleconsulta/IntroTele';
import MobileTele from '../../components/Tutorial/Teleconsulta/MobileTele';

/**
 * Página de auxílio à teleconsulta
 * Sistema de tabs para escolher entre tutorial do App ou Navegador
 * Inclui introdução e tutoriais específicos para teleconsulta
 *
 * @example
 * // Uso em rotas (React Router)
 * <Route path="/auxilio-teleconsulta" element={<AuxilioTeleconsulta />} />
 */
export default function AuxilioTeleconsulta() {
  useEffect(() => {
    document.title = 'Auxílio à Teleconsulta';
  }, []);

  return (
    <main
      aria-label='Conteúdo principal de auxílio à teleconsulta'
      className='w-full overflow-x-clip bg-backPrimary'
    >
      {/* Container interno controla largura e padding */}
      <div className='mx-auto w-full max-w-screen-lg px-5 py-5 flex flex-col items-center gap-5'>
        <IntroTele />

        <EscolhaModoTabs
          defaultMode='app'
          labelApp='Usar App'
          labelNav='Usar Navegador'
          app={<MobileTele />}
          nav={<DeskTele />}
          className='w-full'
          autoDetect
          hideControls
          unmountInactive
        />
      </div>
    </main>
  );
}
