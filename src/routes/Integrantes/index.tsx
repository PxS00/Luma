import CarrosselIntegrantes from '@/components/IntegrantesComponents/CarrosselIntegrantes';
import { members } from '@/data/membersData';
import { useEffect } from 'react';

/**
 * Página dos integrantes da equipe
 * Exibe carrossel com informações de todos os membros
 */
export default function Integrantes() {
  useEffect(() => {
    document.title = 'Integrantes';
  }, []);
  return (
    <main className='container mx-auto px-4 py-8' aria-label='Conteúdo principal dos integrantes'>
      <CarrosselIntegrantes members={members} autoMs={8000} showControls showIndicators />
    </main>
  );
}
