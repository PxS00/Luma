import EscolhaModoTabs from '@/components/EscolhaModoTabs/EscolhaModoTabs';
import FormularioCadastro from '@/components/Formulario/FormCadastro';
import Login from '@/components/Formulario/FormLogin';
import { useEffect } from 'react';

export default function Formulario() {
  useEffect(() => {
    document.title = 'Formulário';
  }, []);

  return (
    <section className='w-full min-h-screen bg-gradient-to-b from-fromColor to-toColor flex justify-center items-start sm:items-center py-8 sm:py-12 '>
      <main className='w-full max-w-[600px] bg-backSecondary mx-auto p-6 rounded-[10px] shadow-[0_6px_20px_rgba(0,0,0,0.08)] '>
        <EscolhaModoTabs
          defaultMode='app'
          labelApp='Preencher Formulário'
          labelNav='Login'
          app={<FormularioCadastro />}
          nav={<Login />}
          className='w-full'
        />
      </main>
    </section>
  );
}
