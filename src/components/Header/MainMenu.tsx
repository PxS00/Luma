import BtnExterno from '../Button/BtnExterno';
import BtnNav from '../Button/BtnNav';
import { HEADER_MENU } from '../../config/navigation';
import { useLocation } from 'react-router-dom';

type Props = { filter?: string };

function normalize(s: string) {
  return s?.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

export default function MainMenu({ filter = '' }: Props) {
  const location = useLocation();
  const currentPath = location.pathname;

  const f = normalize(filter.trim());
  let items = f
    ? HEADER_MENU.filter(it => normalize(it.label).includes(f))
    : HEADER_MENU;

  items = items.filter(it => it.href !== currentPath);

  if (items.length === 0) {
    return (
      <div className="text-white/80 text-sm italic px-2 py-3">
        Nenhum resultado para “{filter}”.
      </div>
    );
  }

  return (
<ul
  role="menubar"
  className="
    w-full flex flex-col gap-3 list-none m-0 py-2.5
    lg:flex-row lg:flex-nowrap lg:whitespace-nowrap lg:max-w-full lg:overflow-x-auto
    lg:gap-4          /* espaço entre botões em >=992px */
    xl:gap-8          /* mais espaço em >=1300px */
    [scrollbar-width:none] [-ms-overflow-style:none]
  "
>

      {/* esconder scrollbar em WebKit */}
      <style>{`.lg\\:overflow-x-auto::-webkit-scrollbar{display:none;}`}</style>

      {items.map(item => (
        <li
          key={item.href}
          className="
            w-full lg:w-auto
            lg:shrink-0
          "
          role="none"
        >
          {item.external ? (
            <BtnExterno
              href={item.href}
              className="block w-full lg:w-auto text-left lg:text-center"
            >
              {item.label}
            </BtnExterno>
          ) : (
            <BtnNav
              to={item.href}
              className="block w-full lg:w-auto text-left lg:text-center"
            >
              {item.label}
            </BtnNav>
          )}
        </li>
      ))}
    </ul>
  );
}
