import EscolhaModoTabs from '@/components/ChooseModeTabs/ChooseModeTabs';
import DeskCadastro from '@/components/Tutorial/Cadastro/DeskCadastro';
import IntroCadastro from '@/components/Tutorial/Cadastro/IntroCadastro';
import MobileCadastro from '@/components/Tutorial/Cadastro/MobileCadastro';
import { useEffect } from 'react';

/**
 * Página de auxílio ao cadastro
 * Sistema de tabs para escolher entre tutorial do App ou Navegador
 * Inclui introdução e tutoriais específicos para cada plataforma
 *
 * @example
 * // Uso em rotas (React Router)
 * <Route path="/auxilio-cadastro" element={<AuxilioCadastro />} />
 */
export default function AuxilioCadastro() {
  // Define o título da aba do navegador
  useEffect(() => {
    document.title = 'Auxílio ao Cadastro';
  }, []);
  return (
    <main
      className='flex flex-col justify-center items-center p-5 gap-5'
      aria-label='Conteúdo principal de auxílio ao cadastro'
    >
      <IntroCadastro />
      {/* Tabs para alternar entre tutorial do App e do Navegador */}
      <EscolhaModoTabs
        defaultMode='app'
        labelApp='Usar App'
        labelNav='Usar Navegador'
        app={<MobileCadastro />}
        nav={<DeskCadastro />}
        className='w-full'
      />
    </main>
  );
}
