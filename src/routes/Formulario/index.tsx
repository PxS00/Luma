import EscolhaModoTabs from '@/components/ChooseModeTabs/ChooseModeTabs';
import FormularioCadastro from '@/components/Form/FormCadastro';
import Login from '@/components/Form/FormLogin';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * Página de formulário com tabs para cadastro e login
 * Utiliza useParams para controle de navegação baseada em URL
 */
export default function Formulario() {
  const { tab } = useParams<{ tab?: 'cadastro' | 'login' }>();
  const navigate = useNavigate();

  // Validação e normalização do parâmetro tab
  const validTab = tab === 'cadastro' || tab === 'login' ? tab : 'cadastro';
  const isCadastro = validTab === 'cadastro';
  const defaultMode = isCadastro ? 'app' : 'nav';

  useEffect(() => {
    document.title = `LumaHC - ${isCadastro ? 'Cadastro' : 'Login'}`;

    // Redireciona para tab válida se parâmetro inválido
    if (tab && tab !== 'cadastro' && tab !== 'login') {
      navigate('/formulario/cadastro', { replace: true });
    }

    // Esconde Header/Footer enquanto estiver nesta página
    document.body.classList.add('hide-hf', 'form-gradient');
    return () => {
      document.body.classList.remove('hide-hf', 'form-gradient');
    };
  }, [tab, isCadastro, navigate]);

  return (
    <section
      aria-label='Conteúdo principal de formulário'
      className='
        containerNarrow w-full min-h-screen
        bg-gradient-to-b from-fromColor to-toColor
        flex justify-center items-start sm:items-center
        py-8 sm:py-12 lg:py-16
      '
    >
      <main
        className='
          w-full max-w-[600px] bg-backSecondary mx-auto
          p-4 sm:p-6
          rounded-[10px]
          shadow-[0_6px_20px_rgba(0,0,0,0.08)]
        '
      >
        <EscolhaModoTabs
          defaultMode={defaultMode}
          labelApp='Cadastro'
          labelNav='Login'
          app={<FormularioCadastro />}
          nav={<Login />}
          className='w-full'
          onChangeMode={(mode) => {
            navigate(`/formulario/${mode === 'app' ? 'cadastro' : 'login'}`, {
              replace: true,
            });
          }}
        />
      </main>
    </section>
  );
}
