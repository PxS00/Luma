type BotaoProps = {
  href: string;
  children: React.ReactNode;
};

export default function Botao({ href, children }: BotaoProps) {
  return (
    <a href={href} className='bg-backBtn text-white px-4 py-2 rounded-md font-bold transition-colors duration-300 hover:bg-hoverBtn'>
        {children}
      </a>
  );
}