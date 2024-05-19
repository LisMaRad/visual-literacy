import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "../Components/Button";
import {ImagesContainer} from "../Components/ImagesContainer";
import {InputField} from "../Components/InputField";
import {collection, addDoc} from "firebase/firestore";
import {firestore, storage} from "../firebaseConfig";
import {ref, uploadBytes} from "firebase/storage";


interface UserInputProps {

}

const UserInput: React.FC<UserInputProps> = () => {
    const navigate = useNavigate();
    const [index, setIndex] = React.useState(0);
    const [imageUrls, setImageUrls] = React.useState<string[]>([]);
    const [inputValue, setInputValue] = React.useState<string>("");
    const [isSaving, setIsSaving] = React.useState<boolean>(false);

    const fetchImages = () => {
        setIsSaving(true);
        // Fetch images
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "key": "T7lgGFtRfXMl2BEWmEfZCJBlGL3A7opq0sSUjoKa0326ZfGEPqp12w0k710k",
            "model_id": "midjourney",
            "prompt": inputValue,
            "negative_prompt": "",
            "width": "512",
            "height": "512",
            "samples": "4",
            "num_inference_steps": "30",
            "seed": null,
            "guidance_scale": 7.5,
            "webhook": null,
            "track_id": null
        });

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://modelslab.com/api/v6/images/text2img", requestOptions)
            .then(response => response.text())
            .then(result => {
                setImageUrls(JSON.parse(result).output);
                setIsSaving(false);
            })
            .catch(error => {
                console.log('error', error);
                setIsSaving(false);
            });

    }

    const safeImage = async () => {
        setIsSaving(true);

        try {
            const docRef = collection(firestore, "pictures");

            // Save the imageUrls and prompt to Firestore
            await addDoc(docRef, {
                imageUrls: imageUrls,
                prompt: inputValue
            });

            // Iterate over the imageUrls array
            for (const url of imageUrls) {
                // Fetch the image data
                const response = await fetch(url);
                const blob = await response.blob();

                // Create a reference to Firebase Storage
                const storageRef = ref(storage, `${url.split('/').pop()}`);

                // Upload the image data to Firebase Storage
                await uploadBytes(storageRef, blob);
            }
            navigate("/completion");
        } catch (error) {
            console.error("Error saving image:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            <div className="fixed top-4 right-4">
                <Button onClick={() => navigate("/")}>Home</Button>
            </div>
            <h3 className="max-w-[60%] leading-none h-[300px]">Create a new Prompt
                with Stable Diffusion</h3>
            {index === 0 && (<><p className="max-w-[1557px]">
                Your examples should emphasize the lack of diversity of any kind while using Stable Diffusion.<br/>
                Think about stereo types and issues within our society.<br/>
                If you have found such an example <span className="inline-block"><Button onClick={() => {
            }}>Submit</Button></span> it to the project.<br/>
                Your example will eventually show up for the next participant.</p>
                <div className="fixed bottom-4 right-4">
                    <Button onClick={() => setIndex(index + 1)}>Continue</Button>
                </div>
            </>)}
            {index === 1 && (
                !isSaving ? <>
                <div className="max-w-[816px] flex flex-col gap-10 mx-auto items-center">
                    <div className="w-3/4">
                        {imageUrls.length > 0 ? <ImagesContainer imageUrls={imageUrls}/> :
                            <div className="w-full aspect-square border-solid border-2 border-white"></div>}
                    </div>
                    <InputField name="guess" onChange={(e) =>
                        setInputValue(e.target.value)
                    } value={inputValue} placeholder="Make a new prompt"></InputField>
                    {inputValue &&
                        <Button onClick={() => fetchImages()}>Generate image</Button>}
                    <div className="fixed bottom-4 right-4 flex flex-col gap-3 lg:gap-7">
                        {imageUrls.length > 0 && inputValue !== "" && <Button onClick={safeImage}>Submit</Button>}
                        <Button onClick={() => setIndex(5)}>Back</Button>
                        <Button onClick={() => navigate("/completion")}>Continue</Button>
                    </div>
                </div>
            </> : <p>Loading... </p>)}

        </>
    );
}

export default UserInput;