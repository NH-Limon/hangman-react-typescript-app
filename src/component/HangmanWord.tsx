type HangmanWordProps = {
  guessingLetters: string[],
  wordToGuess: string,
  result?: boolean
}

const HangmanWord = ({ guessingLetters, wordToGuess, result = false }: HangmanWordProps) => {
  return (
    <div className='flex gap-6 text-3xl lg:text-6xl font-bold uppercase'>
      
      {/* Pick the word, create individual characters & write with map */}
      {wordToGuess.split('').map((letter, index) => (
        <span className='border-b-8 border-black rounded-md' key={index}>
          <span style={{
            visibility: guessingLetters.includes(letter) || result
              ? 'visible'
              : 'hidden',
            color: !guessingLetters.includes(letter) && result ? '#BE123C' : '#1C1917'
          }}>
            {letter}
          </span>
        </span>
      ))}
    </div>
  )
}

export default HangmanWord