import type { Passo } from '../../types/passo';

type Props = { passo: Passo; numeracao?: number };

export default function PassoView({ passo, numeracao }: Props) {
  return (
    <li>
      <h3>
        {numeracao !== undefined ? `${numeracao + 1}. ` : ''}
        {passo.title}
      </h3>
      {passo.descricao && <p>{passo.descricao}</p>}
      {passo.img && <img src={passo.img} alt={passo.alt || passo.title} />}
    </li>
  );
}
