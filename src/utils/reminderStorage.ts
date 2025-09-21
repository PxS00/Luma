/**
 * Utilitários para persistência de lembretes no localStorage.
 * Todas as funções utilizam tipagem forte e retornam arrays ou void.
 */
import type { Reminder } from '@/types/reminder';

const STORAGE_KEY = 'userReminders';

/**
 * Recupera todos os lembretes salvos no localStorage.
 * @returns Array de lembretes ou array vazio se não houver dados ou erro de parsing.
 */
export function getRemindersFromStorage(): Reminder[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    // Tenta fazer o parse dos dados salvos; retorna array vazio em caso de erro
    return JSON.parse(data) as Reminder[];
  } catch {
    return [];
  }
}

/**
 * Salva um novo lembrete no localStorage, preservando os existentes.
 * @param reminder - Objeto do tipo Reminder a ser salvo
 */
export function saveReminderToStorage(reminder: Reminder): void {
  const reminders = getRemindersFromStorage();
  reminders.push(reminder);
  // Atualiza o localStorage com o novo array de lembretes
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
}

/**
 * Substitui todos os lembretes salvos no localStorage pelo array fornecido.
 * @param reminders - Array de lembretes a ser salvo
 */
export function setAllRemindersToStorage(reminders: Reminder[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
}
