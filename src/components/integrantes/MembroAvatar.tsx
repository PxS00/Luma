type Props = { src: string; alt: string; className?: string };

export default function MembroAvatar({ src, alt, className = '' }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-[140px] h-[140px] rounded-full object-cover shrink-0 ${className}`}
      loading='lazy'
    />
  );
}
