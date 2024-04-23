import { ref,     uploadBytes as upload,
    getDownloadURL as getUrl, } from 'firebase/storage';
import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';


import firebase from "firebase/compat";
import { storage } from "../firebaseConfig";

interface AboutProps {

}

type Picture = {
    name: string,
    key: number,
    prompt: string,
}

const About: React.FC<AboutProps> = () => {
    const [data, setData] = React.useState<Picture[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'pictures'));
            const documents = querySnapshot.docs.map((doc) => doc.data());
            // @ts-ignore
            setData(documents);
            console.log(documents);
        };

        fetchData();
    }, []);

    return (
            <div>
                Hello About!
                <Link to="/">Home</Link>
                <div>
                    {data.map((picture, index) => (
                        <div key={index}>
                            {picture.name}
                            {picture.prompt}

                            </div>
                    ))}
                    </div>
            </div>
        );
}

export default About;