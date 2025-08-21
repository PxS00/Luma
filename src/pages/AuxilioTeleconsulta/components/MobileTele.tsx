import AxTeleList from './AxTeleList';
import BtnExterno from '../../../components/Botao/BtnExterno';
import { MOBILE_STEPS, STORE_LINKS } from '../data/axTele';

export default function MobileTele() {
  return (
    <section>
      <div>
        <h2>Usar pelo Celular</h2>
        <p>
          Para uma experiência mais completa, recomendamos usar o app do
          <strong> Portal do Paciente HC</strong>.
        </p>

        <div className='flex gap-3'>
          <BtnExterno href={STORE_LINKS.play.href}>
            <img src={STORE_LINKS.play.icon} alt={STORE_LINKS.play.alt} />
            <span className='align-middle'>Abrir na Play Store</span>
          </BtnExterno>

          <BtnExterno href={STORE_LINKS.app.href}>
            <img src={STORE_LINKS.app.icon} alt={STORE_LINKS.app.alt} />
            <span className='align-middle'>Abrir na App Store</span>
          </BtnExterno>
        </div>
      </div>

      <AxTeleList title='Como usar no App' steps={MOBILE_STEPS} showControls />
    </section>
  );
}
