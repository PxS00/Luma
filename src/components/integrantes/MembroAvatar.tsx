type MembroAvatarProps = { src: string; alt: string; className?: string };

/**
 * Avatar circular para foto de membro
 * Exibe imagem do membro da equipe com bordas arredondadas
 */
export default function MembroAvatar({ src, alt, className = '' }: MembroAvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-[180px] h-[180px] rounded-full object-cover shrink-0 ${className}`}
      loading='lazy'
    />
  );
}
