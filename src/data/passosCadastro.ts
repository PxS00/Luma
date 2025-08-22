import {
  instalarPlaystore,
  acessandoApp,
  preenchendoCpf,
  verificacaoDados,
  dadosContato,
  confirmacaoNomeMae,
  confirmacaoAno,
  cadastroSenha,
  senhaCadastro,
  acessoPortal,
  cadastrando,
  appstore,
  playstore,
} from './imagens';
import type { Passo } from '../types/passo';

export const PASSOS_MOBILE: Passo[] = [
  { title: 'Baixe o app na loja', img: instalarPlaystore, alt: 'Play Store' },
  { title: 'Clique em Acessar Portal', img: acessandoApp, alt: 'Acessando app' },
  { title: 'Clique em Cadastrar Senha', img: cadastrando, alt: 'Cadastrando no app' },
  { title: 'Informe seu CPF', img: preenchendoCpf, alt: 'Campo CPF' },
  { title: 'Verifique seus dados', img: verificacaoDados, alt: 'Verificação' },
  { title: 'Dados de contato', img: dadosContato, alt: 'E-mail e celular' },
  { title: 'Confirme o nome da mãe', img: confirmacaoNomeMae, alt: 'Nome da mãe' },
  { title: 'Selecione o ano de nasc.', img: confirmacaoAno, alt: 'Ano de nascimento' },
  { title: 'Crie sua senha', img: cadastroSenha, alt: 'Criação de senha' },
  { title: 'Cadastro concluído', img: senhaCadastro, alt: 'Sucesso' },
];

export const PASSOS_DESK: Passo[] = [
  { title: 'Acesse o portal', img: acessoPortal, alt: 'Portal' },
  { title: "Escolha 'Cadastrar Senha'", img: cadastrando, alt: 'Início do cadastro' },
  { title: 'Informe seu CPF', img: preenchendoCpf, alt: 'Campo CPF' },
  { title: 'Verifique seus dados', img: verificacaoDados, alt: 'Verificação' },
  { title: 'Dados de contato', img: dadosContato, alt: 'E-mail e celular' },
  { title: 'Confirme dados', img: confirmacaoAno, alt: 'Confirmações' },
  { title: 'Crie sua senha', img: cadastroSenha, alt: 'Criação de senha' },
  { title: 'Tudo certo!', img: senhaCadastro, alt: 'Sucesso' },
];

export const STORE_LINKS = {
  play: {
    href: 'https://play.google.com/store/apps/details?id=com.netihc.portaldopaciente',
    icon: playstore,
    alt: 'Play Store',
  },
  app: {
    href: 'https://apps.apple.com/br/app/portal-do-paciente-hc/id1572694502',
    icon: appstore,
    alt: 'App Store',
  },
} as const;
