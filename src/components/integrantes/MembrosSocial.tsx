import BtnExterno from '@/components/Button/BtnExterno';
import type { SocialNetwork } from '@/types/socialNetwork';

type MembrosSocialProps = { socials: SocialNetwork[] };

/**
 * Links para redes sociais de um membro
 * Ícones clicáveis, responsivos e acessíveis
 */
export default function MembrosSocial({ socials }: MembrosSocialProps) {
  return (
    <div className='flex mt-2 gap-3 sm:gap-4'>
      {socials.map((s) => (
        <BtnExterno
          key={s.alt}
          href={s.href}
          target='_blank'
          className='p-0 bg-transparent hover:bg-transparent'
          aria-label={s.alt}
        >
          <img
            src={s.icon}
            alt={s.alt}
            className='
              w-8 h-8
              sm:w-9 sm:h-9
              md:w-10 md:h-10
              lg:w-11 lg:h-11
              xl:w-12 xl:h-12
              transition-transform duration-300 hover:scale-110
            '
          />
        </BtnExterno>
      ))}
    </div>
  );
}
