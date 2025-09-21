import type { Reminder } from '@/types/reminder';
import { formatDate } from '@/utils/calendarUtils';
import { useState } from 'react';

/**
 * Hook customizado para gerenciar o estado e lógica da Agenda Médica.
 * Encapsula todo o controle de datas, lembretes e formulários.
 *
 * @returns Estado e handlers para navegação, lembretes e formulários da agenda
 *
 * @example
 * // Exemplo de uso:
 * const schedule = useSchedule();
 * <button onClick={schedule.nextMonth}>Próximo mês</button>
 * <button onClick={schedule.prevMonth}>Mês anterior</button>
 * <button onClick={schedule.handleAddReminder}>Novo lembrete</button>
 */

export function useSchedule() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [formTime, setFormTime] = useState('');
  const [formDescription, setFormDescription] = useState('');

  /**
   * Avança para o próximo mês, mas bloqueia se passar de 6 meses à frente da data atual.
   */
  const nextMonth = () => {
    // Data limite: 6 meses à frente do mês/ano atual
    const today = new Date();
    const limit = new Date(today.getFullYear(), today.getMonth() + 6, 1);
    const next =
      currentMonth === 11
        ? new Date(currentYear + 1, 0, 1)
        : new Date(currentYear, currentMonth + 1, 1);
    if (next > limit) return;
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  /**
   * Volta para o mês anterior, mas bloqueia se tentar voltar para antes do mês/ano atual.
   */
  const prevMonth = () => {
    const today = new Date();
    const prev =
      currentMonth === 0
        ? new Date(currentYear - 1, 11, 1)
        : new Date(currentYear, currentMonth - 1, 1);
    // Bloqueia se o mês anterior for menor que o mês/ano atual
    if (
      prev.getFullYear() < today.getFullYear() ||
      (prev.getFullYear() === today.getFullYear() && prev.getMonth() < today.getMonth())
    ) {
      return;
    }
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  /** Handles clicking on a calendar day: apenas seleciona o dia, não abre modal. */
  const handleDayClick = (day: number | null) => {
    if (!day) return;
    const dateStr = formatDate(day, currentMonth, currentYear);
    setSelectedDate(dateStr);
    setEditingReminder(null);
    setFormTime('');
    setFormDescription('');
    // Não abre mais o modal aqui
  };

  /** Abre o modal para criar lembrete para o dia selecionado (ou hoje se nenhum selecionado) */
  const handleAddReminder = () => {
    let dateStr = selectedDate;
    if (!dateStr) {
      dateStr = formatDate(today.getDate(), today.getMonth(), today.getFullYear());
      setSelectedDate(dateStr);
    }
    setEditingReminder(null);
    setFormTime('');
    setFormDescription('');
    setShowModal(true);
  };

  /** Saves a new reminder or updates an existing one. */
  const handleSaveReminder = (reminder: Reminder) => {
    setReminders((prev) => {
      if (editingReminder) {
        return prev.map((r) =>
          r.date === editingReminder.date &&
          r.time === editingReminder.time &&
          r.description === editingReminder.description
            ? reminder
            : r
        );
      }
      return [...prev, reminder];
    });
    setShowModal(false);
    setEditingReminder(null);
    setFormTime('');
    setFormDescription('');
  };

  /** Edits an existing reminder. */
  const handleEditReminder = (reminder: Reminder) => {
    setEditingReminder(reminder);
    setSelectedDate(reminder.date);
    setFormTime(reminder.time);
    setFormDescription(reminder.description);
    setShowModal(true);
  };

  /** Removes a reminder. */
  const handleRemoveReminder = (reminder: Reminder) => {
    setReminders((prev) =>
      prev.filter(
        (r) =>
          !(
            r.date === reminder.date &&
            r.time === reminder.time &&
            r.description === reminder.description
          )
      )
    );
  };

  const remindersOfDay = selectedDate ? reminders.filter((r) => r.date === selectedDate) : [];
  const remindersForCalendar = reminders.map((r) => ({ date: r.date }));

  return {
    today,
    currentMonth,
    currentYear,
    selectedDate,
    reminders,
    showModal,
    editingReminder,
    formTime,
    setFormTime,
    formDescription,
    setFormDescription,
    nextMonth,
    prevMonth,
    handleDayClick,
    handleAddReminder,
    handleSaveReminder,
    handleEditReminder,
    handleRemoveReminder,
    setShowModal,
    remindersOfDay,
    remindersForCalendar,
  };
}
