// src/components/shared/Tutorial/TutorialSection.tsx
import type { TutorialSectionProps } from '@/types/tutorialStep';
import BtnExterno from '../../Button/BtnExterno';
import BtnInterno from '../../Button/BtnInterno';
import TutorialCarousel from './TutorialCarousel';

/**
 * Seção completa de tutorial com intro e carrossel
 * Combina descrição, botão de ação e steps do tutorial
 */
export default function TutorialSection({
  title,
  description,
  actionButton,
  customActionButton, // vamos reutilizar exatamente este
  tutorialTitle,
  steps,
  carouselOptions = { autoMs: 0 },
  className = '',
  imgClassName = ``,
}: TutorialSectionProps) {
  return (
    <section
      className={[
        'w-full',
        'px-4 sm:px-5 lg:px-6',
        'py-6 sm:py-8 lg:py-12',
        'flex flex-col items-center text-center gap-8',
        className,
      ].join(' ')}
    >
      {/* Intro acima do carrossel (z-index maior para não ser coberta) */}
      <div className='intro w-full max-w-screen-lg mx-auto flex flex-col items-center text-center gap-3 relative z-10'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl text-fontPrimary font-semibold'>{title}</h2>

        <p className='text-base sm:text-lg leading-relaxed max-w-2xl'>{description}</p>

        {customActionButton ? (
          <>
            {/* Mostra no mobile */}
            <div className='mt-3 sm:hidden'>{customActionButton}</div>

            <div className='mt-3 hidden sm:block'>{customActionButton}</div>
          </>
        ) : actionButton ? (
          actionButton.external ? (
            <>
              <div className='mt-3 sm:hidden'>
                <BtnExterno href={actionButton.href} className='inline-block'>
                  {actionButton.label}
                </BtnExterno>
              </div>
              <div className='mt-3 hidden sm:block'>
                <BtnExterno href={actionButton.href} className='inline-block'>
                  {actionButton.label}
                </BtnExterno>
              </div>
            </>
          ) : (
            <>
              <div className='mt-3 sm:hidden'>
                <BtnInterno to={actionButton.href} className='inline-block'>
                  {actionButton.label}
                </BtnInterno>
              </div>
              <div className='mt-3 hidden sm:block'>
                <BtnInterno to={actionButton.href} className='inline-block'>
                  {actionButton.label}
                </BtnInterno>
              </div>
            </>
          )
        ) : null}
      </div>

      {/* Carrossel centralizado com viewport travado */}
      <div className='w-full flex flex-col items-center relative z-0'>
        <h2 className='text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 text-fontPrimary text-center'>
          {tutorialTitle}
        </h2>

        <TutorialCarousel
          title={tutorialTitle}
          steps={steps}
          autoMs={carouselOptions.autoMs}
          imgClassName={imgClassName}
          contentClassName='mx-auto w-full max-w-[720px] lg:max-w-[1431px]'
          showControls
          showIndicators
        />
      </div>
    </section>
  );
}
