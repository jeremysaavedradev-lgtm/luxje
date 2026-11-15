import { useState, useEffect, useRef } from 'react';
import { INTIMATE_PLAYLIST, SECRET_PIN } from '../data/intimateData';
import IntimateCalendar from './IntimateCalendar';

export default function PrivateView({ onBack }) {
  const [pinInput, setPinInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);

  const [trackIndex, setTrackIndex] = useState(() =>
    Math.floor(Math.random() * INTIMATE_PLAYLIST.length)
  );
  const specialAudioRef = useRef(null);

  useEffect(() => {
    if (isUnlocked && specialAudioRef.current) {
      specialAudioRef.current.play().catch((err) => {
        console.warn('No se encontró el archivo de audio especial:', err);
      });
    }
  }, [isUnlocked, trackIndex]);

  const handleUnlock = () => {
    if (pinInput === SECRET_PIN) {
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleUnlock();
  };

  const nextTrack = () => {
    setTrackIndex((prev) => (prev + 1) % INTIMATE_PLAYLIST.length);
  };

  return (
    <div className="private-screen">
      <button className="back-btn" onClick={onBack}>
        ← Volver
      </button>

      {!isUnlocked ? (
        <div className="welcome-card pin-box">
          <h2>🔒 Acceso Privado</h2>
          <p>Ingresa nuestra clave de 4 dígitos</p>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={4}
            placeholder="••••"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ WebkitTextSecurity: 'disc' }}
            autoFocus
          />
          {pinError && <span className="pin-error">Clave incorrecta</span>}
          <button type="button" className="start-btn" onClick={handleUnlock}>
            Entrar ✨
          </button>
        </div>
      ) : (
        <div className="private-content-card">
          <audio
            ref={specialAudioRef}
            src={INTIMATE_PLAYLIST[trackIndex].src}
            onEnded={nextTrack}
          />

          <div className="special-audio-bar">
            <span>🎶 {INTIMATE_PLAYLIST[trackIndex].title}</span>
            <button type="button" onClick={nextTrack} title="Siguiente canción">
              ⏭
            </button>
          </div>

          <IntimateCalendar />
        </div>
      )}
    </div>
  );
}