import FaceCheck from '@/components/Check/FaceCheck';
import MicrophoneCheck from '@/components/Check/MicrophoneCheck';
import NetworkCheck from '@/components/Check/NetworkCheck';
import { useEffect } from 'react';

/** Página de teste de câmera, enquadramento, microfone e conexão de rede. */
export default function Checks() {
  useEffect(() => {
    document.title = 'Verificação Pré Teleconsulta- Luma';
  }, []);

  return (
    <main
      aria-label='Página de verificação de equipamentos para teleconsulta'
      className='w-full min-h-screen bg-backPrimary'
    >
      <div className='mx-auto w-full max-w-screen-lg px-5 py-8'>
        {/* Header da página */}
        <header className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-foreground mb-4'>Verificação Pré Teleconsulta</h1>
          <p className='text-lg text-foreground/70 max-w-2xl mx-auto'>
            Realize os testes abaixo para garantir que seu equipamento está adequado para a
            teleconsulta
          </p>
        </header>

        {/* Componentes de verificação */}
        <div className='flex flex-col items-center gap-12'>
          <NetworkCheck />
          <FaceCheck />
          <MicrophoneCheck />
        </div>
      </div>
    </main>
  );
}
