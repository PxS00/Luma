import { useEffect } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';

/**
 * Página de erro 404
 * Exibida quando uma rota não é encontrada
 */
export default function Error() {
  useEffect(() => {
    document.title = 'Erro 404';
  }, []);
  const err = useRouteError();
  const msg = isRouteErrorResponse(err)
    ? `${err.status} ${err.statusText}`
    : 'Página não encontrada';

  return (
    <main className='min-h-[50vh] flex flex-col items-center justify-center gap-3 text-center'>
      <h1 className='text-2xl font-bold'>Erro 404</h1>
      <p className='text-fontSecondary'>{msg}</p>
      <Link to='/' className='underline'>
        Voltar para a Home
      </Link>
    </main>
  );
}
