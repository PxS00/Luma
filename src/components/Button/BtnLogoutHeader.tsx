/**
 * Botão compacto de logout para o header
 * Versão minimalista do BtnLogout para uso no cabeçalho
 */
interface BtnLogoutHeaderProps {
  onClick: () => void;
  className?: string;
}

export default function BtnLogoutHeader({ onClick, className = '' }: BtnLogoutHeaderProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      aria-label='Sair da conta'
      className={`
        flex items-center justify-center
        h-10 w-10 md:h-11 md:w-11
        text-fontPrimary hover:text-red-600
        transition-colors duration-200
        rounded-full hover:bg-white/10
        ${className}
      `}
      title='Sair da conta'
    >
      {/* Ícone de logout simples usando SVG */}
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="w-5 h-5 md:w-6 md:h-6"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16,17 21,12 16,7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    </button>
  );
}