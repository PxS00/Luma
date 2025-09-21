import ScheduleComponent from '@/components/Schedule/ScheduleComponent';
import { useEffect } from 'react';

/**
 * Página de visualização da Agenda de Consultas.
 * Permite ao usuário interagir com o calendário e gerenciar lembretes de consulta médica.
 *
 * @example
 * // Uso em rotas (React Router)
 * <Route path="/schedule" element={<Schedule />} />
 */
export default function Schedule() {
  useEffect(() => {
    document.title = 'Agenda de Consultas';
  }, []);
  return (
    <main
      className='min-h-screen flex flex-col items-center justify-center'
      aria-label='Conteúdo principal da agenda de consultas'
    >
      {/* Componente principal de agendamento e lembretes */}
      <ScheduleComponent />
    </main>
  );
}
