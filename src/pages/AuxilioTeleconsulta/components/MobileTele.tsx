import AxTeleList from './AxTeleList';
import BotaoStore from './BotaoStore';
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
        <div>
          <BotaoStore {...STORE_LINKS.play}>Abrir na Play Store</BotaoStore>{' '}
          <BotaoStore {...STORE_LINKS.app}>Abrir na App Store</BotaoStore>
        </div>
      </div>

      <AxTeleList title='Como usar no App' steps={MOBILE_STEPS} showControls />
    </section>
  );
}
