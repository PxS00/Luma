// src/components/Carrossel/CarrosselBase.tsx
import BtnAcao from '@/components/Button/BtnAcao';
import { useCarousel } from '@/hooks/useCarousel';
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
 * Carrossel base (mobile-first)
 * - Mantém responsividade por breakpoints
 * - Adiciona um "frame" com largura travada por clamp() para evitar variação entre slides
 * - Setas absolutas não deslocam o conteúdo
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
    <div className={`relative w-full ${className ?? ''}`}>
      <div className="flex justify-center">
        {/* Wrapper central (pode manter seus max-w e paddings externos) */}
        <div
          className="
            relative w-full
            max-w-[360px] sm:max-w-[520px] md:max-w-[640px] lg:max-w-[760px] xl:max-w-[920px]
            px-4 sm:px-6 md:px-8 lg:px-0
          "
        >
          {/* FRAME: largura do slide travada de forma mobile-first */}
          <div
            className="
              relative mx-auto
              w-[clamp(280px,92vw,520px)]
              sm:w-[clamp(320px,92vw,560px)]
              lg:w-[clamp(360px,92vw,620px)]
            "
          >
            {/* slide atual */}
            <div className="transition-opacity duration-500 ease-out">
              {renderItem(index)}
            </div>

            {/* CONTROLES (absolutos para não empurrar o slide) */}
            {showControls && total > 1 && (
              <>
                {/* ESQUERDA */}
                <BtnAcao
                  variant="icon"
                  onClick={previous}
                  aria-label="Anterior"
                  className="
    absolute top-1/2 -translate-y-1/2 z-20
    left-4 sm:left-6 md:left-8 lg:left-10
    w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10
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
    absolute top-1/2 -translate-y-1/2 z-20
    right-4 sm:right-6 md:right-8 lg:right-10
    w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10
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
      </div>

      {/* indicadores */}
      {showIndicators && total > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <BtnAcao
              key={i}
              variant="dot"
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
