import { useAuth } from '@/hooks/useAuth';

/**
 * Seção de boas-vindas da página inicial
 * Exibe logo, mensagem de boas-vindas e link para formulário
 * Mostra mensagem personalizada quando usuário está logado
 */
export default function BoasVindasSection() {
  const { isLoggedIn, userData } = useAuth();

  // Retorna uma saudação baseada na hora atual
  const getGreeting = () => {
    try {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return 'Bom dia';
      if (hour >= 12 && hour < 18) return 'Boa tarde';
      return 'Boa noite';
    } catch (_) {
      return 'Olá';
    }
  };

  return (
    <section className='w-full'>
      {/* Container alinhado com header/cards */}
      <div className='mx-auto w-full max-w-screen-lg px-4 sm:px-5 lg:px-6'>
        {/* Conteúdo da seção */}
        <div className='flex flex-col items-center text-center gap-4 py-6 sm:py-8 lg:py-12'>
          <div className='texto max-w-3xl'>
            {isLoggedIn && userData ? (
              // Mensagem personalizada para usuário logado (original)
              <>
                <h2
                  className='
                    text-2xl sm:text-3xl md:text-4xl lg:text-4xl 
                    text-fontPrimary font-semibold mb-3
                  '
                >
                  {getGreeting()}, {userData.nome}!
                </h2>

                <p
                  className='
                    text-fontTertiary 
                    text-base sm:text-lg md:text-lg lg:text-xl
                    leading-relaxed mb-4
                  '
                >
                  Que bom ter você de volta! Agora você pode acessar todas as funcionalidades do seu
                  Portal de Apoio. Navegue pelos cards abaixo para encontrar a ajuda que precisa
                  para seu atendimento no Hospital das Clínicas.
                </p>
              </>
            ) : (
              // Mensagem padrão para visitantes
              <>
                <h2
                  className='
                    text-2xl sm:text-3xl md:text-4xl lg:text-4xl 
                    text-fontPrimary font-semibold mb-3
                  '
                >
                  Bem-vinda ao seu Portal de Apoio!
                </h2>

                <p
                  className='
                    text-fontTertiary 
                    text-base sm:text-lg md:text-lg lg:text-xl
                    leading-relaxed mb-4
                  '
                >
                  Estamos aqui para te acompanhar em cada etapa do seu atendimento online no
                  Hospital das Clínicas. Se quiser, você pode preencher um breve formulário para que
                  possamos oferecer um suporte ainda mais personalizado. Acesse pelo menu Perfil
                  quando estiver pronta.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
