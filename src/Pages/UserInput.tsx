import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "../Components/Button";
import {ImagesContainer} from "../Components/ImagesContainer";
import {InputField} from "../Components/InputField";

interface UserInputProps {

}

const UserInput: React.FC<UserInputProps> = () => {
    const navigate = useNavigate();
    const [index, setIndex] = React.useState(0);
    const [imageUrls, setImageUrls] = React.useState<string[]>([]);
    const [inputValue, setInputValue] = React.useState<string>("");

    const fetchImages = () => {
        // Fetch images
        const images = ["https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg", "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg", "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg", "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg"];
        setImageUrls(images);
    }

    const safeImage = () =>{}

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
            {index === 1 && (<>
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
                    {imageUrls.length > 0 && <div className="fixed bottom-4 right-4 flex flex-col gap-3 lg:gap-7">
                        <Button onClick={() => setIndex(5)}>Back</Button>
                        <Button onClick={() => navigate("/biasinfo")}>Continue</Button>
                    </div>}
                </div>
            </>)}

        </>
    );
}

export default UserInput;