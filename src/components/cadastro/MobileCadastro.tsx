import { CADASTRO_MOBILE } from '@/data/passoAPasso';
import CarrosselPassos from '../Passos/CarrosselPassos';
import BtnStore from '../Botao/BtnStore';

export default function MobileCadastro() {
  return (
    <section>
      <div>
        <h2>Baixe o App</h2>
        <p>Para uma experiência mais completa, recomendamos baixar o Portal do Paciente HC.</p>
        <div>
          <BtnStore />
        </div>
      </div>

      <CarrosselPassos
        titulo='Como usar no App'
        passos={CADASTRO_MOBILE}
        autoMs={8000}
        className='lista-passos-mobile'
      />
    </section>
  );
}
