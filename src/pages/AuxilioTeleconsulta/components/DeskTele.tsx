import { DESK_STEPS } from '../data/axTele';
import StepsList from './AxTeleList';

export default function DeskTele() {
  return (
    <section>
      <div>
        <h2>Acesse pelo Navegador</h2>
        <p>Você também pode acessar diretamente pelo site, sem instalar nada.</p>
        <a href='https://portaldopaciente.hc.fm.usp.br/' target='_blank' rel='noreferrer'>
          Acessar Site
        </a>
      </div>

      <StepsList title='Como usar o Navegador' steps={DESK_STEPS} showControls />
    </section>
  );
}
