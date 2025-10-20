import FaceFramingTest from '@/components/Camera/FaceFraming';
import { useEffect } from 'react';

/** Página de teste de câmera e enquadramento. */
export default function CameraCheck() {
  useEffect(() => {
    document.title = 'Teste de Câmera e Enquadramento';
  }, []);

  return (
    <main aria-label='Página de teste de câmera' className='w-full bg-backPrimary'>
      <div className='mx-auto w-full max-w-screen-lg px-5 py-8 flex flex-col items-center gap-6'>
        <FaceFramingTest />
      </div>
    </main>
  );
}
