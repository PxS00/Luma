import { useEffect, useState } from 'react';

/**
 * Componente que garante a inicialização correta do VLibras
 * e mostra um aviso se houver problemas
 */
export default function VLibrasInit() {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 50; // Tenta por até 5 segundos

    const checkVLibras = () => {
      attempts++;

      // Verifica se o VLibras está disponível
      if (window.VLibras && typeof window.VLibras.Widget === 'function') {
        // VLibras carregado com sucesso
        setStatus('ready');
        return;
      }

      // Se ainda não carregou e não atingiu o limite de tentativas, tenta novamente
      if (attempts < maxAttempts) {
        setTimeout(checkVLibras, 100);
      } else {
        // Falhou ao carregar
        setStatus('error');
        setShowWarning(true);
        console.warn(
          'VLibras não foi carregado. ' +
          'Verifique sua conexão com a internet e se o site vlibras.gov.br está acessível.'
        );
      }
    };

    // Inicia a verificação após um pequeno delay
    setTimeout(checkVLibras, 500);
  }, []);

  // Não mostra nada se estiver carregando ou se carregou com sucesso
  if (status !== 'error' || !showWarning) {
    return null;
  }

  // Mostra aviso se falhou
  return (
    <div 
      className="fixed bottom-4 left-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded shadow-lg z-50 max-w-md"
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-yellow-800">
            VLibras não disponível
          </h3>
          <p className="mt-1 text-xs text-yellow-700">
            O serviço de tradução em Libras está temporariamente indisponível. 
            Isso pode ser devido a instabilidade no servidor do governo ou firewall.
          </p>
          <button
            onClick={() => setShowWarning(false)}
            className="mt-2 text-xs text-yellow-800 underline hover:text-yellow-900"
          >
            Dispensar
          </button>
        </div>
      </div>
    </div>
  );
}
