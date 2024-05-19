import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "../Components/Button";

interface CompletionProps {

}

const Completion: React.FC<CompletionProps> = () => {
    const navigate = useNavigate();
    return (
        <>
            <h3 className="max-w-[60%] leading-none h-[300px]">Thank you for participating</h3>
            <p className="max-w-[1557px]">You can submit another example or go back to the home screen.</p>
            <div className="fixed bottom-4 right-4 flex flex-col gap-3 lg:gap-7">
                <Button onClick={() => navigate(-1)}>Back</Button>
                <Button onClick={() => navigate("/")}>Home</Button>
            </div>
        </>
    );
}

export default Completion;