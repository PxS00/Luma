// src/components/shared/Carrossel/CarrosselBase.tsx
import { useEffect, useId, useRef, useState } from "react";

type ControlsAPI = {
  prev: () => void;
  next: () => void;
  index: number;
  total: number;
};

type IndicatorsAPI = {
  goTo: (i: number) => void;
  index: number;
  total: number;
};

type CarrosselBaseProps = {
  total: number;
  startIndex?: number;
  autoMs?: number | null;           // null/undefined = sem autoplay
  className?: string;               // classes do wrapper externo
  viewportClassName?: string;       // classes do viewport (área do slide, relative)
  onChangeIndex?: (i: number) => void;

  // Conteúdo do slide atual
  renderItem: (index: number) => React.ReactNode;

  // Slots opcionais para UI (setas / indicadores)
  renderControls?: (api: ControlsAPI) => React.ReactNode;
  renderIndicators?: (api: IndicatorsAPI) => React.ReactNode;
};

export default function CarrosselBase({
  total,
  startIndex = 0,
  autoMs = null,
  className,
  viewportClassName,
  onChangeIndex,
  renderItem,
  renderControls,
  renderIndicators,
}: CarrosselBaseProps) {
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(0, startIndex), Math.max(0, total - 1))
  );
  const [paused, setPaused] = useState(false);
  const id = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  const goTo = (i: number) => setIndex((((i % total) + total) % total));
  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  // Notifica consumidor
  useEffect(() => {
    onChangeIndex?.(index);
  }, [index, onChangeIndex]);

  // Autoplay com cleanup e pausa
  useEffect(() => {
    if (!autoMs || autoMs <= 0 || paused || total <= 1) return;
    timerRef.current = window.setInterval(next, autoMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [autoMs, paused, total]);

  // Pausa em hover/foco do viewport
  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => setPaused(false);
  const handleFocusIn = () => setPaused(true);
  const handleFocusOut = () => setPaused(false);

  // Navegação por teclado quando o viewport tem foco
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement && vp.contains(document.activeElement)) {
        if (e.key === "ArrowRight") { e.preventDefault(); next(); }
        if (e.key === "ArrowLeft")  { e.preventDefault(); prev(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className={["relative", className || ""].join(" ").trim()}
      aria-roledescription="carousel"
      aria-label={`carousel-${id}`}
    >
      {/* Viewport: relative para ancorar controles do slot */}
      <div
        id={`${id}-viewport`}
        ref={viewportRef}
        role="group"
        aria-live="polite"
        className={["relative w-full", viewportClassName || ""].join(" ").trim()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocusIn}
        onBlur={handleFocusOut}
      >
        {renderItem(index)}

        {renderControls?.({ prev, next, index, total })}
      </div>

      {renderIndicators?.({ goTo, index, total })}
    </div>
  );
}
