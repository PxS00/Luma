import FaqItem from '@/components/Faq/FaqItem';
import { faqData } from '@/data/faqData';
import { useEffect } from 'react';

/**
 * Página de perguntas frequentes (FAQ)
 * Lista questões e respostas sobre o uso da plataforma
 *
 * @example
 * // Uso em rotas (React Router)
 * <Route path="/faq" element={<Faq />} />
 */
export default function Faq() {
  useEffect(() => {
    document.title = 'Perguntas Frequentes';
  }, []);
  return (
    <main
      className='mx-auto w-full max-w-screen-lg px-6 sm:px-8 lg:px-10 xl:px-12 p-4'
      aria-label='Conteúdo principal de contatos'
    >
      {/* mesmo container do Header: centralizado e limitado */}
      <div className='mx-auto w-full max-w-screen-xl'>
        <div
          className='
            bg-backSecondary box-border relative m-auto
            /* tamanho/respiro da caixa por breakpoint */
            rounded-md sm:rounded-lg md:rounded-xl
            shadow-sm md:shadow-md
            p-3 sm:p-4 md:p-5 lg:p-6
          '
        >
          <h1
            className='
              text-fontPrimary text-xl sm:text-2xl md:text-3xl
              mb-2 sm:mb-3 md:mb-4 text-center
            '
          >
            Perguntas Frequentes (FAQ)
          </h1>

          <p
            className='
              text-fontSecondary text-sm sm:text-base md:text-[17px]
              leading-relaxed text-center mb-4 sm:mb-5 md:mb-6
            '
          >
            Encontre respostas rápidas sobre o uso da plataforma de Saúde Digital.
          </p>
          {/* Lista de perguntas e respostas do FAQ */}
          <div className='mt-5'>
            {faqData.map((item, idx) => (
              <FaqItem key={idx} item={item} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
