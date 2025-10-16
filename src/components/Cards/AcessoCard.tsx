import type { AcessoCardProps } from '@/types/card';
import BtnExterno from '../Button/BtnExterno';
import BtnInterno from '../Button/BtnInterno';

export default function AcessoCard({
  Icon,
  title,
  description,
  href,
  external = false,
}: AcessoCardProps) {
  return (
    <div
className='flex-1 basis-[300px] max-w-[300px]
  flex flex-col justify-between items-center
  bg-[#FFF4CC] rounded-xl p-4 text-center
  shadow-[0_2px_6px_rgba(0,0,0,0.05)]'
    >
      <div>
  <Icon className='w-[42px] h-[42px] text-[#D97706]  mx-auto mb-2.5' aria-hidden />
      </div>

      <h3 className='text-lg text-fontPrimary mb-2 font-semibold'>{title}</h3>
      <p className='text-sm text-fontTertiary mb-3'>{description}</p>

      {external ? (
        <BtnExterno href={href}>Acessar</BtnExterno>
      ) : (
        <BtnInterno to={href}>Acessar</BtnInterno>
      )}
    </div>
  );
}
