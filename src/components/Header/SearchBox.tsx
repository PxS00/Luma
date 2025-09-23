import type { SearchBoxProps } from '@/types/searchBoxProps';
import { useEffect, useRef } from 'react';

export default function SearchBox({
  open,
  value,
  onChange,
  onSubmit,
  onClose,
  className = '',
}: SearchBoxProps) {
  const ref = useRef<HTMLInputElement>(null);
  const nameRef = useRef(`q_${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    if (open) ref.current?.focus();
  }, [open]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  if (!open) return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      role='search'
      aria-label='Pesquisar no menu'
      autoComplete='off'
      className={[
        'w-full max-w-full overflow-x-hidden',
        'flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 backdrop-blur-sm',
        className,
      ].join(' ')}
    >
      <input
        ref={ref}
        type='text'
        name={nameRef.current}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Pesquisar…'
        className='flex-1 min-w-0 bg-transparent outline-none text-white placeholder-white/70'
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck={false}
        inputMode='search'
        enterKeyHint='search'
        aria-autocomplete='none'
      />

      <button
        type='button'
        onClick={onClose}
        aria-label='Fechar'
        className='shrink-0 text-white/80 hover:text-white'
      >
        ✕
      </button>

      <button
        type='submit'
        className='shrink-0 bg-white text-black rounded-lg px-3 py-1 text-sm font-medium hover:bg-white/90'
      >
        Buscar
      </button>
    </form>
  );
}
