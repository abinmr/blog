import { Link } from "react-router";
import { Button } from "./ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
            <div className="max-w-md w-full">
                <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">404 Error</p>

                <h1 className="mt-2 text-4xl font-extrabold text-red-900 tracking-tight sm:text-5xl">Page Not Found</h1>

                <p className="mt-4 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for. It might have been moved, renamed, or doesn't exist.</p>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link to="/">
                        <Button size="lg">
                            Go back home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
