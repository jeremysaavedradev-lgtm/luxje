import { useState, useEffect } from 'react';
import { INITIAL_MARKED_DATES } from '../data/intimateData';

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const WEEKDAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];
const STORAGE_KEY = 'luxje_calendar_marks_v1';

export default function IntimateCalendar() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  // Combina las fechas base del archivo con las nuevas marcadas en el dispositivo
  const [markedDates, setMarkedDates] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.from(new Set([...INITIAL_MARKED_DATES, ...saved]));
    } catch {
      return INITIAL_MARKED_DATES;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(markedDates));
  }, [markedDates]);

  const toggleDate = (dateStr) => {
    setMarkedDates((prev) =>
      prev.includes(dateStr)
        ? prev.filter((d) => d !== dateStr)
        : [...prev, dateStr]
    );
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Cálculo de días del mes (empezando en Lunes)
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const blanks = Array.from({ length: startOffset });
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="calendar-wrapper">
      {/* Encabezado con navegación de mes/año y contador discreto */}
      <div className="calendar-top-bar">
        <div className="calendar-nav">
          <button type="button" onClick={prevMonth}>‹</button>
          <span className="calendar-month-label">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button type="button" onClick={nextMonth}>›</button>
        </div>

        <span className="discrete-counter" title="Total acumulado">
          ♥ {markedDates.length}
        </span>
      </div>

      {/* Días de la semana */}
      <div className="calendar-weekdays">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      {/* Cuadrícula de días */}
      <div className="calendar-grid">
        {blanks.map((_, idx) => (
          <div key={`blank-${idx}`} className="calendar-day empty" />
        ))}

        {days.map((day) => {
          const mm = String(viewMonth + 1).padStart(2, '0');
          const dd = String(day).padStart(2, '0');
          const dateStr = `${viewYear}-${mm}-${dd}`;
          const isMarked = markedDates.includes(dateStr);

          return (
            <button
              type="button"
              key={dateStr}
              className={`calendar-day ${isMarked ? 'marked' : ''}`}
              onClick={() => toggleDate(dateStr)}
            >
              <span>{day}</span>
              {isMarked && <small className="day-dot">♥</small>}
            </button>
          );
        })}
      </div>
    </div>
  );
}