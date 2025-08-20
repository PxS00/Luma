import celular from '../../img/avatares/celular.png';
import pessoa from '../../img/avatares/pessoa.png';
import users from '../../img/avatares/users.png';



export type HomeCard = {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
  href: string;
};

export const HOME_CARDS: HomeCard[] = [
 {
    imgSrc: celular,
    imgAlt: 'Ícone de um celular',
    title: 'Auxílio Teleconsulta',
    description: 'Veja como acessar sua consulta online.',
    href: '/teleconsulta',
  },
  {
    imgSrc: pessoa,
    imgAlt: 'Imagem de uma Pessoa',
    title: 'Auxílio Cadastro',
    description: 'Ajuda para se cadastrar no Portal do Paciente.',
    href: '/cadastro',
  },
  {
    imgSrc: users,
    imgAlt: 'Imagem de duas pessoas',
    title: 'Conheça os Integrantes',
    description: 'Veja quem são os alunos desenvolvedores.',
    href: '/integrantes',
  },
];
