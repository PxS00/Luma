import { useCarouselNavigation } from '@/hooks/useCarouselNavigation';
import type { CarouselOptions } from '@/types/navigation';
import { useEffect, useRef } from 'react';

/**
 * Hook para gerenciar carrosseis com autoplay e navegação.
 * Fornece estado, funções de navegação e integração com acessibilidade.
 *
 * @param total - Número total de itens no carrossel
 * @param options - Opções de configuração (autoplay, loop)
 * @returns Objeto com estado e funções de controle do carrossel
 *
 * @example
 * // Exemplo de uso em um componente:
 * const { index, next, previous, goTo } = useCarousel(5, { autoMs: 3000 });
 *
 * // Renderização:
 * <button onClick={previous}>Anterior</button>
 * <div>Slide atual: {index + 1}</div>
 * <button onClick={next}>Próximo</button>
 *
 * // Para acessibilidade, associe aria-live ou roles apropriados ao container do carrossel.
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

  /**
   * Avança para o próximo item do carrossel.
   */
  const next = () => goTo(loop ? (index + 1) % total : Math.min(index + 1, total - 1));
  /**
   * Volta para o item anterior do carrossel.
   */
  const previous = () => goTo(loop ? (index - 1 + total) % total : Math.max(index - 1, 0));

  return { index, next, previous, goTo, total };
}
