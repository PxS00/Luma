/**
 * Utilitários para persistência de usuários e sessão no localStorage.
 * Todas as funções utilizam tipagem forte e retornam arrays, string ou void.
 */
import type { CadastroFormData } from '@/types/form';

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
    // Tenta fazer o parse dos dados salvos; retorna array vazio em caso de erro
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
  // Atualiza o localStorage com o novo array de usuários
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
  return localStorage.getItem(LOGGED_USER_KEY);
}

/**
 * Remove o CPF do usuário logado do localStorage, encerrando a sessão.
 */
export function removeLoggedUser(): void {
  localStorage.removeItem(LOGGED_USER_KEY);
}
