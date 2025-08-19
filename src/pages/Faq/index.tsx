import { faqData } from './faqData';
import FaqItem from './FaqItem';

export default function Faq() {
  return (
    <main>
      <div className="container">
        <h1 className="faq-title">Perguntas Frequentes (FAQ)</h1>
        <p className="faq-subtitle">
          Encontre respostas rápidas sobre o uso da plataforma de Saúde Digital.
        </p>
        <div className="faq-section">
          {faqData.map((item, idx) => (
            <FaqItem key={idx} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
