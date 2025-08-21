import AxTeleCard from './AxTeleCard';
import type { TeleconsultaStep } from '../data/axTele';
import { usePassos } from '../hooks/usePassos';
import BtnAcao from '../../../components/Botao/BtnAcao';

type AxTeleListProps = {
  title: string;
  steps: TeleconsultaStep[];
  showControls?: boolean; //* Voltar/Próximo
};

export default function AxTeleList({ title, steps, showControls = false }: AxTeleListProps) {
  const { idx, canPrev, canNext, prev, next } = usePassos(steps.length);

  return (
    <section>
      <h3>{title}</h3>
      {showControls ? (
        <>
          <ul>
            <AxTeleCard step={steps[idx]} />
          </ul>
          <div className='flex gap-2'>
            <BtnAcao onClick={prev} disabled={!canPrev}>
              Voltar
            </BtnAcao>
            <BtnAcao onClick={next} disabled={!canNext}>
              Próximo
            </BtnAcao>
          </div>
        </>
      ) : (
        //* lista completa
        <ul>
          {steps.map((s, i) => (
            <AxTeleCard key={i} step={s} />
          ))}
        </ul>
      )}
    </section>
  );
}
