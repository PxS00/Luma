import { useState } from 'react';

export function usePassos(total: number, start = 0) {
  const [idx, setIdx] = useState(start); //* Índice do passo atual, inicia em 0 ou no valor de start
  const canPrev = idx > 0; //* Verifica se é possível ir para o passo anterior
  const canNext = idx < total - 1; //* Verifica se é possível ir para o passo anterior ou próximo

  function prev() {
    if (canPrev) setIdx((i) => i - 1);
  } //* Voltar
  function next() {
    if (canNext) setIdx((i) => i + 1);
  } //* Próximo
  function go(i: number) {
    if (i >= 0 && i < total) setIdx(i);
  } //* Ir para passo específico

  return { idx, canPrev, canNext, prev, next, go };
}
