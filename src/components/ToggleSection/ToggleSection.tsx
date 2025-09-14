import { useState } from 'react';

type ToggleSectionProps = {
  title: string;
  children: React.ReactNode;
};

/**
 * Seção expansível/colapsável
 * Usado para FAQ e outros conteúdos que precisam ser expandidos
 */
export default function ToggleSection({ title, children }: ToggleSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className='mb-4 rounded-[12px] border border-borderColor bg-backPrimary'>
      <h3
        className='cursor-pointer py-2.5 px-3.5 m-0 text-center text-[18px] font-bold text-clikColor'
        onClick={() => setOpen(!open)}
      >
        {title}
      </h3>
      {open && (
        <div className='rounded-b-[12px]  bg-[#FFF8E1] border-t border-borderColor text-fontTertiary text-base text-center '>
          {children}
        </div>
      )}
    </div>
  );
}
