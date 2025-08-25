import { TELE_MOBILE } from '@/data/passoAPasso';

import CarrosselPassos from '../Passos/CarrosselPassos';
import BtnStore from '../Botao/BtnStore';

export default function MobileTele() {
  return (
    <section>
      <div>
        <h2>Usar pelo Celular</h2>
        <p>
          Para uma experiência mais completa, recomendamos usar o app do
          <strong> Portal do Paciente HC</strong>.
        </p>
        <BtnStore />
      </div>
      <CarrosselPassos titulo='Como usar no App' passos={TELE_MOBILE} autoMs={8000} />
    </section>
  );
}
