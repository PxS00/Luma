// src/components/shared/Tutorial/TutorialCarousel.tsx
import type { TutorialStepData } from '@/types/tutorialStep';
import CarrosselBase from '../../Carrossel/CarrosselBase';
import TutorialStep from './TutorialStep';

export interface TutorialCarouselProps {
  steps: TutorialStepData[];
  title?: string;
  autoMs?: number | null;
  className?: string;
  /** classes aplicadas ao viewport (área do slide, relative) */
  contentClassName?: string;
  /** classes extras para a <img> do TutorialStep */
  imgClassName?: string;
  /** mostra/oculta setas e indicadores */
  showControls?: boolean;
  showIndicators?: boolean;
}

export default function TutorialCarousel({
  steps,
  title,
  autoMs = 7000,
  className,
  contentClassName,
  imgClassName,
  showControls = true,
  showIndicators = true,
}: TutorialCarouselProps) {
  if (!steps?.length) return null;

  return (
    <section aria-label={title} className={className}>
      <CarrosselBase
        total={steps.length}
        autoMs={autoMs}
       viewportClassName={['relative w-full mx-auto overflow-visible', contentClassName || ''].join(' ').trim()}

        renderItem={(i) => (
          <ul className="list-none m-0 p-0">
            <TutorialStep step={steps[i]} stepNumber={i} imgClassName={imgClassName} />
          </ul>
        )}

        // SETAS LATERAIS: apenas em md+
        renderControls={(api) => {
          const { prev, next, total } = api;
          if (!(showControls && total > 1)) return null;
          return (
            <>
              <button
                type="button"
                aria-label="Anterior"
                onClick={prev}
                className="
  hidden md:inline-flex
  absolute top-1/2 -translate-y-1/2
  md:-left-12         /* tablet/desktop inicial */
  lg:-left-0          /* ↓ aproxima na moldura em lg (≥992px) */
  xl:-left-0          /* ↓ encosta mais no xl (≥1300px) */
  z-20 items-center justify-center
  w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14
  rounded-full bg-backBtn text-white shadow
  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-backBtn/60
"

              >
                ‹
              </button>

              <button
                type="button"
                aria-label="Próximo"
                onClick={next}
                className="
  hidden md:inline-flex
  absolute top-1/2 -translate-y-1/2
  md:-right-12
  lg:-right-0
  xl:-right-0
  z-20 items-center justify-center
  w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14
  rounded-full bg-backBtn text-white shadow
  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-backBtn/60
"
              >
                ›
              </button>
            </>
          );
        }}

        // xs/sm: botões ACIMA das bolinhas | md+: só bolinhas (com mais respiro/tamanho)
        renderIndicators={(api) => {
          const { goTo, index, total } = api;
          if (!(showIndicators && total > 1)) return null;

          return (
            <div className="mt-3 md:mt-8 flex flex-col items-center gap-2">
              {/* fileira de botões (apenas xs/sm) */}
              <div className="md:hidden flex items-center justify-center gap-30">
                <button
                  type="button"
                  aria-label="Anterior"
                  onClick={() => goTo(index - 1)}
                  className="
                    inline-flex items-center justify-center
                    w-8 h-8 rounded-full bg-backBtn text-white shadow
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-backBtn/60
                  "
                >
                  ‹
                </button>

                <button
                  type="button"
                  aria-label="Próximo"
                  onClick={() => goTo(index + 1)}
                  className="
                    inline-flex items-center justify-center
                    w-8 h-8 rounded-full bg-backBtn text-white shadow
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-backBtn/60
                  "
                >
                  ›
                </button>
              </div>

              {/* bolinhas (sempre visíveis) */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-5" role="tablist">
                {Array.from({ length: total }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-label={`Ir ao passo ${i + 1}`}
                    aria-selected={i === index}
                    onClick={() => goTo(i)}
                    className={[
                      'rounded-full transition',
                      'h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5',
                      i === index ? 'bg-backBtn' : 'bg-gray-300 hover:bg-gray-400',
                    ].join(' ')}
                  />
                ))}
              </div>
            </div>
          );
        }}
      />
    </section>
  );
}
