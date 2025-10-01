/**
 * Componente CalendarGrid - Grade do Calendário Mensal
 *
 * Este componente é responsável por renderizar a interface visual do calendário,
 * incluindo a grade de dias, navegação e estados visuais para diferentes tipos de dias.
 *
 * Funcionalidades principais:
 * - Exibição da grade mensal com dias da semana
 * - Suporte a seleção de dias
 * - Indicadores visuais para dias com lembretes
 * - Destaque para o dia atual
 * - Bloqueio de dias passados
 * - Design totalmente responsivo
 * - Acessibilidade completa com navegação por teclado
 *
 * Estados visuais dos dias:
 * - Dia normal: fundo branco, hover laranja claro
 * - Dia selecionado: fundo laranja claro, borda laranja
 * - Dia atual: borda laranja mais escura
 * - Dia com lembrete: anel verde e marcador no canto
 * - Dia passado: fundo cinza, texto esmaecido, não clicável
 *
 * @param {CalendarGridProps} props - Propriedades do componente
 * @returns {React.JSX.Element} Grid do calendário renderizado
 *
 * @example
 * ```tsx
 * <CalendarGrid
 *   currentMonth={2}
 *   currentYear={2025}
 *   today={new Date()}
 *   selectedDate="2025-03-15"
 *   reminders={[{date: "2025-03-20"}]}
 *   onDayClick={(day) => console.log('Dia clicado:', day)}
 *   getMonthName={getMonthName}
 *   getDaysMatrix={getDaysMatrix}
 *   formatDate={(day) => formatDate(day, currentMonth, currentYear)}
 * />
 * ```
 */

import type { CalendarGridProps } from '@/types/schedule';

export default function CalendarGrid({
  currentMonth,
  currentYear,
  today,
  selectedDate,
  reminders,
  onDayClick,
  getMonthName,
  getDaysMatrix,
  formatDate,
}: CalendarGridProps) {
  // Gera a matriz de dias para o mês atual
  const daysMatrix = getDaysMatrix(currentMonth, currentYear);

  return (
    <div className='w-full flex flex-col items-center'>
      {/* Container principal do calendário */}
      <div
        className='
          w-full
          bg-gray-100/80 rounded-2xl md:rounded-3xl
          border border-orange-200
          p-3 sm:p-5 md:p-8
          flex flex-col items-center transition-all shadow-none
        '
      >
        {/* Nome do mês centralizado e destacado */}
        <div className='w-full flex justify-center mb-3 sm:mb-4 md:mb-6'>
          <span className='text-xl sm:text-2xl md:text-3xl font-bold text-orange-700 tracking-wide'>
            {getMonthName(currentMonth)}
          </span>
        </div>

        {/* Cabeçalho com os dias da semana (Dom, Seg, Ter, etc.) */}
        <div
          className='
            grid grid-cols-7
            gap-1 sm:gap-2 md:gap-3 lg:gap-4
            text-center
            text-[11px] xs:text-xs sm:text-sm md:text-base
            font-bold text-orange-700
            mb-2 sm:mb-3 md:mb-4 lg:mb-5
            w-full
          '
        >
          <div>Dom</div>
          <div>Seg</div>
          <div>Ter</div>
          <div>Qua</div>
          <div>Qui</div>
          <div>Sex</div>
          <div>Sáb</div>
        </div>

        {/* Grade principal com os dias do mês */}
        <div className='grid grid-cols-7 gap-1 sm:gap-2 md:gap-3 lg:gap-4 w-full'>
          {daysMatrix.map((week, i) =>
            week.map((day, j) => {
              // Cálculos para determinar o estado visual do dia
              const dateStr = day ? formatDate(day) : '';
              const hasReminder = reminders.some((r) => r.date === dateStr);

              // Verifica se é o dia de hoje
              const isToday =
                day &&
                today.getDate() === day &&
                today.getMonth() === currentMonth &&
                today.getFullYear() === currentYear;

              // Verifica se é o dia selecionado
              const isSelected = selectedDate === dateStr;

              // Verifica se é um dia no passado (não pode ser selecionado)
              const isPast =
                !!day &&
                new Date(currentYear, currentMonth, day) <
                  new Date(today.getFullYear(), today.getMonth(), today.getDate());

              return (
                <div
                  key={`d${i}-${j}`}
                  className={[
                    // Layout básico da célula do dia
                    'relative w-full',
                    // Torna quadrado com tamanhos responsivos confortáveis para toque
                    'aspect-square min-w-[32px] sm:min-w-[48px] md:min-w-[64px]',
                    'rounded-lg sm:rounded-xl',
                    'select-none transition-all',
                    // Estados condicionais baseados no tipo de dia
                    day
                      ? isPast
                        ? 'bg-gray-200 text-gray-400 border border-gray-200 cursor-not-allowed'
                        : isSelected
                          ? 'bg-orange-200 border-2 border-orange-500 shadow-md cursor-pointer'
                          : 'bg-white border border-orange-200 hover:bg-orange-100 focus:bg-orange-200 cursor-pointer shadow-sm md:shadow'
                      : 'bg-transparent pointer-events-none',
                    // Destaque especial para o dia atual
                    isToday && !isPast ? 'border-2 border-orange-600' : '',
                    // Indicador visual para dias com lembretes
                    hasReminder && !isPast ? 'ring-1 sm:ring-2 ring-green-400' : '',
                  ].join(' ')}
                  onClick={() => !isPast && day && onDayClick(day)}
                  aria-label={day ? `Selecionar dia ${day}` : ''}
                  tabIndex={day && !isPast ? 0 : -1}
                  onKeyDown={(e) => {
                    // Permite navegação por teclado (Enter ou Espaço)
                    if (day && !isPast && (e.key === 'Enter' || e.key === ' ')) onDayClick(day);
                  }}
                  role='button'
                >
                  {/* Número do dia centralizado */}
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <span
                      className={[
                        'font-bold',
                        // Tamanhos responsivos do número
                        'text-sm xs:text-base sm:text-lg md:text-xl',
                        isPast ? 'text-gray-400' : 'text-orange-700',
                      ].join(' ')}
                    >
                      {day || ''}
                    </span>
                  </div>

                  {/* Marcador visual para dias com lembretes */}
                  {hasReminder && !isPast && (
                    <span
                      className='
                        absolute bottom-1 right-1
                        w-1.25 h-1.25 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5
                        bg-green-400 rounded-full
                        border-1 border-white shadow
                      '
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
