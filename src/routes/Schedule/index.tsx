import ScheduleComponent from '@/components/Schedule/ScheduleComponent';
import { useEffect } from 'react';

/**
 * Página de visualização da Agenda de Consultas.
 * Permite ao usuário interagir com o calendário e gerenciar lembretes de consulta médica.
 */
export default function Schedule() {
  useEffect(() => {
    document.title = 'Agenda de Consultas';
  }, []);
  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
      <ScheduleComponent />
    </main>
  );
}
