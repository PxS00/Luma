import { useEffect, useRef, useState } from 'react';
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiRefreshCw,
  FiWifi,
  FiWifiOff,
  FiZap,
} from 'react-icons/fi';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';

type NetworkCheckProps = {
  /** Chamado UMA ÚNICA vez quando a rede está estável (online + good/excellent) por ~800ms */
  onPass?: () => void;
  /** Snapshot contínuo para “Resumo” no final do diagnóstico */
  onResult?: (r: {
    ok: boolean;
    isOnline: boolean;
    quality: 'excellent' | 'good' | 'poor' | 'offline';
    message: string;
    tips: string[];
    state: {
      effectiveType?: string;
      downlink?: number;
      rtt?: number;
      saveData?: boolean;
    };
  }) => void;
};

export default function NetworkCheck({ onPass, onResult }: NetworkCheckProps) {
  const [isTestStarted, setIsTestStarted] = useState(false);
  const { quality, isOnline, message, tips, state } = useNetworkStatus();

  const passTimer = useRef<number | null>(null);
  const passedOnce = useRef(false);

  useEffect(() => {
    // report snapshot always
    onResult?.({
      ok: isOnline && (quality === 'excellent' || quality === 'good'),
      isOnline,
      quality,
      message,
      tips,
      state: {
        effectiveType: state.effectiveType,
        downlink: state.downlink,
        rtt: state.rtt,
        saveData: state.saveData,
      },
    });

    if (!isTestStarted) return;

    const ok = isOnline && (quality === 'excellent' || quality === 'good');
    if (ok && !passedOnce.current) {
      if (passTimer.current) window.clearTimeout(passTimer.current);
      passTimer.current = window.setTimeout(() => {
        if (isOnline && (quality === 'excellent' || quality === 'good')) {
          passedOnce.current = true;
          onPass?.();
        }
      }, 800);
    } else if (!ok && passTimer.current) {
      window.clearTimeout(passTimer.current);
      passTimer.current = null;
    }

    return () => {
      if (passTimer.current) {
        window.clearTimeout(passTimer.current);
        passTimer.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTestStarted, isOnline, quality, message, tips, state?.effectiveType, state?.downlink, state?.rtt, state?.saveData]);

  const statusConfig = {
    excellent: {
      color: 'text-green-600',
      bgColor: 'bg-backSecondary',
      borderColor: 'border-green-400',
      icon: FiCheckCircle,
      iconBg: 'bg-green-100',
    },
    good: {
      color: 'text-blue-600',
      bgColor: 'bg-backSecondary',
      borderColor: 'border-blue-400',
      icon: FiZap,
      iconBg: 'bg-blue-100',
    },
    poor: {
      color: 'text-yellow-700',
      bgColor: 'bg-backSecondary',
      borderColor: 'border-yellow-400',
      icon: FiAlertTriangle,
      iconBg: 'bg-yellow-100',
    },
    offline: {
      color: 'text-red-600',
      bgColor: 'bg-backSecondary',
      borderColor: 'border-red-400',
      icon: FiWifiOff,
      iconBg: 'bg-red-100',
    },
  } as const;

  const config = statusConfig[quality];
  const StatusIcon = config.icon;
  const ok = isOnline && (quality === 'excellent' || quality === 'good');

  // Compact, mobile-first layout
  if (!isTestStarted) {
    passedOnce.current = false;
    return (
      <section aria-label="Verificação de status da conexão de rede" className="w-full flex flex-col items-center gap-4">
        <header className="text-center">
          <h1 className="text-lg sm:text-2xl font-semibold text-foreground">Teste de Conexão</h1>
          <p className="text-sm text-foreground/70">Verifique se sua conexão está adequada para a teleconsulta</p>
        </header>

        <div className="w-full max-w-md flex flex-col items-center gap-6 p-4">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-backPrimary p-3 rounded-full">
                <FiWifi className="w-8 h-8 text-clikColor" />
              </div>
            </div>
            <p className="text-foreground/70 mb-4">Vamos verificar velocidade, latência e estabilidade da sua conexão.</p>
          </div>

          <button
            onClick={() => setIsTestStarted(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all duration-200 flex items-center gap-2"
          >
            <FiZap className="w-4 h-4" />
            Iniciar Verificação
          </button>

          <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200 w-full text-sm text-foreground/70">
            <strong className="block mb-1">O que será verificado:</strong>
            Velocidade de conexão, latência e estabilidade do sinal.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Verificação de status da conexão de rede" className="w-full flex flex-col items-center gap-4">
      <header className="text-center">
        <h1 className="text-lg sm:text-2xl font-semibold text-foreground">Resultado da Verificação</h1>
        <p className="text-sm text-foreground/70">Análise da qualidade da sua conexão</p>
      </header>

      <div className={`w-full max-w-md rounded-lg border-2 ${config.borderColor} ${config.bgColor} p-4 shadow transition-all duration-300`} role="status" aria-live="polite">
        <div className="flex items-center gap-3 mb-3">
          <div className={`${config.iconBg} rounded-full w-10 h-10 flex items-center justify-center`} aria-hidden>
            <StatusIcon className={`w-5 h-5 ${config.color}`} />
          </div>
          <div className="flex-1">
            <h2 className={`text-base font-semibold ${config.color}`}>{message}</h2>
            <p className="text-xs text-foreground/60 mt-1">Status: {isOnline ? 'Conectado' : 'Desconectado'}</p>
          </div>
        </div>

        <div className="mt-2">
          <h3 className="text-xs font-medium text-foreground/80 mb-2">Informações:</h3>
          <ul className="list-disc pl-5 text-xs text-foreground/70 space-y-1">{tips.map((t, idx) => <li key={idx}>{t}</li>)}</ul>
        </div>

        {isOnline && (
          <div className="mt-3 pt-3 border-t border-foreground/10 text-sm">
            <h3 className="text-sm font-medium text-foreground/80 mb-2">Detalhes Técnicos</h3>
            <div className="grid grid-cols-1 gap-2 text-sm">
              {state.effectiveType && (
                <div>
                  <span className="text-foreground/60">Tipo:</span>
                  <span className="ml-2 font-medium text-foreground">{state.downlink && state.downlink >= 20 ? '5G' : state.effectiveType.toUpperCase()}</span>
                </div>
              )}
              {state.downlink !== undefined && state.downlink > 0 && (
                <div>
                  <span className="text-foreground/60">Download:</span>
                  <span className="ml-2 font-medium text-foreground">{state.downlink.toFixed(1)} Mbps</span>
                </div>
              )}
              {state.rtt !== undefined && (
                <div>
                  <span className="text-foreground/60">Latência:</span>
                  <span className="ml-2 font-medium text-foreground">{state.rtt === 0 ? '< 1 ms' : `${state.rtt} ms`}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-md">
        <div className="flex items-center gap-2">
          <span className="text-xs text-foreground/60 font-medium">Qualidade:</span>
          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${quality === 'excellent' ? 'bg-green-500 w-full' : quality === 'good' ? 'bg-blue-500 w-3/4' : quality === 'poor' ? 'bg-yellow-500 w-1/2' : 'bg-red-500 w-1/4'}`}
              role="progressbar"
              aria-label="Indicador de qualidade da conexão"
              aria-valuenow={quality === 'excellent' ? 100 : quality === 'good' ? 75 : quality === 'poor' ? 50 : 25}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <span className={`text-xs font-semibold ${config.color} capitalize`}>{quality === 'excellent' ? 'Excelente' : quality === 'good' ? 'Boa' : quality === 'poor' ? 'Limitada' : 'Offline'}</span>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => { setIsTestStarted(false); setTimeout(() => setIsTestStarted(true), 100); passedOnce.current = false; }}
          className="text-clikColor hover:brightness-90 font-medium text-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-borderColor rounded px-3 py-2 transition-colors"
        >
          <FiRefreshCw className="w-4 h-4" />
          Refazer
        </button>
        {!ok && (
          <button className="ml-2 bg-yellow-100 text-yellow-800 px-3 py-2 rounded text-sm">Ver dicas</button>
        )}
      </div>
    </section>
  );
}
