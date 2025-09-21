/**
 * Utilitários para persistência de lembretes no localStorage
 */
import type { Reminder } from '@/types/reminder';

const STORAGE_KEY = 'userReminders';

export function getRemindersFromStorage(): Reminder[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as Reminder[];
  } catch {
    return [];
  }
}

export function saveReminderToStorage(reminder: Reminder): void {
  const reminders = getRemindersFromStorage();
  reminders.push(reminder);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
}

export function setAllRemindersToStorage(reminders: Reminder[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
}
