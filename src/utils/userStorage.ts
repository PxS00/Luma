/**
 * Utilitários para persistência de usuários e sessão no localStorage.
 * Todas as funções utilizam tipagem forte e retornam arrays, string ou void.
 */
import type { CadastroFormData, LoggedUser } from '@/types/form';

const USERS_KEY = 'cadastrosLumaHC';
const LOGGED_USER_KEY = 'usuarioLogado';

/**
 * Recupera todos os usuários cadastrados salvos no localStorage.
 * @returns Array de usuários ou array vazio se não houver dados ou erro de parsing.
 */
export function getUsersFromStorage(): CadastroFormData[] {
  const data = localStorage.getItem(USERS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as CadastroFormData[];
  } catch {
    return [];
  }
}

/**
 * Salva um novo usuário no localStorage, preservando os existentes.
 * @param user - Objeto do tipo CadastroFormData a ser salvo
 */
export function saveUserToStorage(user: CadastroFormData): void {
  const users = getUsersFromStorage();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/**
 * Substitui todos os usuários salvos no localStorage pelo array fornecido.
 * @param users - Array de usuários a ser salvo
 */
export function setAllUsersToStorage(users: CadastroFormData[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/**
 * Salva o CPF do usuário logado no localStorage.
 * @param cpf - CPF do usuário logado
 */
export function setLoggedUser(cpf: string): void {
  localStorage.setItem(LOGGED_USER_KEY, cpf);
}

/**
 * Recupera o CPF do usuário logado salvo no localStorage.
 * @returns CPF do usuário logado ou null se não houver
 */
export function getLoggedUser(): string | null {
  const data = localStorage.getItem(LOGGED_USER_KEY);
  if (!data) return null;
  try {
    const parsed = JSON.parse(data);
    if (parsed && typeof parsed === 'object' && 'cpf' in parsed) {
      return String((parsed as any).cpf);
    }
    if (typeof parsed === 'string') return parsed;
    return null;
  } catch {
    return data;
  }
}

/**
 * Remove o CPF do usuário logado do localStorage, encerrando a sessão.
 */
export function removeLoggedUser(): void {
  localStorage.removeItem(LOGGED_USER_KEY);
}



/**
 * Salva o usuário logado completo no localStorage.
 * (mantém compatibilidade com o setLoggedUser antigo)
 */
export function setLoggedUserFull(user: LoggedUser): void {
  localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(user));
}

/**
 * Recupera o usuário logado completo (objeto com cpf, passwordDate e id).
 */
export function getLoggedUserFull(): LoggedUser | null {
  const data = localStorage.getItem(LOGGED_USER_KEY);
  if (!data) return null;
  try {
    const parsed = JSON.parse(data);
    if (parsed && typeof parsed === 'object' && 'cpf' in parsed) {
      return parsed as LoggedUser;
    }
    return null;
  } catch {
    return null;
  }
}
