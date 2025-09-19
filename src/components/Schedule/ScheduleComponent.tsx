/**
 * Componente principal do Medical Schedule (Agenda de Consultas).
 * Permite ao usuário visualizar o calendário, adicionar, editar e remover lembretes de consultas médicas.
 *
 * Utiliza os subcomponentes CalendarGrid, ReminderModal e ReminderList.
 *
 * @module Schedule
 */
import { useSchedule } from '@/hooks/useSchedule';
import { formatDate, getDaysMatrix, getMonthName } from '../../utils/calendarUtils';
import CalendarGrid from './CalendarGrid';
import ReminderModal from './ReminderModal';

/**
 * Componente Schedule
 */

export default function ScheduleComponent() {
  // Hook customizado para gerenciar toda a lógica do schedule
  const {
    today,
    currentMonth,
    currentYear,
    selectedDate,
    showModal,
    editingReminder,
    formTime,
    setFormTime,
    formDescription,
    setFormDescription,
    nextMonth,
    prevMonth,
    handleDayClick,
    handleSaveReminder,
    handleEditReminder,
    handleRemoveReminder,
    setShowModal,
    remindersOfDay,
    remindersForCalendar,
  } = useSchedule();

  return (
    <main className='min-h-screen flex flex-col items-center justify-center py-8 bg-backPrimary'>
      {/* Bloco centralizado do schedule */}
      <section className='w-full max-w-7xl mx-auto flex flex-col items-center bg-transparent border-none shadow-none p-0'>
        <div className='w-full max-w-6xl rounded-3xl shadow-[0_2px_16px_rgba(255,112,67,0.10)] bg-white border border-orange-100 box-border p-0 sm:p-8 md:p-12 flex flex-col items-center overflow-hidden'>
          {/* Título */}
          <h1 className='text-fontPrimary text-3xl mb-6 text-center font-bold'>Medical Schedule</h1>
          {/* Navegação do mês */}
          <div className='flex items-center justify-between w-full mb-4 px-2 sm:px-8'>
            <button
              className='px-3 py-2 rounded-lg bg-gray-100 hover:bg-orange-100 text-orange-700 text-xl font-bold focus:outline-none'
              onClick={prevMonth}
              aria-label='Previous month'
            >
              &#8592;
            </button>
            <span className='font-semibold text-2xl text-orange-700'>
              {getMonthName(currentMonth)} {currentYear}
            </span>
            <button
              className='px-3 py-2 rounded-lg bg-gray-100 hover:bg-orange-100 text-orange-700 text-xl font-bold focus:outline-none'
              onClick={nextMonth}
              aria-label='Next month'
            >
              &#8594;
            </button>
          </div>
          {/* Grade do calendário */}
          <div className='w-full px-0 sm:px-4 md:px-8'>
            <CalendarGrid
              currentMonth={currentMonth}
              currentYear={currentYear}
              today={today}
              reminders={remindersForCalendar}
              onDayClick={handleDayClick}
              getMonthName={getMonthName}
              getDaysMatrix={getDaysMatrix}
              formatDate={(day) => formatDate(day, currentMonth, currentYear)}
            />
          </div>
          {/* Modal de lembretes */}
          <ReminderModal
            show={showModal}
            onClose={() => setShowModal(false)}
            selectedDate={selectedDate}
            editingReminder={editingReminder}
            remindersOfDay={remindersOfDay}
            formTime={formTime}
            setFormTime={setFormTime}
            formDescription={formDescription}
            setFormDescription={setFormDescription}
            onSave={handleSaveReminder}
            onEdit={handleEditReminder}
            onRemove={handleRemoveReminder}
          />
          {/* Lista de lembretes do dia (fora do modal, para acessibilidade) */}
          {selectedDate && remindersOfDay.length > 0 && (
            <div className='mt-4 w-full px-0 sm:px-4 md:px-8'>
              <h3 className='text-sm font-semibold mb-1'>Reminders of the day:</h3>
              <ul className='space-y-1'>
                {remindersOfDay.map((r, idx) => (
                  <li
                    key={idx}
                    className='flex items-center justify-between bg-gray-50 rounded px-2 py-1'
                  >
                    <div>
                      <span className='font-medium text-sm'>{r.time}</span> -{' '}
                      <span className='text-xs'>{r.description}</span>
                    </div>
                    <div className='flex gap-1'>
                      <button
                        className='text-blue-500 hover:underline text-xs focus:outline-none'
                        onClick={() => handleEditReminder(r)}
                        aria-label='Edit reminder'
                      >
                        Edit
                      </button>
                      <button
                        className='text-red-500 hover:underline text-xs focus:outline-none'
                        onClick={() => handleRemoveReminder(r)}
                        aria-label='Remove reminder'
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
