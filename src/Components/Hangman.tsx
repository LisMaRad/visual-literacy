import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {InputField} from "./InputField";
import {ImagesContainer} from "./ImagesContainer";
import {Button} from "./Button";
import AlphabetButtons from "./AlphabetButtons";
import WordToGuess from "./WordToGuess";

type HangmanProps = {
    prompt: string,
    currentIndex: number,
    images: string[],
    nextPage: () => void,
};

export function Hangman({images, nextPage, prompt }: HangmanProps) {
    const [wordToGuess, setWordToGuess] = useState(prompt); // You can generate a random word here
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [incorrectGuesses, setIncorrectGuesses] = useState(0);

    // Function to handle letter guess
    const handleLetterGuess = (letter : string) => {
        if (wordToGuess.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);
        } else {
            setIncorrectGuesses(incorrectGuesses + 1);
        }
    };

    // Function to generate the word with blanks and guessed letters
    const generateDisplayWord = () => {
        return wordToGuess
            .split('')
            .map((char) => (char === ' ' || guessedLetters.includes(char) ? char : '_'))
            .join(' ');
    };

    // Check if the player won
    const isWinner = () => {
        return wordToGuess.replace(/\s/g, '').split('').every((char) => guessedLetters.includes(char));
    };

    console.log("images", images);
    console.log("prompt", prompt);
    return (
        <div className="max-w-[816px] flex flex-col mx-auto items-center">
            <div className="w-3/4">
                <ImagesContainer imageUrls={images}></ImagesContainer>
            </div>
            <div
                className="text-white py-2 mt-7">
            <WordToGuess displayWord={generateDisplayWord()} />
            <AlphabetButtons
                guessedLetters={guessedLetters}
                onLetterClick={handleLetterGuess}
            /></div>
            {isWinner() ? <div className="fixed bottom-4 right-4">
                <Button onClick={() => {nextPage && nextPage()}}>Continue</Button>
            </div> : null}
        </div>
    );


};