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

<div
  className="
    relative mx-auto w-full
    max-w-[720px] md:max-w-[900px]
    aspect-[720/1481] md:aspect-[720/1481]

    /* DESKTOP moldura menos alta */
    lg:aspect-[1431/800]   /* <-- altura menor que a original */
    lg:w-[95vw] lg:max-w-[2000px]
    xl:w-[98vw]

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
p-[4.1%] lg:p-[0%] xl:p-[1.5%]

    overflow-visible
  "
>
<img
  src={step.img}
  alt={step.alt}
  className={[
    'block',
    'w-full h-auto',
    'lg:h-full lg:w-auto',
    'lg:max-w-[55%]',
    'lg:scale-y-140',
    'lg:translate-y-40 xl:translate-y-53',
    'lg:object-top',     // <-- cola no topo
    'mx-auto',
    'rounded-[33px] md:rounded-[65px] lg:rounded-[0px]',
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
