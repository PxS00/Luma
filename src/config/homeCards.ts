/**
 * Lista de cards exibidos na página inicial
 * Cada card representa um acesso rápido a uma funcionalidade principal do sistema
 *
 * @type {HomeCard[]}
 */
import { celular, pessoa, users } from '@/assets/images';
import type { HomeCard } from '@/types/navigation';

export const HOME_CARDS: HomeCard[] = [
  {
    label: 'Auxílio Teleconsulta',
    href: '/auxilio/teleconsulta',
    imgSrc: celular,
    imgAlt: 'Ícone de um celular',
    title: 'Auxílio Teleconsulta',
    description: 'Veja como acessar sua consulta online.',
  },
  {
    label: 'Auxílio Cadastro',
    href: '/auxilio/cadastro',
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
