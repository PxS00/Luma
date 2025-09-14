import { useState } from 'react';

/**
 * Hook para navegação em carrossel/slider
 * Controla índice atual e fornece funções de navegação
 *
 * @param total - Número total de itens
 * @param start - Índice inicial (padrão: 0)
 * @returns Estado e funções para controlar navegação
 */
export function useCarouselNavigation(total: number, start = 0) {
  const [index, setIndex] = useState(start);

  const canGoBack = index > 0;
  const canGoForward = index < total - 1;

  function goBack() {
    if (canGoBack) setIndex((i) => i - 1);
  }

  function goForward() {
    if (canGoForward) setIndex((i) => i + 1);
  }

  function goTo(i: number) {
    if (i >= 0 && i < total) setIndex(i);
  }

  return { index, canGoBack, canGoForward, goBack, goForward, goTo };
}
