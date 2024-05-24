import React from 'react';

type InputFieldProps = {
    name: string,
    value?: string,
    answer?: boolean,
    placeholder?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export function InputField ({ name, value, answer, placeholder, onChange }: InputFieldProps) {
    return (
        <input type="text"
               name={name}
               value={value}
               onChange={onChange}
               placeholder={placeholder}
               className={`w-full border-2 rounded-[100px] bg-primary text-white leading-none py-3 px-8 ${answer ? "border-green-500" : "border-white"}`} />
    );
}
