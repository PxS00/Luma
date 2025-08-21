import BtnExterno from '../Botao/BtnExterno';
import BtnNav from '../Botao/BtnNav';
import { HEADER_MENU } from '../data/navItems';

export default function MainMenu() {
  return (
    <ul className='flex justify-center flex-wrap gap-3 py-2.5 list-none m-0'>
      {HEADER_MENU.map((item) => (
        <li key={item.href}>
          {item.external ? (
            <BtnExterno href={item.href}>{item.label}</BtnExterno>
          ) : (
            <BtnNav to={item.href}>{item.label}</BtnNav>
          )}
        </li>
      ))}
    </ul>
  );
}
