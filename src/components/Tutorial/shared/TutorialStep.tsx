// src/components/shared/Tutorial/TutorialStep.tsx
import BtnExterno from '@/components/Button/BtnExterno';
import BtnInterno from '@/components/Button/BtnInterno';
import type { TutorialStepData } from '@/types/tutorialStep';
import { molduraDesk, molduraMobile } from '@/assets/images';

type TutorialStepProps = {
  step: TutorialStepData;
  stepNumber: number;
  imgClassName?: string;
};

export default function TutorialStep({ step, stepNumber, imgClassName }: TutorialStepProps) {
  const title = step.title ?? step.alt;

  return (
    <div aria-label={`Passo ${stepNumber + 1}: ${title}`} className="flex flex-col gap-4 m-0 p-0">
      {/* Título + CTA com altura mínima pra não “pular” */}
      <h4 className="mt-2 font-semibold text-fontTertiary pb-2 break-words min-h-[2.75rem] sm:min-h-[3.25rem]">
        {stepNumber + 1}. {title}
        {step.actionButton &&
          (step.actionButton.external ? (
            <BtnExterno href={step.actionButton.href} className="ml-2 px-3 py-1 align-middle whitespace-normal">
              {step.actionButton.label}
            </BtnExterno>
          ) : (
            <BtnInterno to={step.actionButton.href} className="ml-2 px-3 py-1 align-middle whitespace-normal">
              {step.actionButton.label}
            </BtnInterno>
          ))}
      </h4>

      {/* ÚNICO aspect container para IMAGEM + MOLDURA */}
      <div
        className="
          relative mx-auto w-full
          max-w-[720px] md:max-w-[900px]          /* tablet ainda com moldura mobile */
          aspect-[720/1481] md:aspect-[720/1481]  /* mantém aspecto da moldura mobile no md */
          lg:max-w-[1431px] lg:aspect-[1431/693]  /* desktop ajustaremos depois */
          overflow-hidden min-w-0
        "
      >
        {/* Molduras sobrepostas */}
        {/* mobile + tablet usam a moldura MOBILE */}
        <img
          aria-hidden
          src={molduraMobile}
          alt=""
          className="pointer-events-none absolute inset-0 z-10 h-full w-full object-contain lg:hidden"
        />
        {/* desktop (lg) usa a moldura DESK */}
        <img
          aria-hidden
          src={molduraDesk}
          alt=""
          className="pointer-events-none absolute inset-0 z-10 hidden lg:block h-full w-full object-contain"
        />

{/* Janela interna (clip + raio por breakpoint) */}
<div
  className="
    absolute inset-0 flex items-center justify-center
    p-[4.1%]            /* +folga no tablet */
    overflow-hidden
  "
>
  <img
    src={step.img}
    alt={step.alt}
    className={[
      'block h-full w-full object-contain',
      'rounded-[33px] md:rounded-[65px]',   // força o raio da imagem no md
      imgClassName || '',
    ].join(' ')}
    decoding="async"
    loading="eager"
  />
</div>

      </div>
    </div>
  );
}
