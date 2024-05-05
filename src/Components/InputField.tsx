import React from 'react';

type InputFieldProps = {
    name: string,
    value?: string,
    placeholder?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export function InputField ({ name, value, placeholder, onChange }: InputFieldProps) {
    return (
        <input type="text"
               name={name}
               value={value}
               onChange={onChange}
               placeholder={placeholder}
               className="w-full border-2 border-white rounded-[100px] bg-primary text-white py-2 px-8 mt-8" />
    );
};
