import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {InputField} from "./InputField";
import {ImagesContainer} from "./ImagesContainer";
import {Button} from "./Button";

type ImageInputProps = {
    prompt: string,
    images: string[],
    nextPage: () => void,
    setHangman: () => void,
    addGuess: (input: string) => void;
};

export function ImageInput({prompt, images, nextPage, setHangman, addGuess}: ImageInputProps) {
    const navigate = useNavigate();
    const [guess, setGuess] = useState("");
    const [answer, setAnswer] = useState<boolean>(false);
    const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(false);

    const checkInput = () => {
        setAnswerSubmitted(true);
        addGuess(guess);
        if (guess.toLowerCase() === prompt.toLowerCase()) {
            setAnswer(true);
        }
    };

    return (
        <div className="max-w-[816px] flex flex-col mx-auto items-center">
            <ImagesContainer imageUrls={images}></ImagesContainer>
            <InputField name="guess" onChange={(e) => {
                setGuess(e.target.value);
                setAnswer(false);
                setAnswerSubmitted(false)
            }} value={guess} placeholder={"Insert your first guess here"} answer={answer}></InputField>

            {!answerSubmitted ? <div className="fixed bottom-4 right-4">
                <Button onClick={checkInput}>Submit</Button>
            </div> : answerSubmitted && answer ? <div className="fixed bottom-4 right-4">
                <Button onClick={() => {
                    nextPage && nextPage();
                    setGuess('');
                    setAnswerSubmitted(false);
                }}>Continue</Button>
            </div> : <div className="fixed bottom-4 right-4">
                <Button onClick={() => setHangman && setHangman()}>Hint</Button>
            </div>}
            {!answerSubmitted ? <div className="fixed bottom-4 left-4">
                Guess the AI prompt that generated these four pictures</div> : answer ? (
                <div className="fixed bottom-4 left-4">
                    Your guess was correct!</div>) : <div className="fixed bottom-4 left-4">
                Unfortunately your guess was wrong</div>}
        </div>
    );
};