import { useEffect } from 'react';
import FaqItem from '@/components/Faq/FaqItem';
import { faqData } from '@/data/faqData';

/**
 * Página de perguntas frequentes (FAQ)
 * Lista questões e respostas sobre o uso da plataforma
 */
export default function Faq() {
  useEffect(() => {
    document.title = 'Perguntas Frequentes';
  }, []);
  return (
    <main className='ml-0 p-5 w-full flex-1'>
      <div className=' bg-backSecondary p-5 rounded-[10px] max-w-full m-auto shadow-[0_2px_6px_rgba(255,112,67,0.25)] box-border relative'>
        <h1 className='text-fontPrimary text-2xl mb-2.5 text-center'>Perguntas Frequentes (FAQ)</h1>
        <p className='text-base text-fontSecondary mb-5 text-center'>
          Encontre respostas rápidas sobre o uso da plataforma de Saúde Digital.
        </p>
        <div className='mt-5'>
          {faqData.map((item, idx) => (
            <FaqItem key={idx} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
