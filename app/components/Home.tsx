import { useState } from "react"
import EmptyBlog from "./EmptyBlog";

export default function HomePage() {
    const [blogs, setBlogs] = useState([]);
    if (blogs.length === 0) return <EmptyBlog />
    return (
        <div className="max-w-6xl mx-auto mt-10">
            <h1>Blog App</h1>
        </div>
    )
}

