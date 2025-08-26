import { membros } from '@/data/membrosDados';
import CarrosselIntegrantes from '@components/integrantes/CarrosselIntegrantes';

export default function Integrantes() {
  return (
    <main className='container mx-auto px-4 py-8'>
      <CarrosselIntegrantes membros={membros} autoMs={8000} mostrarControles mostrarIndicadores />
    </main>
  );
}
