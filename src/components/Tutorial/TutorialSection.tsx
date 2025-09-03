import type { CarouselOptions } from '@/types/navigation';
import type { Passo } from '@/types/passo';
import BtnExterno from '../Botao/BtnExterno';
import BtnInterno from '../Botao/BtnInterno';
import TutorialCarousel from './TutorialCarousel';

interface TutorialSectionProps {
  title: string;
  description: string;
  actionButton?: {
    href: string;
    label: string;
    external?: boolean;
  };
  tutorialTitle: string;
  passos: Passo[];
  carouselOptions?: CarouselOptions;
  className?: string;
  contentClassName?: string;
  imgClassName?: string;
}

export default function TutorialSection({
  title,
  description,
  actionButton,
  tutorialTitle,
  passos,
  carouselOptions = { autoMs: 0 },
  className = '',
  contentClassName = 'max-w-[420px] md:max-w-[520px] mx-auto',
  imgClassName = 'max-h-[420px]',
}: TutorialSectionProps) {
  return (
    <section
      className={`flex flex-col p-5 gap-6 text-center items-center justify-center font-bold ${className}`}
    >
      <div className='intro flex flex-col items-center text-center gap-3'>
        <h2>{title}</h2>
        <p>{description}</p>
        {actionButton &&
          (actionButton.external ? (
            <BtnExterno href={actionButton.href} className='p-2'>
              {actionButton.label}
            </BtnExterno>
          ) : (
            <BtnInterno to={actionButton.href} className='p-2'>
              {actionButton.label}
            </BtnInterno>
          ))}
      </div>
      <TutorialCarousel
        title={tutorialTitle}
        passos={passos}
        autoMs={carouselOptions.autoMs}
        contentClassName={contentClassName}
        imgClassName={imgClassName}
      />
    </section>
  );
}
