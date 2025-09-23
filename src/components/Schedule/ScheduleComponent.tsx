/**
 * Componente principal do Medical Schedule (Agenda de Consultas).
 * Permite ao usuário visualizar o calendário, adicionar, editar e remover lembretes de consultas médicas.
 *
 * Utiliza os subcomponentes CalendarGrid, ReminderModal e ReminderList.
 *
 * @module Schedule
 */

import { useSchedule } from '@/hooks/useSchedule';
import React, { useEffect, useState } from 'react';
import type { ReminderAction, ReminderHandlerFn } from '../../types/reminder';
import type { ShowToastFn, ToastState } from '../../types/toast';
import { formatDate, getDaysMatrix, getMonthName } from '../../utils/calendarUtils';
import { saveReminderToStorage } from '../../utils/reminderStorage';
import Toast from '../Toast/Toast';
import CalendarGrid from './CalendarGrid';
import ReminderModal from './ReminderModal';

/**
 * Componente Schedule
 */

/**
 * Componente principal da agenda médica.
 * @returns JSX.Element
 */
export default function ScheduleComponent(): React.JSX.Element {
  // Estado para mensagem de erro do modal
  const [modalError, setModalError] = useState<string | null>(null);
  // Estado para notificação tipo toast
  const [toast, setToast] = useState<ToastState>(null);
  // Estado para controlar a última ação de lembrete
  const [reminderAction, setReminderAction] = useState<ReminderAction | null>(null);

  // Função para exibir toast
  /**
   * Exibe um toast na tela
   * @param message Mensagem do toast
   * @param type Tipo do toast ('success' | 'error')
   */
  const showToast: ShowToastFn = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Dispara o toast após a ação de lembrete ser concluída
  useEffect((): void => {
    if (!reminderAction) return;
    if (reminderAction === 'add') showToast('Lembrete adicionado com sucesso!', 'success');
    if (reminderAction === 'edit') showToast('Lembrete editado com sucesso!', 'success');
    if (reminderAction === 'remove') showToast('Lembrete removido com sucesso!', 'success');
    setReminderAction(null);
  }, [reminderAction]);
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

  // Wrappers para registrar ação e executar handlers
  /**
   * Handler para salvar lembrete e registrar ação
   * @param reminder Lembrete a ser salvo
   */
  const handleSaveReminderWithAction: ReminderHandlerFn = (reminder) => {
    setModalError(null);
    handleSaveReminder(reminder);
    saveReminderToStorage(reminder);
    setReminderAction('add');
  };
  /**
   * Handler para editar lembrete e registrar ação
   * @param reminder Lembrete a ser editado
   */
  const handleEditReminderWithAction: ReminderHandlerFn = (reminder) => {
    handleEditReminder(reminder);
    setReminderAction('edit');
  };
  /**
   * Handler para remover lembrete e registrar ação
   * @param reminder Lembrete a ser removido
   */
  const handleRemoveReminderWithAction: ReminderHandlerFn = (reminder) => {
    handleRemoveReminder(reminder);
    setReminderAction('remove');
  };

  // Calcula se está no limite de 6 meses à frente e atrás
  const limitNextDate = new Date(today.getFullYear(), today.getMonth() + 6, 1);
  const nextDate =
    currentMonth === 11
      ? new Date(currentYear + 1, 0, 1)
      : new Date(currentYear, currentMonth + 1, 1);
  const isNextDisabled = nextDate > limitNextDate;

  // Só permite voltar até o mês/ano atual
  const prevDate =
    currentMonth === 0
      ? new Date(currentYear - 1, 11, 1)
      : new Date(currentYear, currentMonth - 1, 1);
  const isPrevDisabled =
    prevDate.getFullYear() < today.getFullYear() ||
    (prevDate.getFullYear() === today.getFullYear() && prevDate.getMonth() < today.getMonth());

  return (
    <main className='min-h-screen flex flex-col items-center justify-center py-8 bg-backPrimary'>
      {/* Toast notification */}
      <Toast message={toast?.message || ''} type={toast?.type} show={!!toast} />
      {/* Bloco centralizado do schedule */}
      <section className='w-full max-w-7xl mx-auto flex flex-col items-center bg-transparent border-none shadow-none p-0'>
        <div className='w-full max-w-6xl rounded-3xl bg-white border border-orange-100 box-border p-0 sm:p-8 md:p-12 flex flex-col items-center shadow-none'>
          {/* Título principal */}
          <h1 className='text-fontPrimary text-3xl mb-2 text-center font-bold'>
            Lembrete de Agendamento
          </h1>
          {/* Ano centralizado entre as setas */}
          <div className='flex items-center justify-between w-full mb-2 px-2 sm:px-8'>
            <button
              className={`px-3 py-2 rounded-lg text-xl font-bold focus:outline-none transition-all ${isPrevDisabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-orange-700 hover:bg-orange-800 text-white'}`}
              onClick={isPrevDisabled ? undefined : prevMonth}
              aria-label='Mês anterior'
              disabled={isPrevDisabled}
            >
              &#8592;
            </button>
            <span className='text-orange-700 text-2xl font-bold text-center flex-1'>
              {currentYear}
            </span>
            <button
              className={`px-3 py-2 rounded-lg text-xl font-bold focus:outline-none transition-all ${isNextDisabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-orange-700 hover:bg-orange-800 text-white'}`}
              onClick={isNextDisabled ? undefined : nextMonth}
              aria-label='Mês seguinte'
              disabled={isNextDisabled}
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
              formatDate={(day: number) => formatDate(day, currentMonth, currentYear)}
            />
            {/* Botão de adicionar lembrete */}
            <div className='w-full flex justify-center my-6'>
              <button
                className='flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-xl text-lg shadow transition focus:outline-none focus:ring-2 focus:ring-orange-400'
                onClick={() => {
                  const usuarioLogado = localStorage.getItem('usuarioLogado');
                  if (!usuarioLogado) {
                    setModalError('Você precisa estar logado para adicionar lembretes!');
                    showToast('Faça login ou cadastro para adicionar lembretes.', 'error');
                    setShowModal(false);
                  } else {
                    setModalError(null);
                    setShowModal(true);
                  }
                }}
                aria-label='Adicionar lembrete'
              >
                <span className='text-2xl font-bold'>+</span> Adicionar Lembrete
              </button>
            </div>
            <ReminderModal
              show={showModal}
              onClose={() => {
                setShowModal(false);
                setModalError(null);
              }}
              selectedDate={selectedDate}
              editingReminder={editingReminder}
              remindersOfDay={remindersOfDay}
              formTime={formTime}
              setFormTime={setFormTime}
              formDescription={formDescription}
              setFormDescription={setFormDescription}
              onSave={handleSaveReminderWithAction}
              onEdit={handleEditReminderWithAction}
              onRemove={handleRemoveReminderWithAction}
              error={modalError}
            />
          </div>
          {/* Lista de lembretes do dia (fora do modal, para acessibilidade) */}
          {selectedDate && remindersOfDay.length > 0 && (
            <div className='mt-6 mb-4 w-full px-2 sm:px-6 md:px-12 bg-transparent shadow-none'>
              <h3 className='text-2xl font-semibold mb-3'>Lembretes do dia:</h3>
              <ul className='space-y-3 border border-orange-200 rounded-2xl bg-gray-50 max-w-2xl mx-auto py-3'>
                {remindersOfDay.map((r, idx) => (
                  <li
                    key={idx}
                    className='flex items-center justify-between bg-gray-50 rounded px-6 py-4 min-h-[56px] text-lg'
                  >
                    <div>
                      <span className='font-medium text-lg'>{r.time}</span> -{' '}
                      <span className='text-lg'>{r.description}</span>
                    </div>
                    <div className='flex gap-4'>
                      <button
                        className='text-blue-500 hover:underline text-lg focus:outline-none'
                        onClick={() => handleEditReminderWithAction(r)}
                        aria-label='Edit reminder'
                      >
                        Editar
                      </button>
                      <button
                        className='text-red-500 hover:underline text-lg focus:outline-none'
                        onClick={() => handleRemoveReminderWithAction(r)}
                        aria-label='Remove reminder'
                      >
                        Remover
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
