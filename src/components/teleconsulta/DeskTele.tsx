import BtnExterno from '../Botao/BtnExterno';
import ListaPassos from '../Passos/ListaPassos';
import { DESK_PASSOS } from '../../data/passosTeleconsulta';

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

      <ListaPassos titulo='Como usar no Navegador' passos={DESK_PASSOS} mostrarControles />
    </section>
  );
}
