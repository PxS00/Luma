import type { FaqData } from '@/types/faq';
import BtnExterno from '../Botao/BtnExterno';
import ToggleSection from '../ToggleSection/ToggleSection';

type FaqItemProps = { item: FaqData };

/**
 * Item individual do FAQ
 * Exibe pergunta expansível com resposta e link opcional
 */
export default function FaqItem({ item }: FaqItemProps) {
  return (
    <ToggleSection title={item.question}>
      <div>
        {item.answer}
        {item.link && (
          <BtnExterno href={item.link} target='_blank' className='py-0.3 px-0.5 text-[12px] ml-3'>
            Teleconsulta
          </BtnExterno>
        )}
      </div>
    </ToggleSection>
  );
}
