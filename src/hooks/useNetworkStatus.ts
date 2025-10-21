import { useMemo } from 'react';
import { useNetworkState } from 'react-use';
import type { NetworkAnalysis, NetworkQuality, NetworkState } from '../types/network';

/**
 * Hook customizado para monitorar o status da rede em tempo real
 * Wrapper sobre o useNetworkState do react-use com análise adicional de qualidade
 *
 * @returns Objeto com análise completa do status da rede
 *
 * @example
 * ```tsx
 * const { quality, isOnline, message, tips } = useNetworkStatus();
 *
 * if (!isOnline) {
 *   return <div>Você está offline!</div>;
 * }
 * ```
 */
export function useNetworkStatus(): NetworkAnalysis {
  // Obtém o estado da rede usando react-use
  const networkState = useNetworkState() as NetworkState;

  // Analisa a qualidade da conexão com base nas métricas disponíveis
  const analysis = useMemo((): NetworkAnalysis => {
    // Se está offline, retorna imediatamente
    if (!networkState.online) {
      return {
        quality: 'offline',
        isOnline: false,
        message: 'Sem conexão com a internet',
        tips: [
          'Verifique sua conexão Wi-Fi ou dados móveis.',
          'Aguarde a conexão ser restabelecida para iniciar a teleconsulta.',
          'Certifique-se de que o modo avião está desativado.',
        ],
        state: networkState,
      };
    }

    // Determina a qualidade baseada no effectiveType e rtt
    let quality: NetworkQuality = 'good';
    let message = 'Conexão estável';
    const tips: string[] = [];

    // Análise baseada no tipo efetivo de conexão
    if (networkState.effectiveType === '4g') {
      quality = 'excellent';
      message = 'Conexão excelente para teleconsulta';
      tips.push('Qualidade de rede adequada para videochamadas em alta definição.');
    } else if (networkState.effectiveType === '3g') {
      quality = 'good';
      message = 'Conexão adequada para teleconsulta';
      tips.push('Qualidade de rede suficiente para realizar a consulta.');
    } else if (networkState.effectiveType === '2g' || networkState.effectiveType === 'slow-2g') {
      quality = 'poor';
      message = 'Conexão limitada detectada';
      tips.push('A qualidade da videochamada pode ser comprometida.');
      tips.push('Recomendamos conectar-se a uma rede mais rápida, se possível.');
    }

    // Análise adicional baseada em RTT (latência)
    if (networkState.rtt !== undefined && networkState.rtt > 0) {
      if (networkState.rtt > 500) {
        // Alta latência
        quality = 'poor';
        message = 'Latência elevada na conexão';
        tips.push('Latência superior a 500ms pode causar atrasos na comunicação.');
      } else if (networkState.rtt > 200 && quality === 'excellent') {
        // Latência moderada
        quality = 'good';
      }
    }

    // Análise baseada em velocidade de download
    if (networkState.downlink !== undefined && networkState.downlink > 0) {
      if (networkState.downlink >= 20) {
        // Velocidade típica de 5G
        quality = 'excellent';
        message = 'Conexão 5G detectada - velocidade excepcional';
        tips.push('Conexão de altíssima velocidade ideal para teleconsultas em 4K.');
      } else if (networkState.downlink >= 10) {
        quality = 'excellent';
        message = 'Conexão excelente para teleconsulta';
      } else if (networkState.downlink >= 5 && quality !== 'poor') {
        quality = 'good';
      } else if (networkState.downlink < 2) {
        quality = 'poor';
        message = 'Velocidade insuficiente para videochamadas';
        tips.push('Taxa de download abaixo do recomendado para consultas por vídeo.');
      }
    }

    // Verifica modo de economia de dados
    if (networkState.saveData) {
      tips.push('Modo de economia de dados ativado. A qualidade do vídeo pode ser reduzida.');
    }

    // Se não há dicas específicas, adiciona uma dica genérica positiva
    if (tips.length === 0) {
      tips.push('Conexão verificada e pronta para uso.');
    }

    return {
      quality,
      isOnline: true,
      message,
      tips,
      state: networkState,
    };
  }, [networkState]);

  return analysis;
}
