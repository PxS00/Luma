import { HOME_CARDS } from '@/config/homeCards';
import AcessoCard from '../Cards/AcessoCard';

export default function AcessosSection() {
  return (
  <section className='flex flex-wrap justify-center p-4 gap-11'>
      {HOME_CARDS.map((c) => (
        <AcessoCard
          key={c.href}
          Icon={c.Icon}
          title={c.title}
          description={c.description}
          href={c.href}
        />
      ))}
    </section>
  );
}
