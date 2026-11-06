import { Link } from "react-router";

export default function HomePage() {
    return (
        <div>
            <h1>Blog App</h1>
            <Link to="/signup">signup</Link>
        </div>
    )
}

