import React from 'react';
import {Link} from "react-router-dom";

type ButtonProps = {
    onClick: () => void,
    children: React.ReactNode,
};

export function Button({children, onClick}: ButtonProps) {
    return (
        <button
            className="flex justify-center items-center text-button min-w-60 py-1 px-10 border-solid border-2 rounded-full border-white hover:bg-white hover:text-black"
            onClick={onClick}>{children}</button>
    );
};