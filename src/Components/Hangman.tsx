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
    nextPage: () => void,
};

export function Hangman({currentIndex, nextPage, prompt }: HangmanProps) {
    const images = ["https://firebasestorage.googleapis.com/v0/b/visual-literacy-d8444.appspot.com/o/3771892.jpg?alt=media&token=e635d515-27f8-4808-a190-6fed760939af",
        "https://firebasestorage.googleapis.com/v0/b/visual-literacy-d8444.appspot.com/o/birds-1283854_640.jpg?alt=media&token=6db79144-cb48-4ff5-a466-e66751cefc14",
        "https://firebasestorage.googleapis.com/v0/b/visual-literacy-d8444.appspot.com/o/mexico-2086549_640.jpg?alt=media&token=b646f979-0c51-4beb-b775-8ad257a0f953",
        "https://firebasestorage.googleapis.com/v0/b/visual-literacy-d8444.appspot.com/o/blue-8341156_640.jpg?alt=media&token=22024c60-9f7d-4953-a49f-6e635b99751d"]

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
    // Check if the player won
    const isWinner = () => {
        return wordToGuess.replace(/\s/g, '').split('').every((char) => guessedLetters.includes(char));
    };
    return (
        <div className="max-w-[816px] flex flex-col mx-auto items-center">
            <ImagesContainer imageUrls={images}></ImagesContainer>
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