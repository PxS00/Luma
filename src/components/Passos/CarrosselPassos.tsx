import type { Passo } from '@/types/passo';
import PassoView from './PassoAPasso';
import CarrosselBase from '../Carrossel/CarrosselBase';

export interface ListaPassosCarrosselProps {
  passos: Passo[];
  titulo?: string;
  autoMs?: number;
  className?: string;
}

export default function CarrosselPassos({
  passos,
  titulo,
  className,
}: ListaPassosCarrosselProps) {
  if (!passos.length) return null;

  return (
    <section aria-label={titulo} className={className}>
      {titulo && <h2>{titulo}</h2>}

      <CarrosselBase
        total={passos.length}
        renderItem={(i) => (
          <ul className='list-none p-0 m-0'>
            <PassoView passo={passos[i]} numeracao={i} />
          </ul>
        )}
      />
    </section>
  );
}
