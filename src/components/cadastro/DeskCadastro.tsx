import { CADASTRO_DESK } from '@/data/passoAPasso';
import BtnExterno from '../Botao/BtnExterno';
import ListaPassos from '../Passos/CarrosselPassos';

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
        passos={CADASTRO_DESK}
        autoMs={8000}
        className='lista-passos-desk' //! hook p/ Tailwind
      />
    </section>
  );
}
