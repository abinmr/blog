import { Navigate, Outlet } from "react-router";
import Navbar from "~/components/Navbar";
import Spinner from "~/components/Spinner";
import { useAuth } from "~/context/AuthContext";

export default function ProtectedLayout() {
    const { currentUser, loading } = useAuth();
    if (loading) return <Spinner />;

    return currentUser ? (
        <div>
            <Navbar />
            <Outlet />
        </div>
    ) : (
        <Navigate to="/signup" replace />
    );
}
