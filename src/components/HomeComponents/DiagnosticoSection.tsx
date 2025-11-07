// src/components/HomeComponents/DiagnosticoSection.tsx
import { FiSearch, FiWifi, FiCamera, FiMic } from 'react-icons/fi';

type Props = { onOpen: () => void };

export default function DiagnosticoSection({ onOpen }: Props) {
  return (
    <section
      aria-labelledby="diagnostico-title"
      className="mx-auto max-w-5xl w-full px-4 mt-8"
    >
      <div className="rounded-2xl border border-borderColor bg-backSecondary p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-transform duration-150">
        <h2 id="diagnostico-title" className="text-xl font-semibold text-fontPrimary">
          Diagnóstico de Dispositivos
        </h2>

        <p className="mt-1 text-sm text-fontTertiary">
          Teste sua <b>Internet</b>, <b>Câmera</b> e <b>Microfone</b> antes da teleconsulta.
        </p>

        {/* destaques com ícones */}
        <ul className="mt-3 grid gap-2 text-sm text-fontTertiary sm:grid-cols-2">
          <li className="flex items-center gap-2">
            <FiWifi className="shrink-0" aria-hidden /> Rede/velocidade
          </li>
          <li className="flex items-center gap-2">
            <FiCamera className="shrink-0" aria-hidden /> Câmera (preview)
          </li>
          <li className="flex items-center gap-2">
            <FiMic className="shrink-0" aria-hidden /> Microfone (nível)
          </li>
        </ul>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={onOpen}
            className="inline-flex items-center gap-2 rounded-xl bg-clikColor text-white px-4 py-2 hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-clikColor"
          >
            <FiSearch aria-hidden />
            Iniciar Diagnóstico
          </button>

          <span className="text-xs text-slate-500">
            Esse teste só é feito no seu navegador.
          </span>
        </div>
      </div>
    </section>
  );
}
