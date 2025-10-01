import ScheduleComponent from '@/components/Schedule/ScheduleComponent';
import { useEffect } from 'react';

/**
 * Página de visualização da Agenda de Consultas.
 * Permite ao usuário interagir com o calendário e gerenciar lembretes de consulta médica.
 */
export default function Schedule() {
  useEffect(() => {
    document.title = 'Lembrete de Agendamento';
  }, []);
  return (
    <main
      className='min-h-screen flex flex-col items-center justify-center'
      aria-label='Conteúdo principal de uma agenda de lembretes de consultas'
    >
      <ScheduleComponent />
    </main>
  );
}
