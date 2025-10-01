import { removeLoggedUser } from '@/utils/userStorage';
import { useNavigate } from 'react-router-dom';

/**
 * Botão de logout que remove o usuário logado e redireciona para home
 * Usado no menu de usuário para fazer logoff
 */
export default function BtnLogout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeLoggedUser();
    navigate('/');
  };
  return (
    <button
      className='block w-full text-left text-red-600 hover:underline font-semibold px-4 py-2 rounded transition'
      onClick={handleLogout}
      aria-label='Sair da conta'
    >
      Sair
    </button>
  );
}
