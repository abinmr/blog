import { useState, type SubmitEvent } from "react";
import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { FaGoogle } from "react-icons/fa";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleFormSubmition = (e: SubmitEvent) => {
        e.preventDefault();
        let hasError = false;

        if (!email.trim()) {
            setEmailError("Email is required");
            hasError = true;
        }

        if (!password.trim()) {
            setPasswordError("Password is required");
            hasError = true;
        } else if (password.length < 6) {
            setPasswordError("Password must be at 6 characters long");
            hasError = true;
        }

        if (hasError) return;

        console.log("Form submitting");
        setLoading(true);
        return;
    };
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl font-semibold">Create your account</CardTitle>
                    <CardDescription>Sign up to view all the blogs</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form id="signupForm" onSubmit={handleFormSubmition}>
                        <div className="flex flex-col gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" placeholder="demo@email.com" onChange={(e) => setEmail(e.target.value)} />
                                {emailError && <p className="text-destructive">{emailError}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" placeholder="At least 6 characters long" onChange={(e) => setPassword(e.target.value)} />
                                {passwordError && <p className="text-destructive">{passwordError}</p>}
                            </div>
                        </div>
                    </Form>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                    <Button type="submit" size="lg" className="w-full" form="signupForm" disabled={loading}>
                        Sign in
                    </Button>
                    <Button variant="outline" size="lg" className="w-full">
                        <FaGoogle />
                        Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
