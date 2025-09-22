import BtnInterno from '../Button/BtnInterno';

/**
 * Seção de boas-vindas da página inicial
 * Exibe logo, mensagem de boas-vindas e link para formulário
 */
export default function BoasVindasSection() {
  return (
    <section className="w-full">
      {/* Container alinhado com header/cards */}
      <div className="mx-auto w-full max-w-screen-lg px-4 sm:px-5 lg:px-6">
        {/* Conteúdo da seção */}
        <div className="flex flex-col items-start text-left gap-4 py-6 sm:py-8 lg:py-12">
          <div className="texto max-w-prose">
            <h2
              className="
                text-2xl sm:text-3xl md:text-4xl lg:text-4xl 
                text-fontPrimary font-semibold mb-3
              "
            >
              Bem-vinda ao seu Portal de Apoio!
            </h2>

            <p
              className="
                text-fontTertiary 
                text-base sm:text-lg md:text-lg lg:text-xl
                leading-relaxed mb-4
              "
            >
              Estamos aqui para te acompanhar em cada etapa do seu atendimento online no Hospital
              das Clínicas. Se quiser, você pode preencher um breve formulário para que possamos
              oferecer um suporte ainda mais personalizado. É só clicar no botão abaixo quando
              estiver pronta!
            </p>
          </div>

          
        <BtnInterno to='/formulario' className='bg-clikColor hover:bg-hoverBtn'>
          Preencher Formulário
        </BtnInterno>
      </div>
    </div>
    </section>
  );
}
