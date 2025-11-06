import { logo } from '@/assets/images';
import { useAuth } from '@/hooks/useAuth';
import { useRef, useState } from 'react';
import BtnLogoutHeader from '../Button/BtnLogoutHeader';
import BtnMenu from '../Button/BtnMenu';
import BtnSearch from '../Button/BtnSearch';
import MainMenu from './MainMenu';
import SearchBox from './SearchBox';
import BtnNav from '../Button/BtnNav';
import { MdAccountCircle } from 'react-icons/md';

/**
 * Componente de cabeçalho da aplicação
 * Exibe avatar do usuário, saudação e menu principal
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, logout } = useAuth();

  const submitSearch = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024 && !menuOpen) {
      setMenuOpen(true);
    }
    setTimeout(() => {
      menuRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  return (
    <header className='w-full bg-linear-to-b from-fromColor to-toColor'>
      <div className='mx-auto w-full max-w-screen-xl px-6 sm:px-8 lg:px-10 xl:px-12'>
        {/* linha do header */}
        <div
          className='
            flex items-center justify-between 
            h-16 sm:h-20 lg:h-24
            lg:grid lg:grid-cols-[auto_1fr_auto] lg:justify-items-center lg:gap-4
            min-w-0
          '
        >
          {/* Logo */}
          <a className='shrink-0 pl-2 lg:pl-0 xl:pl-4' href='/' aria-label='Ir para página inicial'>
            <div
              className='
                h-12 w-12               
                sm:h-14 sm:w-14         
                md:h-16 md:w-16         
                lg:h-18 lg:w-18         
                xl:h-24 xl:w-24      
                shrink-0
              '
            >
              <img
                src={logo}
                alt='Imagem da logo do LumaHC'
                className='h-full w-full object-contain max-h-none max-w-none select-none'
                draggable={false}
              />
            </div>
          </a>

          {/* Menu central */}
          <div className='hidden lg:flex lg:justify-self-center'>
            <div className='flex flex-nowrap items-center gap-3 whitespace-nowrap'>
              <MainMenu filter={query} />
            </div>
          </div>

          {/* Ações */}
          <div
            className='
              flex items-center gap-2 sm:gap-3
              pr-[env(safe-area-inset-right)]
            '
          >
            {/* Botão de busca (mobile) */}
            <button
              type='button'
              aria-label='Buscar'
              aria-expanded={searchOpen}
              aria-controls='search-popover'
              onClick={() => setSearchOpen((v) => !v)}
              className='inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center lg:hidden'
            >
              <BtnSearch />
            </button>

            {/* Botão de menu (mobile) */}
            <div className='lg:hidden'>
              <BtnMenu open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
            </div>

            {/* Perfil (mobile) */}
            <div className='lg:hidden'>
              <BtnNav
                to='/perfil'
                aria-label='Perfil'
                variant='icon'
                className='h-12 w-12 p-0 text-white hover:text-white flex items-center justify-center'
              >
                <MdAccountCircle size={28} aria-hidden />
              </BtnNav>
            </div>

            {/* Botão de logout (sempre por último, colado à direita) */}
            {isLoggedIn && <BtnLogoutHeader onClick={logout} className='ml-auto mr-1' />}
          </div>
        </div>

        {/* Popover de busca (mobile) */}
        {searchOpen && (
          <div id='search-popover' className='mt-2 lg:hidden'>
            <SearchBox
              open
              value={query}
              onChange={setQuery}
              onSubmit={submitSearch}
              onClose={() => setSearchOpen(false)}
            />
          </div>
        )}

        {/* Menu colapsado (mobile) */}
        <div
          id='primary-navigation'
          ref={menuRef}
          className={`mt-3 ${menuOpen ? 'block' : 'hidden'} lg:hidden`}
        >
          <MainMenu filter={query} excludeHrefs={['/perfil']} />
        </div>
      </div>
    </header>
  );
}
