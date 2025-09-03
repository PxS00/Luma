import EscolhaModoTabs from '@/components/EscolhaModoTabs/EscolhaModoTabs';
import DeskTele from '../../components/Tutorial/teleconsulta/DeskTele';
import IntroTele from '../../components/Tutorial/teleconsulta/Intro';
import MobileTele from '../../components/Tutorial/teleconsulta/MobileTele';

/**
 * Página de auxílio à teleconsulta
 * Sistema de tabs para escolher entre tutorial do App ou Navegador
 * Inclui introdução e tutoriais específicos para teleconsulta
 */
export default function AuxilioTeleconsulta() {
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
