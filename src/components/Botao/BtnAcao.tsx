import React from 'react';

type Variant = 'primary' | 'icon' | 'dot';

/**
 * Botão genérico para ações na aplicação
 * Suporta variantes: primary (texto), icon (apenas ícone), dot (indicador)
 */
type BtnAcaoProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export default function BtnAcao({
  onClick,
  children,
  className,
  type = 'button',
  disabled = false,
  variant = 'primary',
  ...rest
}: BtnAcaoProps) {
  const base =
    variant === 'primary'
      ? 'bg-backBtn text-white px-4 py-2 rounded-md font-bold hover:bg-hoverBtn'
      : variant === 'icon'
        ? 'bg-backBtn text-white p-2 rounded-full hover:bg-hoverBtn'
        : /* dot */ 'size-2 rounded-full';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} transition-colors duration-300 disabled:opacity-50 ${className ?? ''}`}
      {...rest}
    >
      {children}
    </button>
  );
}
