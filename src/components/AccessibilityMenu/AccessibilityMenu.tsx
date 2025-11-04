import { useEffect, useRef, useState } from 'react';
import { IoAccessibilitySharp } from 'react-icons/io5';
import { A11Y_MENU_ITEMS, type A11yActionKey } from '../../constants/a11y';
import { useAccessibility } from '../../hooks/useAccessibiliuty';

export default function AccessibilityMenu() {
  const { incFont, decFont, toggle, reset, tts, libras } = useAccessibility();
  const [open, setOpen] = useState(false);
  const STORAGE_KEY = 'a11y:menuPos';
  const BTN_SIZE = 56;
  const PADDING = 16;

  const loadPos = (): { x: number; y: number } | null => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || ''); } catch { return null; }
  };


  const defaultPos = () => ({
    x: Math.max(PADDING, (window.innerWidth  - BTN_SIZE - 32)),
    y: Math.max(PADDING, (window.innerHeight - BTN_SIZE - 32)),
  });

  const [pos, setPos] = useState<{ x: number; y: number }>(() => loadPos() || { x: 0, y: 0 });
  const posRef = useRef(pos);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);

  useEffect(() => {
    setPos(p => {
      if (p.x === 0 && p.y === 0) return defaultPos();
      return clampToViewport(p);
    });
  }, []);

  useEffect(() => { posRef.current = pos; }, [pos]);

  useEffect(() => {
    const onResize = () => setPos(p => clampToViewport(p));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const clampToViewport = (p: { x: number; y: number }) => {
    const maxX = Math.max(PADDING, window.innerWidth  - BTN_SIZE - PADDING);
    const maxY = Math.max(PADDING, window.innerHeight - BTN_SIZE - PADDING);
    return {
      x: Math.min(Math.max(PADDING, p.x), maxX),
      y: Math.min(Math.max(PADDING, p.y), maxY),
    };
  };

  const startDrag = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    draggingRef.current = true;
    movedRef.current = false;
    const startX = e.clientX;
    const startY = e.clientY;
    const base = { ...pos };

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      const next = clampToViewport({ x: base.x + dx, y: base.y + dy });
      setPos(next);
      movedRef.current ||= Math.hypot(dx, dy) > 3;
    };

    const onUp = () => {
      draggingRef.current = false;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(posRef.current)); } catch { /* ignore */ }
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp, { once: true });
  };

  const actions: Record<A11yActionKey, () => void> = {
    incFont,
    decFont,
    grayscale: () => toggle('grayscale'),
    contrast:  () => toggle('contrast'),
    invert:    () => toggle('invert'),
    light:     () => toggle('light'),
    readable:  () => toggle('readable'),
    tts,
    libras,
    reset,
  };

  const resetBtnPosition = () => {
    const def = defaultPos();
    setPos(def);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(def)); } catch { /* ignore */ }
  };

  return (
    <div
      className="fixed z-1000 pointer-events-none select-none"
      style={{ left: pos.x, top: pos.y }}
    >
      <div className="relative flex flex-col items-end gap-2 pointer-events-auto">
        <button
          id="a11y-trigger"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls="a11y-menu"
          type="button"
          onPointerDown={startDrag}
          onClick={(e) => {
            if (movedRef.current) { e.preventDefault(); return; }
            setOpen(v => !v);
          }}
          className="bg-orange-500 text-white rounded-full w-14 h-14 text-2xl shadow-lg flex items-center justify-center transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 cursor-grab active:cursor-grabbing touch-none"
        >
          <IoAccessibilitySharp size={28} />
        </button>

        {(() => {
          const openUp = pos.y > window.innerHeight / 2;
          const attachClass = openUp ? 'bottom-16 origin-bottom-right' : 'top-16 origin-top-right';
          return (
            <div
              id="a11y-menu"
              role="menu"
              aria-hidden={!open}
              className={`absolute right-0 ${attachClass} min-w-[260px] rounded-xl shadow-2xl p-6 bg-white transition-all duration-300 ease-[cubic-bezier(0.4,2,0.6,1)] ${
                open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <IoAccessibilitySharp size={28} className="text-orange-500" />
                <span className="font-bold text-lg text-gray-900">Luma Acessível</span>
              </div>

              <ul className="list-none m-0 p-0">
                {A11Y_MENU_ITEMS.map((it, i) => {
                  const Icon = it.icon;
                  return (
                    <li key={it.key}>
                      <button
                        type="button"
                        onClick={actions[it.key]}
                        className={`w-full flex items-center gap-3 py-2 border-b border-gray-100 text-base text-gray-900 transition-colors hover:bg-gray-100 text-left ${
                          i === A11Y_MENU_ITEMS.length - 1 ? 'border-b-0' : ''
                        }`}
                      >
                        <Icon size={22} className="text-orange-500" />
                        <span>{it.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={resetBtnPosition}
                  className="text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  Restaurar posição do botão
                </button>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
