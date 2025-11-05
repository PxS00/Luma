import { useEffect, useRef, useState } from "react";

export type DiagnosticStep = {
  label: string;
  icon?: React.ComponentType<Record<string, unknown>>;
  element: React.ReactNode; // seu componente (NetworkCheck, FaceCheck, MicrophoneCheck…)
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

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button aria-label="Fechar" onClick={onClose} className="absolute inset-0 bg-black/40" />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="diag-title"
        className="absolute left-1/2 top-1/2 w-[min(92vw,760px)] -translate-x-1/2 -translate-y-1/2
                   rounded-2xl border border-slate-200 bg-white p-4 shadow-xl
                   max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <h3 id="diag-title" className="text-lg font-semibold">
            {title}
          </h3>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="rounded-lg border px-3 py-1.5 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            Fechar
          </button>
        </div>

        {/* Stepper */}
        <nav className="mt-3 grid grid-cols-4 gap-2 text-sm">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const active = stepIndex === i;
            return (
              <div
                key={s.label}
                className={`flex items-center justify-center gap-2 rounded-lg py-2
                            ${active ? "bg-[#FFE4D6] text-amber-800" : "bg-slate-50"}`}
                aria-current={active ? "step" : undefined}
              >
                {Icon ? <Icon aria-hidden /> : null}
                {s.label}
                {done[i] && <span className="ml-1 text-green-600">✓</span>}
              </div>
            );
          })}
        </nav>

        {/* Conteúdo (scroll quando necessário) */}
        <div className="mt-4 min-h-64 overflow-auto max-h-[60vh]">{steps[stepIndex]?.element}</div>

        {/* Controles */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <button
            disabled={stepIndex === 0}
            onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
            className="rounded-lg px-3 py-1.5 border disabled:opacity-50 hover:bg-slate-50"
          >
            Voltar
          </button>

          <div className="flex items-center gap-2">
            {/* Use este botão se seu componente não tiver callback */}
            {!done[stepIndex] && (
              <button onClick={markCurrentDone} className="rounded-lg px-3 py-1.5 border hover:bg-slate-50">
                Marcar como concluído
              </button>
            )}

            <button
              disabled={!done[stepIndex]}
              onClick={() => {
                if (isLast) return onClose();
                setStepIndex((i) => Math.min(steps.length - 1, i + 1));
              }}
              className="rounded-lg px-3 py-1.5 bg-clikColor text-white disabled:opacity-50 hover:brightness-95"
            >
              {isLast ? 'Finalizar' : 'Próximo'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
