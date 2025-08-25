import { user } from '@/data/imagens';
import MainMenu from './MainMenu';
export default function Header() {
  return (
    <header className='relative w-full h-auto bg-gradient-to-b from-fromColor to-toColor py-5 z-[2] '>
      <nav className='nav-bar'>
        <div className='flex flex-col items-center mb-4 text-center'>
          <img
            src={user}
            alt='Imagem de um Avatar'
            className='w-20 h-20 rounded-full p-[3px] mb-2 object-cover shadow-[0_4px_12px_rgba(0,0,0,.5)] '
          />
          <h2 className='text-fontTertiary text-x1 font-bold my-1 '>Olá, Usuário!</h2>
          <p className='text-base text-fontTertiary m-0'>Vamos te ajudar</p>
        </div>
        <MainMenu />
      </nav>
    </header>
  );
}
