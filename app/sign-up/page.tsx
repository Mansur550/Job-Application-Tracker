"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "lucide-react";



export default function SignUp() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Sign UP</CardTitle>

                    <CardDescription> Create an account to start traking your JOb applications
                    </CardDescription>
                </CardHeader>
                <form action="">
                    <CardContent>
                        {/* Nme */}
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Jhon Doe"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="jhondoe@example.com" required />
                        </div>

                        {/* Password */}
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder=""
                                required
                            />
                        </div>
                    </CardContent>

                    <CardFooter>
                        <Button type="submit">Sign-up</Button>
                        <p>
                            Already have an account? <Link href="/sign-in">Sign In</Link>
                        </p>
                        
                    </CardFooter>
                </form>

            </Card>

        </div>
    );
}