/**
 * Componente CalendarGrid
 * Exibe a grade do calendário mensal e lida com a navegação e seleção de dias.
 */

import type { CalendarGridProps } from '@/types/schedule';

export default function CalendarGrid({
  currentMonth,
  currentYear,
  today,
  reminders,
  onDayClick,
  getMonthName,
  getDaysMatrix,
  formatDate,
}: CalendarGridProps) {
  const daysMatrix = getDaysMatrix(currentMonth, currentYear);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Container do mês */}
      <div
        className="
          w-full
          bg-gray-100/80 rounded-2xl md:rounded-3xl
          border border-orange-200
          p-3 sm:p-5 md:p-8
          flex flex-col items-center transition-all shadow-none
        "
      >
        {/* Mês destacado */}
        <div className="w-full flex justify-center mb-3 sm:mb-4 md:mb-6">
          <span className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-700 tracking-wide">
            {getMonthName(currentMonth)}
          </span>
        </div>

        {/* Cabeçalho dos dias da semana */}
        <div
          className="
            grid grid-cols-7
            gap-1 sm:gap-2 md:gap-3 lg:gap-4
            text-center
            text-[11px] xs:text-xs sm:text-sm md:text-base
            font-bold text-orange-700
            mb-2 sm:mb-3 md:mb-4 lg:mb-5
            w-full
          "
        >
          <div>Dom</div>
          <div>Seg</div>
          <div>Ter</div>
          <div>Qua</div>
          <div>Qui</div>
          <div>Sex</div>
          <div>Sáb</div>
        </div>

        {/* Dias do mês */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-3 lg:gap-4 w-full">
          {daysMatrix.map((week, i) =>
            week.map((day, j) => {
              const dateStr = day ? formatDate(day) : '';
              const hasReminder = reminders.some((r) => r.date === dateStr);

              const isToday =
                day &&
                today.getDate() === day &&
                today.getMonth() === currentMonth &&
                today.getFullYear() === currentYear;

              const isPast =
                !!day &&
                new Date(currentYear, currentMonth, day) <
                  new Date(today.getFullYear(), today.getMonth(), today.getDate());

              return (
                <div
                  key={`d${i}-${j}`}
                  className={[
                    // layout básico da célula
                    'relative w-full',
                    // torna quadrado, com toques confortáveis por breakpoint
                    'aspect-square min-w-[38px] sm:min-w-[48px] md:min-w-[64px]',
                    'rounded-lg sm:rounded-xl',
                    'select-none transition-all',
                    // Estados (vazio, passado, ativo)
                    day
                      ? isPast
                        ? 'bg-gray-200 text-gray-400 border border-gray-200 cursor-not-allowed'
                        : 'bg-white border border-orange-200 hover:bg-orange-100 focus:bg-orange-200 cursor-pointer shadow-sm md:shadow'
                      : 'bg-transparent pointer-events-none',
                    // Hoje
                    isToday && !isPast ? 'border-2 border-orange-600' : '',
                    // Lembrete
                    hasReminder && !isPast ? 'ring-1 sm:ring-2 ring-green-400' : '',
                  ].join(' ')}
                  onClick={() => !isPast && day && onDayClick(day)}
                  aria-label={day ? `Selecionar dia ${day}` : ''}
                  tabIndex={day && !isPast ? 0 : -1}
                  onKeyDown={(e) => {
                    if (day && !isPast && (e.key === 'Enter' || e.key === ' ')) onDayClick(day);
                  }}
                  role="button"
                >
                  {/* número do dia */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={[
                        'font-bold',
                        // tamanhos responsivos do número
                        'text-sm xs:text-base sm:text-lg md:text-xl',
                        isPast ? 'text-gray-400' : 'text-orange-700',
                      ].join(' ')}
                    >
                      {day || ''}
                    </span>
                  </div>

                  {/* marcador de lembrete */}
                  {hasReminder && !isPast && (
                    <span
                      className="
                        absolute bottom-1 right-1
                        w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5
                        bg-green-400 rounded-full
                        border-2 border-white shadow
                      "
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
