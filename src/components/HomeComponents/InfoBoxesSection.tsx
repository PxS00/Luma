import { Link } from 'react-router-dom';

export default function InfoBoxesSection() {
  return (
    <section className="mx-auto w-full max-w-screen-lg px-4 mt-6">
  <div className="grid gap-4 md:grid-cols-2">
        {/* Informational box styled like a button */}
        <div
          role="region"
          aria-label="Como funciona"
          className="w-full rounded-lg border border-borderColor bg-backSecondary p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-transform duration-150 cursor-default focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-clikColor"
        >
          <h3 className="text-sm font-semibold text-fontPrimary mb-2">Como Funciona</h3>
          <ol className="text-sm text-fontTertiary list-decimal pl-5 space-y-1 wrap-break-word">
            <li>Acesse o Portal com seu cadastro.</li>
            <li>Realize o diagnóstico de dispositivos antes da teleconsulta.</li>
            <li>Agende/acesse sua teleconsulta e receba suporte.</li>
          </ol>
        </div>

        {/* FAQ box: entire card is a link and looks like a button with an arrow icon */}
        <Link
          to="/faq"
          aria-label="Ir para Perguntas Frequentes"
          className="block w-full rounded-lg border border-borderColor bg-backSecondary p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-clikColor"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-fontPrimary mb-2">Perguntas Frequentes</h3>
              <ul className="text-sm text-fontTertiary space-y-1">
                <li className="wrap-break-word">Como agendar uma teleconsulta?</li>
                <li className="wrap-break-word">Quais navegadores são suportados?</li>
                <li className="wrap-break-word">O atendimento é gratuito?</li>
              </ul>
            </div>
            <div className="flex items-center justify-center flex-none ml-2 lg:ml-3">
              {/* Arrow inside a centered circle */}
              <span
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-clikColor text-white text-xl font-bold"
                aria-hidden
              >
                ›
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
