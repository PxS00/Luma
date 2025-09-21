import { useState } from 'react';

/**
 * Hook para navegação em carrossel/slider.
 * Controla índice atual e fornece funções de navegação.
 *
 * @param total - Número total de itens
 * @param start - Índice inicial (padrão: 0)
 * @returns Estado e funções para controlar navegação
 *
 * @example
 * // Exemplo de uso:
 * const { index, goBack, goForward, goTo } = useCarouselNavigation(4);
 *
 * <button onClick={goBack} disabled={!canGoBack}>Anterior</button>
 * <span>Slide {index + 1}</span>
 * <button onClick={goForward} disabled={!canGoForward}>Próximo</button>
 */
export function useCarouselNavigation(total: number, start = 0) {
  const [index, setIndex] = useState(start);

  const canGoBack = index > 0;
  const canGoForward = index < total - 1;

  /** Volta para o item anterior, se possível. */
  function goBack() {
    if (canGoBack) setIndex((i) => i - 1);
  }

  /** Avança para o próximo item, se possível. */
  function goForward() {
    if (canGoForward) setIndex((i) => i + 1);
  }

  /** Vai para o índice informado, se válido. */
  function goTo(i: number) {
    if (i >= 0 && i < total) setIndex(i);
  }

  return { index, canGoBack, canGoForward, goBack, goForward, goTo };
}
