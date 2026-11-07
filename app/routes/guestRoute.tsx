import { Navigate, Outlet } from "react-router";
import Spinner from "~/components/Spinner";
import { useAuth } from "~/context/AuthContext";

export default function GuestRoute() {
    const { currentUser, loading } = useAuth();
    if (loading) return <Spinner />

    return currentUser ? <Navigate to="/" /> : <Outlet />;
}
