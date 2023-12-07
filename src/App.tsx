import { useCallback, useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import words from './wordList.json';
import HangmanDraw from './component/HangmanDraw';
import HangmanWord from './component/HangmanWord';
import Keyboard from './component/Keyboard';

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  });

  const [guessingLetters, setguessingLetters] = useState<string[]>([]);

  // Taking + Filtering Letter We Guess
  const incorrectLetters = guessingLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split('')
    .every(letter => guessingLetters.includes(letter));

  const addGuessingLetter = useCallback((letter: string) => {
    if (guessingLetters.includes(letter) || isLoser || isWinner) {
      return
    } else {
      setguessingLetters(currentLetters => [...currentLetters, letter])
    }
  }, [guessingLetters, isLoser, isWinner])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (!key.match(/^[a-z]$/)) {
        return
      } else {
        e.preventDefault();
        addGuessingLetter(key);
      }
    }

    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessingLetters]);

  useEffect(() => {
    if (isWinner) {
      toast('Congratulations Buddy, you\'ve won!', {
        icon: '🤩',
        duration: 5000
      });
    }
  }, [isWinner]);

  useEffect(() => {
    if (isLoser) {
      toast.error('Ooops! You\'ve bro, refresh the page to start again!', {
        duration: 5000
      })
    }
  }, [isLoser, wordToGuess]);

  return (
    <div className='bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100 via-indigo-100 to-purple-200 h-screen'>
        <h1 className='heading text-center text-5xl font-extrabold p-3'>Hangman Game Using React JS And Tailwind CSS 🚀</h1>
      <div className='font-adlam max-w-3xl flex items-center flex-col gap-8 mx-auto pt-12'>
        <Toaster />

        {/* Number of times to chose the wrong letter */}
        <HangmanDraw numberOfGuess={incorrectLetters.length} />
        <HangmanWord
          result={isLoser}
          guessingLetters={guessingLetters}
          wordToGuess={wordToGuess}
        />
        <div className='self-stretch'>
          <Keyboard
            disabled={isWinner || isLoser}
            activeLetter={guessingLetters.filter(letter => wordToGuess.includes(letter))}
            inactiveLetter={incorrectLetters}
            addGuessingLetter={addGuessingLetter}
          />
        </div>
      </div>
    </div>
  )
}

export default App