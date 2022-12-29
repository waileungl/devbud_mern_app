// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDuoPSbwsGagI6PyZTMnDikc6LveBOnNVw",
    authDomain: "debud-mern.firebaseapp.com",
    projectId: "debud-mern",
    storageBucket: "debud-mern.appspot.com",
    messagingSenderId: "23361779463",
    appId: "1:23361779463:web:5ff96bcc8d517efe8177a2",
    measurementId: "G-EJS2LHH3VM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);