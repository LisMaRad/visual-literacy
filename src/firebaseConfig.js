// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCSmBuEWL2qrX9MEcuGcXDBuLAsCSzOPDg",
    authDomain: "visual-literacy-d8444.firebaseapp.com",
    databaseURL: "https://visual-literacy-d8444-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "visual-literacy-d8444",
    storageBucket: "visual-literacy-d8444.appspot.com",
    messagingSenderId: "888447918223",
    appId: "1:888447918223:web:bc040660b481bb3153d0fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
