import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "../Components/Button";

interface HomeProps {

}

const Home: React.FC<HomeProps> = () => {
    return (
        <>
            <h1 className="uppercase max-w-[50%] leading-[7rem] h-[300px]">Generated society</h1>
            <p className="max-w-[1557px]">This project explores the relationship between the words we hear or read and the mental images we therefore create in our minds, and how these connections affect our society. It explores how language influences the way we think and understand the world around us.</p>
            <div className="absolute bottom-4 right-4">
                <Button path="/promptinfo">Continue</Button>
            </div>
        </>
    );
}

export default Home;