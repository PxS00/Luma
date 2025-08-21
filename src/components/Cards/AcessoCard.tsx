import BtnInterno from '../Botao/BtnInterno';
import BtnExterno from '../Botao/BtnExterno';

type AcessoCardProps = {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
  href: string;
  external?: boolean;
};

export default function AcessoCard({
  imgSrc,
  imgAlt,
  title,
  description,
  href,
  external = false,
}: AcessoCardProps) {
  return (
    <div
      className='flex-1 basis-[300px] max-w-[300px]
        flex flex-col justify-between items-center
        bg-[#FDE6C6] rounded-xl p-4 text-center
        shadow-[0_2px_6px_rgba(0,0,0,0.05)]'
    >
      <div>
        <img src={imgSrc} alt={imgAlt} className='h-[50px] mx-auto mb-2.5' loading='lazy' />
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
