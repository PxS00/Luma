import type { Reminder } from '@/types/reminder';

/**
 * Propriedades do componente ReminderList
 * Define os parâmetros aceitos para a lista de lembretes
 */
export type ReminderListProps = {
  /** Array de lembretes a serem exibidos */
  reminders: Reminder[];
  /** Função chamada para editar um lembrete */
  onEdit: (reminder: Reminder) => void;
  /** Função chamada para remover um lembrete */
  onRemove: (reminder: Reminder) => void;
};

/**
 * Propriedades do componente ReminderModal
 * Define os parâmetros aceitos para o modal de lembretes
 */
export type ReminderModalProps = {
  show: boolean;
  onClose: () => void;
  selectedDate: string | null;
  editingReminder: Reminder | null;
  remindersOfDay: Reminder[];
  formTime: string;
  setFormTime: (v: string) => void;
  formDescription: string;
  setFormDescription: (v: string) => void;
  onSave: (reminder: Reminder) => void;
  onEdit: (reminder: Reminder) => void;
  onRemove: (reminder: Reminder) => void;
  error?: string | null;
};
/**
 * Tipos compartilhados do módulo Schedule/Calendar.
 * Comentários em português para documentação.
 */

export type CalendarReminder = { date: string };

/**
 * Props do componente CalendarGrid.
 */
export type CalendarGridProps = {
  currentMonth: number;
  currentYear: number;
  today: Date;
  selectedDate: string | null;
  reminders: CalendarReminder[];
  onDayClick: (day: number | null) => void;
  getMonthName: (month: number) => string;
  getDaysMatrix: (month: number, year: number) => (number | null)[][];
  formatDate: (day: number) => string;
};
