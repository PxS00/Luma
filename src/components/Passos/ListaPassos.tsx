import { useEffect } from 'react';
import PassoView from './Passo';
import BtnAcao from '../../components/Botao/BtnAcao';
import type { Passo } from '../../types/passo';
import { usePassos } from '../../hooks/usePassos';

type Props = {
  titulo: string;
  passos: Passo[];
  mostrarControles?: boolean;
  onIndiceAlterado?: (indice: number) => void;
  className?: string;
};

export default function ListaPassos({
  titulo,
  passos,
  mostrarControles = false,
  onIndiceAlterado,
  className,
}: Props) {
  const { indice, podeVoltar, podeAvancar, voltar, avancar } = usePassos(passos.length);

  useEffect(() => {
    if (onIndiceAlterado) onIndiceAlterado(indice);
  }, [indice, onIndiceAlterado]);

  return (
    <section aria-label={titulo} className={className}>
      <h2>{titulo}</h2>

      {mostrarControles ? (
        <>
          <ul>
            <PassoView passo={passos[indice]} numeracao={indice} />
          </ul>

          <div>
            <BtnAcao onClick={voltar} disabled={!podeVoltar}>
              Voltar
            </BtnAcao>
            <BtnAcao onClick={avancar} disabled={!podeAvancar}>
              Próximo
            </BtnAcao>
          </div>
        </>
      ) : (
        <ul>
          {passos.map((p, i) => (
            <PassoView key={i} passo={p} numeracao={i} />
          ))}
        </ul>
      )}
    </section>
  );
}
