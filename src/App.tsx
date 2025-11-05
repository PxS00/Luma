import AccessibilityMenu from '@/components/AccessibilityMenu/AccessibilityMenu';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { Outlet } from 'react-router-dom';

/**
 * Componente principal da aplicação
 * Contém o layout base com header, conteúdo e footer
 */
export default function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />

      <main className='flex-1 md:pb-8'>
        <Outlet />
      </main>

      <Footer />
      <AccessibilityMenu />
    </div>
  );
}
