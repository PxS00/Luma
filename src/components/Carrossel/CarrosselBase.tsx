// src/components/Carrossel/CarrosselBase.tsx
import { useCarousel } from '@/hooks/useCarousel';
import BtnAcao from '@components/Botao/BtnAcao';
import type { ReactNode } from 'react';

type CarrosselBaseProps = {
  total: number;
  renderItem: (i: number) => ReactNode;
  autoMs?: number;
  loop?: boolean;
  showIndicators?: boolean;
  showControls?: boolean;
  className?: string;
};

/**
 * Componente base de carrossel reutilizável
 * Sistema completo com controles laterais, indicadores e autoplay
 * Suporta navegação manual e automática com loop infinito
 * Usado como base para carrosseis de tutorial e membros
 */
export default function CarrosselBase({
  total,
  renderItem,
  autoMs = 0,
  loop = true,
  showIndicators = true,
  showControls = true,
  className,
}: CarrosselBaseProps) {
  const { index, next, previous, goTo } = useCarousel(total, { autoMs, loop });
  if (!total) return null;

  return (
    // src/components/Carrossel/CarrosselBase.tsx
    <div className={`relative w-full ${className ?? ''}`}>
      <div className='flex justify-center'>
        {/* ↓ wrapper relativo do card */}
        <div className="relative w-full max-w-[420px] md:max-w-[480px] px-6 sm:px-8 md:px-10 lg:px-0">
          {/* slide atual */}
          <div className='transition-opacity duration-500 ease-out'>
            {renderItem(index)}
          </div>

          {showControls && total > 1 && (
            <>
              {/* ESQUERDA */}
              <BtnAcao
                variant="icon"
                onClick={previous}
                aria-label="Anterior"
                className="
    absolute top-1/2 -translate-y-1/2 z-10
    left-0 sm:left-1 md:left-2 lg:-left-12 xl:-left-16
    w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 max-[360px]:w-7 max-[360px]:h-7
    flex items-center justify-center rounded-full
    bg-backBtn text-white shadow
  "
              >
                <span aria-hidden className="text-lg sm:text-xl leading-none">‹</span>
              </BtnAcao>

              {/* DIREITA */}
              <BtnAcao
                variant="icon"
                onClick={next}
                aria-label="Próximo"
                className="
    absolute top-1/2 -translate-y-1/2 z-10
    right-0 sm:right-1 md:right-2 lg:-right-12 xl:-right-16
    w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 max-[360px]:w-7 max-[360px]:h-7
    flex items-center justify-center rounded-full
    bg-backBtn text-white shadow
  "
              >
                <span aria-hidden className="text-lg sm:text-xl leading-none">›</span>
              </BtnAcao>

            </>
          )}
        </div>
      </div>

      {/* indicadores */}
      {showIndicators && total > 1 && (
        <div className='mt-3 flex justify-center gap-2'>
          {Array.from({ length: total }).map((_, i) => (
            <BtnAcao
              key={i}
              variant='dot'
              onClick={() => goTo(i)}
              aria-label={`Ir para item ${i + 1}`}
              aria-pressed={i === index}
              className={i === index ? 'bg-fontPrimary' : 'bg-black/30'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
