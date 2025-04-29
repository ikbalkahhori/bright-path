import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, GraduationCap } from "lucide-react";
import { loginUser, resetPassword } from "@/services/firebase";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const [resetSuccess, setResetSuccess] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        if (!email || !password) {
            setError("Please enter both email and password");
            return;
        }

        setLoading(true);

        try {
            await loginUser(email, password);
            navigate("/dashboard");
        } catch (err) {
            console.error("Login error:", err);
            setError("Failed to sign in. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    }

    const handleResetPassword = async () => {
        if (!email) {
            setError("Please enter your email address to reset your password");
            return;
        }

        setResetLoading(true);

        try {
            await resetPassword(email);
            setResetSuccess("Password reset email sent! Check your inbox for further instructions.");
            setError("");
        } catch (err) {
            console.error("Password reset error:", err);
            setError("Failed to send password reset email. Please try again.");
        } finally {
            setResetLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16 pb-16">
            <div className="w-full max-w-md px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-center mb-6">
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-xl shadow-lg">
                            <GraduationCap size={32} className="text-white" />
                        </div>
                    </div>

                    <Card className="shadow-lg border-gray-200">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
                            <CardDescription className="text-center">
                                Enter your email and password to access your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
                                    {error}
                                </div>
                            )}

                            {resetSuccess && (
                                <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 text-sm">
                                    {resetSuccess}
                                </div>
                            )}

                            <form onSubmit={handleLogin}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password">Password</Label>
                                            <button
                                                type="button"
                                                onClick={handleResetPassword}
                                                disabled={resetLoading}
                                                className="text-xs text-purple-600 hover:underline font-medium"
                                            >
                                                {resetLoading ? "Sending..." : "Forgot Password?"}
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-purple-600 hover:bg-purple-700"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Signing In...
                                            </>
                                        ) : (
                                            "Sign In"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <div className="text-sm text-center text-gray-500">
                                Don't have an account?{" "}
                                <Link to="/register" className="text-purple-600 hover:underline font-medium">
                                    Sign Up
                                </Link>
                            </div>
                            <div className="text-xs text-center text-gray-500">
                                By signing in, you agree to our{" "}
                                <Link to="/terms-of-service" className="text-purple-600 hover:underline">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link to="/privacy-policy" className="text-purple-600 hover:underline">
                                    Privacy Policy
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>

                    <div className="mt-6 text-center">
                        <Link to="/" className="text-sm text-gray-600 hover:text-purple-600">
                            ← Back to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}