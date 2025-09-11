import BtnExterno from '@/components/Botao/BtnExterno';
import BtnInterno from '@/components/Botao/BtnInterno';
import type { TutorialStepData } from '@/types/tutorialStep';

// Props para um passo individual do tutorial
type TutorialStepProps = {
  step: TutorialStepData; // { img: string; alt: string; title?: string; description?: string }
  stepNumber: number;
  imgClassName?: string;
};

/**
 * Item individual de um passo do tutorial
 * Exibe número, título e imagem com numeração automática
 */
export default function TutorialStep({ step, stepNumber, imgClassName }: TutorialStepProps) {
  const title = step.title ?? step.alt; // sem 'any'

  return (
    <li aria-label={`Passo ${stepNumber + 1}: ${title}`}>
      <h4 className='mt-2 font-semibold text-fontTertiary pb-6'>
        {stepNumber + 1}.{step.title}
          {step.actionButton &&
          (step.actionButton.external ? (
            <BtnExterno href={step.actionButton.href} className="px-3 py-1">
              {step.actionButton.label}
            </BtnExterno>
          ) : (
            <BtnInterno to={step.actionButton.href} className="px-3 py-1">
              {step.actionButton.label}
            </BtnInterno>
          ))}
      </h4>
      <img
        src={step.img}
        alt={step.alt}
        className={`w-full h-auto object-contain rounded-xl ${imgClassName ?? ''}`}
      />
    </li>
  );
}
