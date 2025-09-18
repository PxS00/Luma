import { logo } from '@/assets/images';
import BtnInterno from '../Botao/BtnInterno';


/**
 * Seção de boas-vindas da página inicial
 * Exibe logo, mensagem de boas-vindas e link para formulário
 */
export default function BoasVindasSection() {
  return (
    <section className='flex felx-col items-center text-left p-5 gap-4 '>
      <img src={logo} alt='Logo da LumaHC' className='max-w-[200px]' />
      <div className='texto'>
        <h2 className='text-2xl text-fontPrimary mb-3 '>Bem-vinda ao seu Portal de Apoio!</h2>
        <p className='text-fontTertiary text-base leading-relaxed mb-4'>
          Estamos aqui para te acompanhar em cada etapa do seu atendimento online no Hospital das
          Clínicas. Se quiser, você pode preencher um breve formulário para que possamos oferecer um
          suporte ainda mais personalizado. É só clicar no botão abaixo quando estiver pronta!
        </p>
        {/* TODO: migrar formulário para página React (Link) no futuro */}
        <BtnInterno to="/formulario" className="bg-clikColor hover:bg-hoverBtn">
          Preencher Formulário
        </BtnInterno>
      </div>
    </section>
  );
}
