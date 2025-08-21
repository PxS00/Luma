import ContatoList from './components/ContatoList';

export default function Contato() {
  return (
    <main>
      <div className='container'>
        <h1 className='contato-title'>Contatos</h1>
        <p className='contato-subtitle'>
          Este é um canal de diálogo entre a Instituição e o paciente, cuidador e família
        </p>
        <ContatoList />
      </div>
    </main>
  );
}
