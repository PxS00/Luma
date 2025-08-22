import {
  playstore,
  appstore,
  abrindoApp,
  acessandoApp,
  entrandoApp,
  acessandoMenu,
  teleconsulta,
  direcionamentoTermo,
  aceitandoTermo,
  detalhesTeleconsulta,
  selecNavegador,
  autorizandoAudio,
  liberandoCamera,
  permissaoCamera,
  opcoesCamera,
  finalTeleconsulta,
} from './imagens';

export type TeleconsultaStep = { title: string; img: string; alt: string };

export const MOBILE_PASSOS: TeleconsultaStep[] = [
  { title: 'Abra o App do Portal', img: abrindoApp, alt: 'Tela do app aberto' },
  { title: 'Clique em Acessar Portal', img: acessandoApp, alt: 'Tela inicial do app' },
  { title: 'Preencha CPF e Senha', img: entrandoApp, alt: 'Formulário de login' },
  { title: 'Abra o Menu → Teleconsulta', img: acessandoMenu, alt: 'Menu do app' },
  { title: 'Toque em Teleconsulta', img: teleconsulta, alt: 'Opção Teleconsulta no app' },
  { title: 'Termo de consentimento', img: direcionamentoTermo, alt: 'Aviso do termo' },
  { title: 'Aceite o termo', img: aceitandoTermo, alt: 'Tela do termo' },
  { title: 'Entrar na teleconsulta', img: detalhesTeleconsulta, alt: 'Botão entrar' },
  { title: 'Escolha o Chrome (uma vez)', img: selecNavegador, alt: 'Escolha de navegador' },
  { title: 'Somente ouvir', img: autorizandoAudio, alt: 'Permissão de áudio' },
  { title: 'Ative a câmera', img: liberandoCamera, alt: 'Ativar câmera' },
  { title: 'Permitir câmera', img: permissaoCamera, alt: 'Permissão para câmera' },
  { title: 'Iniciar compartilhamento', img: opcoesCamera, alt: 'Seleção de câmera' },
  { title: 'Boa teleconsulta!', img: finalTeleconsulta, alt: 'Consulta em andamento' },
];

export const DESK_PASSOS: TeleconsultaStep[] = [
  { title: 'Clique em Acessar Portal', img: acessandoApp, alt: 'Portal do paciente (web)' },
  { title: 'Login com CPF e Senha', img: entrandoApp, alt: 'Formulário de login' },
  { title: 'Menu → Teleconsulta', img: acessandoMenu, alt: 'Menu web' },
  { title: 'Termo de consentimento', img: direcionamentoTermo, alt: 'Aviso do termo' },
  { title: 'Aceite o termo', img: aceitandoTermo, alt: 'Tela do termo' },
  { title: 'Entrar na teleconsulta', img: detalhesTeleconsulta, alt: 'Botão entrar' },
  { title: 'Somente ouvir', img: autorizandoAudio, alt: 'Permissão de áudio' },
  { title: 'Ativar e permitir câmera', img: liberandoCamera, alt: 'Ativar câmera' },
  { title: 'Iniciar compartilhamento', img: opcoesCamera, alt: 'Seleção de câmera' },
  { title: 'Boa teleconsulta!', img: finalTeleconsulta, alt: 'Consulta em andamento' },
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
