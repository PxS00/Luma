import { CADASTRO_DESK } from '@/data/passoAPasso';
import TutorialSection from '../Tutorial/shared/TutorialSection';

/**
 * Tutorial de cadastro para desktop/navegador
 * Exibe passos para cadastro via site com link direto
 */
export default function DeskCadastro() {
  return (
    <TutorialSection
      title='Acesse pelo Navegador'
      description='Você também pode fazer seu cadastro diretamente pelo site, sem instalar nada.'
      actionButton={{
        href: 'https://portaldopaciente.hc.fm.usp.br/',
        label: 'Acessar Site',
        external: true,
      }}
      tutorialTitle='Como fazer o cadastro no navegador'
      passos={CADASTRO_DESK}
      className='lista-passos-desk'
    />
  );
}
