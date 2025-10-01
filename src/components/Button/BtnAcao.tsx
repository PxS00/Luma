import type { BtnAcaoProps } from '@/types/button';

/**
 * Botão genérico para ações na aplicação
 *
 * Variantes disponíveis:
 * - `primary`: Botão padrão com texto (tabs, formulários)
 * - `icon`: Botão circular para ícones (controles de carrossel)
 * - `dot`: Indicador pequeno (pontos de navegação)
 */
export default function BtnAcao({
  onClick,
  children,
  className,
  type = 'button',
  disabled = false,
  variant = 'primary',
  'aria-label': ariaLabel,
  ...rest
}: BtnAcaoProps) {
  const base =
    variant === 'primary'
      ? 'bg-backBtn text-white px-4 py-2 rounded-md font-bold hover:bg-hoverBtn'
      : variant === 'icon'
        ? 'bg-backBtn text-white p-2 rounded-full hover:bg-hoverBtn'
        : /* dot */ 'size-2 rounded-full hover:opacity-80';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${base} transition-colors duration-300 disabled:opacity-50 ${className ?? ''}`}
      {...rest}
    >
      {children}
    </button>
  );
}
