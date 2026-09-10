"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { signUp } from '@/lib/auth/auth-client'
import { useRouter } from "next/navigation";
import { z } from "zod";

const signUpSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .min(2, "Name must be at least 2 characters")
        .regex(/^[A-Za-z\s]+$/, "Enter a valid name"),

    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),

    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters"),
});

type SignUpData = z.infer<typeof signUpSchema>;



export default function SignUp() {
    const [errorName, setErrorName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    // States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    // Submit Function of form
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setError("");
        setErrorName("");
        setErrorEmail("");
        setErrorPassword("");


        const result = signUpSchema.safeParse({ name, email, password });

        if (!result.success) {
            const errors = result.error.format();

            setErrorName(errors.name?._errors.join(". ") ?? "");
            setErrorEmail(errors.email?._errors.join(". ") ?? "");
            setErrorPassword(errors.password?._errors.join(". ") ?? "");

            return;
        }

        setLoading(true);
        //   sign Up
        try {
            const result = await signUp.email({
                name,
                email,
                password,
            });

            if (result.error) {
                setError(result.error.message ?? "Faild to sign up")
            } else {
                router.push("/dashboard");
            }
        } catch (err) {
            setError("An unexpected error occured");
        } finally {
            setLoading(false);
        }

    }




    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
            <Card className="w-full max-w-md border-gray-400 shadow-xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-black">
                        Sign UP
                    </CardTitle>

                    <CardDescription className="text-gray-600">
                        Create an account to start traking your JOb applications
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}
                        {/* Nme */}
                        <div className="mb-4">
                            <Label htmlFor="name" className="text-gray-700 mb-1">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Jhon Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border-gray-300 focus:border-primary focus:ring-primary"
                            />
                            {errorName && <p className="mt-1 text-sm text-red-500">{errorName}</p>}
                        </div>

                        {/* Email */}
                        <div className="mt-4 mb-4">
                            <Label className="text-gray-700 mb-1">Email</Label>
                            <Input
                                id="email"
                                placeholder="jhondoe@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border-gray-300 focus:border-primary focus:ring-primary"
                            />
                            {errorEmail && <p className="mt-1 text-sm text-red-500">{errorEmail}</p>}
                        </div>


                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder=""
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-gray-300 focus:border-primary focus:ring-primary"
                            />
                            {errorPassword && <p className="mt-1 text-sm text-red-500">{errorPassword}</p>}
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit"
                            className="w-full bg-primary hover:bg-primary/90"
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Sign Up"}
                        </Button>
                        <p>
                            Already have an account? {" "}
                            <Link href="/sign-in"
                                className="font-medium text-primary hover:underline"
                            >Sign In</Link>
                        </p>

                    </CardFooter>
                </form>

            </Card>

        </div>
    );
}