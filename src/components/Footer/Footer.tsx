import { FOOTER_MENU } from '../nav/items';

export default function Footer() {
  return (
    <footer className='relative bottom-0 mt-auto w-full box-border bg-gradient-to-r from-toColor to-fromColor text-white py-6 text-center'>
      <div className='max-w-[1200px] mx-auto px-5'>
        <p className='mb-2.5 text-sm'>&copy; 2025 LumaHC. Todos os direitos reservados.</p>

        <ul className='list-none p-0 m-0 flex justify-center flex-wrap gap-4'>
          {FOOTER_MENU.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className='text-white no-underline font-bold text-sm hover:underline'
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
