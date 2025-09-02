import { TELE_MOBILE } from '@/data/passoAPasso';
import CarrosselPassos from '../Passos/CarrosselPassos';
import BtnStore from '../Botao/BtnStore';

export default function MobileTele() {
  return (
    <section className='flex flex-col  p-5 gap-4 text-center items-center justify-center font-bold '>
      <div className='flex flex-col items-center text-center gap-3'>
        <h2>Usar pelo Celular</h2>
        <p>
          Para uma experiência mais completa, recomendamos usar o app do
          <strong> Portal do Paciente HC</strong>.
        </p>
        <BtnStore />
      </div>
      <CarrosselPassos
        title='Como usar no App'
        passos={TELE_MOBILE}
        autoMs={8000}
        contentClassName='max-w-[420px] md:max-w-[520px] mx-auto'
        imgClassName='max-h-[420px]' // controla altura máxima da imagem
      />
    </section>
  );
}
