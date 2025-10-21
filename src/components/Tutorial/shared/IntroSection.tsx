import type { IntroSectionProps } from '@/types/tutorialStep';

/**
 * Componente reutilizável para seções de introdução
 * Usado nas páginas de auxílio para dar boas-vindas aos usuários
 *
 * @example
 * <IntroSection type="Cadastro" />
 * <IntroSection type="Teleconsulta" />
 */
export default function IntroSection({
  type,
  description = 'Escolha como deseja continuar a teleconsulta.',
}: IntroSectionProps) {
  return (
    <section className='flex flex-col items-center justify-center gap-3 text-center'>
      <h1 className='text-4xl font-bold text-fontPrimary'>
        Bem-vindo ao Auxílio {type} de Pacientes
      </h1>
      <p className='text-lg text-gray-700'>{description}</p>
    </section>
  );
}