import { useState, useEffect } from 'react';

export default function useTypewriter(words, typeSpeed = 80, deleteSpeed = 45, pause = 1800) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex % words.length];

    if (!isDeleting && text === word) {
      const t = setTimeout(() => setIsDeleting(true), pause);
      return () => clearTimeout(t);
    }

    if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex(i => i + 1);
      return;
    }

    const t = setTimeout(() => {
      setText(prev => isDeleting ? prev.slice(0, -1) : word.slice(0, prev.length + 1));
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(t);
  }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pause]);

  return text;
}
