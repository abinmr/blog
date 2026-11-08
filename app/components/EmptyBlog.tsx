import { TextInitial } from "lucide-react";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty";
import { Button } from "./ui/button";
import { Link } from "react-router";

export default function EmptyBlog() {
    return (
        <Empty className="mt-10">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <TextInitial />
                </EmptyMedia>
                <EmptyTitle>No Blog available</EmptyTitle>
                <EmptyDescription>You don't have any blog available. Create new blog.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Link to="/blog/create">
                    <Button>Create Blog</Button>
                </Link>
            </EmptyContent>
        </Empty>
    );
}
