import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import PromptInfo from "../Pages/PromptInfo";
import GuessingGame from "../Pages/GuessingGame";
import BiasInfo from "../Pages/BiasInfo";
import UserInput from "../Pages/UserInput";
import Completion from "../Pages/Completion";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <Home /> },
            { path: "promptinfo", element: <PromptInfo /> },
            { path: "guessinggame", element: <GuessingGame /> },
            { path: "biasinfo", element: <BiasInfo /> },
            { path: "userinput", element: <UserInput /> },
            { path: "completion", element: <Completion /> },
        ],
    },
]);