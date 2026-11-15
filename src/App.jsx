import { useState } from 'react';
import LoveTimer from './components/LoveTimer';
import MusicPlayer from './components/MusicPlayer';
import PhotoMarquee from './components/PhotoMarquee';
import SweetWords from './components/SweetWords';
import PrivateView from './components/PrivateView';
import './App.css';

const base = import.meta.env.BASE_URL;

const PLAYLIST = [
  { title: 'Bonita - Mon Laferte', src: `${base}music/Bonita (Bonus Track) - Mon Laferte.mp3` },
  { title: 'love. - wave to earth', src: `${base}music/love. - wave to earth.mp3` },
  { title: 'Es Por Ti - Juanes', src: `${base}music/Juanes - Es Por Ti - JuanesVEVO.mp3` },
  { title: 'Te Quiero - Amén', src: `${base}music/Te Quiero - Amen.mp3` },
  { title: 'Amor Completo - Mon Laferte', src: `${base}music/Amor Completo - Mon Laferte.mp3` },
  { title: 'Beso - Jósean Log', src: `${base}music/Jósean Log - Beso (Lyric Video) - Jósean Log.mp3` },
  { title: 'Locos - León Larregui', src: `${base}music/Locos - León Larregui.mp3` },
  { title: 'Tus Ojos - Los Cafres', src: `${base}music/Tus Ojos - Los Cafres.mp3` },
  { title: 'Me Enamoré de Ti - Chayanne', src: `${base}music/Me Enamoré de Ti - Chayanne.mp3` },
  { title: 'Tus Besos - Los Caligaris', src: `${base}music/Tus Besos - Los Caligaris.mp3` },
  { title: 'Razón - Los Caligaris', src: `${base}music/Razón - Los Caligaris.mp3` },
];

const ALL_VALID_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19, 20];

const TOP_IMAGES = ALL_VALID_NUMBERS.map((num) => `${base}images/gatoamor${num}.jpg`);
const BOTTOM_IMAGES = [
  ...ALL_VALID_NUMBERS.slice(9),
  ...ALL_VALID_NUMBERS.slice(0, 9),
].map((num) => `${base}images/gatoamor${num}.jpg`);

export default function App() {
  const [started, setStarted] = useState(false);
  const [showPrivate, setShowPrivate] = useState(false);

  return (
    <div className="app-container">
      {!started ? (
        <div className="welcome-overlay">
          <div className="welcome-card">
            <h2>Te quiero mucho Luciana❤️</h2>
            <p>Mide el volumen al 50%</p>
            <button className="start-btn" onClick={() => setStarted(true)}>
              Tocame bien rico
            </button>
          </div>
        </div>
      ) : showPrivate ? (
        <PrivateView onBack={() => setShowPrivate(false)} />
      ) : (
        <>
          <PhotoMarquee images={TOP_IMAGES} position="top" />

          <main className="center-content">
            <SweetWords />
            <LoveTimer
              startDate="2026-10-07T00:00:00"
              onSecretClick={() => setShowPrivate(true)}
            />
            <MusicPlayer playlist={PLAYLIST} isStarted={started} />
          </main>

          <PhotoMarquee images={BOTTOM_IMAGES} position="bottom" />
        </>
      )}
    </div>
  );
}