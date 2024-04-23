import React from 'react';
import {Link} from "react-router-dom";

type Props = {
    path: string,
    children?: React.ReactNode,
};

export class Button extends React.Component<Props> {
    render() {
        return (
            <Link to={this.props.path} className="flex justify-center items-center text-button min-w-40 p-1 border-solid border-2 rounded-full border-white">{this.props.children}</Link>
        );
    };
};