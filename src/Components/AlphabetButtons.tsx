import React from 'react';

type AlphabetButtonsProps = {
    guessedLetters: string[],
    onLetterClick: (letter: string) => void,
};
const AlphabetButtons = ({ guessedLetters, onLetterClick }: AlphabetButtonsProps) => {
    // Array of alphabet letters
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    // Function to handle button click
    const handleClick = (letter: string) => {
        onLetterClick(letter);
    };

    // Render
    return (
        <div className="flex justify-center w-full flex-wrap mt-28">
            {alphabet.map((letter) => (
                <button
                    key={letter}
                    onClick={() => handleClick && handleClick(letter)}
                    disabled={guessedLetters.includes(letter)}
                    className ={`uppercase text-[1.5rem] lg:text-p mx-2 ${guessedLetters.includes(letter) && 'text-primary'}`}
                >
                    {letter}
                </button>
            ))}
        </div>
    );
};

export default AlphabetButtons;