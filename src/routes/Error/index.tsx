import { useEffect } from 'react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

/**
 * Página de erro 404
 * Exibida quando uma rota não é encontrada
 *
 * @example
 * // Uso em rotas (React Router)
 * <Route path="*" element={<Error />} />
 */
export default function Error() {
  useEffect(() => {
    document.title = 'Erro 404';
  }, []);
  const err = useRouteError();
  // Determina a mensagem de erro a ser exibida
  const msg = isRouteErrorResponse(err)
    ? `${err.status} ${err.statusText}`
    : 'Página não encontrada';

  return (
    <main
      className='min-h-[50vh] flex flex-col items-center justify-center gap-3 text-center'
      aria-label='Conteúdo principal de erro 404'
    >
      <h1 className='text-2xl font-bold'>Erro 404</h1>
      <p className='text-fontSecondary'>{msg}</p>
      {/* Link para retornar à página inicial */}
      <Link to='/' className='underline'>
        Voltar para a Home
      </Link>
    </main>
  );
}
