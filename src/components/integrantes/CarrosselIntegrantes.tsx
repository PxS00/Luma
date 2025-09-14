import type { Member } from '@/types/member';
import type { CarouselOptions } from '@/types/navigation';
import CarrosselBase from '../Carrossel/CarrosselBase';
import MembroCard from './MembroCard';

export interface CarrosselIntegrantesProps extends CarouselOptions {
  members: Member[];
  title?: string;
  showControls?: boolean; //* mostrar botões ‹ ›
  showIndicators?: boolean; //* bolinhas
  className?: string;
}

/**
 * Carrossel específico para exibição de membros da equipe
 * Usa CarrosselBase com autoplay configurado para 8 segundos
 * Renderiza cards de membros com navegação automática e manual
 */
export default function CarrosselIntegrantes({
  members,
  title,
  autoMs = 8000,
  showControls = true,
  showIndicators = true,
  className,
}: CarrosselIntegrantesProps) {
  if (!members.length) return null;

  return (
    <section aria-label={title} className={className}>
      {title && <h2>{title}</h2>}

      <CarrosselBase
        total={members.length}
        autoMs={autoMs}
        showControls={showControls}
        showIndicators={showIndicators}
        renderItem={(i) => (
          <ul className='list-none p-0 m-0'>
            <MembroCard member={members[i]} />
          </ul>
        )}
      />
    </section>
  );
}
