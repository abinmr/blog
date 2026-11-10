import { useEffect, useState, type SubmitEvent } from "react";
import { Form, Link, useNavigate, useParams } from "react-router";
import Spinner from "~/components/Spinner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { useAuth } from "~/context/AuthContext";
import { getBlogById, updateBlog } from "~/service/blog/blog";

export default function CreateBlog() {
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");
    const [body, setBody] = useState("");
    const [bodyError, setBodyError] = useState("");
    const [error, setError] = useState("");
    const { blogId } = useParams();
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            if (!currentUser) return;
            if (!blogId) return;
            try {
                const result = await getBlogById(currentUser, blogId);
                if (!result) return;
                setTitle(result.title);
                setBody(result.body);
            } catch (err) {
                console.error("Error fetching blogs", err);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, [currentUser]);

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();

        setTitleError("");
        setBodyError("");
        let hasError = false;
        if (!title.trim()) {
            setTitleError("Please enter a title for your blog post.");
            hasError = true;
        }

        if (!body.trim()) {
            setBodyError("Please enter the body content for your blog post. ");
            hasError = true;
        }

        if (hasError) return;
        if (!currentUser) return;
        if (!blogId) return;
        try {
            setIsUpdating(true);
            await updateBlog(currentUser, blogId, title, body);
            navigate("/", { replace: true });
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to create blog");
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) return <Spinner />;
    return (
        <div className="max-w-4xl mx-auto">
            <div className="border rounded-lg shadow-md mt-20 p-8">
                <Form onSubmit={handleSubmit}>
                    <div className="text-center mb-8">
                        <h1 className="font-medium text-xl">Edit your Blog Post</h1>
                        <p className="text-black/50">Fill in the title and body below to publish new post.</p>
                    </div>
                    {error && <p className="text-destructive text-center">{error}</p>}
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <div className="grid gap-1">
                                <Input id="title" placeholder="Enter your blog title..." value={title} className={titleError ? "border-destructive" : ""} onChange={(e) => setTitle(e.target.value)} autoFocus />
                                {titleError && <p className="text-destructive text-xs">{titleError}</p>}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="body">Blog</Label>
                            <div className="grid gap-1">
                                <Textarea id="body" placeholder="Write your blog content here..." value={body} className={bodyError ? "border-destructive" : ""} onChange={(e) => setBody(e.target.value)} />
                                {bodyError && <p className="text-destructive text-xs">{bodyError}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 mt-8">
                        <Link to="/">
                            <Button variant="outline">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={isUpdating}>
                            {isUpdating ? "Updating..." : "Update"}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
