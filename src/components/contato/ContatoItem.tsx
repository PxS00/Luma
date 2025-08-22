import BtnExterno from '../Botao/BtnExterno';
import type { Contato } from '../../data/contatos';

type Props = { item: Contato };

export default function ContatoItem({ item }: Props) {
  return (
    <div className='contato'>
      <h3>{item.titulo}</h3>

      {item.presencial && <p>Presencial: {item.presencial}</p>}

      {item.email && (
        <p>
          E-mail: <a href={`mailto:${item.email}`}>{item.email}</a>
        </p>
      )}

      {item.tel && <p>Tel: {item.tel}</p>}

      {item.funcionamento && <p>Funcionamento: {item.funcionamento}</p>}

      {item.linkExterno && (
        <p>
          <BtnExterno href={item.linkExterno.href} target='_blank'>
            {item.linkExterno.rotulo}
          </BtnExterno>
        </p>
      )}
    </div>
  );
}
