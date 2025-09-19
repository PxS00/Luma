import type { CarouselOptions } from '@/types/navigation';
import type { TutorialStepData } from '@/types/tutorialStep';
import type { ReactNode } from 'react';
import BtnExterno from '../../Botao/BtnExterno';
import BtnInterno from '../../Botao/BtnInterno';
import TutorialCarousel from './TutorialCarousel';

interface TutorialSectionProps {
  /** Título principal da seção */
  title: string;
  /** Descrição da seção */
  description: string;
  /** Botão de ação flexível (para desktop) */
  actionButton?: {
    href: string;
    label: string;
    external?: boolean;
  };
  /** Componente de botão customizado (para mobile - ex: BtnStore) */
  customActionButton?: ReactNode;
  /** Título do tutorial/carrossel */
  tutorialTitle: string;
  /** Array de passos do tutorial */
  steps: TutorialStepData[];
  /** Opções do carrossel (autoplay, etc.) */
  carouselOptions?: CarouselOptions;
  /** Classes CSS adicionais para o container */
  className?: string;
  /** Classes CSS para o conteúdo do carrossel */
  contentClassName?: string;
  /** Classes CSS para as imagens do carrossel */
  imgClassName?: string;
}

/**
 * Componente unificado para seções de tutorial
 * Suporta tanto desktop (actionButton) quanto mobile (customActionButton)
 *
 * @example
 * // Desktop com botão externo
 * <TutorialSection
 *   title="Acesse pelo Navegador"
 *   description="Tutorial desktop"
 *   actionButton={{ href: "https://...", label: "Acessar", external: true }}
 *   tutorialTitle="Como usar"
 *   steps={TUTORIAL_STEPS}
 * />
 *
 * @example
 * // Mobile com botão customizado
 * <TutorialSection
 *   title="Baixe o App"
 *   description="Tutorial mobile"
 *   customActionButton={<BtnStore />}
 *   tutorialTitle="Como usar no App"
 *   steps={MOBILE_STEPS}
 * />
 */

export default function TutorialSection({
  title,
  description,
  actionButton,
  customActionButton,
  tutorialTitle,
  steps,
  carouselOptions = { autoMs: 0 },
  className = "",
  // + mais espaço pro conteúdo do carrossel em telas grandes
  contentClassName = "max-w-[420px] sm:max-w-[480px] md:max-w-[600px] lg:max-w-[720px] mx-auto",
  imgClassName = "max-h-[360px] sm:max-h-[400px] md:max-h-[440px] lg:max-h-[540px]",
}: TutorialSectionProps) {
  return (
    <section
      className={[
        "mx-auto w-full max-w-screen-lg",
        "px-4 sm:px-5 lg:px-6",
        "py-6 sm:py-8 lg:py-12",
        "flex flex-col lg:flex-row lg:items-start",
        "gap-6 sm:gap-8 lg:gap-12",
        "text-center lg:text-left",
        className?.includes("gap-") ? className : className,
      ].join(" ")}
    >
      {/* Intro (texto + CTA) */}
      <div className="intro flex flex-col items-center lg:items-start text-center lg:text-left gap-3 lg:basis-4/12 xl:basis-3/12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl text-fontPrimary font-semibold">
          {title}
        </h2>

        <p className="text-base sm:text-lg leading-relaxed">
          {description}
        </p>

        {customActionButton ? (
          <div className="mt-2">{customActionButton}</div>
        ) : actionButton ? (
          actionButton.external ? (
            <BtnExterno
              href={actionButton.href}
              className="mt-3 inline-block text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
            >
              {actionButton.label}
            </BtnExterno>
          ) : (
            <BtnInterno
              to={actionButton.href}
              className="mt-3 inline-block text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
            >
              {actionButton.label}
            </BtnInterno>
          )
        ) : null}
      </div>

      {/* Carrossel / Passos */}
      <div className="lg:basis-8/12 xl:basis-9/12">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 text-fontPrimary text-center lg:text-left">
          {tutorialTitle}
        </h3>

        <TutorialCarousel
          title={tutorialTitle}
          steps={steps}
          autoMs={carouselOptions.autoMs}
          contentClassName={contentClassName}
          imgClassName={imgClassName}
        />
      </div>
    </section>
  );
}
