import EscolhaModoTabs from '@/components/ChooseModeTabs/ChooseModeTabs';
import FormularioCadastro from '@/components/Form/FormCadastro';
import Login from '@/components/Form/FormLogin';
import { useEffect } from 'react';

/**
 * Página de formulário de cadastro e login
 * Permite alternar entre cadastro e login usando tabs
 *
 * @example
 * // Uso em rotas (React Router)
 * <Route path="/formulario" element={<Formulario />} />
 */
export default function Formulario() {
  useEffect(() => {
    document.title = 'Formulário';
  }, []);

  return (
    <section
      className='w-full min-h-screen bg-gradient-to-b from-fromColor to-toColor flex justify-center items-start sm:items-center py-8 sm:py-12'
      aria-label='Conteúdo principal de formulário'
    >
      <main className='w-full max-w-[600px] bg-backSecondary mx-auto p-6 rounded-[10px] shadow-[0_6px_20px_rgba(0,0,0,0.08)]'>
        {/* Tabs para alternar entre cadastro e login */}
        <EscolhaModoTabs
          defaultMode='app'
          labelApp='Cadastro'
          labelNav='Login'
          app={<FormularioCadastro />}
          nav={<Login />}
          className='w-full'
        />
      </main>
    </section>
  );
}
