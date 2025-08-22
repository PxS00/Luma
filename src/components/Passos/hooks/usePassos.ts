import { useState } from 'react';

export function usePassos(total: number, start = 0) {
  const [indice, setIndice] = useState(start);

  const podeVoltar = indice > 0;
  const podeAvancar = indice < total - 1;

  function voltar() {
    if (podeVoltar) setIndice((i) => i - 1);
  }

  function avancar() {
    if (podeAvancar) setIndice((i) => i + 1);
  }

  function irPara(i: number) {
    if (i >= 0 && i < total) setIndice(i);
  }

  return { indice, podeVoltar, podeAvancar, voltar, avancar, irPara };
}
