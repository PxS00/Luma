import { MAIN_MENU } from '../../menu/items';

export default function MainMenu() {
  return (
    <ul className="menu">
      {MAIN_MENU.map((item) => (
        <li key={item.href}>
          <a className="menu-link" href={item.href}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
