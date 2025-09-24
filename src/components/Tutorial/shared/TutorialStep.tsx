// src/components/shared/Tutorial/TutorialStep.tsx
import BtnExterno from '@/components/Button/BtnExterno';
import BtnInterno from '@/components/Button/BtnInterno';
import type { TutorialStepData } from '@/types/tutorialStep';

// molduras (ajuste o caminho se seu index de imagens for outro)
import { molduraDesk, molduraMobile } from '@/assets/images';

type TutorialStepProps = {
  step: TutorialStepData; // { img: string; alt: string; title?: string; description?: string; actionButton? }
  stepNumber: number;
  imgClassName?: string; // classes extras aplicadas ao wrapper da imagem
};

export default function TutorialStep({ step, stepNumber, imgClassName }: TutorialStepProps) {
  const title = step.title ?? step.alt;

  return (
    <li aria-label={`Passo ${stepNumber + 1}: ${title}`}>
      <h4 className="mt-2 font-semibold text-fontTertiary pb-6">
        {stepNumber + 1}. {step.title}
        {step.actionButton &&
          (step.actionButton.external ? (
            <BtnExterno href={step.actionButton.href} className="ml-2 px-3 py-1">
              {step.actionButton.label}
            </BtnExterno>
          ) : (
            <BtnInterno to={step.actionButton.href} className="ml-2 px-3 py-1">
              {step.actionButton.label}
            </BtnInterno>
          ))}
      </h4>

      {/* Wrapper em retrato, igual à proporção da moldura (720x1481) */}
 <div className={`relative w-full aspect-[720/1481] ${imgClassName ?? ''}`}>
  {/* Moldura MOBILE: visível até md (ou seja, some no lg) */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-10 lg:hidden
               bg-no-repeat bg-center [background-size:100%_100%]"
    style={{ backgroundImage: `url(${molduraMobile})` }}
  />

  {/* Moldura DESKTOP: só a partir de lg */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-10 hidden lg:block
               bg-no-repeat bg-center [background-size:100%_100%]"
    style={{ backgroundImage: `url(${molduraDesk})` }}
  />

  {/* Imagem interna um pouco mais alta */}
  <div className="absolute inset-x-[5%] inset-y-[3.8%]">
    <img
      src={step.img}
      alt={step.alt}
      className="block w-full h-full object-cover rounded-xl"
    />
  </div>
</div>
    </li>
  );
}
