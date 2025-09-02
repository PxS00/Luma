import { CADASTRO_MOBILE } from '@/data/passoAPasso';
import CarrosselPassos from '../Passos/CarrosselPassos';
import BtnStore from '../Botao/BtnStore';

export default function MobileCadastro() {
  return (
    <section className='flex flex-col  p-5 gap-4 text-center items-center justify-center font-bold '>
      <div className='flex flex-col items-center text-center gap-3'>
        <h2>Baixe o App</h2>
        <p>Para uma experiência mais completa, recomendamos baixar o Portal do Paciente HC.</p>
        <div>
          <BtnStore />
        </div>
      </div>

      <CarrosselPassos
        title='Como usar no App'
        passos={CADASTRO_MOBILE}
        autoMs={8000}
        className='lista-passos-mobile'
        contentClassName='max-w-[420px] md:max-w-[520px] mx-auto'
        imgClassName='max-h-[420px]' // controla altura máxima da imagem
      />
    </section>
  );
}
