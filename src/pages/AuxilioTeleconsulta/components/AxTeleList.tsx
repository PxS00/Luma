import AxTeleCard from './AxTeleCard';
import type { TeleconsultaStep } from '../data/axTele';
import { usePassos } from '../hooks/usePassos';

type Props = {
  title: string;
  steps: TeleconsultaStep[];
  showControls?: boolean; //* Voltar/Próximo
};

export default function AxTeleList({ title, steps, showControls = false }: Props) {
  const { idx, canPrev, canNext, prev, next } = usePassos(steps.length);

  return (
    <section>
      <h3>{title}</h3>
      {showControls ? (
        <>
          <ul>
            <AxTeleCard step={steps[idx]} />
          </ul>
          <div>
            <button onClick={prev} disabled={!canPrev}>
              Voltar
            </button>
            <button onClick={next} disabled={!canNext}>
              Próximo
            </button>
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
