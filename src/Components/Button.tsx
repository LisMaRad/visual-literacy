import React from 'react';
import {Link} from "react-router-dom";

type Props = {
    path: string,
    children?: React.ReactNode,
};

export class Button extends React.Component<Props> {
    render() {
        return (
            <div className="absolute bottom-0 right-0 px-6 py-2 m-7 border-solid border-2 rounded-full border-white">
                <Link to={this.props.path} className="text-button">{this.props.children}</Link>
            </div>
        );
    };
};