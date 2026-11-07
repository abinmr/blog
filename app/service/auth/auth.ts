import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "~/config/firebase";

export async function createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export async function loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
    return signOut(auth);
}

export async function googleLogin() {
    return signInWithPopup(auth, googleProvider);
}
