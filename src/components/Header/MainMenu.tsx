import BtnExterno from '../Botao/BtnExterno';
import BtnNav from '../Botao/BtnNav';
import { HEADER_MENU } from '../../data/navigationData';

/**
 * Menu principal de navegação
 * Renderiza lista de links internos e externos do cabeçalho
 */
export default function MainMenu() {
  return (
    <ul role="menu"className='flex flex-col items-end gap-3 py-2.5 list-none m-0'>
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
