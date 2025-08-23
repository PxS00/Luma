import type { Membro } from '@/types/membro';
import MembroCard from './MembroCard';
import CarrosselBase from '../Carrossel/CarrosselBase';

export interface CarrosselIntegrantesProps {
  membros: Membro[];
  titulo?: string;
  autoMs?: number; //* 0 desativa autoplay
  mostrarControles?: boolean; //* mostrar botões ‹ ›
  mostrarIndicadores?: boolean; //* bolinhas
  className?: string;
}

export default function CarrosselIntegrantes({
  membros,
  titulo,
  autoMs = 8000,
  mostrarControles = true,
  mostrarIndicadores = true,
  className,
}: CarrosselIntegrantesProps) {
  if (!membros.length) return null;

  return (
    <section aria-label={titulo} className={className}>
      {titulo && <h2>{titulo}</h2>}

      <CarrosselBase
        total={membros.length}
        autoMs={autoMs}
        showControls={mostrarControles}
        showIndicators={mostrarIndicadores}
        renderItem={(i) => (
          <ul className='list-none p-0 m-0'>
            <MembroCard m={membros[i]} />
          </ul>
        )}
      />
    </section>
  );
}
