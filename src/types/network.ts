/**
 * Tipos relacionados ao status da rede
 */

/**
 * Estado detalhado da conexão de rede
 */
export interface NetworkState {
  /** Indica se o navegador está online ou offline */
  online: boolean;
  /** Estimativa de largura de banda efetiva em megabits por segundo */
  downlink?: number;
  /** Tipo efetivo da conexão para navegação web ('slow-2g', '2g', '3g', '4g') */
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  /** Latência estimada da conexão em milissegundos (round-trip time) */
  rtt?: number;
  /** Se o usuário solicitou modo de dados reduzido */
  saveData?: boolean;
}

/**
 * Classificação de qualidade da conexão
 */
export type NetworkQuality = 'excellent' | 'good' | 'poor' | 'offline';

/**
 * Resultado da análise de qualidade da rede
 */
export interface NetworkAnalysis {
  /** Qualidade atual da conexão */
  quality: NetworkQuality;
  /** Status online/offline */
  isOnline: boolean;
  /** Mensagem descritiva do status */
  message: string;
  /** Dicas para o usuário */
  tips: string[];
  /** Estado detalhado da rede */
  state: NetworkState;
}
