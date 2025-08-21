import type { Membro } from '../data/members';
import { GitHub, LinkedIn } from '../../../img';
import BtnExterno from '../../../components/Botao/BtnExterno';

type Props = { m: Membro };

export default function MemberCard({ m }: Props) {
  const { nome, rm, foto, descricao, linkedin, github } = m;
  const socials = [
    linkedin && { href: linkedin, icon: LinkedIn, alt: 'LinkedIn' },
    github && { href: github, icon: GitHub, alt: 'GitHub' },
  ].filter(Boolean) as { href: string; icon: string; alt: string }[];

  const iconClass = 'w-9 h-9 transition-transform duration-300 hover:scale-110';

  return (
    <ul className='list-none p-0 mx-auto max-w-[1000px] w-full flex flex-col items-center'>
      <li className='bg-backSecondary rounded-lg p-6 shadow-[0_4px_12px_rgba(0,0,0,0.1)] w-full max-w-[700px] box-border animate-fade'>
        <div className='flex justify-between items-center gap-5 text-left'>
          <img
            src={foto}
            alt={`Foto de ${nome}`}
            className='w-[140px] h-auto rounded-full object-cover shrink-0'
            loading='lazy'
          />

          <div className='flex-1 flex flex-col items-end gap-1.5'>
            <h2 className='text-2xl font-bold text-fontPrimary m-0'>{nome}</h2>
            <span className='text-base text-fontSecondary'>{rm}</span>

            {socials.length > 0 && (
              <div className='flex gap-2.5 mt-1.5'>
                {socials.map((s) => (
                  <BtnExterno key={s.alt} href={s.href} target="_blank" className="p-0 bg-transparent hover:bg-transparent">
                  <img src={s.icon} alt={s.alt} className={iconClass} />
                </BtnExterno>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='mt-5 text-justify text-[15px] text-[#2B1D1A]'>
          <p className='mb-2.5 text-base font-bold'>{descricao}</p>
        </div>
      </li>
    </ul>
  );
}
