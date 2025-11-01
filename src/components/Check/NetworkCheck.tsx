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

/**
 * Componente de verificação de conexão de rede para teleconsulta
 * Monitora a qualidade da conexão em tempo real e fornece feedback visual.
 */
export default function NetworkCheck({ onPass, onResult }: NetworkCheckProps) {
  const [isTestStarted, setIsTestStarted] = useState(false);
  const { quality, isOnline, message, tips, state } = useNetworkStatus();

  // ---- Novo: emitir resultados e disparar onPass quando “OK” estabilizar ----
  const passTimer = useRef<number | null>(null);
  const passedOnce = useRef(false);

  useEffect(() => {
    // Emite snapshot para quem quiser montar resumo
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
        // Verifica novamente se continua ok antes de passar
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

  // Define cores e ícones baseados na qualidade da conexão
  const statusConfig = {
    // Usamos fundo neutro do projeto e apenas acentos coloridos para borda/ícone
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
  // indica se a verificação está OK (conectado + boa/ótima)
  const ok = isOnline && (quality === 'excellent' || quality === 'good');

  // Se o teste não foi iniciado, mostra o botão
  if (!isTestStarted) {
    // reset disparo automático quando reiniciar o teste
    passedOnce.current = false;

    return (
      <section
        aria-label='Verificação de status da conexão de rede'
        className='w-full flex flex-col items-center gap-4'
      >
        <header className='text-center'>
          <h1 className='text-2xl font-semibold text-foreground'>Teste de Conexão</h1>
          <p className='text-sm text-foreground/70'>
            Verifique se sua conexão está adequada para a teleconsulta
          </p>
        </header>

        {/* Botão de iniciar teste */}
        <div className='w-full max-w-screen-md flex flex-col items-center gap-6 p-8'>
          <div className='text-center mb-4'>
            <div className='flex justify-center mb-6'>
              <div className='bg-backPrimary p-6 rounded-full'>
                <FiWifi className='w-16 h-16 text-clikColor' />
              </div>
            </div>
            <p className='text-foreground/70 mb-6 max-w-md'>
              Vamos verificar a velocidade, latência e estabilidade da sua conexão de internet
            </p>
          </div>

          <button
            onClick={() => setIsTestStarted(true)}
            className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center gap-3'
          >
            <FiZap className='w-5 h-5' />
            Iniciar Verificação
          </button>

          <div className='mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 w-full'>
            <p className='text-sm text-foreground/70 text-center'>
              <strong className='block mb-2'>O que será verificado:</strong>
              Velocidade de conexão, latência de rede, tipo de conexão e estabilidade do sinal
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label='Verificação de status da conexão de rede'
      className='w-full flex flex-col items-center gap-4'
    >
      <header className='text-center'>
        <h1 className='text-2xl font-semibold text-foreground'>Resultado da Verificação</h1>
        <p className='text-sm text-foreground/70'>
          Análise completa da qualidade da sua conexão de rede
        </p>
      </header>

      {/* Card principal de status */}
      <div
        className={`w-full max-w-screen-md rounded-lg border-2 ${config.borderColor} ${config.bgColor} p-6 shadow-lg transition-all duration-300`}
        role='status'
        aria-live='polite'
      >
        {/* Ícone e status principal */}
        <div className='flex items-center gap-4 mb-4'>
          <div
            className={`${config.iconBg} rounded-full w-16 h-16 flex items-center justify-center`}
            aria-hidden='true'
          >
            <StatusIcon className={`w-8 h-8 ${config.color}`} />
          </div>
          <div className='flex-1'>
            <h2 className={`text-xl font-semibold ${config.color}`}>{message}</h2>
            <p className='text-sm text-foreground/60 mt-1'>
              Status: {isOnline ? 'Conectado' : 'Desconectado'}
            </p>
          </div>
        </div>

        {/* Dicas e recomendações */}
        <div className='mt-4'>
          <h3 className='text-sm font-medium text-foreground/80 mb-2'>Informações:</h3>
          <ul className='list-disc pl-5 text-sm text-foreground/70 space-y-1'>
            {tips.map((tip, index) => (
              <li key={`tip-${index}`}>{tip}</li>
            ))}
          </ul>
        </div>

        {/* Métricas técnicas (se disponíveis) */}
        {isOnline && (
          <div className='mt-6 pt-4 border-t border-foreground/10'>
            <h3 className='text-sm font-medium text-foreground/80 mb-3'>Detalhes Técnicos:</h3>
            <div className='grid grid-cols-2 gap-3 text-sm'>
              {state.effectiveType && (
                <div>
                  <span className='text-foreground/60'>Velocidade Efetiva:</span>
                  <span className='ml-2 font-medium text-foreground'>
                    {state.downlink && state.downlink >= 20 ? '5G' : state.effectiveType.toUpperCase()}
                  </span>
                </div>
              )}
              {state.downlink !== undefined && state.downlink > 0 && (
                <div>
                  <span className='text-foreground/60'>Taxa de Download:</span>
                  <span className='ml-2 font-medium text-foreground'>
                    {state.downlink.toFixed(1)} Mbps
                  </span>
                </div>
              )}
              {state.rtt !== undefined && (
                <div>
                  <span className='text-foreground/60'>Latência (RTT):</span>
                  <span className='ml-2 font-medium text-foreground'>
                    {state.rtt === 0 ? '< 1 ms' : `${state.rtt} ms`}
                  </span>
                </div>
              )}
              {state.saveData !== undefined && (
                <div>
                  <span className='text-foreground/60'>Economia de Dados:</span>
                  <span className='ml-2 font-medium text-foreground'>
                    {state.saveData ? 'Ativada' : 'Desativada'}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Barra de status visual simplificada */}
  <div className='w-full max-w-screen-md'>
        <div className='flex items-center gap-2'>
          <span className='text-xs text-foreground/60 font-medium'>Qualidade:</span>
          <div className='flex-1 h-2 bg-gray-200 rounded-full overflow-hidden'>
            <div
              className={`h-full transition-all duration-500 ${
                quality === 'excellent'
                  ? 'bg-green-500 w-full'
                  : quality === 'good'
                    ? 'bg-blue-500 w-3/4'
                    : quality === 'poor'
                      ? 'bg-yellow-500 w-1/2'
                      : 'bg-red-500 w-1/4'
              }`}
              role='progressbar'
              aria-label='Indicador de qualidade da conexão'
              aria-valuenow={
                quality === 'excellent' ? 100 : quality === 'good' ? 75 : quality === 'poor' ? 50 : 25
              }
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <span className={`text-xs font-semibold ${config.color} capitalize`}>
            {quality === 'excellent' ? 'Excelente' : quality === 'good' ? 'Boa' : quality === 'poor' ? 'Limitada' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Botão para refazer o teste */}
      <button
        onClick={() => {
          setIsTestStarted(false);
          // dá um respiro para resetar UI e timers
          setTimeout(() => setIsTestStarted(true), 100);
          // permite novo disparo de onPass
          passedOnce.current = false;
        }}
        className='mt-4 text-clikColor hover:brightness-90 font-medium text-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-borderColor rounded px-3 py-2 transition-colors'
      >
        <FiRefreshCw className='w-4 h-4' />
        Refazer Verificação
      </button>

      {/* Informações / troubleshooting (mantidos) */}
      {/* ... resto do conteúdo abaixo permanece igual ... */}

      <div className='mt-8 w-full max-w-screen-md bg-backSecondary rounded-lg shadow-md p-6 border border-borderColor'>
        <h2 className='text-xl font-semibold text-foreground mb-4'>Sobre a Verificação de Rede</h2>
        <div className='space-y-4 text-foreground/80'>
          <p>
            A Luma verifica automaticamente a qualidade da sua conexão para garantir que você
            tenha a melhor experiência durante a teleconsulta. Testamos velocidade, estabilidade e
            latência para assegurar uma videochamada sem interrupções com seu médico.
          </p>
          <div className='grid md:grid-cols-2 gap-4'>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <h3 className='font-semibold text-foreground mb-2'>Métricas Analisadas</h3>
              <ul className='text-sm space-y-1 list-disc list-inside'>
                <li>Status de conectividade (online/offline)</li>
                <li>Velocidade efetiva da rede (2G, 3G, 4G, 5G)</li>
                <li>Taxa de download estimada (Mbps)</li>
                <li>Latência da conexão (RTT em milissegundos)</li>
                <li>Modo de economia de dados</li>
              </ul>
            </div>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <h3 className='font-semibold text-foreground mb-2'>Recomendações</h3>
              <ul className='text-sm space-y-1 list-disc list-inside'>
                <li>Utilize redes Wi-Fi ou cabeadas quando possível</li>
                <li>Evite redes públicas não seguras</li>
                <li>Posicione-se próximo ao roteador</li>
                <li>Feche aplicações que consomem banda</li>
                <li>Verifique outros dispositivos na rede</li>
              </ul>
            </div>
          </div>
          <div className='mt-4 p-4 bg-backPrimary border border-borderColor rounded-lg'>
            <p className='text-sm'>
              <strong>Importante:</strong> Uma conexão estável é fundamental para sua teleconsulta.
              Se a verificação indicar problemas, sugerimos conectar-se a uma rede Wi-Fi de melhor
              qualidade ou tentar novamente em outro momento para garantir uma consulta médica sem
              interrupções.
            </p>
          </div>
        </div>
      </div>

      {!ok && (
        <div className='mt-6 w-full max-w-screen-md bg-backSecondary border border-borderColor rounded-lg p-6'>
          <h2 className='text-xl font-semibold text-foreground mb-4'>Resolução de Problemas</h2>
          <div className='space-y-3 text-sm text-foreground/80'>
            <details className='cursor-pointer'>
              <summary className='font-semibold'>
                O sistema indica offline, mas tenho conexão ativa
              </summary>
              <p className='mt-2 pl-4'>
                Algumas configurações de rede corporativa ou VPN podem interferir na detecção
                automática. Verifique as configurações de firewall e permissões do navegador para
                acesso à rede. Se necessário, desative temporariamente a VPN para o teste.
              </p>
            </details>
            <details className='cursor-pointer'>
              <summary className='font-semibold'>
                A qualidade aparece constantemente como limitada
              </summary>
              <p className='mt-2 pl-4'>
                Isso pode indicar instabilidade na conexão. Sugestões: reinicie o equipamento de rede,
                verifique a proximidade com o roteador, teste em diferentes bandas de frequência
                (2.4GHz/5GHz), ou verifique a cobertura do sinal móvel se estiver usando dados
                celulares.
              </p>
            </details>
            <details className='cursor-pointer'>
              <summary className='font-semibold'>Os detalhes técnicos não são exibidos</summary>
              <p className='mt-2 pl-4'>
                Alguns navegadores (Firefox e Safari) possuem suporte limitado à Network Information
                API. Nestes casos, apenas o status básico de conectividade será exibido. Para acesso
                às métricas completas, recomendamos utilizar navegadores baseados em Chromium (Chrome,
                Edge, Brave).
              </p>
            </details>
          </div>
        </div>
      )}
    </section>
  );
}
