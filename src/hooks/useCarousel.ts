import { useEffect, useRef } from 'react';
import { useCarouselNavigation } from '@/hooks/useCarouselNavigation';
import type { CarouselOptions } from '@/types/navigation';

/**
 * Hook para gerenciar carrosseis com autoplay e navegação
 *
 * @param total - Número total de itens no carrossel
 * @param options - Opções de configuração (autoplay, loop)
 * @returns Objeto com estado e funções de controle do carrossel
 *
 * @example
 * const { index, next, previous } = useCarousel(5, { autoMs: 3000 });
 */
export function useCarousel(total: number, { autoMs = 0, loop = true }: CarouselOptions = {}) {
  const { index, goTo } = useCarouselNavigation(total, 0);

  // Refs para evitar recriar funções no efeito
  const timerRef = useRef<number | null>(null);
  const idxRef = useRef(index);

  useEffect(() => {
    idxRef.current = index;
  }, [index]);

  useEffect(() => {
    // Sempre limpa qualquer timer antigo
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Não cria timer se autoMs <= 0 ou total <= 1
    if (!autoMs || autoMs <= 0 || total <= 1) return;

    timerRef.current = window.setInterval(() => {
      const i = idxRef.current;
      const next = loop ? (i + 1) % total : Math.min(i + 1, total - 1);
      goTo(next);
    }, autoMs);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [autoMs, total, loop, goTo]);

  const next = () => goTo(loop ? (index + 1) % total : Math.min(index + 1, total - 1));
  const previous = () => goTo(loop ? (index - 1 + total) % total : Math.max(index - 1, 0));

  return { index, next, previous, goTo, total };
}
