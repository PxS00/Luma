import { mapMemberSocialNetworks } from '@/lib/socialNetworks';
import type { Member } from '@/types/member';
import MembroAvatar from './MembroAvatar';
import MembrosSocial from './MembrosSocial';

type MembroCardProps = { member: Member };

/**
 * Card de exibição de membro da equipe
 * Mostra foto, dados pessoais, redes sociais e descrição
 */
export default function MembroCard({ member }: MembroCardProps) {
  const { name, rm, class: memberClass, img, description } = member;
  const socialNetworks = mapMemberSocialNetworks(member);

  return (
    <ul className='flex justify-center'>
      <li className='bg-backSecondary rounded-lg p-6 shadow-[0_4px_12px_rgba(0,0,0,0.1)] w-full max-w-[700px] box-border animate-fade'>
        <div className='flex justify-between items-center gap-5 text-left'>
          <MembroAvatar src={img} alt={`Foto de ${name}`} className='h-auto' />

          <div className='flex-1 flex flex-col items-end gap-1.5'>
            <h2 className='text-2xl font-bold text-fontPrimary m-0'>{name}</h2>
            <span className='inline-flex items-center gap-5 text-base text-fontSecondary'>
              <span>{rm}</span>
              {memberClass && <span>{memberClass}</span>}
            </span>

            {socialNetworks.length > 0 && <MembrosSocial socials={socialNetworks} />}
          </div>
        </div>

        <div className='mt-5 text-justify text-[15px] text-[#2B1D1A]'>
          <p className='mb-2.5 text-base font-bold'>{description}</p>
        </div>
      </li>
    </ul>
  );
}
