import type { IntroSectionProps } from '@/types/tutorialStep';

/**
 * Componente reutilizável para seções de introdução
 * Usado nas páginas de auxílio para dar boas-vindas aos usuários
 *
 * @example
 * <IntroSection type="Cadastro" />
 * <IntroSection type="Teleconsulta" />
 */
export default function IntroSection({ type, description }: IntroSectionProps) {
  const defaultDesc =
    type === 'Teleconsulta'
      ? 'Instruções para participar da teleconsulta: realize os testes de câmera, microfone e conexão e garanta as permissões necessárias no app ou no navegador. Siga os passos abaixo para reduzir interrupções durante o atendimento.'
      : 'Passo a passo para cadastrar-se no portal de forma segura: insira seus dados, confirme suas informações e conclua a configuração. As instruções cobrem tanto app quanto navegador.';

  const text = description ?? defaultDesc;

  return (
    <section className='flex flex-col items-center justify-center gap-3 text-center'>
      <h1 className='text-4xl font-bold text-fontPrimary'>
        Bem-vindo ao Auxílio {type} de Pacientes
      </h1>
      <p className='text-lg text-gray-700'>{text}</p>
    </section>
  );
}