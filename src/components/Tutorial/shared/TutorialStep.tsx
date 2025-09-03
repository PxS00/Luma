import type { Passo } from '@/types/passo';

// Props para um passo individual do tutorial
type TutorialStepProps = {
  passo: Passo; // { img: string; alt: string; titulo?: string; descricao?: string }
  numeracao: number;
  imgClassName?: string;
};

/**
 * Item individual de um passo do tutorial
 * Exibe número, título e imagem com numeração automática
 */
export default function TutorialStep({ passo, numeracao, imgClassName }: TutorialStepProps) {
  const titulo = passo.titulo ?? passo.alt; // sem 'any'

  return (
    <li aria-label={`Passo ${numeracao + 1}: ${titulo}`}>
      <h4 className='mt-2 font-semibold text-fontTertiary'>
        {numeracao + 1}. {titulo}
      </h4>
      <img
        src={passo.img}
        alt={passo.alt}
        className={`w-full h-auto object-contain rounded-xl ${imgClassName ?? ''}`}
      />
    </li>
  );
}
