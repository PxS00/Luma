/**
 * Componente Toast reutilizável para exibir notificações rápidas.
 *
 * @param message Mensagem a ser exibida no toast
 * @param type Tipo do toast: 'success' | 'error'
 * @param show Se o toast deve ser exibido
 */

import type { ToastProps } from '../../types/toast';

export default function Toast({ message, type = 'success', show }: ToastProps) {
  if (!show) return null;
  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg text-white font-bold text-lg transition-all
        ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
      role='alert'
      aria-live='assertive'
    >
      {message}
    </div>
  );
}
