type MembroAvatarProps = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * Avatar circular para foto de membro
 * Responsivo: menor em telas pequenas, maior em telas grandes
 */
export default function MembroAvatar({ src, alt, className = '' }: MembroAvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={[
        // tamanho progressivo
        'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40',
        // formato
        'rounded-full object-cover shrink-0',
        className,
      ].join(' ')}
      loading='lazy'
    />
  );
}
