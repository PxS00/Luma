import ContatoList from '@/components/ContatoComponents/ContatoList';
import { useEffect } from 'react';

/**
 * Página de contatos
 */
export default function Contato() {
  useEffect(() => {
    document.title = 'Contatos';
  }, []);

  return (
    <main
      className='mx-auto w-full max-w-screen-lg px-4 sm:px-5 lg:px-6 py-6 sm:py-8 lg:py-12'
      aria-label='Conteúdo principal de contatos'
    >
      <div className='flex flex-col items-center text-center gap-4'>
        <div className='texto max-w-3xl'>
          <h1
            className='
              text-2xl sm:text-3xl md:text-4xl lg:text-4xl
              text-fontPrimary font-semibold mb-3
            '
          >
            Contatos
          </h1>

          <p
            className='
              text-fontTertiary
              text-base sm:text-lg md:text-lg lg:text-xl
              leading-relaxed mb-6
            '
          >
            Este é um canal de diálogo entre a Instituição e o paciente, cuidador e família
          </p>
        </div>

        {/* Lista de contatos da instituição */}
        <div className='w-full'>
          <ContatoList />
        </div>
      </div>
    </main>
  );
}
