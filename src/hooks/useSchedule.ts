import type { Reminder } from '@/types/reminder';
import { formatDate } from '@/utils/calendarUtils';
import {setUserRemindersToStorage} from '@/utils/reminderStorage';
import { getLoggedUser, getLoggedUserFull } from '@/utils/userStorage';
import { useEffect, useState } from 'react';

/**
 * Hook customizado para gerenciar o estado e lógica da Agenda Médica.
 *
 * Este hook encapsula toda a lógica complexa relacionada ao sistema de agendamento,
 * incluindo navegação entre meses, gerenciamento de lembretes, validações de datas
 * e sincronização com localStorage.
 *
 * Funcionalidades principais:
 * - Navegação entre meses com limitações (não permite voltar antes do mês atual, nem avançar mais de 6 meses)
 * - Gerenciamento completo de lembretes (CRUD - Create, Read, Update, Delete)
 * - Sincronização automática com localStorage
 * - Validações de formulário e datas
 * - Estado compartilhado entre componentes da agenda
 *
 * @returns {Object} Estado e handlers para navegação, lembretes e formulários da agenda
 * @returns {Date} today - Data atual do sistema
 * @returns {number} currentMonth - Mês atualmente sendo visualizado (0-11)
 * @returns {number} currentYear - Ano atualmente sendo visualizado
 * @returns {string|null} selectedDate - Data selecionada no formato yyyy-mm-dd
 * @returns {Reminder[]} reminders - Array com todos os lembretes salvos
 * @returns {boolean} showModal - Estado de visibilidade do modal
 * @returns {Reminder|null} editingReminder - Lembrete sendo editado (null se criando novo)
 * @returns {string} formTime - Valor do campo de horário do formulário
 * @returns {Function} setFormTime - Setter para o campo de horário
 * @returns {string} formDescription - Valor do campo de descrição do formulário
 * @returns {Function} setFormDescription - Setter para o campo de descrição
 * @returns {Function} nextMonth - Handler para navegar para o próximo mês
 * @returns {Function} prevMonth - Handler para navegar para o mês anterior
 * @returns {Function} handleDayClick - Handler para seleção de dias no calendário
 * @returns {Function} handleAddReminder - Handler para abrir modal de novo lembrete
 * @returns {Function} handleSaveReminder - Handler para salvar lembrete (novo ou editado)
 * @returns {Function} handleEditReminder - Handler para editar lembrete existente
 * @returns {Function} handleRemoveReminder - Handler para remover lembrete
 * @returns {Function} setShowModal - Setter para controle de visibilidade do modal
 * @returns {Reminder[]} remindersOfDay - Lembretes do dia selecionado
 * @returns {Object[]} remindersForCalendar - Dados simplificados dos lembretes para o calendário
 *
 * @example
 * ```tsx
 * // Exemplo de uso básico:
 * const schedule = useSchedule();
 *
 * // Navegação entre meses
 * <button onClick={schedule.nextMonth}>Próximo mês</button>
 * <button onClick={schedule.prevMonth}>Mês anterior</button>
 *
 * // Gerenciamento de lembretes
 * <button onClick={schedule.handleAddReminder}>Novo lembrete</button>
 * <button onClick={() => schedule.handleEditReminder(reminder)}>Editar</button>
 * <button onClick={() => schedule.handleRemoveReminder(reminder)}>Remover</button>
 *
 * // Acesso aos dados
 * {schedule.selectedDate && <span>Data: {schedule.selectedDate}</span>}
 * {schedule.remindersOfDay.map(reminder => <div key={reminder.id}>{reminder.description}</div>)}
 * ```
 */

