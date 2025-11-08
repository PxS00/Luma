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
      className='mx-auto w-full max-w-screen-lg px-4 sm:px-5 lg:px-6 py-6 sm:py-8 lg:py-12'
      aria-label='Conteúdo principal de perguntas frequentes'
    >
      <div className='flex flex-col items-center text-center gap-4'>
        <div className='texto max-w-3xl'>
          <h1
            className='
              text-2xl sm:text-3xl md:text-4xl lg:text-4xl
              text-fontPrimary font-semibold mb-3
            '
          >
            Perguntas Frequentes (FAQ)
          </h1>

          <p
            className='
              text-fontTertiary
              text-base sm:text-lg md:text-lg lg:text-xl
              leading-relaxed mb-6
            '
          >
            Encontre respostas rápidas sobre o uso da plataforma de Saúde Digital.
          </p>
        </div>

        {/* Lista de perguntas e respostas do FAQ */}
        <div className='w-full mt-2'>
          {faqData.map((item, idx) => (
            <FaqItem key={idx} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
