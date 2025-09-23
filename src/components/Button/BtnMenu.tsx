export default function BtnMenu({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className='
        inline-flex items-center justify-center
        h-8 w-8 sm:h-12 sm:w-12
        shrink-0 flex-none leading-none
        rounded-xl bg-white/15 hover:bg-white/25 text-white
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
        transition
      '
      aria-label={open ? 'Fechar menu' : 'Abrir menu'}
      aria-expanded={open}
    >
      {open ? (
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='w-5 h-5 block'
        >
          <line x1='18' y1='6' x2='6' y2='18' />
          <line x1='6' y1='6' x2='18' y2='18' />
        </svg>
      ) : (
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='w-5 h-5 block'
        >
          <line x1='4' y1='6' x2='20' y2='6' />
          <line x1='4' y1='12' x2='20' y2='12' />
          <line x1='4' y1='18' x2='20' y2='18' />
        </svg>
      )}
    </button>
  );
}
