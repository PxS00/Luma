type HamburgerIconProps = {
  open: boolean;
  className?: string;
};

export default function HamburgerIcon({ open, className = "" }: HamburgerIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      {open ? (
        // Ícone de X
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M6 6L18 18M6 18L18 6"
        />
      ) : (
        // Ícone hambúrguer (três linhas)
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
    </svg>
  );
}
