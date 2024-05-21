import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "../Components/Button";

interface PromptInfoProps {

}

const PromptInfo: React.FC<PromptInfoProps> = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="fixed top-4 right-4">
                <Button onClick={() => navigate("/")}>Home</Button>
            </div>
            <h2 className="max-w-[60%] h-[300px]">What was the
                AI Prompt?</h2>
            <p className="max-w-[1557px]">To enhance clarity, I invite you to engage in a game. You will be presented with 3 examples where you must guess the AI Prompt that was used to generate the 4 images you are about to view.</p>
            <div className="fixed bottom-4 right-4">
                <Button onClick={() => navigate("/guessinggame")}>Continue</Button>
            </div>
        </>
    );
}

export default PromptInfo;