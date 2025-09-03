type BtnExternoProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: '_blank' | '_self';
};

/**
 * Botão para links externos
 * Usado para navegação para fora da aplicação
 */
export default function BtnExterno({
  href,
  children,
  className = '',
  target = '_blank',
}: BtnExternoProps) {
  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={`bg-backBtn text-white rounded-md font-bold transition-colors duration-300 hover:bg-hoverBtn ${className}`}
    >
      {children}
    </a>
  );
}
