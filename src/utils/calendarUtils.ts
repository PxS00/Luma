/**
 * Retorna o nome do mês em português a partir do índice (0-11).
 * @param month - Índice do mês (0 para Janeiro, 11 para Dezembro)
 * @returns Nome do mês em português
 */
export function getMonthName(month: number): string {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  // Retorna o nome do mês correspondente ao índice fornecido
  return months[month];
}

/**
 * Gera uma matriz representando as semanas do mês, preenchida com os dias ou null para espaços vazios.
 * @param month - Índice do mês (0-11)
 * @param year - Ano completo (ex: 2025)
 * @returns Matriz de semanas, cada semana é um array de números (dias) ou null
 */
export function getDaysMatrix(month: number, year: number): (number | null)[][] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();
  const matrix: (number | null)[][] = [];
  let week: (number | null)[] = [];
  let dayCounter = 1;
  // Preenche a primeira semana, inserindo null nos dias antes do início do mês
  for (let i = 0; i < 7; i++) {
    if (i < startDayOfWeek) week.push(null);
    else week.push(dayCounter++);
  }
  matrix.push(week);
  // Preenche as semanas seguintes até acabar o mês
  while (dayCounter <= daysInMonth) {
    week = [];
    for (let i = 0; i < 7; i++) {
      if (dayCounter > daysInMonth) week.push(null);
      else week.push(dayCounter++);
    }
    matrix.push(week);
  }
  return matrix;
}

/**
 * Formata uma data no padrão ISO (yyyy-mm-dd) a partir de dia, mês e ano.
 * @param day - Dia do mês
 * @param month - Índice do mês (0-11)
 * @param year - Ano completo
 * @returns Data formatada como string no padrão yyyy-mm-dd
 */
export function formatDate(day: number, month: number, year: number): string {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  // Retorna a data formatada no padrão ISO
  return `${year}-${m}-${d}`;
}
