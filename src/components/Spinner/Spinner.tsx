import type { SpinnerProps } from '@/types/spinner';

const preset = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-10 h-10',
};

export default function Spinner({
  size = 'md',
  label = 'Carregando...',
  inline = false,
  className = '',
  message = null,
}: SpinnerProps) {
  const sizeClass = typeof size === 'string' ? preset[size] ?? preset.md : '';
  const style = typeof size === 'number' ? { width: size, height: size } : undefined;

  const containerClass = inline ? `inline-flex items-center ${className}` : `flex flex-col items-center ${className}`;

  return (
    <span role="status" aria-live="polite" className={containerClass.trim()}>
      <span className={`${sizeClass} flex items-center justify-center`} style={style} aria-hidden>
        <svg
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin text-clikColor w-full h-full"
          aria-hidden
        >
          <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="5" className="opacity-25" fill="none" />
          <path
            fill="currentColor"
            className="opacity-75"
            d="M43.935 25c0-10.318-8.364-18.682-18.682-18.682-10.318 0-18.682 8.364-18.682 18.682h4.068c0-8.071 6.543-14.614 14.614-14.614 8.071 0 14.614 6.543 14.614 14.614h4.068z"
          />
        </svg>
      </span>

      {message ? (
        <span className={`${inline ? 'ml-2' : 'mt-2'} text-sm text-fontTertiary`}>{message}</span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
    </span>
  );
}
