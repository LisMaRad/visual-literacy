import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Stylings from "../Pages/Stylings";
import PromptInfo from "../Pages/PromptInfo";
import GuessingGame from "../Pages/GuessingGame";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <Home /> },
            { path: "about", element: <About /> },
            { path: "promptinfo", element: <PromptInfo /> },
            { path: "guessinggame", element: <GuessingGame /> },
            { path: "stylings", element: <Stylings /> },
        ],
    },
]);