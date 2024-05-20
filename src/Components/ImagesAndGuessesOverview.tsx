import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {InputField} from "./InputField";
import {ImagesContainer} from "./ImagesContainer";
import {Button} from "./Button";
import {AiPrompts} from "../Pages/GuessingGame";

type ImagesAndGuessesOverviewProps = {
    item: AiPrompts,
};

export function ImagesAndGuessesOverview({item}: ImagesAndGuessesOverviewProps) {
    return (
        <div className="flex flex-col justify-center gap-4 w-[20%]">
            <ImagesContainer imageUrls={item.imageUrls} />
            <div className="text-center border-solid border-accent border-[3px] rounded-full py-2 px-8 text-accent text-[1.5rem] uppercase font-bold">{item.guessedPrompt}</div>
            <div className="text-center border-solid border-[3px] rounded-full py-2 px-8 text-[1.5rem] uppercase font-bold">{item.prompt}</div>
        </div>
    );
};