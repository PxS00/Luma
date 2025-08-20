type StoreButtonProps = {
  href: string;
  icon: string;
  alt: string;
  children: React.ReactNode;
};

export default function BotaoStore({ href, icon, alt, children }: StoreButtonProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <img src={icon} alt={alt} width={20} height={20} className="inline-block mr-2 align-middle" />
      <span className="align-middle">{children}</span>
    </a>
  );
}
