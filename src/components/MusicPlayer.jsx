import { useState, useRef, useEffect } from 'react';

// Función para mezclar un arreglo aleatoriamente (Fisher-Yates)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export default function MusicPlayer({ playlist, isStarted, isPausedByModal }) {  // Mezcla la lista una sola vez al montar el componente
    const [shuffledPlaylist, setShuffledPlaylist] = useState(() => shuffleArray(playlist));
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

   useEffect(() => {
    if (!audioRef.current || !isStarted) return;
    if (isPausedByModal) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPausedByModal, isStarted]);

    const nextTrack = () => {
        if (currentTrack + 1 >= shuffledPlaylist.length) {
            // Cuando termina toda la lista mezclada, vuelve a mezclar para la siguiente vuelta
            setShuffledPlaylist(shuffleArray(playlist));
            setCurrentTrack(0);
        } else {
            setCurrentTrack((prev) => prev + 1);
        }
    };

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="music-controls">
            <audio
                ref={audioRef}
                src={shuffledPlaylist[currentTrack].src}
                onEnded={nextTrack}
            />
            <span className="song-title">🎵 {shuffledPlaylist[currentTrack].title}</span>
            <div className="player-buttons">
                <button onClick={togglePlay}>{isPlaying ? '⏸' : '▶'}</button>
                <button onClick={nextTrack}>⏭</button>
            </div>
        </div>
    );
}