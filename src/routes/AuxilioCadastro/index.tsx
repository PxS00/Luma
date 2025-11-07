import EscolhaModoTabs from '@/components/ChooseModeTabs/ChooseModeTabs';
import DeskCadastro from '@/components/Tutorial/Cadastro/DeskCadastro';
import IntroCadastro from '@/components/Tutorial/Cadastro/IntroCadastro';
import MobileCadastro from '@/components/Tutorial/Cadastro/MobileCadastro';
import { useEffect } from 'react';

/**
 * Página de auxílio ao cadastro
 * Sistema de tabs para escolher entre tutorial do App ou Navegador
 * Inclui introdução e tutoriais específicos para cada plataforma
 */
export default function AuxilioCadastro() {
  useEffect(() => {
    document.title = 'Auxílio ao Cadastro';
  }, []);

  return (
    <main
      aria-label='Conteúdo principal de auxílio ao cadastro'
      className='w-full overflow-x-clip bg-backPrimary'
    >
      <div className='mx-auto w-full max-w-screen-lg px-5 py-5 flex flex-col items-center gap-5'>
        <IntroCadastro />

        <EscolhaModoTabs
          defaultMode='app'
          labelApp='Usar App'
          labelNav='Usar Navegador'
          app={<MobileCadastro />}
          nav={<DeskCadastro />}
          className='w-full'
          autoDetect
          hideControls
          unmountInactive
        />
      </div>
    </main>
  );
}
