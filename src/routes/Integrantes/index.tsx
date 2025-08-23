import { membros } from '@/data/membrosDados';
import CarrosselIntegrantes from '@components/integrantes/CarrosselIntegrantes';

export default function IntegrantesPage() {
  return (
    <main className='container mx-auto px-4 py-8'>
      <CarrosselIntegrantes
        titulo='Nossa equipe'
        membros={membros}
        autoMs={8000}
        mostrarControles
        mostrarIndicadores
      />
    </main>
  );
}
