import { useState, type SubmitEvent } from "react";
import { FaGoogle } from "react-icons/fa";
import { Form, Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { googleLogin, loginUser } from "~/service/auth/auth";
import getAuthErrorMessage from "~/service/auth/error";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState("");
    const [googleLoading, setGoogleLoading] = useState(false);
    const navigate = useNavigate();

    const handleFormSubmition = async (e: SubmitEvent) => {
        e.preventDefault();
        let hasError = false;

        setEmailError("");
        setPasswordError("");

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
        try {
            setLoading(true);
            await loginUser(email, password);
            navigate("/", { replace: true });
        } catch (err) {
            setAuthError(getAuthErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setAuthError("");
        try {
            setGoogleLoading(true);
            await googleLogin();
            navigate("/", { replace: true });
        } catch (err) {
            setAuthError(getAuthErrorMessage(err));
        } finally {
            setGoogleLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl font-semibold">Login to your account</CardTitle>
                    <CardDescription>Login to view all the blogs</CardDescription>
                </CardHeader>
                <CardContent>
                    {authError && <p className="text-destructive text-center mb-4">{authError}</p>}
                    <Form id="signupForm" onSubmit={handleFormSubmition}>
                        <div className="flex flex-col gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <div>
                                    <Input type="email" id="email" placeholder="demo@email.com" className={emailError ? "border-destructive" : ""} onChange={(e) => setEmail(e.target.value)} />
                                    {emailError && <p className="text-destructive">{emailError}</p>}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <div>
                                    <Input type="password" id="password" placeholder="At least 6 characters long" className={passwordError ? "border-destructive" : ""} onChange={(e) => setPassword(e.target.value)} />
                                    {passwordError && <p className="text-destructive">{passwordError}</p>}
                                </div>
                            </div>
                        </div>
                    </Form>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                    <Button type="submit" size="lg" className="w-full" form="signupForm" disabled={loading}>
                        {loading ? "Loging in..." : "Login"}
                    </Button>
                    <Button variant="outline" size="lg" className="w-full" disabled={googleLoading} onClick={handleGoogleLogin}>
                        <FaGoogle />
                        {googleLoading ? "Connecting to google" : "Continue with Google"}
                    </Button>
                    <p>
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-600">
                            Signup
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
