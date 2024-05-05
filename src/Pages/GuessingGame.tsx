import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from "../Components/Button";
import {InputField} from "../Components/InputField";
import {collection, getDocs} from "firebase/firestore";
import {firestore, storage} from "../firebaseConfig";
import {ref, getDownloadURL} from "firebase/storage";
import {ImageInput} from "../Components/ImageInput";
import {Hangman} from "../Components/Hangman";

interface GuessingGameProps {

}

type AiPrompt = {
    name: string,
    key: number,
    prompt: string,
    pictureUrls: string[],
}

const GuessingGame: React.FC<GuessingGameProps> = () => {
    const [data, setData] = React.useState<AiPrompt[]>([]);
    const [pictures, setPictures] = React.useState<string[]>([]);
    const [index, setIndex] = React.useState<number>(0);
    const [hint, setHint] = React.useState<boolean>(false);
    const [inputGuesses, setInputGuesses] = React.useState<string[]>([]);
    const navigate = useNavigate();
    const prompt = 'Globe and turtle'.toLowerCase();

    console.log(index);

    useEffect(() => {

        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'pictures'));
            const documents = querySnapshot.docs.map((doc) => doc.data());
            // @ts-ignore
            setData(documents);

            // Move the code here
            // documents.forEach((element) => {
            //     const imageUrl = ref(storage, element.name);
            //     getDownloadURL(imageUrl)
            //         .then((url) => {
            //             // `url` is the download URL for 'images/my-image.jpg'
            //             console.log(url);
            //             setPictures((prevPictures) => [...prevPictures, url]);
            //         })
            //         .catch((error) => {
            //             // Handle any errors
            //             console.error(error);
            //         });
            // });
        };

        fetchData().catch((error) => {
            return <div>{error}</div>
        });
    }, []); // Add an empty array here

    //TODO: add new guess to the list of guesses
    const addGuess = (input: string) => {
        setInputGuesses([...inputGuesses, input]);
    };
    console.log(data);

    return (
        <>
            <div className="fixed top-4 right-4">
                <Button onClick={() => navigate("/")}>Home</Button>
            </div>
            <h3 className="max-w-[60%] leading-none h-[180px]">What was the
                AI Prompt?</h3>
            {!hint ? <ImageInput nextPage={() => setIndex(index + 1)} setHangman={() => setHint(!hint)}/> :
                <Hangman nextPage={() => {setIndex(index + 1); setHint(false)}} currentIndex={index} prompt={prompt}/>}
        </>
    );
}

export default GuessingGame;