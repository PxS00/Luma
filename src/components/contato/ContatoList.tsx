import ContatoItem from './ContatoItem';
import { contatos } from '../../data/contatos';

/**
 * Lista de contatos da aplicação
 * Renderiza todos os itens de contato disponíveis
 */
export default function ContatoList() {
  return (
    <div className='contato-section '>
      {contatos.map((c, idx) => (
        <ContatoItem key={`${c.title}-${idx}`} item={c} />
      ))}
    </div>
  );
}
