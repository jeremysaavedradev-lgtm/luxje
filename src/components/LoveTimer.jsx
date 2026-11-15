import { useState, useEffect } from 'react';

export default function LoveTimer({ startDate, onSecretClick }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const start = new Date(startDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="timer-card">
      <h1 className="title">
        Juntos desde el 7 de Octubre{' '}
        <span
          onClick={onSecretClick}
          style={{ cursor: 'pointer', userSelect: 'none' }}
          title=""
        >
          💜
        </span>
      </h1>
      <p className="subtitle">Cada segundo a tu lado cuenta</p>

      <div className="time-grid">
        <div className="time-box">
          <span className="number">{String(time.days).padStart(2, '0')}</span>
          <span className="label">Días</span>
        </div>
        <div className="time-box">
          <span className="number">{String(time.hours).padStart(2, '0')}</span>
          <span className="label">Horas</span>
        </div>
        <div className="time-box">
          <span className="number">{String(time.minutes).padStart(2, '0')}</span>
          <span className="label">Minutos</span>
        </div>
        <div className="time-box">
          <span className="number">{String(time.seconds).padStart(2, '0')}</span>
          <span className="label">Segundos</span>
        </div>
      </div>
    </div>
  );
}