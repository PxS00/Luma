import ContatoList from '@/components/Contato/ContatoList';
import { useEffect } from 'react';

/**
 * Página de contatos
 * Exibe informações de contato da instituição
 */
export default function Contato() {
  useEffect(() => {
    document.title = 'Contatos';
  }, []);
  return (
    <main className='ml-0 p-5 w-full flex-1'>
      <div className=' bg-backSecondary p-5 rounded-[10px] max-w-full m-auto shadow-[0_2px_6px_rgba(255,112,67,0.25)] box-border relative'>
        <h1 className='text-fontPrimary text-2xl mb-2.5 text-center'>Contatos</h1>
        <p className='text-base text-fontSecondary mb-5 text-center '>
          Este é um canal de diálogo entre a Instituição e o paciente, cuidador e família
        </p>
        <ContatoList />
      </div>
    </main>
  );
}
