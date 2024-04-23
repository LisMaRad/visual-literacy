import React from 'react';
import {Link} from "react-router-dom";

type InputFieldProps = {
};

export class InputField extends React.Component<InputFieldProps> {
    render() {
        return (
            <input type="text" className="border-2 border-black rounded-md p-2" />
        );
    };
};