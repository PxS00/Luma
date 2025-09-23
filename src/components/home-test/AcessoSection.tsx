import { HOME_CARDS } from '@/config/homeCards';
import AcessoCard from '../Cards/AcessoCard';

/**
 * Seção de acessos rápidos da página inicial
 * Exibe cards para as principais funcionalidades da aplicação
 */
export default function AcessosSection() {
  return (
    <section className='flex flex-wrap justify-center p-5 gap-5'>
      {HOME_CARDS.map((c) => (
        <AcessoCard
          key={c.href}
          imgSrc={c.imgSrc}
          imgAlt={c.imgAlt}
          title={c.title}
          description={c.description}
          href={c.href}
        />
      ))}
    </section>
  );
}
