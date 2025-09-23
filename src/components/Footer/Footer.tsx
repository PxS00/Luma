import { FOOTER_MENU } from '@/config/navigation';
import BtnExterno from '../Button/BtnExterno';
import BtnNav from '../Button/BtnNav';

/**
 * Rodapé da aplicação
 * Contém copyright e links de navegação
 */
export default function Footer() {
  return (
    <footer className='mt-auto w-full box-border bg-gradient-to-r from-toColor to-fromColor text-white py-6 text-center'>
      <div className='max-w-[1200px] mx-auto px-5'>
        <p className='mb-2.5 text-sm'>&copy; 2025 LumaHC. Todos os direitos reservados.</p>

        <ul className='list-none p-0 m-0 flex justify-center flex-wrap gap-4'>
          {FOOTER_MENU.map((item) => (
            <li key={item.href}>
              {item.external ? (
                <BtnExterno href={item.href} className='text-sm py-2 px-1'>
                  {item.label}
                </BtnExterno>
              ) : (
                <BtnNav to={item.href} className='text-sm'>
                  {item.label}
                </BtnNav>
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
