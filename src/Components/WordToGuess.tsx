import React from 'react';

type WordToGuessProps = {
    displayWord: string,
};
const WordToGuess = ({ displayWord } : WordToGuessProps) => {
    return (
        <div className="text-center border-solid border-2 rounded-full py-4 px-8">
                {displayWord.split('').map((char, index) => (
                    <span key={index} className={`uppercase text-[1.5rem] lg:text-p ${char === ' ' ? 'mr-5' : '-mr-2'}`}>
            {char}
          </span>
                ))}
        </div>
    );
};

export default WordToGuess;
