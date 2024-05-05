import React, {useEffect} from 'react';
import {Link} from "react-router-dom";

interface AboutProps {

}

const About: React.FC<AboutProps> = () => {

    return (
            <div>
                Hello About!
                <Link to="/">Home</Link>

            </div>
        );
}

export default About;