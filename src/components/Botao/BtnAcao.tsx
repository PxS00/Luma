type Variant = 'primary' | 'icon' | 'dot';

type BtnAcaoProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: Variant;
  'aria-label'?: string;
  'aria-pressed'?: boolean;
};

export default function BtnAcao({
  onClick,
  children,
  className,
  type = 'button',
  disabled = false,
  variant = 'primary',
  ...aria
}: BtnAcaoProps) {
  const base =
    variant === 'primary'
      ? 'bg-backBtn text-white px-4 py-2 rounded-md font-bold hover:bg-hoverBtn'
      : variant === 'icon'
        ? 'bg-backBtn text-white p-2 rounded-full hover:bg-hoverBtn'
        : // dot
          'size-2 rounded-full';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} transition-colors duration-300 disabled:opacity-50 ${className ?? ''}`}
      {...aria}
    >
      {children}
    </button>
  );
}
