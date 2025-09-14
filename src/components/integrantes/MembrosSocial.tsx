import type { SocialNetwork } from '@/types/socialNetwork';
import BtnExterno from '@components/Botao/BtnExterno';

type MembrosSocialProps = { socials: SocialNetwork[] };

/**
 * Links para redes sociais de um membro
 * Exibe ícones clicáveis para GitHub, LinkedIn, etc.
 */
export default function MembrosSocial({ socials }: MembrosSocialProps) {
  return (
    <div className='flex mt-1.5'>
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
            className='w-20 h-20 transition-transform duration-300 hover:scale-110'
          />
        </BtnExterno>
      ))}
    </div>
  );
}
