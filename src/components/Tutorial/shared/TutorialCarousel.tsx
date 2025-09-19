import type { TutorialStepData } from '@/types/tutorialStep';
import CarrosselBase from '../../Carrossel/CarrosselBase';
import TutorialStep from './TutorialStep';

export interface TutorialCarouselProps {
  steps: TutorialStepData[];
  title?: string;
  autoMs?: number;
  className?: string;
  contentClassName?: string; // wrapper do conteúdo do slide
  imgClassName?: string; // classe aplicada na <img> do TutorialStep
}

/**
 * Carrossel específico para tutoriais step-by-step
 * Usa CarrosselBase para navegar entre passos do tutorial
 * Cada slide exibe um TutorialStep numerado
 */
export default function TutorialCarousel({
  steps,
  title,
  autoMs,
  className,
  contentClassName,
  imgClassName,
}: TutorialCarouselProps) {
  if (!steps.length) return null;

  return (
    <section aria-label={title} className={className}>
      <CarrosselBase
        total={steps.length}
        autoMs={autoMs}
        renderItem={(i) => (
          <div className={`w-full ${contentClassName ?? ''}`}>
            <ul className='list-none p-0 m-0'>
              <TutorialStep step={steps[i]} stepNumber={i} imgClassName={imgClassName} />
            </ul>
          </div>
        )}
      />
    </section>
  );
}
