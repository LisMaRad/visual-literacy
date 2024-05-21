import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from "../Components/Button";
import {collection, getDoc, query, limit, doc, getDocs, where} from "firebase/firestore";
import {firestore, storage} from "../firebaseConfig";
import {ref, getDownloadURL} from "firebase/storage";
import {ImageInput} from "../Components/ImageInput";
import {Hangman} from "../Components/Hangman";
import {ImagesAndGuessesOverview} from "../Components/ImagesAndGuessesOverview";

export interface AiPrompts {
    imageUrls: string[],
    prompt: string,
    guessedPrompt: string;
}

const GuessingGame: React.FC = () => {
    const [data, setData] = React.useState<AiPrompts[]>([]);
    //TODO: change index back to 0
    const [index, setIndex] = React.useState<number>(0);
    const [hint, setHint] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const navigate = useNavigate();


    const getCountFromFireStore = async () => {
        const countQuery = query(collection(firestore, 'count'), limit(1));
        const querySnapshot = await getDocs(countQuery);
        return querySnapshot.docs.map((doc) => doc.data());

    }

    const getRandomNumbers = (data: number): number[] => {
        // Ensure the entries count is at least 3
        if (data < 3) {
            throw new Error("entryCount must be at least 3 to generate three unique numbers.");
        }

        const randomNumbers = new Set<number>();

        const min = Math.ceil(0)
        const max = Math.floor(data);

        // Generate unique random numbers
        while (randomNumbers.size < 3) {

            const randomNumber = Math.floor(Math.random() * (max - min)) + min;
            randomNumbers.add(randomNumber);
        }

        // Convert the set to an array and return
        return Array.from(randomNumbers);
    }


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Set loading to true when fetching starts

            // Fetch the total count of entries from Firestore
            const countData = await getCountFromFireStore();
            const totalEntries = countData[0].countEntries;

            // Generate three unique random numbers within the range of the total count
            const randomIndices = getRandomNumbers(totalEntries);

            const aiPrompts: AiPrompts[] = [];

            // Fetch the documents from Firestore using the generated random numbers as indices
            for (const index of randomIndices) {
                const docQuery = query(collection(firestore, 'pictures'), where("index", "==", index));
                const querySnapshot = await getDocs(docQuery);

                console.log("snapshot",querySnapshot);

                for (const doc of querySnapshot.docs) {
                    if (doc.exists()) {
                        const docData = doc.data();
                        const imageUrlArray: string[] = []; // Reset imageUrlArray for each document

                        for (const imageName of docData.imageUrls) {
                            const imageUrl = ref(storage, imageName);
                            console.log("imageUrl", imageUrl);
                            try {
                                const url = await getDownloadURL(imageUrl);
                                imageUrlArray.push(url);
                            } catch (error) {
                                console.error(`Error fetching image URL for ${imageName}:`, error);
                            }
                        }

                        aiPrompts.push({
                            imageUrls: imageUrlArray,
                            prompt: docData.prompt.toLowerCase(),
                            guessedPrompt: "",
                        });
                    }
                }
            }

            setData(aiPrompts);
            setIsLoading(false); // Set loading to false when fetching ends
        };

        fetchData().catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, []);


    const addGuess = (input: string) => {
        setData(prevData => {
            const newData = [...prevData];
            newData[index].guessedPrompt = input;
            return newData;
        });
    };

    return (
        <>
            {isLoading ? (<div>Laden</div>) : ( // Render Loading component if isLoading is true
                <>
                    <div className="fixed top-4 right-4">
                        <Button onClick={() => navigate("/")}>Home</Button>
                    </div>
                    {data.length > 0 && index < 3 && (
                        <>
                            <h3 className="max-w-[60%] leading-none h-[180px]">What was the AI Prompt?</h3>
                            {!hint ? (
                                <ImageInput
                                    nextPage={() => setIndex(index + 1)}
                                    setHangman={() => setHint(!hint)}
                                    images={data[index]?.imageUrls}
                                    prompt={data[index]?.prompt}
                                    addGuess={addGuess}
                                />
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
                    {index === 3 && (
                        <>
                            <h2 className="max-w-[80%] leading-[7rem] h-[300px]">What had these
                                Examples in Common?</h2>
                            <p className="max-w-[1557px]">Here they are once again.<br/>
                                Look at them and compare the prompts with the pictures.</p>
                            <div className="fixed bottom-4 right-4">
                                <Button onClick={() => setIndex(index + 1)}>Continue</Button>
                            </div>
                        </>
                    )}
                    {index === 4 && (
                        <>
                            <h3 className="max-w-[60%] leading-none h-[300px]">What had these
                                Examples in Common?</h3>
                            <div className="flex flex-col lg:flex-row items-start justify-evenly gap-12">
                                {data.map((item, index) => (
                                    <ImagesAndGuessesOverview key={index} item={item}/>
                                ))}

                            </div>
                            <div className="fixed bottom-4 left-4 leading-none">
                                <div className="text-accent">Orange indicates your first guess</div>
                                <div>White indicates the real prompt that generated these images</div>
                            </div>
                            <div className="fixed bottom-4 right-4 flex flex-col gap-3 lg:gap-7">
                                <Button onClick={() => setIndex(4)}>Back</Button>
                                <Button onClick={() => navigate("/biasinfo")}>Continue</Button>
                            </div>


                        </>
                    )}
                </>)}
        </>
    );
}

export default GuessingGame;
