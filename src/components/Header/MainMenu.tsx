import type { MainMenuProps } from '@/types/navigation';
import { useLocation } from 'react-router-dom';
import { HEADER_MENU } from '../../config/navigation';
import BtnExterno from '../Button/BtnExterno';
import BtnNav from '../Button/BtnNav';

/**
 * Menu principal de navegação
 * Filtra itens com base na busca e oculta página atual
 */

function normalize(s: string) {
  return s
    ?.toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

export default function MainMenu({ filter = '', excludeHrefs = [] }: MainMenuProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const f = normalize(filter.trim());
  let items = f ? HEADER_MENU.filter((it) => normalize(it.label).includes(f)) : HEADER_MENU;

  items = items.filter((it) => it.href !== currentPath);
  if (excludeHrefs.length) {
    const set = new Set(excludeHrefs);
    items = items.filter((it) => !set.has(it.href));
  }

  if (items.length === 0) {
    return (
      <div className='text-white/80 text-sm italic px-2 py-3'>
        Nenhum resultado para “{filter}”.
      </div>
    );
  }

  return (
    <ul
      role='menubar'
      className='
    w-full flex flex-col gap-3 list-none m-0 py-2.5
    lg:flex-row lg:flex-nowrap lg:items-center lg:whitespace-nowrap lg:max-w-full lg:overflow-x-auto lg:px-2 lg:py-0
    lg:gap-5
    xl:gap-8          
    [scrollbar-width:none] [-ms-overflow-style:none]
  '
    >
      {/* esconder scrollbar em WebKit */}
      <style>{`.lg\\:overflow-x-auto::-webkit-scrollbar{display:none;}`}</style>

      {items.map((item) => (
        <li
          key={item.href}
          className='
            w-full lg:w-auto
            lg:shrink-0
          '
          role='none'
        >
          {item.external ? (
            <BtnExterno
              href={item.href}
              className='block w-full lg:w-auto text-left lg:text-center'
            >
              {item.label}
            </BtnExterno>
          ) : item.Icon ? (
            (() => {
              const isPerfil = item.label === 'Perfil';
              return (
                <BtnNav
                  to={item.href}
                  aria-label={item.label}
                  variant='icon'
                  className={isPerfil ? 'h-20 w-20 md:h-24 md:w-24 text-white hover:text-white' : ''}
                >
                  <item.Icon size={isPerfil ? 53 : 22} aria-hidden />
                </BtnNav>
              );
            })()
          ) : (
            <BtnNav
              to={item.href}
              aria-label={item.label}
              className='block w-full lg:w-auto text-left lg:text-center'
            >
              {item.label}
            </BtnNav>
          )}
        </li>
      ))}
    </ul>
  );
}
