import { EllipsisVertical, SquarePen, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Link } from "react-router";
import { Button } from "./ui/button";

type Blog = {
    id: string;
    title: string;
    body: string;
    createdAt: Date;
};

interface BlogProps {
    blog: Blog;
    onDelete: (id: string) => void;
}

export default function ShowBlog({ blog, onDelete }: BlogProps) {
    return (
        <div className="border rounded-lg p-6 flex justify-between items-center">
            <div>
                <h2 className="font-medium text-xl">{blog.title}</h2>
                <p className="truncate">{blog.body}</p>
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button variant="ghost" className="rounded-md">
                                <EllipsisVertical />
                            </Button>
                        }
                    />
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <Link to={`/blog/edit/${blog.id}`}>
                                <DropdownMenuItem>
                                    <SquarePen /> Edit
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" onClick={() => onDelete(blog.id)}>
                                <Trash2 /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
