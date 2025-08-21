import BtnExterno from '../../../components/Botao/BtnExterno';
import { DESK_STEPS } from '../data/axTele';
import AxTeleList from './AxTeleList';

export default function DeskTele() {
  return (
    <section>
      <div>
        <h2>Acesse pelo Navegador</h2>
        <p>Você também pode acessar diretamente pelo site, sem instalar nada.</p>
        <BtnExterno href='https://portaldopaciente.hc.fm.usp.br/' target='_blank'>
          Acessar Site
        </BtnExterno>
      </div>

      <AxTeleList title='Como usar o Navegador' steps={DESK_STEPS} showControls />
    </section>
  );
}
