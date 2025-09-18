import EscolhaModoTabs from '@/components/EscolhaModoTabs/EscolhaModoTabs';
import { useEffect } from 'react';
import DeskTele from '../../components/Tutorial/Teleconsulta/DeskTele';
import IntroTele from '../../components/Tutorial/Teleconsulta/IntroTele';
import MobileTele from '../../components/Tutorial/Teleconsulta/MobileTele';

/**
 * Página de auxílio à teleconsulta
 * Sistema de tabs para escolher entre tutorial do App ou Navegador
 * Inclui introdução e tutoriais específicos para teleconsulta
 */
export default function AuxilioTeleconsulta() {
  useEffect(() => {
    document.title = 'Auxílio à Teleconsulta';
  }, []);
  return (
    <main className='flex flex-col justify-center items-center p-5 gap-5'>
      <IntroTele />

      <EscolhaModoTabs
        defaultMode='app'
        labelApp='Usar App'
        labelNav='Usar Navegador'
        app={<MobileTele />}
        nav={<DeskTele />}
        className='w-full'
      />
    </main>
  );
}
