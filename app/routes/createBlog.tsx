import { useState, type SubmitEvent } from "react";
import { Form, Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

export default function CreateBlog() {
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");
    const [body, setBody] = useState("");
    const [bodyError, setBodyError] = useState("");

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();

        setTitleError("");
        setBodyError("");
        let hasError = false;
        if (!title.trim()) {
            setTitleError("Please enter a title for your blog post.");
        }

        if (!body.trim()) {
            setBodyError("Please enter the body content for your blog post. ");
        }

        if (hasError) return;
    }
    return (
        <div className="max-w-4xl mx-auto">
            <div className="border rounded-lg shadow-md mt-20 p-8">
                <Form onSubmit={handleSubmit}>
                    <div className="text-center">
                        <h1 className="font-medium text-xl">Create new Blog Post</h1>
                        <p className="text-black/50">Fill in the title and body below to publish new post.</p>
                    </div>
                    <div className="flex flex-col gap-4 mt-8">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <div className="grid gap-1">
                                <Input id="title" placeholder="Enter your blog title..." className={titleError ? "border-destructive" : ""} onChange={(e) => setTitle(e.target.value)} />
                                {titleError && <p className="text-destructive text-xs">{titleError}</p>}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="body">Blog</Label>
                            <div className="grid gap-1">
                                <Textarea id="body" placeholder="Write your blog content here..." className={bodyError ? "border-destructive" : ""} onChange={(e) => setBody(e.target.value)} />
                                {bodyError && <p className="text-destructive text-xs">{bodyError}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 mt-8">
                        <Link to="/">
                            <Button variant="outline">Cancel</Button>
                        </Link>
                        <Button type="submit">Create Blog</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
