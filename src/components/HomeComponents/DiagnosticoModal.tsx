import { useEffect, useRef, useState } from "react";

export type DiagnosticStep = {
  label: string;
  icon?: React.ComponentType<Record<string, unknown>>;
  element: React.ReactNode;
};

export default function DiagnosticModal({
  open,
  onClose,
  steps,
  title = "Diagnóstico de Dispositivos",
}: {
  open: boolean;
  onClose: () => void;
  steps: DiagnosticStep[];
  title?: string;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState<boolean[]>(() => steps.map(() => false));
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [mobileTop, setMobileTop] = useState<string | undefined>(undefined);
  const [isNarrow, setIsNarrow] = useState(false);

  // reset ao abrir/fechar
  useEffect(() => {
    if (!open) return;
    setStepIndex(0);
    setDone(steps.map(() => false));
    document.body.style.overflow = "hidden";
    setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, steps.length, steps]);

  // calcula um top seguro para mobile (evita recorte por notch/status bar)
  useEffect(() => {
    const update = () => {
      if (typeof window === 'undefined') return setMobileTop(undefined);
      setIsNarrow(window.innerWidth < 420);
      if (window.innerWidth < 640) {
        setMobileTop("calc(env(safe-area-inset-top, 8px) + 8px)");
      } else {
        setMobileTop(undefined);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // atalhos de teclado
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setStepIndex((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setStepIndex((i) => Math.min(steps.length - 1, i + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, steps.length]);

  if (!open) return null;

  const markCurrentDone = () => setDone((d) => d.map((v, i) => (i === stepIndex ? true : v)));
  const isLast = stepIndex === steps.length - 1;
  const dialogClass = isNarrow
    ? 'absolute left-0 right-0 top-0 bottom-0 w-full rounded-none border border-borderColor bg-backSecondary p-2 shadow-xl flex flex-col overflow-hidden'
    : 'absolute sm:left-1/2 sm:top-1/2 left-2 top-4 sm:-translate-x-1/2 sm:-translate-y-1/2 translate-x-0 translate-y-0 w-[calc(100%-1rem)] sm:w-[min(94vw,760px)] rounded-2xl border border-borderColor bg-backSecondary p-2 sm:p-4 shadow-xl max-h-[92vh] flex flex-col overflow-hidden';
  const dialogStyle = isNarrow
    ? mobileTop
      ? { top: mobileTop, bottom: 0 }
      : { top: 0, bottom: 0 }
    : mobileTop
    ? { top: mobileTop }
    : undefined;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button aria-label="Fechar" onClick={onClose} className="absolute inset-0 bg-black/40" />

      {/* Dialog */}
      <div role="dialog" aria-modal="true" aria-labelledby="diag-title" className={dialogClass} style={dialogStyle}>
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <h3 id="diag-title" className="text-base sm:text-lg font-semibold text-fontPrimary">
            {title}
          </h3>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="rounded-lg border border-borderColor px-3 py-1.5 hover:bg-backPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-clikColor"
          >
            Fechar
          </button>
        </div>

        {/* Stepper - rolável horizontalmente em mobile */}
        {!isNarrow && (
          <nav className="mt-2 sm:mt-3 grid grid-flow-col auto-cols-max gap-2 text-sm overflow-x-auto no-scrollbar py-1">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const active = stepIndex === i;
            return (
              <div
                key={s.label}
                className={`flex items-center justify-center gap-2 rounded-lg py-1 px-2 text-xs sm:text-sm
                            ${active ? "bg-clikColor text-white" : "bg-backPrimary text-fontTertiary"}`}
                aria-current={active ? "step" : undefined}
              >
                {Icon ? <Icon aria-hidden className="w-4 h-4 sm:w-auto sm:h-auto" /> : null}
                <span className="truncate max-w-24 sm:max-w-none">{s.label}</span>
                {done[i] && <span className="ml-1 text-green-600">✓</span>}
              </div>
            );
          })}
  </nav>)}

    {/* Conteúdo (flexível e rolável) */}
  <div className={`mt-4 min-h-0 flex-1 overflow-auto ${isNarrow ? 'max-h-[calc(100vh-6rem)]' : 'max-h-[62vh]'}`}>{steps[stepIndex]?.element}</div>

        {/* Controles - fixos no rodapé do modal para mobile */}
  <div className={`mt-4 sticky bottom-0 left-0 right-0 bg-backSecondary border-t border-borderColor ${isNarrow ? 'pt-2 px-3' : 'pt-3 sm:pt-4 -mx-3 sm:-mx-4 px-3 sm:px-4'}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
              className="rounded-lg px-2 py-1 text-sm sm:px-3 sm:py-1.5 border border-borderColor disabled:opacity-50 hover:bg-backPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-clikColor"
            >
              Voltar
            </button>

            <div className="flex items-center gap-2">
              {!done[stepIndex] && (
                <button onClick={markCurrentDone} className="rounded-lg px-2 py-1 text-sm sm:px-3 sm:py-1.5 border border-borderColor hover:bg-backPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-clikColor">
                  Marcar como concluído
                </button>
              )}

              <button
                disabled={!done[stepIndex]}
                onClick={() => {
                  if (isLast) return onClose();
                  setStepIndex((i) => Math.min(steps.length - 1, i + 1));
                }}
                className="rounded-lg px-2 py-1 text-sm sm:px-3 sm:py-1.5 bg-clikColor text-white disabled:opacity-50 hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-clikColor"
              >
                {isLast ? 'Finalizar' : 'Próximo'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
