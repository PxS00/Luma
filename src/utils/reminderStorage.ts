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
    return JSON.parse(data) as Reminder[];
  } catch {
    return [];
  }
}

/**
 * Recupera apenas os lembretes do usuário logado.
 * @param userCpf - CPF do usuário para filtrar os lembretes
 * @returns Array de lembretes do usuário ou array vazio se não houver
 */
export function getUserRemindersFromStorage(userCpf: string): Reminder[] {
  const allReminders = getRemindersFromStorage();
  return allReminders.filter((reminder) => reminder.userCpf === userCpf);
}

/**
 * Salva um novo lembrete no localStorage, preservando os existentes.
 * O lembrete já deve conter o userCpf para associá-lo ao usuário correto.
 * @param reminder - Objeto do tipo Reminder a ser salvo (deve incluir userCpf)
 */
export function saveReminderToStorage(reminder: Reminder): void {
  const reminders = getRemindersFromStorage();
  reminders.push(reminder);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
}

/**
 * Substitui todos os lembretes salvos no localStorage pelo array fornecido.
 * @param reminders - Array de lembretes a ser salvo
 */
export function setAllRemindersToStorage(reminders: Reminder[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
}

/**
 * Remove todos os lembretes do localStorage.
 * Usado principalmente no logout para limpar dados do usuário.
 */
export function clearAllReminders(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Atualiza os lembretes de um usuário específico, mantendo os lembretes de outros usuários.
 * @param userCpf - CPF do usuário cujos lembretes serão atualizados
 * @param userReminders - Novos lembretes do usuário
 */
export function setUserRemindersToStorage(userCpf: string, userReminders: Reminder[]): void {
  const allReminders = getRemindersFromStorage();

  // Remove lembretes antigos do usuário
  const otherUsersReminders = allReminders.filter((reminder) => reminder.userCpf !== userCpf);

  // Adiciona os novos lembretes do usuário
  const updatedReminders = [...otherUsersReminders, ...userReminders];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReminders));
}

/**
 * Migra lembretes antigos que não possuem userCpf para o formato atual.
 * Remove lembretes órfãos que não podem ser associados a nenhum usuário.
 */
export function migrateOldReminders(): void {
  const allReminders = getRemindersFromStorage();

  // Filtra apenas lembretes que possuem userCpf (novos)
  const validReminders = allReminders.filter((reminder) => reminder.userCpf);

  // Se houve mudança (lembretes sem userCpf removidos), salva a versão limpa
  if (validReminders.length !== allReminders.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validReminders));
  }
}
