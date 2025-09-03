import AcessosSection from '@/components/home/AcessosSection';
import BoasVindasSection from '@/components/home/BoasVindasSection';

/**
 * Página inicial da aplicação
 * Exibe boas-vindas e seção de acessos rápidos
 */
export default function Home() {
  return (
    <main className='conteudo'>
      <BoasVindasSection />
      <AcessosSection />
    </main>
  );
}
