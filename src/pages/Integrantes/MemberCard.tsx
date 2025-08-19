import type { Membro } from './members';

type Props = { m: Membro };

export default function MemberCard({ m }: Props) {
  return (
    <li>
      <div>
        <img src={m.foto} alt={`Foto de ${m.nome}`} />
      </div>

      <h2>{m.nome}</h2>
      <span>{m.rm}</span>

      <p>{m.descricao}</p>

      <div>
        {m.linkedin && (
          <a href={m.linkedin} target="_blank" rel="noreferrer">
            <img src="/img/icones/linkedin.png" alt="LinkedIn" />
          </a>
        )}
        {m.github && (
          <a href={m.github} target="_blank" rel="noreferrer">
            <img src="/img/icones/github.png" alt="GitHub" />
          </a>
        )}
      </div>
    </li>
  );
}
