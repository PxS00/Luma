/**
 * Componente ReminderModal
 * Modal para adicionar ou editar lembretes de consulta médica.
 */
import type { ReminderModalProps } from '@/types/schedule';
import ReminderList from './ReminderList';

export default function ReminderModal(props: ReminderModalProps) {
  const {
    show,
    onClose,
    selectedDate,
    editingReminder,
    remindersOfDay,
    formTime,
    setFormTime,
    formDescription,
    setFormDescription,
    onSave,
    onEdit,
    onRemove,
  } = props;
  if (!show) return null;
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm'>
      <div
        className='bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-200 relative flex flex-col items-center'
        role='dialog'
        aria-modal='true'
        aria-labelledby='schedule-modal-title'
      >
        <button
          className='absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl'
          onClick={onClose}
          aria-label='Fechar modal'
        >
          &times;
        </button>
        <h3
          id='schedule-modal-title'
          className='text-2xl font-bold mb-4 text-center text-fontPrimary'
        >
          {editingReminder ? 'Editar lembrete' : 'Novo lembrete'}
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!selectedDate) return;
            onSave({
              date: selectedDate,
              time: formTime,
              description: formDescription,
            });
          }}
          className='flex flex-col gap-4 w-full'
        >
          <label className='text-base font-medium text-fontPrimary' htmlFor='schedule-time'>
            Horário
          </label>
          <input
            id='schedule-time'
            type='time'
            className='border border-gray-300 rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
            value={formTime}
            onChange={(e) => setFormTime(e.target.value)}
            required
          />
          <label className='text-base font-medium text-fontPrimary' htmlFor='schedule-desc'>
            Descrição
          </label>
          <input
            id='schedule-desc'
            type='text'
            className='border border-gray-300 rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder='Ex: Consulta com Dr. João'
            required
            maxLength={60}
          />
          <button
            type='submit'
            className='mt-2 bg-blue-600 text-white rounded-lg px-4 py-2 text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
          >
            {editingReminder ? 'Atualizar' : 'Adicionar'}
          </button>
        </form>
        <div className='w-full mt-4'>
          <ReminderList reminders={remindersOfDay} onEdit={onEdit} onRemove={onRemove} />
        </div>
      </div>
    </div>
  );
}