export function useSchedule() {
  // Estado base: data atual e navegação do calendário
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Estado dos lembretes e interface
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);

  // Estado do formulário de lembretes
  const [formTime, setFormTime] = useState('');
  const [formDescription, setFormDescription] = useState('');

  /**
   * Carrega os lembretes do usuário logado ao inicializar o componente
   */
  useEffect(() => {
  const loadUserReminders = async () => {
    const loggedFull = getLoggedUserFull();
    const userId = loggedFull && loggedFull.id ? Number(loggedFull.id) : undefined;
    const token = localStorage.getItem('token');

    if (!userId) {
      console.warn('Nenhum usuário logado; limpando lembretes.');
      setReminders([]);
      return;
    }

    try {
      const res = await fetch('https://luma-wu46.onrender.com/EmailReminder', {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Erro ao buscar lembretes da API:', res.status, text);
        setReminders([]);
        return;
      }

      const data = await res.json();

      // filtra só os lembretes do usuário logado
      const userReminders = data
        .filter((r: any) => r.userId === userId)
        .map((r: any) => ({
          date: r.dateReminder,
          time: (r.timeReminder || '').slice(0, 5),
          description: r.descriptionReminder,
          userCpf: getLoggedUser(),
          idReminder: r.idReminder ?? r.id ?? undefined,
          userId: r.userId,
        }));

      setReminders(userReminders);
    } catch (err) {
      console.error('Erro ao carregar lembretes da API:', err);
      setReminders([]);
    }
  };

  loadUserReminders();

  // Escuta login/logout
  const handleAuthUpdate = () => {
    loadUserReminders();
  };

  window.addEventListener('auth-update', handleAuthUpdate);
  return () => window.removeEventListener('auth-update', handleAuthUpdate);
}, []);


  /**
   * Sincroniza os lembretes do usuário logado com o localStorage sempre que houver mudanças
   */
  useEffect(() => {
    const loggedUserCpf = getLoggedUser();
    if (loggedUserCpf && reminders.length >= 0) {
      const timer = setTimeout(() => {
        setUserRemindersToStorage(loggedUserCpf, reminders);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [reminders]);

  /**
   * Avança para o próximo mês, mas bloqueia se passar de 6 meses à frente da data atual.
   *
   * Esta função implementa a regra de negócio que impede agendamentos muito distantes,
   * limitando a navegação a no máximo 6 meses à frente do mês/ano atual.
   */
  const nextMonth = () => {
    // Data limite: 6 meses à frente do mês/ano atual
    const today = new Date();
    const limit = new Date(today.getFullYear(), today.getMonth() + 6, 1);
    const next =
      currentMonth === 11
        ? new Date(currentYear + 1, 0, 1)
        : new Date(currentYear, currentMonth + 1, 1);

    // Bloqueia navegação se ultrapassar o limite
    if (next > limit) return;

    // Atualiza o estado: se dezembro, vai para janeiro do próximo ano
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  /**
   * Volta para o mês anterior, mas bloqueia se tentar voltar para antes do mês/ano atual.
   *
   * Esta função implementa a regra de negócio que impede agendamentos no passado,
   * não permitindo navegar para meses anteriores ao atual.
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

    // Atualiza o estado: se janeiro, volta para dezembro do ano anterior
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  /**
   * Handler para clique em dia do calendário.
   * Apenas seleciona o dia, não abre modal automaticamente.
   *
   * @param day - Número do dia clicado (ou null se clicou em espaço vazio)
   */
  const handleDayClick = (day: number | null) => {
    if (!day) return;

    // Formata a data selecionada no padrão ISO (yyyy-mm-dd)
    const dateStr = formatDate(day, currentMonth, currentYear);
    setSelectedDate(dateStr);

    // Reset do estado de edição e formulário
    setEditingReminder(null);
    setFormTime('');
    setFormDescription('');
    // Não abre mais o modal automaticamente aqui
  };

  /**
   * Abre o modal para criar lembrete para o dia selecionado.
   * Se nenhum dia estiver selecionado, usa a data atual.
   */
  const handleAddReminder = () => {
    let dateStr = selectedDate;

    // Se nenhuma data selecionada, usa hoje
    if (!dateStr) {
      dateStr = formatDate(today.getDate(), today.getMonth(), today.getFullYear());
      setSelectedDate(dateStr);
    }

    // Prepara para criar novo lembrete
    setEditingReminder(null);
    setFormTime('');
    setFormDescription('');
    setShowModal(true);
  };

  /**
   * Salva um novo lembrete ou atualiza um existente.
   * Automaticamente associa o lembrete ao usuário logado.
   * @param reminder - Objeto lembrete com date, time e description
   */
  const handleSaveReminder = async (reminder: Reminder): Promise<boolean> => {
    const loggedUserCpf = getLoggedUser();
    if (!loggedUserCpf) {
      console.error('Usuário não está logado');
      return false;
    }

    // Adiciona o CPF do usuário ao lembrete
    const reminderWithUser: Reminder = {
      ...reminder,
      userCpf: loggedUserCpf,
    };

    // Determina se estamos editando um lembrete existente e tenta resolver um id efetivo
    const editingIdFromState = editingReminder
      ? reminders.find(
          (r) =>
            r.date === editingReminder.date &&
            r.time === editingReminder.time &&
            r.description === editingReminder.description &&
            r.userCpf === editingReminder.userCpf &&
            r.idReminder
        )?.idReminder
      : undefined;

  let effectiveEditingId = editingReminder?.idReminder ?? editingIdFromState;

    // inicio do fluxo de envio (debug logs removidos em produção)

    // Não fechar o modal nem resetar antes da resposta do servidor.
    // A atualização do estado local (adicionar ou substituir) será feita APÓS o sucesso da requisição,
    // para evitar que falhas no servidor deixem a UI inconsistente.

  // Envia lembrete para a API externa (não bloqueia o fluxo local)
  try {
      const loggedFull = getLoggedUserFull();
      const userId = loggedFull && loggedFull.id ? Number(loggedFull.id) : undefined;

      if (!userId) {
        console.warn('Não há userId disponível para envio do lembrete à API. Pulando envio.');
        return true;
      }

      const token = localStorage.getItem('token');

      const normalizedTime = reminder.time && reminder.time.length === 5 ? `${reminder.time}:00` : reminder.time;
      const payload = {
        userId,
        dateReminder: reminder.date,
        timeReminder: normalizedTime,
        descriptionReminder: reminder.description,
      } as any;

      if (editingReminder && !effectiveEditingId) {
        try {
          const listRes = await fetch('https://luma-wu46.onrender.com/EmailReminder', {
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          });
          if (listRes.ok) {
            const listData = await listRes.json().catch(() => []);
            const match = (listData || []).find((r: any) =>
              r.userId === userId &&
              r.dateReminder === reminder.date &&
              (r.timeReminder || '').slice(0, 5) === reminder.time &&
              r.descriptionReminder === reminder.description
            );
            if (match) {
              effectiveEditingId = match.idReminder ?? match.id ?? effectiveEditingId;
            }
          }
        } catch (err) {
          console.warn('Não foi possível resolver id do lembrete no servidor:', err);
        }
      }

      if (effectiveEditingId) {
        const idRem = Number(effectiveEditingId);
        const res = await fetch(`https://luma-wu46.onrender.com/EmailReminder/${idRem}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const text = await res.text();
          console.error('Erro ao atualizar lembrete na API (PUT):', res.status, text);
          return false;
        }
        setReminders((prev) =>
          prev.map((r) => (String(r.idReminder) === String(idRem) ? { ...r, ...reminderWithUser, idReminder: idRem, userId } : r))
        );
        setShowModal(false);
        setEditingReminder(null);
        setFormTime('');
        setFormDescription('');

        return true;
      }

  // realizando POST para criar lembrete
      const res = await fetch('https://luma-wu46.onrender.com/EmailReminder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        // eslint-disable-next-line no-console
        console.error('Erro ao enviar lembrete para API (POST):', res.status, text);
        return false;
      }

      const created = await res.json().catch(() => null);
      let createdId = created?.idReminder ?? created?.id ?? undefined;

      if (!createdId) {
        try {
          const listRes = await fetch('https://luma-wu46.onrender.com/EmailReminder', {
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          });
          if (listRes.ok) {
            const listData = await listRes.json().catch(() => []);
            const match = (listData || []).find((r: any) =>
              r.userId === userId &&
              r.dateReminder === reminder.date &&
              (r.timeReminder || '').slice(0, 5) === reminder.time &&
              r.descriptionReminder === reminder.description
            );
            if (match) createdId = match.idReminder ?? match.id ?? createdId;
          }
        } catch (err) {
          console.warn('Não foi possível localizar id do lembrete recém-criado:', err);
        }
      }

      if (createdId) {
        setReminders((prev) => {
          const found = prev.some(
            (r) =>
              (r.idReminder && String(r.idReminder) === String(createdId)) ||
              (!r.idReminder && r.date === reminder.date && r.time === reminder.time && r.description === reminder.description && r.userCpf === reminderWithUser.userCpf)
          );
          if (found) {
            return prev.map((r) =>
              (!r.idReminder && r.date === reminder.date && r.time === reminder.time && r.description === reminder.description && r.userCpf === reminderWithUser.userCpf)
                ? { ...r, idReminder: createdId, userId }
                : r
            );
          }
          return [...prev, { ...reminderWithUser, idReminder: createdId, userId }];
        });
      } else {
        setReminders((prev) => [...prev, { ...reminderWithUser, userId }]);
      }
      setShowModal(false);
      setEditingReminder(null);
      setFormTime('');
      setFormDescription('');

      return true;
    } catch (err) {
      console.error('Erro na requisição para enviar lembrete:', err);
      return false;
    }
  };

  /**
   * Prepara um lembrete existente para edição.
   *
   * @param reminder - Lembrete a ser editado
   */
  const handleEditReminder = (reminder: Reminder) => {
    const found = reminders.find((r) =>
      (r.idReminder && reminder.idReminder && String(r.idReminder) === String(reminder.idReminder)) ||
      (r.date === reminder.date && r.time === reminder.time && r.description === reminder.description && r.userCpf === reminder.userCpf)
    );
    const toEdit = found ?? reminder;
    setEditingReminder(toEdit);
    setSelectedDate(toEdit.date);
    setFormTime(toEdit.time);
    setFormDescription(toEdit.description);
    setShowModal(true);
  };

  /**
   * Remove um lembrete da lista.
   * @param reminder - Lembrete a ser removido
   */
  const handleRemoveReminder = async (reminder: Reminder): Promise<boolean> => {
    // Obtém userId salvo durante o login
    const loggedFull = getLoggedUserFull();
    const userId = loggedFull && loggedFull.id ? Number(loggedFull.id) : undefined;
    const token = localStorage.getItem('token');

    // Se não houver userId, não conseguimos pedir remoção no servidor.
    if (!userId) {
      console.warn('userId não encontrado; removendo localmente apenas.');
      setReminders((prev) =>
        prev.filter(
          (r) =>
            !(
              r.date === reminder.date &&
              r.time === reminder.time &&
              r.description === reminder.description &&
              r.userCpf === reminder.userCpf
            )
        )
      );
      return true;
    }

    try {
      const payload = {
        userId,
        dateReminder: reminder.date,
        timeReminder: reminder.time && reminder.time.length === 5 ? `${reminder.time}:00` : reminder.time,
        descriptionReminder: reminder.description,
      } as any;

      const res = await fetch(`https://luma-wu46.onrender.com/EmailReminder/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Erro ao remover lembrete no servidor:', res.status, text);
        return false;
      }

      // Se o servidor respondeu OK, remove localmente e retorna sucesso
      setReminders((prev) =>
        prev.filter(
          (r) =>
            !(
              r.date === reminder.date &&
              r.time === reminder.time &&
              r.description === reminder.description &&
              r.userCpf === reminder.userCpf
            )
        )
      );

      return true;
    } catch (err) {
      console.error('Erro na requisição de remoção do lembrete:', err);
      return false;
    }
  };

  // Dados computados para facilitar o uso nos componentes
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
