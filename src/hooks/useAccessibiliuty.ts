import { useEffect, useState } from 'react';
import type { A11yPrefs } from '../types/accessibility';
import { DEFAULT_A11Y } from '../constants/a11y';

const STORAGE_KEY = 'a11y:prefs';

const load = <T,>(key: string, fallback: T): T => {
  try { return JSON.parse(localStorage.getItem(key) || '') as T; }
  catch { return fallback; }
};
const save = (key: string, value: unknown) =>
  localStorage.setItem(key, JSON.stringify(value));

export function useAccessibility() {
  const [prefs, setPrefs] = useState<A11yPrefs>(() => load(STORAGE_KEY, DEFAULT_A11Y));

  useEffect(() => {
    const html = document.documentElement;

  // zoom de fonte global (escala rem)
  // Se 'readable' estiver ativo, aplica um ganho extra de ~12%
  const readableBoost = prefs.readable ? 1.12 : 1;
  html.style.fontSize = `${prefs.fontScale * readableBoost * 100}%`;

    // flags via classes
    html.classList.toggle('a11y-grayscale', prefs.grayscale);
    html.classList.toggle('a11y-contrast',  prefs.contrast);
    html.classList.toggle('a11y-invert',    prefs.invert);
    html.classList.toggle('a11y-light',     prefs.light);
    html.classList.toggle('a11y-readable',  prefs.readable);

    // Aplica filtros combinados de forma cumulativa (evita conflito de CSS)
    const filters: string[] = [];
    if (prefs.grayscale) filters.push('grayscale(1)');
    if (prefs.contrast)  filters.push('contrast(1.35)', 'saturate(1.2)');
    if (prefs.invert)    filters.push('invert(1)', 'hue-rotate(180deg)');
    html.style.filter = filters.length ? filters.join(' ') : 'none';

    save(STORAGE_KEY, prefs);
  }, [prefs]);

  // ações básicas
  const incFont = () =>
    setPrefs(p => ({ ...p, fontScale: Math.min(1.6, +(p.fontScale + 0.1).toFixed(2)) }));
  const decFont = () =>
    setPrefs(p => ({ ...p, fontScale: Math.max(0.8, +(p.fontScale - 0.1).toFixed(2)) }));
  const toggle = (k: keyof Omit<A11yPrefs, 'fontScale'>) =>
    setPrefs(p => ({ ...p, [k]: !p[k] }));
  const reset = () => setPrefs(DEFAULT_A11Y);

  // Define um modo exclusivo entre: none | grayscale | contrast | invert | light
  type VisualMode = 'none' | 'grayscale' | 'contrast' | 'invert' | 'light';
  const setExclusiveMode = (mode: VisualMode) => setPrefs(p => ({
    ...p,
    grayscale: mode === 'grayscale',
    contrast:  mode === 'contrast',
    invert:    mode === 'invert',
    light:     mode === 'light',
  }));

  const getCurrentMode = (p: A11yPrefs): VisualMode => {
    if (p.grayscale) return 'grayscale';
    if (p.contrast)  return 'contrast';
    if (p.invert)    return 'invert';
    if (p.light)     return 'light';
    return 'none';
  };

  // Avança ciclicamente entre os modos visuais, independente do botão clicado
  const cycleVisualMode = () => setPrefs(p => {
    const order: VisualMode[] = ['none', 'grayscale', 'contrast', 'invert', 'light'];
    const cur = getCurrentMode(p);
    const next = order[(order.indexOf(cur) + 1) % order.length];
    return {
      ...p,
      grayscale: next === 'grayscale',
      contrast:  next === 'contrast',
      invert:    next === 'invert',
      light:     next === 'light',
    };
  });

  // TTS (Web Speech API)
  const tts = () => {
    const sel = window.getSelection()?.toString().trim();
    const text = sel || document.querySelector('main')?.textContent?.slice(0, 1200) || '';
    if (!text) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'pt-BR';
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  };

  // VLibras (se o widget estiver no index.html)
  const libras = () => {
    (document.querySelector('div[vw-access-button] button') as HTMLButtonElement)?.click();
  };

  return { prefs, setPrefs, incFont, decFont, toggle, reset, tts, libras, cycleVisualMode, setExclusiveMode };
}
