import type { Membro } from '@/types/membro';
import MembroAvatar from './MembroAvatar';
import MembrosSocial from './MembrosSocial';
import { mapearRedesDoMembro } from '@/lib/redesSociais';

type Props = { m: Membro };

export default function MembroCard({ m }: Props) {
  const { nome, rm, img, descricao } = m;
  const redes = mapearRedesDoMembro(m);

  return (
    <li className='bg-backSecondary rounded-lg p-6 shadow-[0_4px_12px_rgba(0,0,0,0.1)] w-full max-w-[700px] box-border animate-fade'>
      <div className='flex justify-between items-center gap-5 text-left'>
        <MembroAvatar src={img} alt={`Foto de ${nome}`} className='h-auto' />

        <div className='flex-1 flex flex-col items-end gap-1.5'>
          <h2 className='text-2xl font-bold text-fontPrimary m-0'>{nome}</h2>
          <span className='text-base text-fontSecondary'>{rm}</span>
          {redes.length > 0 && <MembrosSocial socials={redes} />}
        </div>
      </div>

      <div className='mt-5 text-justify text-[15px] text-[#2B1D1A]'>
        <p className='mb-2.5 text-base font-bold'>{descricao}</p>
      </div>
    </li>
  );
}
