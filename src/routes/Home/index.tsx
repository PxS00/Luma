// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import BoasVindasSection from '@/components/HomeComponents/BoasVindasSection';
import AcessosSection from '@/components/HomeComponents/AcessoSection';
import DiagnosticoSection from '@/components/HomeComponents/DiagnosticoSection';

// Modal (stepper genérico)
import DiagnosticModal, { type DiagnosticStep } from '@/components/HomeComponents/DiagnosticoModal';

// Seus componentes de teste
import NetworkCheck from '@/components/Check/NetworkCheck';
import FaceCheck from '@/components/Check/FaceCheck';
import MicrophoneCheck from '@/components/Check/MicrophoneCheck';
import { FiWifi, FiCamera, FiMic } from 'react-icons/fi';

export default function Home() {
  const [openDiag, setOpenDiag] = useState(false);

  useEffect(() => {
    document.title = 'Início';
  }, []);

  const steps: DiagnosticStep[] = [
    { label: 'Rede',      icon: FiWifi,   element: <NetworkCheck /> },
    { label: 'Câmera',    icon: FiCamera, element: <FaceCheck /> },
    { label: 'Microfone', icon: FiMic,    element: <MicrophoneCheck /> },
  ];

  return (
    <main className="conteudo" aria-label="Conteúdo principal da página inicial">
      <BoasVindasSection />
      <AcessosSection />
      <DiagnosticoSection onOpen={() => setOpenDiag(true)} />
      <DiagnosticModal
        open={openDiag}
        onClose={() => setOpenDiag(false)}
        steps={steps}
        title="Diagnóstico de Dispositivos"
      />
    </main>
  );
}
