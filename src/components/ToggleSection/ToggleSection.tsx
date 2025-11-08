import type { ToggleSectionProps } from '@/types/ui';
import { useState } from 'react';

/**
 * Seção expansível/colapsável (FAQ etc.)
 * - BPs: sm=600, md=768, lg=992, xl=1300
 * - A11y: botão real, aria-* e foco visível
 */
export default function ToggleSection({ title, children }: ToggleSectionProps) {
  const [open, setOpen] = useState(false);
  const panelId = `toggle-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <section
      className='
        mb-4 sm:mb-5 md:mb-6
        rounded-md sm:rounded-lg md:rounded-xl
        border border-borderColor bg-backPrimary
        shadow-sm
      '
    >
      <h3 className='m-0'>
        <button
          type='button'
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className='
            w-full cursor-pointer
            text-clikColor font-bold text-[15px] sm:text-[16px] md:text-[18px]
            py-2.5 px-3.5 sm:py-3 sm:px-4 md:py-3.5 md:px-5
            text-center
            hover:bg-white/40
            focus:outline-none focus-visible:ring-2 focus-visible:ring-borderColor focus-visible:ring-offset-2 focus-visible:ring-offset-backPrimary
            transition-colors
          '
        >
          {title}
        </button>
      </h3>

      {open && (
        <div
          id={panelId}
          role='region'
          className='
            border-t border-borderColor
            bg-backSecondary
            rounded-b-md sm:rounded-b-lg md:rounded-b-xl
            text-fontTertiary text-sm sm:text-base md:text-[17px]
            text-center
            p-3 sm:p-4 md:p-5 lg:p-6
          '
        >
          {children}
        </div>
      )}
    </section>
  );
}
