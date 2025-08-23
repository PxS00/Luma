import AcessosSection from '@/components/home/AcessosSection';
import BoasVindasSection from '@/components/home/BoasVindasSection';

export default function Home() {
  return (
    <main className='conteudo'>
      <BoasVindasSection />
      <AcessosSection />
    </main>
  );
}
