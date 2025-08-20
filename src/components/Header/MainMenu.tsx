import { NavLink } from 'react-router-dom';
import { MAIN_MENU } from '../nav/items';

const LINK_CLS =
  'inline-block px-4 py-2 bg-navBtn rounded-xl text-clikColor font-bold text-base no-underline ' +
  'transition-colors transition-transform duration-300 ease-in-out ' +
  'hover:bg-navHoverBtn hover:text-white hover:scale-105';

export default function MainMenu() {
  return (
    <ul className='flex justify-center flex-wrap gap-3 py-2.5 list-none m-0'>
      {MAIN_MENU.map((item) =>
        item.external ? (
          <li key={item.label}>
            <a
              href={item.href} target='_blank' rel='noreferrer' className={LINK_CLS}
            >
              {item.label}
            </a>
          </li>
        ) : (
          <li key={item.label}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                isActive ? `${LINK_CLS} ring-2 ring-white/40` : LINK_CLS
              }
            >
              {item.label}
            </NavLink>
          </li>
        )
      )}
    </ul>
  );
}
