import BtnExterno from '../../../components/Botao/BtnExterno';
import type { FaqData } from '../data/faqData';

type Props = { item: FaqData };

export default function FaqItem({ item }: Props) {
  return (
    <div className='faq-item'>
      <h3>{item.pergunta}</h3>
      <p>
        {item.resposta}
        {item.link && (
          <>
            {' '}
            <BtnExterno href={item.link} target='_blank' >
              Saiba mais
            </BtnExterno>
          </>
        )}
      </p>
    </div>
  );
}
