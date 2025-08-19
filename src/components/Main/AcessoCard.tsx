type AcessoCardProps = {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
  href: string;
};

export default function AcessoCard({
  imgSrc,
  imgAlt,
  title,
  description,
  href,
}: AcessoCardProps) {
  return (
    <div className="cartao">
      <div>
        //*TODO: mover imagem para /public se ainda não estiver
        <img src={imgSrc} alt={imgAlt} />
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      //*TODO: migrar link para página React (Link) no futuro
      <a href={href} className="botao">
        Acessar
      </a>
    </div>
  );
}