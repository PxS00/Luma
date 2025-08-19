import { Link } from 'react-router-dom';
import { MAIN_MENU } from '../../nav/items';

export default function MainMenu() {
  return (
    <ul>
      {MAIN_MENU.map((item) =>
        item.external ? (
          <li key={item.label}>
            <a href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          </li>
        ) : (
          <li key={item.label}>
            <Link to={item.href}>{item.label}</Link>
          </li>
        )
      )}
    </ul>
  );
}
