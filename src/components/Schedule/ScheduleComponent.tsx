/**
 * Componente principal do Medical Schedule (Agenda de Consultas).
 * Responsivo: ajustes de paddings, tipografia e tamanhos por breakpoint.
 */

import { useSchedule } from '@/hooks/useSchedule';
import React, { useEffect, useState } from 'react';
import type { ReminderAction, ReminderHandlerFn } from '../../types/reminder';
import type { ShowToastFn, ToastState } from '../../types/toast';
import { formatDate, getDaysMatrix, getMonthName } from '../../utils/calendarUtils';
import Toast from '../Toast/Toast';
import CalendarGrid from './CalendarGrid';
import ReminderModal from './ReminderModal';

export default function ScheduleComponent(): React.JSX.Element {
  // Estado de UI
  const [modalError, setModalError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>(null);
  const [reminderAction, setReminderAction] = useState<ReminderAction | null>(null);

  // Toast helper
  const showToast: ShowToastFn = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
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

  // Wrappers para registrar ação
  const handleSaveReminderWithAction: ReminderHandlerFn = (reminder) => {
    setModalError(null);
    handleSaveReminder(reminder);
    setReminderAction('add');
  };
  const handleEditReminderWithAction: ReminderHandlerFn = (reminder) => {
    handleEditReminder(reminder);
    setReminderAction('edit');
  };
  const handleRemoveReminderWithAction: ReminderHandlerFn = (reminder) => {
    handleRemoveReminder(reminder);
    setReminderAction('remove');
  };

  // Limites de navegação
  const limitNextDate = new Date(today.getFullYear(), today.getMonth() + 6, 1);
  const nextDate =
    currentMonth === 11 ? new Date(currentYear + 1, 0, 1) : new Date(currentYear, currentMonth + 1, 1);
  const isNextDisabled = nextDate > limitNextDate;

  const prevDate =
    currentMonth === 0 ? new Date(currentYear - 1, 11, 1) : new Date(currentYear, currentMonth - 1, 1);
  const isPrevDisabled =
    prevDate.getFullYear() < today.getFullYear() ||
    (prevDate.getFullYear() === today.getFullYear() && prevDate.getMonth() < today.getMonth());

  return (
    <main className="min-h-screen flex flex-col items-center justify-start md:justify-center bg-backPrimary">
      {/* Toast */}
      <Toast message={toast?.message || ''} type={toast?.type} show={!!toast} />

      {/* Container com paddings responsivos */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Card/Bloco central com largura contida por breakpoint */}
        <div className="w-full mx-auto max-w-5xl lg:max-w-6xl rounded-3xl bg-white border border-orange-100 p-4 sm:p-8 lg:p-10 xl:p-12 flex flex-col items-center">
          {/* Título principal responsivo */}
          <h1 className="text-fontPrimary text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-center mb-1 sm:mb-2">
            Lembrete de Agendamento
          </h1>

          {/* Barra do ano + setas: gaps e tamanhos responsivos */}
          <div className="flex items-center justify-between w-full mt-2 mb-3 sm:mb-4 px-1 sm:px-3">
            <button
              className={`inline-flex items-center justify-center rounded-xl font-bold focus:outline-none transition-all
                ${isPrevDisabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-orange-700 hover:bg-orange-800 text-white'}
                h-9 w-9 text-lg sm:h-10 sm:w-10 sm:text-xl lg:h-11 lg:w-11 lg:text-2xl`}
              onClick={isPrevDisabled ? undefined : prevMonth}
              aria-label="Mês anterior"
              disabled={isPrevDisabled}
            >
              &#8592;
            </button>

            <span className="text-orange-700 font-bold text-xl sm:text-2xl lg:text-3xl text-center flex-1">
              {currentYear}
            </span>

            <button
              className={`inline-flex items-center justify-center rounded-xl font-bold focus:outline-none transition-all
                ${isNextDisabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-orange-700 hover:bg-orange-800 text-white'}
                h-9 w-9 text-lg sm:h-10 sm:w-10 sm:text-xl lg:h-11 lg:w-11 lg:text-2xl`}
              onClick={isNextDisabled ? undefined : nextMonth}
              aria-label="Mês seguinte"
              disabled={isNextDisabled}
            >
              &#8594;
            </button>
          </div>

          {/* Grade do calendário: preenchimento lateral por breakpoint */}
          <div className="w-full px-0 sm:px-2 md:px-4 lg:px-6">
            <CalendarGrid
              currentMonth={currentMonth}
              currentYear={currentYear}
              today={today}
              selectedDate={selectedDate}
              reminders={remindersForCalendar}
              onDayClick={handleDayClick}
              getMonthName={getMonthName}
              getDaysMatrix={getDaysMatrix}
              formatDate={(day: number) => formatDate(day, currentMonth, currentYear)}
            />

            {/* Dia selecionado */}
            {selectedDate && (
              <div className="w-full flex justify-center mt-5 sm:mt-6 mb-3 sm:mb-4">
                <div className="bg-orange-50 border-2 border-orange-400 rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 shadow-sm text-center">
                  <span className="text-orange-700 font-semibold text-base sm:text-lg">
                    Dia selecionado: {new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            )}

            {/* Botão adicionar lembrete: tamanho/touch-target responsivo */}
            <div className="w-full flex justify-center mt-6 sm:mt-8">
              <button
                className={`inline-flex items-center gap-2 font-semibold rounded-2xl shadow-sm transition focus:outline-none focus:ring-2
                  ${selectedDate
                    ? 'bg-orange-600 hover:bg-orange-700 text-white focus:ring-orange-400'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'}
                  px-4 py-2 text-base sm:px-6 sm:py-3 sm:text-lg lg:px-7 lg:py-3.5 lg:text-xl`}
                onClick={() => {
                  if (!selectedDate) {
                    showToast('Selecione um dia no calendário para adicionar um lembrete!', 'error');
                    return;
                  }
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
                disabled={!selectedDate}
                aria-label="Adicionar lembrete"
              >
                <span className="text-xl sm:text-2xl leading-none">+</span>
                <span>Adicionar Lembrete</span>
              </button>
            </div>

            {/* Modal */}
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

          {/* Lista de lembretes do dia (fora do modal) */}
          {selectedDate && remindersOfDay.length > 0 && (
            <div className="mt-6 sm:mt-8 mb-3 sm:mb-4 w-full px-2 sm:px-4 lg:px-8">
              <h3 className="text-xl sm:text-2xl mb-3">Lembretes do dia:</h3>
              <ul className="space-y-2 sm:space-y-3 border border-orange-200 rounded-2xl bg-gray-50 max-w-xl sm:max-w-2xl mx-auto py-2 sm:py-3">
                {remindersOfDay.map((r, idx) => (
                  <li
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 rounded-xl px-4 sm:px-6 py-3 sm:py-4 min-h-[52px] sm:min-h-[56px] text-base sm:text-lg gap-2 sm:gap-0"
                  >
                    <div className="text-gray-900">
                      <span className="font-medium">{r.time}</span>
                      <span className="mx-2 text-gray-400">—</span>
                      <span>{r.description}</span>
                    </div>
                    <div className="flex gap-4">
                      <button
                        className="text-blue-600 hover:underline focus:outline-none"
                        onClick={() => handleEditReminderWithAction(r)}
                        aria-label="Editar lembrete"
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-600 hover:underline focus:outline-none"
                        onClick={() => handleRemoveReminderWithAction(r)}
                        aria-label="Remover lembrete"
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
