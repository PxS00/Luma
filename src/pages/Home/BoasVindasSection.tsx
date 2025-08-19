export default function BoasVindasSection() {
  return (
    <section className="boas-vindas">
      <div className="texto">
        <h2>Bem-vinda ao seu Portal de Apoio!</h2>
        <p>
          Estamos aqui para te acompanhar em cada etapa do seu atendimento online no Hospital das
          Clínicas. Se quiser, você pode preencher um breve formulário para que possamos oferecer um
          suporte ainda mais personalizado. É só clicar no botão abaixo quando estiver pronta!
        </p>
        //*TODO: migrar formulário para página React (Link) no futuro
        <a href="/assets/formulario/formulario.html" className="botao-destaque">
          Formulário
        </a>
      </div>
    </section>
  );
}
