import { useEffect, useState } from "react";
import EmptyBlog from "./EmptyBlog";
import { deleteBlog, getAllBlogs } from "~/service/blog/blog";
import { useAuth } from "~/context/AuthContext";
import Spinner from "./Spinner";
import ShowBlog from "./ShowBlog";
import { Button } from "./ui/button";
import { Link } from "react-router";
import type { Blog } from "../../types";

export default function HomePage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();
    useEffect(() => {
        async function blogs() {
            if (!currentUser) return;

            try {
                const result = await getAllBlogs(currentUser);
                setBlogs(result);
            } catch (err) {
                console.error("Failed to fetch data", err);
            } finally {
                setLoading(false);
            }
        }
        blogs();
    }, [currentUser]);

    if (loading) return <Spinner />;
    if (blogs.length === 0) return <EmptyBlog />;
    const deleteCurrentBlog = async (blogId: string) => {
        if (!currentUser) return;
        try {
            await deleteBlog(currentUser, blogId);
            setBlogs((prev) => prev.filter((blog) => blog.id !== blogId));
        } catch (err) {
            console.error("Error deleting blog", err);
        }
    };
    return (
        <div className="max-w-5xl mx-auto mt-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Your Blogs</h1>
                <Link to="/blog/create">
                    <Button>Create</Button>
                </Link>
            </div>
            <div className="grid gap-4">
                {blogs.map((blog) => (
                    <ShowBlog key={blog.id} blog={blog} onDelete={deleteCurrentBlog} />
                ))}
            </div>
        </div>
    );
}
