import { Link } from "react-router";
import { Button } from "./ui/button";
import { logout } from "~/service/auth/auth";
import { useState } from "react";

export default function HomePage() {
    const [loading, setLoading] = useState(false);
    const handleLogout = async () => {
        try {
            setLoading(true);
            await logout();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <h1>Blog App</h1>
            <Link to="/signup">signup</Link>
            <Button variant="destructive" disabled={loading} onClick={handleLogout}>Logout</Button>
        </div>
    )
}

