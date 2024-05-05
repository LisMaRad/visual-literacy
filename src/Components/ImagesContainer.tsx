import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {InputField} from "./InputField";

type ImagesContainerProps = {
    imageUrls: string[];
};

export function ImagesContainer({imageUrls}: ImagesContainerProps) {
   return (
        <div className="flex flex-wrap w-3/4">
            {imageUrls.map((image, index) => (
                <div key={index} className="w-1/2 aspect-square">
                    <img src={image} alt="image" className="object-cover w-full h-full"/>
                </div>
            ))}
        </div>
    );
};