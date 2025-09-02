import MobileTele from '../../components/teleconsulta/MobileTele';
import DeskTele from '../../components/teleconsulta/DeskTele';
import IntroTele from '../../components/teleconsulta/Intro';
import EscolhaModoTabs from '@/components/EscolhaModoTabs/EscolhaModoTabs';

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
