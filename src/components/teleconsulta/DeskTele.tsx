import BtnExterno from '../Botao/BtnExterno';
import ListaPassos from '../Passos/CarrosselPassos';
import { TELE_DESK } from '@/data/passoAPasso';

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

      <ListaPassos titulo='Como usar no Navegador' passos={TELE_DESK} autoMs={8000} />
    </section>
  );
}
