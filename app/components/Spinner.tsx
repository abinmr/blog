import { LoaderIcon } from "lucide-react";

export default function Spinner() {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <LoaderIcon role="status" aria-label="loading" className="size-6 animate-spin" />
        </div>
    );
}
