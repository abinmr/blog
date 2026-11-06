import { onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "~/config/firebase";

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                setCurrentUser(user);
                setLoading(false);
            },
            (error) => {
                console.log("Auth state changed", error.message);
                setLoading(false);
            },
        );

        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={{ currentUser, loading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used with auth provider");
    }

    return context;
};
