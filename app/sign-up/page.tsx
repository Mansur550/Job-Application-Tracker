"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";




export default function SignUp() {
    // States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");

    const [error, setError]= useState("");
    const [loading, setLoading] = useState(false)

    // Submit Function of form
    async function handleSubmit( e: React.FormEvent){
        e.preventDefault();
      setError("") ;
      setLoading(true);

    //   sign Up
    try {

    } catch (err) {
        setError("An unexpected error occured");
    } finally{
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
                <CardContent>
                        {/* Nme */}
                        <div className="mb-4">
                            <Label htmlFor="name" className="text-gray-700">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Jhon Doe"
                                value={name}
                                onChange = {(e)=> setName(e.target.value)}
                                required
                                 className="border-gray-300 focus:border-primary focus:ring-primary"
                            />
                        </div>

                        {/* Email */}
                        <div className="mt-4 mb-4">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="jhondoe@example.com" required
                            value={email}
                            onChange = {(e)=> setEmail(e.target.value)}
                            className="border-gray-300 focus:border-primary focus:ring-primary"
                            />
                        </div>
                        

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder=""
                                value={password}
                                onChange = {(e)=> setPassword(e.target.value)}
                                required
                                className="border-gray-300 focus:border-primary focus:ring-primary"
                            />
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit"
                        className="w-full bg-primary hover:bg-primary/90"
                        >Sign-up</Button>
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