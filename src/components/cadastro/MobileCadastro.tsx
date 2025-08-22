import { PASSOS_MOBILE, STORE_LINKS } from "@/data/passosCadastro";
import BtnExterno from "../Botao/BtnExterno";
import ListaPassos from "../Passos/ListaPassos";


export default function MobileCadastro() {
  return (
    <section>
      <div>
        <h2>Baixe o App</h2>
        <p>Para uma experiência mais completa, recomendamos baixar o Portal do Paciente HC.</p>
        <div>
          <BtnExterno href={STORE_LINKS.play.href} target='_blank'>
            <img src={STORE_LINKS.play.icon} alt={STORE_LINKS.play.alt} width={20} height={20} />{' '}
            Baixar na Play Store
          </BtnExterno>
          <BtnExterno href={STORE_LINKS.app.href} target='_blank'>
            <img src={STORE_LINKS.app.icon} alt={STORE_LINKS.app.alt} width={20} height={20} />{' '}
            Baixar na App Store
          </BtnExterno>
        </div>
      </div>

      <ListaPassos titulo='Como usar no App' passos={PASSOS_MOBILE} mostrarControles />
    </section>
  );
}
