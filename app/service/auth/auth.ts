import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, type User } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "~/config/firebase";

async function createUserProfile(user: User) {
    const userRef = doc(db, "users", user.uid);
    await setDoc(
        userRef,
        {
            email: user.email,
            name: user.displayName || "",
            createdAt: serverTimestamp(),
        },
        { merge: true },
    );
}

export async function createUser(email: string, password: string) {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    await createUserProfile(userCredentials.user);
    return userCredentials;
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
