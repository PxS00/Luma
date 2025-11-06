import { useEffect } from 'react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

/**
 * Página de erro mais rica para exibir status, mensagem e ações.
 * Mostra detalhes do erro em ambiente de desenvolvimento.
 */
export default function Error() {
  const err = useRouteError();

  const isResp = isRouteErrorResponse(err);
  const status = isResp ? err.status : (err && (err as any).status) || 404;
  const statusText = isResp ? err.statusText : (err && (err as any).message) || '';

  useEffect(() => {
    document.title = `Erro ${status} • Luma`;
  }, [status]);

  const friendly = status === 404 ? 'Página não encontrada' : 'Ocorreu um erro no servidor';


  return (
    <main
      className="min-h-[60vh] flex items-center justify-center p-6 bg-backPrimary"
      aria-label={`Página de erro ${status}`}
    >
      <div className="w-full max-w-2xl bg-backSecondary rounded-md shadow-md p-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="Luma" className="h-12 w-12" />
            <div className="text-left">
              <h1 className="text-3xl font-extrabold text-fontPrimary">Erro {status}</h1>
              <p className="text-sm text-fontTertiary">{statusText || friendly}</p>
            </div>
          </div>

          <p className="mt-4 text-fontSecondary">{friendly}</p>

          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link to="/" className="px-4 py-2 rounded bg-backBtn text-white hover:bg-hoverBtn">
              Ir para a Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 rounded border border-borderColor hover:bg-backSecondary"
            >
              Voltar
            </button>

            <a
              href={`mailto:suporte@seudominio.com?subject=Erro ${status} - Luma&body=URL: ${typeof location !== 'undefined' ? location.href : ''}%0AStatus: ${status}%0AMensagem: ${encodeURIComponent(statusText || friendly)}`}
              className="px-4 py-2 rounded border border-transparent bg-backSecondary hover:bg-backPrimary text-sm text-clikColor"
            >
              Reportar problema
            </a>
          </div>

          {/* Detalhes do erro removidos para não exibir stack traces em produção/dev */}
        </div>
      </div>
    </main>
  );
}
