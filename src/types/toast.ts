/**
 * Tipo para função de exibir toast
 */
export type ShowToastFn = (message: string, type?: 'success' | 'error') => void;
/**
 * Tipagem para o componente Toast
 */
export interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  show: boolean;
}

/**
 * Estado do toast para uso em hooks de notificação
 */
export type ToastState = { message: string; type: 'success' | 'error' } | null;
