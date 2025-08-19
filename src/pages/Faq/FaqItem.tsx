import type { FaqData } from './faqData';

type Props = { item: FaqData };

export default function FaqItem({ item }: Props) {
  return (
    <div className="faq-item">
      <h3>{item.pergunta}</h3>
      <p>
        {item.resposta}
        {item.link && (
          <>
            {' '}
            <a href={item.link} target="_blank" rel="noreferrer">
              Saiba mais
            </a>
          </>
        )}
      </p>
    </div>
  );
}
