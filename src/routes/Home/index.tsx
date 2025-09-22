import { useEffect } from 'react';
import AcessosSection from '@/components/Home/AcessosSection';
import BoasVindasSection from '@/components/Home/BoasVindasSection';

/**
 * Página inicial da aplicação
 * Exibe boas-vindas e seção de acessos rápidos
 */
export default function Home() {
  useEffect(() => {
    document.title = 'Início';
  }, []);
  return (
    <main className='conteudo'>
      <BoasVindasSection />
      <AcessosSection />
    </main>
  );
}
