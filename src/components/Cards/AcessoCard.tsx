import type { AcessoCardProps } from '@/types/card';
import BtnExterno from '../Button/BtnExterno';
import BtnInterno from '../Button/BtnInterno';

export default function AcessoCard({
  Icon,
  title,
  description,
  href,
  external = false,
  ctaLabel,
}: AcessoCardProps) {
  return (
  <div
    className={
      `flex-1 w-full sm:max-w-[300px] lg:max-w-[320px] min-w-0
      flex flex-col justify-between items-center text-center
      rounded-xl p-4
      bg-backSecondary border border-borderColor
      text-fontPrimary
      shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-transform duration-150`
    }
  >
    <div>
      <div className="w-12 h-12 rounded-full bg-clikColor text-white flex items-center justify-center mx-auto mb-2.5">
        <Icon className="w-6 h-6" aria-hidden="true" />
      </div>
    </div>

  <h3 className="text-lg text-fontPrimary mb-2 font-semibold">{title}</h3>
  <p className="text-sm text-fontTertiary mb-3">{description}</p>

    {external ? (
      <BtnExterno href={href}>{ctaLabel ?? 'Acessar'}</BtnExterno>
    ) : (
      <BtnInterno to={href}>{ctaLabel ?? 'Acessar'}</BtnInterno>
    )}
  </div>
  );
}