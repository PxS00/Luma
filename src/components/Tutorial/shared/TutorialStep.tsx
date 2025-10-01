// src/components/shared/Tutorial/TutorialStep.tsx
import BtnExterno from '@/components/Button/BtnExterno';
import BtnInterno from '@/components/Button/BtnInterno';
import type { TutorialStepProps } from '@/types/tutorialStep';

/**
 * Step individual do tutorial SEM molduras.
 * Exibe apenas a imagem de conteúdo, responsiva.
 */
export default function TutorialStep({ step, stepNumber, imgClassName }: TutorialStepProps) {
  const title = step.title ?? step.alt;

  return (
    <div aria-label={`Passo ${stepNumber + 1}: ${title}`} className='flex flex-col gap-4 m-0 p-0'>
      {/* Título + CTA com altura mínima pra não “pular” */}
      <h4 className='mt-2 font-semibold text-fontTertiary pb-2 break-words min-h-[2.75rem] sm:min-h-[3.25rem]'>
        {stepNumber + 1}. {title}
        {step.actionButton &&
          (step.actionButton.external ? (
            <BtnExterno
              href={step.actionButton.href}
              className='ml-2 px-3 py-1 align-middle whitespace-normal'
            >
              {step.actionButton.label}
            </BtnExterno>
          ) : (
            <BtnInterno
              to={step.actionButton.href}
              className='ml-2 px-3 py-1 align-middle whitespace-normal'
            >
              {step.actionButton.label}
            </BtnInterno>
          ))}
      </h4>

      {/* Container neutro (sem proporções de moldura) */}
      <div
        className='
          relative mx-auto flex items-center justify-center
          w-full
          max-w-[720px] md:max-w-[640px] lg:max-w-[960px] xl:max-w-[1100px]
          overflow-visible
        '
      >
        {/* Apenas a imagem de conteúdo */}
        <img
          src={step.img}
          alt={step.alt}
          className={[
            'block mx-auto',
            'w-full h-auto object-contain',
            'max-h-[min(70vh,900px)] md:max-h-[65vh] lg:max-h-[70vh]',
            'rounded-none',
            imgClassName || '',
          ].join(' ')}
          decoding='async'
          loading='eager'
        />
      </div>
    </div>
  );
}
