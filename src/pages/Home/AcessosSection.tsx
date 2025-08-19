import AcessoCard from '../../components/common/AcessoCard';

const CARDS = [
  {
    imgSrc: '/assets/img/avatares/celular.png',
    imgAlt: 'Ícone de um celular',
    title: 'Auxílio Teleconsulta',
    description: 'Veja como acessar sua consulta online.',
    href: '/assets/auxilio/teleconsulta.html',
  },
  {
    imgSrc: '/assets/img/avatares/pessoa.png',
    imgAlt: 'Imagem de uma Pessoa',
    title: 'Auxílio Cadastro',
    description: 'Ajuda para se cadastrar no Portal do Paciente.',
    href: '/assets/auxilio/cadastro.html',
  },
  {
    imgSrc: '/assets/img/avatares/users.png',
    imgAlt: 'Imagem de duas pessoas',
    title: 'Conheça os Integrantes',
    description: 'Veja quem são os alunos desenvolvedores.',
    href: '/assets/integrantes/integrantes.html',
  },
] as const;

export default function AcessosSection() {
  return (
    <section className="acessos">
      {CARDS.map((c) => (
        <AcessoCard
          key={c.href}
          imgSrc={c.imgSrc}
          imgAlt={c.imgAlt}
          title={c.title}
          description={c.description}
          href={c.href}
        />
      ))}
    </section>
  );
}
