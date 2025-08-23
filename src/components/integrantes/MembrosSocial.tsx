import type { RedeSocial } from '@/types/redeSocial';
import BtnExterno from '@components/Botao/BtnExterno';

type Props = { socials: RedeSocial[] };

export default function MembrosSocial({ socials }: Props) {
  const iconClass = 'w-9 h-9 transition-transform duration-300 hover:scale-110';

  return (
    <div className='flex gap-2.5 mt-1.5'>
      {socials.map((s) => (
        <BtnExterno
          key={s.alt}
          href={s.href}
          target='_blank'
          className='p-0 bg-transparent hover:bg-transparent'
          aria-label={s.alt}
        >
          <img src={s.icon} alt={s.alt} className={iconClass} />
        </BtnExterno>
      ))}
    </div>
  );
}
