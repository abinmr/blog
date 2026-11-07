import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { useState } from "react";
import { logout } from "~/service/auth/auth";

export default function Navbar() {
    const [isLoggingOut, setIsLogginOut] = useState(false);
    const handleLogout = async () => {
        try {
            setIsLogginOut(true);
            await logout();
        } catch (err) {
            console.log(err);
        } finally {
            setIsLogginOut(false);
        }
    }
    return (
        <header className="sticky top-0 border">
            <nav className="flex justify-around items-center max-w-6xl mx-auto h-14">
                <h1 className="font-medium text-xl">
                    <Link to="/">Blog</Link>
                </h1>
                <Button variant="destructive" onClick={handleLogout} disabled={isLoggingOut}>
                    <LogOut />
                    {isLoggingOut ? "Loging out.." : "Logout"}
                </Button>
            </nav>
        </header>
    )
}

