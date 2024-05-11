import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "../Components/Button";

interface BiasInfoProps {

}

const BiasInfo: React.FC<BiasInfoProps> = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="fixed top-4 right-4">
                <Button onClick={() => navigate("/")}>Home</Button>
            </div>
            <h2 className="max-w-[60%] leading-[7rem] h-[300px]">The AI Bias</h2>
            <p className="max-w-[1557px]">
                AI bias is when artificial intelligence systems produce unfair outcomes based on factors like race or
                gender, leading to discrimination and inequality.
                AI bias can happen due to biased data, lack of diversity in development, inherent algorithm biases, and
                societal prejudices.
                AI systems are therefore also trained by content we post on the internet. </p>
            <div className="fixed bottom-4 right-4">
                <Button onClick={() => navigate("/userinput")}>Continue</Button>
            </div>
        </>
    );
}

export default BiasInfo;