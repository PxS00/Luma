import { FOOTER_MENU } from '../nav/items';

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <p>&copy; 2025 LumaHC. Todos os direitos reservados.</p>
        <ul className='footer-links'>
          {FOOTER_MENU.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
