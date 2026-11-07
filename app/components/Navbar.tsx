import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { useState } from "react";
import { logout } from "~/service/auth/auth";

export default function Navbar() {
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
        <header className="sticky top-0 bg-gray-300">
            <nav className="flex justify-around items-center max-w-6xl mx-auto h-14">
                <h1>
                    <Link to="/">Blog</Link>
                </h1>
                <Button variant="destructive" onClick={handleLogout}>
                    <LogOut />
                    Logout
                </Button>
            </nav>
        </header>
    )
}

