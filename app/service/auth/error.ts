import type { FirebaseError } from "firebase/app";

export default function getAuthErrorMessage(error: unknown): string {
    if (!error) return "";

    const firebaseError = error as FirebaseError;
    const code = firebaseError.code;

    switch (code) {
        case "auth/invalid-credential":
            return "Invalid credentials";

        case "auth/user-not-found":
            return "user not found";

        case "auth/wrong-password":
            return "Invalid email or password. Please check your credentials.";

        case "auth/email-already-in-use":
            return "This email is already registered. Please log in instead.";

        case "auth/weak-password":
            return "Password should be at least 6 characters long.";

        case "auth/invalid-email":
            return "Please provide a valid email address.";

        case "auth/popup-closed-by-user":
            return "Sign-in popup was closed before completing the sign-in.";

        case "auth/popup-blocked":
            return "Sign-in popup was blocked by your browser. Please allow popups.";

        case "auth/too-many-requests":
            return "Access temporarily disabled due to too many failed attempts. Try again later.";

        case "auth/network-request-failed":
            return "Network connection failed. Please check your internet connection.";

        default:
            return firebaseError.message || "An unexpected authentication error occurred. Please try again.";
    }
}
