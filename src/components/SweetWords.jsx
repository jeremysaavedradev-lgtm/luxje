import { useState, useEffect } from 'react';

const WORDS = [
  'Linda ✨',
  'Guapa 💕',
  'Bella 🌹',
  'Preciosa ❤️',
  'Dulce 🍓',
  'Hermosa❤️',
  'Única 💫',
  'Te quiero mucho 💖',
  'Amorsote',
  'Magnifica',
  'Te quiero comer',
  'Besos hermosa',
  '❤️',
];

export default function SweetWords() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sweet-words-badge">
      <span key={index} className="sweet-word-animated">
        {WORDS[index]}
      </span>
    </div>
  );
}