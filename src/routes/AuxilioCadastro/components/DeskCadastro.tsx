import BtnExterno from '../../../components/Botao/BtnExterno';
import ListaPassos from '../../../components/Passos/ListaPassos';
import { PASSOS_DESK } from '../data/passosCadastro';

export default function DeskCadastro() {
  return (
    <section className='desk-cadastro'>
      <div className='intro'>
        <h2>Acesse pelo Navegador</h2>
        <p>Você também pode fazer seu cadastro diretamente pelo site, sem instalar nada.</p>

        <BtnExterno href='https://portaldopaciente.hc.fm.usp.br/' target='_blank'>
          Acessar Site
        </BtnExterno>
      </div>

      <ListaPassos
        titulo='Como fazer o cadastro no navegador'
        passos={PASSOS_DESK}
        mostrarControles
        className='lista-passos' //! hook p/ Tailwind
      />
    </section>
  );
}
