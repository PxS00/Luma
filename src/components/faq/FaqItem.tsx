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
          <BtnExterno href={item.link} target='_blank' className='py-0.3 px-0.5 text-[12px] ml-3'>
            Teleconsulta
          </BtnExterno>
        )}
      </div>
    </ToggleSection>
  );
}
