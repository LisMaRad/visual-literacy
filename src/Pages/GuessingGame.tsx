import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from "../Components/Button";
import {collection, getDocs} from "firebase/firestore";
import {firestore, storage} from "../firebaseConfig";
import {ref, getDownloadURL} from "firebase/storage";
import {ImageInput} from "../Components/ImageInput";
import {Hangman} from "../Components/Hangman";

interface AiPrompts {
    imageUrls: string[],
    prompt: string,
    guessedPrompt?: string;
}

const GuessingGame: React.FC = () => {
    const [data, setData] = React.useState<AiPrompts[]>([]);
    const [index, setIndex] = React.useState<number>(0);
    const [hint, setHint] = React.useState<boolean>(false);
    const [inputGuesses, setInputGuesses] = React.useState<string[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Set loading to true when fetching starts

            const querySnapshot = await getDocs(collection(firestore, 'pictures'));
            const documents = querySnapshot.docs.map((doc) => doc.data());

            const aiPrompts: AiPrompts[] = [];

            for (const doc of documents) {
                const imageUrlArray: string[] = []; // Reset imageUrlArray for each document

                for (const imageName of doc.imageUrls) {
                    const imageUrl = ref(storage, imageName);
                    try {
                        const url = await getDownloadURL(imageUrl);
                        imageUrlArray.push(url);
                    } catch (error) {
                        console.error("Error fetching image URL:", error);
                    }
                }

                aiPrompts.push({
                    imageUrls: imageUrlArray,
                    prompt: doc.prompt.toLowerCase()
                });
            }

            setData(aiPrompts);
            setIsLoading(false); // Set loading to false when fetching ends

        };


        fetchData().catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, []);


    const addGuess = (input: string) => {
        setInputGuesses([...inputGuesses, input]);
    };

    return (
        <>
            {isLoading ? (<div>Laden</div>) : ( // Render Loading component if isLoading is true
                <>
                    <div className="fixed top-4 right-4">
                        <Button onClick={() => navigate("/")}>Home</Button>
                    </div>
                    <h3 className="max-w-[60%] leading-none h-[180px]">What was the AI Prompt?</h3>
                    {data.length > 0 && index < 5 && (
                        <>
                            {!hint ? (
                                <ImageInput nextPage={() => setIndex(index + 1)} setHangman={() => setHint(!hint)}
                                            images={data[index]?.imageUrls} prompt={data[index]?.prompt} addGuess={addGuess}/>
                            ) : (
                                    <Hangman
                                        nextPage={() => {
                                            setIndex(index + 1);
                                            setHint(false);
                                        }}
                                        currentIndex={index}
                                        images={data[index]?.imageUrls}
                                        prompt={data[index]?.prompt}
                                    />
                            )}
                        </>
                    )}
                </>)}
        </>
    );
}

export default GuessingGame;
