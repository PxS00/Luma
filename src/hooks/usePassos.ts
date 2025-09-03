import { useState } from 'react';

/**
 * Hook para navegação em sequência de passos
 * Usado em carrosseis, wizards e navegação step-by-step
 * 
 * @param total - Número total de passos
 * @param start - Índice inicial (padrão: 0)
 * @returns Estado e funções para controlar navegação
 */
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
