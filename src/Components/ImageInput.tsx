import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {InputField} from "./InputField";
import {ImagesContainer} from "./ImagesContainer";
import {Button} from "./Button";

type ImageInputProps = {
    nextPage: () => void,
    setHangman: () => void,
};

export function ImageInput({nextPage, setHangman}: ImageInputProps) {
    const navigate = useNavigate();
    const [guess, setGuess] = useState( "");
    const [answer, setAnswer] = useState<boolean>(false);
    const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(false);
    const prompt = "Globe";
    const images = ["https://firebasestorage.googleapis.com/v0/b/visual-literacy-d8444.appspot.com/o/3771892.jpg?alt=media&token=e635d515-27f8-4808-a190-6fed760939af",
        "https://firebasestorage.googleapis.com/v0/b/visual-literacy-d8444.appspot.com/o/birds-1283854_640.jpg?alt=media&token=6db79144-cb48-4ff5-a466-e66751cefc14",
        "https://firebasestorage.googleapis.com/v0/b/visual-literacy-d8444.appspot.com/o/mexico-2086549_640.jpg?alt=media&token=b646f979-0c51-4beb-b775-8ad257a0f953",
        "https://firebasestorage.googleapis.com/v0/b/visual-literacy-d8444.appspot.com/o/blue-8341156_640.jpg?alt=media&token=22024c60-9f7d-4953-a49f-6e635b99751d"]


    const checkInput = () => {
        setAnswerSubmitted(true);
        if (guess.toLowerCase() === prompt.toLowerCase()) {
            setAnswer(true);
        }
    };


    return (
        <div className="max-w-[816px] flex flex-col mx-auto items-center">
            <ImagesContainer imageUrls={images}></ImagesContainer>
            <InputField name="guess" onChange={(e) => {setGuess( e.target.value); setAnswer(false); setAnswerSubmitted(false)}} value={guess} placeholder={"Insert your first guess here"}></InputField>

            {!answerSubmitted ? <div className="fixed bottom-4 right-4">
                <Button onClick={checkInput}>Submit</Button>
            </div> : answerSubmitted && answer ? <div className="fixed bottom-4 right-4">
                <Button onClick={() => nextPage && nextPage()}>Continue</Button>
            </div> : <div className="fixed bottom-4 right-4">
                <Button onClick={() => setHangman && setHangman()}>Hint</Button>
            </div>}
            {!answerSubmitted ? <div className="fixed bottom-4 left-4">
                Guess the AI prompt that generated these four pictures</div> : answer  ? (<div className="fixed bottom-4 left-4">
                Your guess was correct!</div>) : <div className="fixed bottom-4 left-4">
                Unfortunately your guess was wrong</div>}
        </div>
    );
};