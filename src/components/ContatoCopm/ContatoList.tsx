
import { contacts } from '../../data/contactsData';
import ContatoItem from './ContatoItem';

/**
 * Lista de contatos da aplicação
 * Renderiza todos os itens de contato disponíveis
 */
export default function ContatoList() {
  return (
    <div className='contato-section '>
      {contacts.map((c, idx) => (
        <ContatoItem key={`${c.title}-${idx}`} item={c} />
      ))}
    </div>
  );
}
