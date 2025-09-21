import CarrosselIntegrantes from '@/components/Integrantes/CarrosselIntegrantes';
import { members } from '@/data/membersData';
import { useEffect } from 'react';

/**
 * Página dos integrantes da equipe
 * Exibe carrossel com informações de todos os membros
 *
 * @example
 * // Uso em rotas (React Router)
 * <Route path="/integrantes" element={<Integrantes />} />
 */
export default function Integrantes() {
  useEffect(() => {
    document.title = 'Integrantes';
  }, []);
  return (
    <main className='container mx-auto px-4 py-8' aria-label='Conteúdo principal dos integrantes'>
      {/* Carrossel com informações dos membros da equipe */}
      <CarrosselIntegrantes members={members} autoMs={8000} showControls showIndicators />
    </main>
  );
}
