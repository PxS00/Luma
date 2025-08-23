import { useEffect, useRef } from 'react';
import { usePassos } from '@/hooks/usePassos';

type Opcoes = { autoMs?: number; loop?: boolean };

export function useCarrossel(total: number, { autoMs = 0, loop = true }: Opcoes = {}) {
  const { indice, irPara } = usePassos(total, 0);

  //* refs para evitar recriar funções no efeito
  const timerRef = useRef<number | null>(null);
  const idxRef = useRef(indice);
  useEffect(() => { idxRef.current = indice; }, [indice]);

  useEffect(() => {
    //* sempre limpa qualquer timer antigo
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    //* não cria timer se autoMs<=0 ou total<=1
    if (!autoMs || autoMs <= 0 || total <= 1) return;

    timerRef.current = window.setInterval(() => {
      const i = idxRef.current;
      const next = loop ? (i + 1) % total : Math.min(i + 1, total - 1);
      irPara(next);
    }, autoMs);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [autoMs, total, loop, irPara]);

  const proximo  = () => irPara(loop ? (indice + 1) % total : Math.min(indice + 1, total - 1));
  const anterior = () => irPara(loop ? (indice - 1 + total) % total : Math.max(indice - 1, 0));

  return { indice, proximo, anterior, irPara, total };
}
