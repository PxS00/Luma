import { MOBILE_PASSOS, STORE_LINKS } from '../../data/passosTeleconsulta';
import BtnExterno from '../Botao/BtnExterno';
import ListaPassos from '../Passos/ListaPassos';

export default function MobileTele() {
  return (
    <section>
      <div>
        <h2>Usar pelo Celular</h2>
        <p>
          Para uma experiência mais completa, recomendamos usar o app do
          <strong> Portal do Paciente HC</strong>.
        </p>
        <div>
          <BtnExterno href={STORE_LINKS.play.href} target='_blank'>
            <img src={STORE_LINKS.play.icon} alt={STORE_LINKS.play.alt} width={20} height={20} />{' '}
            Abrir na Play Store
          </BtnExterno>
          <BtnExterno href={STORE_LINKS.app.href} target='_blank'>
            <img src={STORE_LINKS.app.icon} alt={STORE_LINKS.app.alt} width={20} height={20} />{' '}
            Abrir na App Store
          </BtnExterno>
        </div>
      </div>

      <ListaPassos titulo='Como usar no App' passos={MOBILE_PASSOS} mostrarControles />
    </section>
  );
}
