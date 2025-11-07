import type { BtnSearchProps } from '@/types/button';

/**
 * Botão de pesquisa com ícone de lupa
 * Usado para abrir o campo de busca no header
 */
export default function BtnSearch({ onClick, ...rest }: BtnSearchProps) {
  return (
    <button
      onClick={onClick}
      {...rest}
      className={
        `inline-flex items-center justify-center
        h-8 w-8 sm:h-12 sm:w-12
        shrink-0 flex-none leading-none
        rounded-xl bg-white/15 hover:bg-white/25 text-white
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
        transition` + (rest.className ? ` ${rest.className}` : '')
      }
      aria-label={rest['aria-label'] ?? 'Abrir pesquisa'}
    >
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='w-5 h-5 block'
      >
        <circle cx='11' cy='11' r='8' />
        <line x1='21' y1='21' x2='16.65' y2='16.65' />
      </svg>
    </button>
  );
}
