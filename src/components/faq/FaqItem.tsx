import type { FaqType } from "@/data/faqDados";
import BtnExterno from "../Botao/BtnExterno";

type Props = { item: FaqType };

export default function FaqItem({ item }: Props) {
  return (
    <div className=' mb-4 rounded-[12px] border border-borderColor bg-backPrimary transition-colors duration-300 ease-in-out'>
      <h3
        className='py-2.5 px-3.5 m-0 text-center text-[18px]
          cursor-pointer text-clikColor font-bold
          transition-[font-size]'
      >
        {item.pergunta}
      </h3>
      <p className=' rounded-b-[12px] py-2.5 px-3.5 m-0 bg-[#FFF8E1] text-fontTertiary border-t border-borderColor text-base'>
        {item.resposta}
        {item.link && (
          <>
            <BtnExterno
              href={item.link}
              target='_blank'
              className='px-2 py-1 text-[10px] bg-[#FFF8E1] '
            >
              Teleconsulta
            </BtnExterno>
          </>
        )}
      </p>
    </div>
  );
}
