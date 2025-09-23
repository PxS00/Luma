import type { Member } from '@/types/member';
import { mapMemberSocialNetworks } from '@/utils/socialNetworks';
import MembroAvatar from './MembroAvatar';
import MembrosSocial from './MembrosSocial';

type MembroCardProps = {
  member: Member;
  className?: string;
};

/**
 * Card de exibição de membro da equipe
 * Mobile-first, com grid flex adaptável por breakpoint
 */
export default function MembroCard({ member, className = '' }: MembroCardProps) {
  const { name, rm, class: memberClass, img, description } = member;
  const socialNetworks = mapMemberSocialNetworks(member);

  return (
    <article
      className={[
        'w-full max-w-[700px]',
        'bg-backSecondary rounded-lg',
        'shadow-[0_4px_12px_rgba(0,0,0,0.1)]',
        'box-border animate-fade',
        // padding responsivo
        'p-4 sm:p-5 md:p-6',
        className,
      ].join(' ')}
    >
      {/* Cabeçalho: avatar + dados */}
      <header
        className='
          flex flex-col md:flex-row
          items-start md:items-center
          justify-between
          gap-4 sm:gap-5
          text-left
        '
      >
        {/* Avatar — deixe o componente controlar a forma;
           passamos só classes de tamanho responsivo */}
        <MembroAvatar
          src={img}
          alt={`Foto de ${name}`}
          className='w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36'
        />

        {/* Texto e redes */}
        <div className='flex-1 w-full flex flex-col items-start gap-1.5 md:gap-2'>
          <h3 className='m-0 text-xl sm:text-2xl lg:text-[26px] font-bold text-fontPrimary'>
            {name}
          </h3>

          <div className='inline-flex flex-wrap items-center gap-4 text-sm sm:text-base text-fontSecondary'>
            <span>{rm}</span>
            {memberClass && <span>{memberClass}</span>}
          </div>

          {socialNetworks.length > 0 && (
            <div className='mt-2'>
              <MembrosSocial socials={socialNetworks} />
            </div>
          )}
        </div>
      </header>

      {/* Descrição */}
      {description && (
        <div className='mt-4 sm:mt-5 text-justify'>
          <p className='mb-0 text-[15px] sm:text-base font-bold text-[#2B1D1A]'>{description}</p>
        </div>
      )}
    </article>
  );
}
