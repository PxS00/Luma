import type { FaqDados } from '@/data/faqDados';
import BtnExterno from '../Botao/BtnExterno';
import ToggleSection from '../ToggleSection/ToggleSection';

type Props = { item: FaqDados };

export default function FaqItem({ item }: Props) {
  return (
    <ToggleSection title={item.pergunta}>
      <div>
        {item.resposta}
        {item.link && (
          <BtnExterno
            href={item.link}
            target='_blank'
            className='ml-2 px-2 py-1 text-[10px] bg-[#FFF8E1]'
          >
            Teleconsulta
          </BtnExterno>
        )}
      </div>
    </ToggleSection>
  );
}
