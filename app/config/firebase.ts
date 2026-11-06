// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCiUnNl5X0dI-OEoQ0ifoDwnuwRYlgyYN4",
    authDomain: "blog-4f5f7.firebaseapp.com",
    projectId: "blog-4f5f7",
    storageBucket: "blog-4f5f7.firebasestorage.app",
    messagingSenderId: "637645631459",
    appId: "1:637645631459:web:902aed0f82df3b2b457ad6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account",
});
