import type { HomeCard } from './navItems';
import { celular, pessoa, users } from './imagens';

export const HOME_CARDS: HomeCard[] = [
  {
    label: 'Auxílio Teleconsulta',
    href: '/teleconsulta',
    imgSrc: celular,
    imgAlt: 'Ícone de um celular',
    title: 'Auxílio Teleconsulta',
    description: 'Veja como acessar sua consulta online.',
  },
  {
    label: 'Auxílio Cadastro',
    href: '/cadastro',
    imgSrc: pessoa,
    imgAlt: 'Imagem de uma Pessoa',
    title: 'Auxílio Cadastro',
    description: 'Ajuda para se cadastrar no Portal do Paciente.',
  },
  {
    label: 'Integrantes',
    href: '/integrantes',
    imgSrc: users,
    imgAlt: 'Imagem de duas pessoas',
    title: 'Conheça os Integrantes',
    description: 'Veja quem são os alunos desenvolvedores.',
  },
];
