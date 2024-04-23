import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "../Components/Button";

interface PromptInfoProps {

}

const PromptInfo: React.FC<PromptInfoProps> = () => {
    return (
        <>
            <div className="absolute top-4 right-4">
                <Button path="/">Home</Button>
            </div>
            <h2 className="max-w-[60%] leading-[7rem] h-[300px]">What was the
                AI Prompt?</h2>
            <p className="max-w-[1557px]">To enhance clarity, I invite you to engage in a game. You will be presented with 5 examples where you must guess the AI Prompt that was used to generate the 4 images you are about to view.</p>
            <div className="absolute bottom-4 right-4">
                <Button path="/guessinggame">Continue</Button>
            </div>
        </>
    );
}

export default PromptInfo;