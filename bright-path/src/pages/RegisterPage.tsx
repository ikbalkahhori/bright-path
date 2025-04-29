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
import { Eye, EyeOff, Loader2, GraduationCap, CheckCircle2 } from "lucide-react";
import { registerUser } from "@/services/firebase";
import { getPasswordStrength } from "@/lib/utils";

export default function RegisterPage() {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const passwordStrength = getPasswordStrength(password);

    const passwordStrengthColor = {
        weak: "bg-red-500",
        medium: "bg-yellow-500",
        strong: "bg-green-500"
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        if (!displayName || !email || !password || !confirmPassword) {
            setError("Please fill out all fields");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        if (passwordStrength === "weak") {
            setError("Password is too weak. Use at least 8 characters with letters, numbers, and special characters.");
            return;
        }

        setLoading(true);

        try {
            await registerUser(email, password, displayName);
            setSuccess(true);

            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (err: unknown) {
            console.error("Registration error:", err);
            if (err.code === "auth/email-already-in-use") {
                setError("This email is already registered. Please use a different email or try logging in.");
            } else {
                setError("Failed to create account. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

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
                            <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
                            <CardDescription className="text-center">
                                Enter your information to create your BrightPath account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 text-sm flex items-start gap-2">
                                    <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">Account created successfully!</p>
                                        <p>Redirecting you to your dashboard...</p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleRegister}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="displayName">Full Name</Label>
                                        <Input
                                            id="displayName"
                                            placeholder="John Doe"
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            required
                                        />
                                    </div>

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
                                        <Label htmlFor="password">Password</Label>
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

                                        {/* Password strength indicator */}
                                        {password && (
                                            <div className="space-y-1 mt-1">
                                                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${passwordStrengthColor[passwordStrength]} transition-all`}
                                                        style={{
                                                            width:
                                                                passwordStrength === "weak" ? "33%" :
                                                                    passwordStrength === "medium" ? "66%" : "100%"
                                                        }}
                                                    ></div>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    Password strength: <span className="font-medium capitalize">{passwordStrength}</span>
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-purple-600 hover:bg-purple-700"
                                        disabled={loading || success}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Creating Account...
                                            </>
                                        ) : success ? (
                                            <>
                                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                                Account Created!
                                            </>
                                        ) : (
                                            "Create Account"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <div className="text-sm text-center text-gray-500">
                                Already have an account?{" "}
                                <Link to="/login" className="text-purple-600 hover:underline font-medium">
                                    Sign In
                                </Link>
                            </div>
                            <div className="text-xs text-center text-gray-500">
                                By creating an account, you agree to our{" "}
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