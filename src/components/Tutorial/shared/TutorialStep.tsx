// src/components/shared/Tutorial/TutorialStep.tsx
import BtnExterno from '@/components/Button/BtnExterno';
import BtnInterno from '@/components/Button/BtnInterno';
import type { TutorialStepData } from '@/types/tutorialStep';
import { molduraDesk, molduraMobile } from '@/assets/images';

type TutorialStepProps = {
  step: TutorialStepData;
  stepNumber: number;
  imgClassName?: string; // agora é realmente aplicado na <img>
};

export default function TutorialStep({ step, stepNumber, imgClassName }: TutorialStepProps) {
  const title = step.title ?? step.alt;

  return (
    <li aria-label={`Passo ${stepNumber + 1}: ${title}`} className="flex flex-col gap-4">
      {/* Título + CTA */}
      <h4 className="mt-2 font-semibold text-fontTertiary pb-2 break-words">
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

      {/* QUADRO: largura fixa por breakpoint */}
      <div
        className="
          relative
          w-[min(92vw,360px)]  sm:w-[min(92vw,420px)]  lg:w-[min(92vw,520px)]
          aspect-[720/1481]
          mx-auto
          overflow-hidden   /* <- garante que nada vaze da moldura */
        "
      >
        {/* Moldura mobile */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 lg:hidden
                     bg-no-repeat bg-center [background-size:100%_100%]"
          style={{ backgroundImage: `url(${molduraMobile})` }}
        />
        {/* Moldura desktop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 hidden lg:block
                     bg-no-repeat bg-center [background-size:100%_100%]"
          style={{ backgroundImage: `url(${molduraDesk})` }}
        />


{/* JANELA INTERNA */}
<div
  className="
    absolute
    inset-x-[3%] inset-y-[4%] lg:inset-x-[2.5%] lg:inset-y-[1.8%]
    overflow-hidden rounded-3xl   /* <- curva maior */
    grid place-items-center
  "
>
  <img
    src={step.img}
    alt={step.alt}
    className={`
      max-w-full max-h-full w-auto h-auto
      object-contain
      rounded-3xl                 /* <- curva maior também na imagem */
      ${imgClassName ?? ''}
      !max-h-full !h-auto !w-auto
    `}
  />
</div>

      </div>
    </li>
  );
}
