import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "../Components/Button";
import {InputField} from "../Components/InputField";

interface GuessingGameProps {

}

const GuessingGame: React.FC<GuessingGameProps> = () => {
    return (
        <>
            <div className="absolute top-4 right-4">
                <Button path="/">Home</Button>
            </div>
            <h3 className="max-w-[60%] leading-none h-[180px]">What was the
                AI Prompt?</h3>
            <InputField></InputField>
            <div className="absolute bottom-4 right-4">
                <Button path="/promptinfo">Continue</Button>
            </div>
        </>
    );
}

export default GuessingGame;