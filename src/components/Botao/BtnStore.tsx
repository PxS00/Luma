import { STORE_LINKS } from '@/data/passoAPasso';
import BtnExterno from './BtnExterno';

/**
 * Botões para download de aplicativos
 * Exibe links para Play Store e App Store
 */
export default function BtnStore() {
  return (
    <nav aria-label='Links para download de aplicativos' className='w-full'>
      <div className='w-full flex flex-wrap items-center justify-center gap-3'>
        <BtnExterno
          href={STORE_LINKS.play.href}
          target='_blank'
          aria-label='Abrir na Play Store'
          className='inline-flex items-center gap-2 px-4 py-2'
        >
          <img
            src={STORE_LINKS.play.icon}
            alt={STORE_LINKS.play.alt}
            width={20}
            height={20}
            aria-hidden='true'
          />
          <span>Abrir na Play Store</span>
        </BtnExterno>

        <BtnExterno
          href={STORE_LINKS.app.href}
          target='_blank'
          aria-label='Abrir na App Store'
          className='inline-flex items-center gap-2 px-4 py-2'
        >
          <img
            src={STORE_LINKS.app.icon}
            alt={STORE_LINKS.app.alt}
            width={20}
            height={20}
            aria-hidden='true'
          />
          <span>Abrir na App Store</span>
        </BtnExterno>
      </div>
    </nav>
  );
}
